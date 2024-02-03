<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubmissionResource;
use App\Http\Resources\SubmissionCollection;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class SubmissionController extends Controller
{
    public function index() {
        return response()->json(new SubmissionCollection(Submission::all()),Response::HTTP_OK);
    }
   
    public function store(Request $request) 
    {
        try {
            $submission = Submission::create($request->only([
                'submitted_by', 'submission_type', 'school_yr_submitted', 'term_submitted', 'submitted_datetime', 'submission_status', 'updated_by'
            ]));
            
            return new SubmissionResource($submission);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error in creating submission',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
