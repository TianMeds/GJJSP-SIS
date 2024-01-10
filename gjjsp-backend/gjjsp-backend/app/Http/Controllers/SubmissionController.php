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
            $filename = $file->getClientOriginalName();
            $finalName = date('His') . $filename;
    
            $file->storeAs('submissions/', $finalName, 'public');
            return response()->json(["message" => "Successfully uploaded a file"]);
        } else {
            return response()->json(["message" => "No file found"]);
        }
    }
}
