<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class SubmissionController extends Controller
{
    public function index() {
        $submissions = Submission::all();
        return response()->json(["status" => "success", "count" => count($submissions), "data" => $submissions]);
    }
    public function submission(Request $request) {
        if ($request->hasFile('documents')) {
            $file = $request->file('documents'); 
            $filename = $file->hashName();
            $finalName = date('His') . $filename;
    
            $file->storeAs('submissions/', $finalName, 'public');

            $submission = new Submission();
            $submission->submission_type = $finalName; // Replace 'file_name' with the actual column name in your submissions table
            $submission->save();

            
            return response()->json(["message" => "Successfully uploaded a file"]);
        } else {
            return response()->json(["message" => "No file found"]);
        }
    }
}
