<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Http\Resources\DocumentCollection;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new DocumentCollection(Document::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            if ($request->hasFile('document_name')) {
                $file = $request->file('document_name');
                $status = $request->input('status', 'renewal');
                $finalName = $status . '_' . $file->getClientOriginalName();

                $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/gjjsp/';
                $nextcloudUsername = 'cbmedallada';
                $nextcloudPassword = 'sm@llLamp50';
        
                $nextcloudApiUrl = $nextcloudEndpoint . $finalName;

                 // Read the file content and convert it to UTF-8
                $fileContent = file_get_contents($file);
                $utf8Content = mb_convert_encoding($fileContent, 'UTF-8');
                $response = Http::withBasicAuth($nextcloudUsername, $nextcloudPassword)
                ->put($nextcloudApiUrl, $utf8Content);
    
            // Check if the file was successfully uploaded to Nextcloud
                if ($response->successful()) {
                    $submission = new Document();
                    $submission->document_name = $finalName;
                    $submission->filepath = $nextcloudApiUrl;
                    $submission->save();
        
                    $automaticFilePath = $nextcloudEndpoint . $finalName;

                    return response()->json([
                        "message" => "Successfully uploaded a file",
                        "filepath" => $automaticFilePath,
                    ]);
                } else {
                    // Log the response and request details for debugging
                    Log::error('Nextcloud API Request Failed:');
                    Log::error('Request URL: ' . $nextcloudApiUrl);
                    Log::error('Response Status: ' . $response->status());
                    Log::error('Response Body: ' . $response->body());
        
                    return response()->json(["message" => "Failed to upload file to Nextcloud"], 500);
                }
            } else {
                return response()->json(["message" => "No file found"], 400);
            }
        }
        catch (\Exception $e) {
            // Log the exception details for debugging
            Log::error('Exception: ' . $e->getMessage());
            Log::error('File Upload Exception Trace: ' . $e->getTraceAsString());
            
            // Re-throw the exception to let it propagate for further analysis
            throw $e;
        }
    }

  
    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
