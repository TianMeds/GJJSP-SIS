<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class SubmissionController extends Controller
{
    public function index() {
        $submissions = Submission::all();
        return response()->json(["status" => "success", "count" => count($submissions), "data" => $submissions]);
    }
    public function submission(Request $request)
    {
        try {
            if ($request->hasFile('documents')) {
                $file = $request->file('documents');
                $filename = $file->hashName();
                $finalName = date('His') . $filename;

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
                    $submission = new Submission();
                    $submission->submission_type = $finalName;
                    $submission->save();

                    return response()->json(["message" => "Successfully uploaded a file"]);
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
        } catch (\Exception $e) {
            // Log the exception details for debugging
            Log::error('Exception: ' . $e->getMessage());
            Log::error('File Upload Exception Trace: ' . $e->getTraceAsString());

            // Re-throw the exception to let it propagate for further analysis
            throw $e;
        }
    }
}
