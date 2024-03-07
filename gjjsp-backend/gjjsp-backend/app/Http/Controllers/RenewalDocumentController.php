<?php

namespace App\Http\Controllers;

use App\Http\Resources\RenewalDocumentResource;
use App\Http\Resources\ScholarResoure;
use App\Http\Resources\RenewalDocumentCollection;
use App\Http\Resources\RemarksResource;
use App\Models\RenewalDocument;
use App\Models\Scholar;
use App\Models\User;
use App\Models\Remarks;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Http\Requests\RenewalDocumentRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Mail\RenewalDocumentReminder;
use Illuminate\Support\Facades\Mail;


class RenewalDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new RenewalDocumentCollection(RenewalDocument::all()),Response::HTTP_OK);
    }

    public function scholarRenewalDocuments()
    {
        $userId = Auth::id();

        // Retrieve renewal documents for the logged-in user
        $renewalDocuments = RenewalDocument::where('user_id', $userId)->get();
    
        // Return the response
        return response()->json(new RenewalDocumentCollection($renewalDocuments), Response::HTTP_OK);
    }

    /**
     * Total of Renewal Documents
     */

    public function totalRenewalDocuments()
    {
        $totalRenewalDocuments = RenewalDocument::count();

        return response()->json(['total_renewal_documents' => $totalRenewalDocuments], Response::HTTP_OK);
    } 
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $user = auth()->user();
        
            // Ensure we get a single scholar associated with the user
            $scholar = $user->scholar()->first();

            // Check if a scholar exists
            if (!$scholar) {
                return response()->json(['error' => 'Scholar not found for the authenticated user'], 404);
            }

            // Get the scholar id
            $scholarId = $scholar->id;
            
            // Get the user id
            $userId = $user->id;

            $rules = [
                'copyOfReportCard' => 'required|mimes:pdf,doc,docx|max:5120',
                'copyOfRegistrationForm' => 'required|mimes:pdf|max:5120',
                'scannedWrittenEssay' => 'required|mimes:pdf|max:5120',
                'letterOfGratitude' => 'required|mimes:pdf |max:5120',
                ];
    
            // Validate the request
            $validator = Validator::make($request->all(), $rules);
    
            // Check if the validation fails
            if ($validator->fails()) {
                // Return validation errors
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            // If validation passes, proceed with file upload logic
    
            $status = $request->input('status', 'Renewal');
            $studentName = $user->first_name . ' ' . $user->last_name;
            $fileNames = [];
    
            // Create a single instance of the RenewalDocument model
            $submission = new RenewalDocument();
            $submission->user_id = $userId; // Assign the user id
            $submission->scholar_id = $scholarId; 
            $submission->gwa_value = $request->input('gwa_value');
            $submission->gwa_remarks = $request->input('gwa_remarks');
            $submission->school_yr_submitted = $request->input('school_yr_submitted');
            $submission->term_submitted = $request->input('term_submitted');
    
            // Iterate over file types and process each
            foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude'] as $fileType) {
                if ($request->hasFile($fileType)) {
                    $file = $request->file($fileType);
                    $fileName = $status . '_' . $studentName . '_' . $request->input('term_submitted') . '_' . $file->getClientOriginalName();
    
                    // Upload the file to Nextcloud only if it doesn't already exist
                    $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/RenewalDocuments/';
                    $nextcloudUsername = 'cbmedallada';
                    $nextcloudPassword = 'sm@llLamp50';
                    $nextcloudApiUrl = $nextcloudEndpoint . $fileName;
    
                    // Check if the file already exists in Nextcloud
                    if (!file_exists($nextcloudApiUrl)) {
                        try {
                            $response = Http::withBasicAuth($nextcloudUsername, $nextcloudPassword)
                                ->attach('file', file_get_contents($file), $fileName)
                                ->put($nextcloudApiUrl);
                
                            // Check if the file was successfully uploaded to Nextcloud
                            if ($response->successful()) {
                                $submission->{$fileType} = $nextcloudApiUrl;
                                $fileNames[$fileType] = $nextcloudApiUrl;
                            } else {
                                // Log the response and request details for debugging
                                Log::error('Nextcloud API Request Failed:');
                                Log::error('Request URL: ' . $nextcloudApiUrl);
                                Log::error('Response Status: ' . $response->status());
                                Log::error('Response Body: ' . $response->body());
                
                                return response()->json(["message" => "Failed to upload file to Nextcloud"], 500);
                            }
                        } catch (\Exception $apiException) {
                            // Log the API request exception for debugging
                            Log::error('Nextcloud API Request Exception: ' . $apiException->getMessage());
                            Log::error('Nextcloud API Request Exception Trace: ' . $apiException->getTraceAsString());
                
                            // Re-throw the exception to let it propagate for further analysis
                            throw $apiException;
                        }
                    } else {
                        Log::info("File already exists in Nextcloud: $fileName");
                        $submission->{$fileType} = $fileName;
                        $fileNames[$fileType] = $nextcloudApiUrl;
                    }
                }
            }
        
            // Save the RenewalDocument model after processing all files
            $submission->save();
    
            // Construct a response including all uploaded files
            $responseArray = [
                "message" => "Successfully uploaded files",
                "gwa_value" => $request->input('gwa_value'),
                "gwa_remarks" => $request->input('gwa_remarks'),
                "fileNames" => $fileNames,
            ];
    
            return response()->json($responseArray);
            
        } catch (\Exception $e) {
            // Log the exception details for debugging
            Log::error('Exception: ' . $e->getMessage());
            Log::error('File Upload Exception Trace: ' . $e->getTraceAsString());
    
            // Re-throw the exception to let it propagate for further analysis
            throw $e;
        }
    }


    public function updateSubmissionStatus(Request $request, $scholarId) 
    {
        try {
            // Find the Renewal Document object by scholar ID
            $renewalDocument = RenewalDocument::where('scholar_id', $scholarId)->first();
    
            if (!$renewalDocument) {
                return response()->json([
                    'message' => 'Renewal Document not found for the scholar',
                ], 404);
            }
            
            // Get the ID of the logged-in user
            $loggedInUserId = Auth::id();
    
            // Update the Renewal Document Data with this request
            $renewalDocument->update([
                'submission_status' => $request->input('submission_status'),
                'updated_by' => $loggedInUserId, // Set the updated_by field with the ID of the logged-in user
            ]);
    
            // Return a success response
            return new RenewalDocumentResource($renewalDocument);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Error updating Renewal Document',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    


    // public function sendReminders(Request $request, $id)
    // {
    //     // Find the renewal document by its ID
    //     $renewalDocument = RenewalDocument::find($id);

    //     // Check if the renewal document exists
    //     if (!$renewalDocument) {
    //         return response()->json(['message' => 'Renewal Document not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     // Find the user associated with the renewal document
    //     $user = User::find($renewalDocument->user_id);

    //     // Check if the user exists
    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
    //     }

    //     // Send renewal document reminder email
    //     Mail::to($user->email_address)->send(new RenewalDocumentReminder($renewalDocument, $user));

    //     return response()->json(['message' => 'Renewal Document Reminder sent successfully'], Response::HTTP_OK);
    // }

    // public function store(Request $request)
    // {
    //     try {
    //         $user = Auth::user();
    
    //         // Ensure we get a single scholar associated with the user
    //         $scholar = $user->scholar()->first();
    
    //         // Check if a scholar exists
    //         if (!$scholar) {
    //             return response()->json(['error' => 'Scholar not found for the authenticated user'], 404);
    //         }
    
    //         $scholarId = $scholar->id;
    //         $userName = 'renewal_' . $user->first_name . '_' . $user->last_name;
    
    //         // Set Nextcloud API endpoint and credentials
    //         $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/index.php/s/fmiD2kZdNaa3PKT';
    //         $nextcloudUsername = 'cbmedallada';
    //         $nextcloudPassword = 'sm@llLamp50';
            
    
    //         // Prepare array to store filenames
    //         $fileNames = [];
    
    //         // Iterate over file types and process each
    //         foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude'] as $fileType) {
    //             if ($request->hasFile($fileType)) {
    //                 $file = $request->file($fileType);
    //                 $renewalFileName = $userName . '_' . $file->getClientOriginalName();
    
    //                 // Save file to Nextcloud
    //                 $nextcloudApiUrl = $nextcloudEndpoint . $renewalFileName;
    //                 Storage::disk('public')->putFileAs($nextcloudEndpoint, $file, $renewalFileName);
    
    //                 // Store filename
    //                 $fileNames[$fileType] = $nextcloudApiUrl;
    //             }
    //         }
    
    //         // Create Renewal Document with all files attached
    //         $submission = RenewalDocument::create([
    //             'scholar_id' => $scholarId,
    //             'user_id' => $user->id,
    //             'gwa_value' => $request->gwa_value,
    //             'gwa_remarks' => $request->gwa_remarks,
    //             'school_yr_submitted' => $request->school_yr_submitted,
    //             'term_submitted' => $request->term_submitted,
    //             'copyOfReportCard' => $fileNames['copyOfReportCard'] ?? null,
    //             'copyOfRegistrationForm' => $fileNames['copyOfRegistrationForm'] ?? null,
    //             'scannedWrittenEssay' => $fileNames['scannedWrittenEssay'] ?? null,
    //             'letterOfGratitude' => $fileNames['letterOfGratitude'] ?? null,
    //             'submission_status' => 'For Approval',
    //         ]);

    //         $remarks = Remarks::create([
    //             'scholar_id' => $scholarId,
    //             'renewal_document_id' => $submission->id,
    //             'remarks_message' => $request->remarks_message, // Assuming this field comes from the request
    //             'sent_datetime' => now(), // Assuming you want to set the current datetime
    //         ]);
    
    //         // Return JSON response
    //         return response()->json([
    //             'submission' => new RenewalDocumentResource($submission),
    //             'remarks' => new RemarksResource($remarks),
    //         ]);

    //     } catch (\Exception $e) {
    //         // Return JSON response
    //         return response()->json([
    //             'message' => 'Error in file upload',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
    
    

    /**
     * Display the specified resource.
     */
    public function show(RenewalDocument $renewalDocument)
    {
        //Renewal Document
        $renewalDocument = RenewalDocument::find($renewalDocument);
        return response()->json(new RenewalDocumentResource($renewalDocument), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the RenewalDocument object by ID
        $renewalDocument = RenewalDocument::find($id);
    
        // Check if the RenewalDocument exists
        if ($renewalDocument) {
            try {
                // Update the RenewalDocument object with the request data
                $renewalDocument->update($request->all());
    
                // Return a success response
                return response()->json([
                    'status' => true,
                    'message' => 'Renewal Document has been updated',
                    'method' => 'POST',
                ], 200);
            } catch (\Exception $err) {
                // If an error occurs during the update process, return an error response
                return response()->json([
                    'status' => false,
                    'message' => 'Error updating Renewal Document',
                    'error' => $err->getMessage(),
                ], 500);
            }
        } else {
            // If the RenewalDocument with the specified ID is not found, return a not found response
            return response()->json([
                'status' => false,
                'message' => 'Renewal Document not found',
            ], 404);
        }
    }

    // public function scholarSubmission()
    // {
    //     try {
    //         // Check if the authenticated user is an admin (role_id 1 or 2)
    //         if (Auth::check() && (Auth::user()->role_id == 1 || Auth::user()->role_id == 2)) {
    //             // Retrieve the user ID from the request or any other source
    //             $userId = request()->input('user_id');
    
    //             // Find the scholar profile based on the provided user ID
    //             $scholar = Scholar::where('user_id', $userId)->first();
    
    //             if ($scholar) {
    //                 // Scholar profile found, return as a resource
    //                 return new ScholarResource($scholar);
    //             } else {
    //                 // Scholar profile not found for the provided user ID
    //                 return response()->json(['message' => 'Scholar profile not found for the provided user ID'], Response::HTTP_NOT_FOUND);
    //             }
    //         } else {
    //             // Retrieve the authenticated user's ID
    //             $userId = Auth::id();
    
    //             // Find the scholar profile that belongs to the authenticated user
    //             $scholar = Scholar::where('user_id', $userId)->first();
    
    //             if ($scholar) {
    //                 // Scholar profile found, return as a resource
    //                 return new ScholarResource($scholar);
    //             } else {
    //                 // Scholar profile not found for the authenticated user
    //                 return response()->json(['message' => 'Scholar profile not found for the authenticated user'], Response::HTTP_NOT_FOUND);
    //             }
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
    //     }
    // }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RenewalDocument $renewalDocument)
    {
        //
    }
}
