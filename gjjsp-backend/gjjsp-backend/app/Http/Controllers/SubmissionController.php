<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class SubmissionController extends Controller
{
    public function submission(Request $request) {
        $submission_type = [];
        $response = [];

        $validator = Validator::make($request->all(),
            [
                'documents' => 'required',
                'documents.*' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,jpg|max:2048',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['status' => "failed", "message" => "Validation Error", "errors" => $validator->errors()]);
        }

        if ($request->has('documents')) {
            foreach ($request->file('documents') as $document) {
                $filename = Str::random(32) . '.' . $document->getClientOriginalExtension();
        
                try {
                    // Store the file in storage/app/public
                    Storage::putFileAs('submissions', $document, $filename);
        
                    Submission::create([
                        'submission_type' => $filename
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'failed',
                        'message' => 'Failed to upload document',
                        'exception' => $e->getMessage()
                    ], 500);
                }
            }
        
            $response["status"] = "success";
            $response["message"] = "Document(s) uploaded successfully";
        } else {
            $response["status"] = "failed";
            $response["message"] = "Failed! Document(s) not uploaded";
        }
        

        return response()->json($response);
    }
}
