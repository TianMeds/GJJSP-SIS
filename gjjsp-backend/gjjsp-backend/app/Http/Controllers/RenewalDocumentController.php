<?php

namespace App\Http\Controllers;

use App\Http\Resources\RenewalDocumentResource;
use App\Http\Resources\RenewalDocumentCollection;
use App\Models\RenewalDocument;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Http\Requests\RenewalDocumentRequest;


class RenewalDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new RenewalDocumentCollection(RenewalDocument::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     try {
    //         if ($request->hasFile('copyOfReportCard') ||
    //             $request->hasFile('copyOfRegistrationForm') ||
    //             $request->hasFile('scannedWrittenEssay') ||
    //             $request->hasFile('letterOfGratitude')
    //         ) {
    //             $status = $request->input('status', 'renewal');
    
    //             // Initialize variables to store different file names
    //             $fileNames = [];
    
    //             // Create a single instance of the RenewalDocument model
    //             $submission = new RenewalDocument();
    //             $submission->gwa_value = $request->input('gwa_value');
    //             $submission->gwa_remarks = $request->input('gwa_remarks');
    
    //             // Iterate over file types and process each
    //             foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude'] as $fileType) {
    //                 if ($request->hasFile($fileType)) {
    //                     $file = $request->file($fileType);
    //                     ${$fileType} = $status . '_' . $file->getClientOriginalName();  // dynamic variable name
    
    //                     $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/gjjsp/';
    //                     $nextcloudUsername = 'cbmedallada';
    //                     $nextcloudPassword = 'sm@llLamp50';
    
    //                     $nextcloudApiUrl = $nextcloudEndpoint . ${$fileType};

    //                     $fileContent = file_get_contents($file);
    
    //                     try {
    //                         $response = Http::withBasicAuth($nextcloudUsername, $nextcloudPassword)
    //                             ->attach(
    //                                 'file',  // 'file' is the name of the field expected by the server
    //                                 file_get_contents($file),
    //                                 ${$fileType}  // Filename to be used in the request
    //                             )
    //                             ->put($nextcloudApiUrl);
            
    //                         // Check if the file was successfully uploaded to Nextcloud
    //                         if ($response->successful()) {
    //                             // Treat each file as a separate input
    //                             $submission->{$fileType} = ${$fileType};
    //                             $fileNames[$fileType] = $nextcloudApiUrl;
    //                         } else {
    //                             // Log the response and request details for debugging
    //                             Log::error('Nextcloud API Request Failed:');
    //                             Log::error('Request URL: ' . $nextcloudApiUrl);
    //                             Log::error('Response Status: ' . $response->status());
    //                             Log::error('Response Body: ' . $response->body());
            
    //                             return response()->json(["message" => "Failed to upload file to Nextcloud"], 500);
    //                         }
    //                     } catch (\Exception $apiException) {
    //                         // Log the API request exception for debugging
    //                         Log::error('Nextcloud API Request Exception: ' . $apiException->getMessage());
    //                         Log::error('Nextcloud API Request Exception Trace: ' . $apiException->getTraceAsString());
            
    //                         // Re-throw the exception to let it propagate for further analysis
    //                         throw $apiException;
    //                     }
    //                 }
    //             }
    
    //             // Save the RenewalDocument model after processing all files
    //            $submission->save();

    //             // Construct a response including all uploaded files
    //             $responseArray = [
    //                 "message" => "Successfully uploaded files",
    //                 "gwa_value" => $request->input('gwa_value'),
    //                 "gwa_remarks" => $request->input('gwa_remarks'),
    //                 "fileNames" => $fileNames,
    //             ];

    //             return response()->json($responseArray);
    //         } 
    //     } catch (\Exception $e) {
    //         // Log the exception details for debugging
    //         Log::error('Exception: ' . $e->getMessage());
    //         Log::error('File Upload Exception Trace: ' . $e->getTraceAsString());
    
    //         // Re-throw the exception to let it propagate for further analysis
    //         throw $e;
    //     }
    // }


    public function store(Request $request)
    {
        try {
            // Generate unique filenames
            $copyOfReportCardName = Str::random(32) . '.' . $request->copyOfReportCard->getClientOriginalExtension();
            $copyOfRegistrationFormName = Str::random(32) . '.' . $request->copyOfRegistrationForm->getClientOriginalExtension();
            $scannedWrittenEssayName = Str::random(32) . '.' . $request->scannedWrittenEssay->getClientOriginalExtension();
            $letterOfGratitudeName = Str::random(32) . '.' . $request->letterOfGratitude->getClientOriginalExtension();
    
            $submission = null;

            // Create Renewal Document
            $submission = RenewalDocument::create([
                'scholar_id' => $request->scholar_id,
                'gwa_value' => $request->gwa_value,
                'gwa_remarks' => $request->gwa_remarks,
                'copyOfReportCard' => $copyOfReportCardName,
                'copyOfRegistrationForm' => $copyOfRegistrationFormName,
                'scannedWrittenEssay' => $scannedWrittenEssayName,
                'letterOfGratitude' => $letterOfGratitudeName,
            ]);
    
            // Set Nextcloud API endpoint and credentials
            $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/gjjsp/';
            $nextcloudUsername = 'cbmedallada';
            $nextcloudPassword = 'sm@llLamp50';
    
            // Save Document in Storage Folder
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->copyOfReportCard, $copyOfReportCardName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->copyOfRegistrationForm, $copyOfRegistrationFormName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->scannedWrittenEssay, $scannedWrittenEssayName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->letterOfGratitude, $letterOfGratitudeName);

            $status = $request->input('status', 'renewal');
    
            // Iterate over file types and process each
            foreach (['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude'] as $fileType) {
                if ($request->hasFile($fileType)) {
                    $file = $request->file($fileType);
                    ${$fileType} = $status . '_' . $file->getClientOriginalName();  // dynamic variable name
    
                    $nextcloudApiUrl = $nextcloudEndpoint . ${$fileType};
    
                    $fileContent = file_get_contents($file);
    
                    try {
                        $response = Http::withBasicAuth($nextcloudUsername, $nextcloudPassword)
                            ->attach(
                                'file',  // 'file' is the name of the field expected by the server
                                file_get_contents($file),
                                ${$fileType}  // Filename to be used in the request
                            )
                            ->put($nextcloudApiUrl);
    
                        // Check if the file was successfully uploaded to Nextcloud
                        if ($response->successful()) {
                            // Treat each file as a separate input
                            $submission->{$fileType} = ${$fileType};
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
                }
            }
    
            // Return JSON response
            return response()->json([
                'message' => 'Successfully uploaded files',
                'gwa_value' => $request->gwa_value,
                'gwa_remarks' => $request->gwa_remarks,
                'copyOfReportCard' => $copyOfReportCardName,
                'copyOfRegistrationForm' => $copyOfRegistrationFormName,
                'scannedWrittenEssay' => $scannedWrittenEssayName,
                'letterOfGratitude' => $letterOfGratitudeName,
            ], 201);
        } catch (\Exception $e) {
            // Return JSON response
            return response()->json([
                'message' => 'Error in file upload',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

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
    public function update(Request $request, RenewalDocument $renewalDocument)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RenewalDocument $renewalDocument)
    {
        //
    }
}
