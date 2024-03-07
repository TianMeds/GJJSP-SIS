<?php

namespace App\Http\Controllers;

use App\Http\Resources\GraduatingFormResource;
use App\Http\Resources\GraduatingFormCollection;
use App\Models\GraduatingDocument;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\GraduatingDocumentReminder;
use Illuminate\Support\Facades\Validator;


class GraduatingFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new GraduatingFormCollection(GraduatingDocument::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
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
    //         $userName = 'graduation_' . $user->first_name . '_' . $user->last_name;
    
    //         // Set Nextcloud API endpoint and credentials
    //         $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/GraduatingDocuments/';
    //         $nextcloudUsername = 'cbmedallada';
    //         $nextcloudPassword = 'sm@llLamp50';
    
    //         // Prepare array to store filenames
    //         $fileNames = [];
    
    //         // Iterate over file types and process each
    //         foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude', 'statementOfAccount', 'graduationPicture', 'transcriptOfRecords'] as $fileType) {
    //             if ($request->hasFile($fileType)) {
    //                 $file = $request->file($fileType);
    //                 $graduationFileName = $userName . '_' . $file->getClientOriginalName();
    
    //                 // Save file to Nextcloud
    //                 $nextcloudApiUrl = $nextcloudEndpoint . $graduationFileName;
    //                 Storage::disk('public')->putFileAs($nextcloudEndpoint, $file, $graduationFileName);
    
    //                 // Store filename
    //                 $fileNames[$fileType] = $nextcloudApiUrl;
    //             }
    //         }
    
    //         // Create Graduation Document with all files attached
    //         $submission = GraduatingDocument::create([
    //             'scholar_id' => $scholarId,
    //             'user_id' => $user->id,
    //             'graduateName' => $request->graduateName,
    //             'schoolGraduated' => $request->schoolGraduated,
    //             'addressSchool' => $request->addressSchool,
    //             'yearEnteredGraduated' => $request->yearEnteredGraduated,
    //             'program' => $request->program,
    //             'street' => $request->street,
    //             'user_email_address' => $request->user_email_address,
    //             'user_mobile_num' => $request->user_mobile_num,
    //             'futurePlan' => $request->futurePlan,
    //             'school_yr_submitted' => $request->school_yr_submitted,
    //             'copyOfReportCard' => $fileNames['copyOfReportCard'] ?? null,
    //             'copyOfRegistrationForm' => $fileNames['copyOfRegistrationForm'] ?? null,
    //             'scannedWrittenEssay' => $fileNames['scannedWrittenEssay'] ?? null,
    //             'letterOfGratitude' => $fileNames['letterOfGratitude'] ?? null,
    //             'statementOfAccount' => $fileNames['statementOfAccount'] ?? null,
    //             'graduationPicture' => $fileNames['graduationPicture'] ?? null,
    //             'transcriptOfRecords' => $fileNames['transcriptOfRecords'] ?? null,
    //             'submission_status' => 'For Approval',
    //         ]);
    
    //         // Return JSON response
    //         return response()->json([
    //             'submission' => new GraduatingFormResource($submission),
    //         ]);
    
    //     } catch (\Exception $e) {
    //         // Return JSON response
    //         return response()->json([
    //             'message' => 'Error in file upload',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }


    public function store(Request $request) {
        try {
            $user = auth()->user();

            $scholar = $user->scholar()->first();

            if (!$scholar) {
                return response()->json(['error' => 'Scholar not found for the authenticated user'], 404);
            }

            $scholarId = $scholar->id;

            $userId = $user->id;

            $rules = [
                'copyOfReportCard' => 'required|mimes:pdf| max:5120',
                'copyOfRegistrationForm' => 'required|mimes:pdf| max:5120',
                'scannedWrittenEssay' => 'required|mimes:pdf | max:5120',
                'letterOfGratitude' => 'required|mimes:pdf | max:5120',
                'statementOfAccount' => 'required|mimes:pdf | max:5120',
                'graduationPicture' => 'required|mimes:jpeg,png,jpg | max:5120',
                'transcriptOfRecords' => 'required|mimes:pdf | max:5120' ,
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            $status = $request->input('status', 'Graduating');
            $studentName = $user->first_name . ' ' . $user->last_name;
            $yearEnteredGraduated = $scholar->school_yr_started . ' - ' . $scholar->school_yr_graduated;

            $fileNames = [];

            //Create a single instance of the GraduatingDocument model
            $submission = new GraduatingDocument();
            $submission->scholar_id = $scholarId;
            $submission->user_id = $userId;
            $submission->graduateName = $studentName;
            $submission->schoolGraduated = $request->input('schoolGraduated');
            $submission->addressSchool = $request->input('addressSchool');
            $submission->yearEnteredGraduated = $yearEnteredGraduated;
            $submission->program = $scholar->program;
            $submission->street = $scholar->street . ', ' . $scholar->barangay_name . ', ' . $scholar->cities_municipalities_name . ', ' . $scholar->province_name . ', ' . $scholar->region_name . ', ' . $scholar->zip_code;
            $submission->user_email_address = $scholar->user_email_address;
            $submission->user_mobile_num = $scholar->user_mobile_num;
            $submission->futurePlan = $request->input('futurePlan');
            $submission->school_yr_submitted = $request->input('school_yr_submitted');
            
            //Iterate over the file types and process each
            foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude', 'statementOfAccount', 'graduationPicture', 'transcriptOfRecords'] as $fileType) {
                if ($request->hasFile($fileType)) {
                    $file = $request->file($fileType);
                    $fileName = $status . '_' . $studentName . '_' . $request->input('school_yr_submitted') . '_' . $file->getClientOriginalName();


                    //Upload the file to NextCloud only if it doesnt already exist
                    $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/GraduatingDocuments/';
                    $nextcloudUsername = 'cbmedallada';
                    $nextcloudPassword = 'sm@llLamp50';
                    $nextcloudApiUrl = $nextcloudEndpoint . $fileName;

                    //Check if the file already exists in NextCloud
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

            // Save the GraduatingDocument instance to the database
            $submission->save();

            // Construct a response including all uploaded files
            $responseArray = [
                'message' => 'Graduating Document submitted successfully',
                'graduateName' =>  $studentName,
                'schoolGraduated' => $request->input('schoolGraduated'),
                'addressSchool' => $request->input('addressSchool'),
                'yearEnteredGraduated' => $yearEnteredGraduated,
                'program' => $scholar->program,
                'street' => $scholar->street . ', ' . $scholar->barangay_name . ', ' . $scholar->cities_municipalities_name . ', ' . $scholar->province_name . ', ' . $scholar->region_name . ', ' . $scholar->zip_code,
                'user_email_address' => $scholar->user_email_address,
                'user_mobile_num' => $scholar->user_mobile_num,                
                'futurePlan' => $request->input('futurePlan'),
                'fileNames' => $fileNames,
            ];

            return response()->json($responseArray, 201);
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            Log::error('File Upload Exception Trace: ' . $e->getTraceAsString());

            // Re-throw the exception to let it propagate for further analysis
            throw $e;
        }
    }
    


    public function sendReminders(Request $request, $id)
    {
        // Find the renewal document by its ID
        $graduatingDocument = GraduatingDocument::find($id);

        // Check if the renewal document exists
        if (!$graduatingDocument) {
            return response()->json(['message' => 'Graduating Document not found'], Response::HTTP_NOT_FOUND);
        }

        // Find the user associated with the renewal document
        $user = User::find($graduatingDocument->user_id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Send renewal document reminder email
        Mail::to($user->email_address)->send(new GraduatingDocumentReminder($graduatingDocument, $user));

        return response()->json(['message' => 'Graduating Document Reminder sent successfully'], Response::HTTP_OK);
    }


    public function updateSubmissionStatus(Request $request, $scholarId) 
    {
        try {
            // Find the Renewal Document object by scholar ID
            $graduatingDocument = GraduatingDocument::where('scholar_id', $scholarId)->first();
    
            if (!$graduatingDocument) {
                return response()->json([
                    'message' => 'Renewal Document not found for the scholar',
                ], 404);
            }
            
            // Get the ID of the logged-in user
            $loggedInUserId = Auth::id();
    
            // Update the Renewal Document Data with this request
            $graduatingDocument->update([
                'submission_status' => $request->input('submission_status'),
                'updated_by' => $loggedInUserId, // Set the updated_by field with the ID of the logged-in user
            ]);
    
            // Return a success response
            return new GraduatingFormResource($graduatingDocument);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Error updating Renewal Document',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(GraduatingForm $graduatingForm)
    {
        return new GraduatingFormResource($graduatingForm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GraduatingForm $graduatingForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GraduatingForm $graduatingForm)
    {
        //
    }
}
