<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlumniFormResource;
use App\Http\Resources\AlumniFormCollection;
use App\Models\AlumniForm;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class AlumniFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new AlumniFormCollection
        (AlumniForm::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Retrieve the authenticated user
            $user = auth()->user();

            $scholar = $user->scholar()->first();

            if (!$scholar) {
                return response()->json(['error' => 'Scholar not found for the authenticated user'], 404);
            }

            $scholarId = $scholar->id;

            $userId = $user->id;
            
            // Create the AlumniForm with the scholar_id and user_id included
            $alumniForm = AlumniForm::create([
                'scholar_id' => $scholarId,
                'user_id' => $userId,
                'year_submitted' => $request->year_submitted,
                'company_name' => $request->company_name,
                'position_in_company' => $request->position_in_company,
                'company_location' => $request->company_location,
                'licensure_exam_type' => $request->licensure_exam_type,
                'exam_passed_date' => $request->exam_passed_date,
                'volunteer_group_name' => $request->volunteer_group_name,
                'yr_volunteered' => $request->yr_volunteered,
                'submission_status' => 'For Approval',
            ]);
    
            // Return the AlumniFormResource with the created instance
            return new AlumniFormResource($alumniForm);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error in creating alumni form',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(AlumniForm $alumniForm)
    {
        return new AlumniFormResource($alumniForm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            // Retrieve the authenticated user
            $user = auth()->user();
    
            $scholar = $user->scholar()->first();
    
            if (!$scholar) {
                return response()->json(['error' => 'Scholar not found for the authenticated user'], 404);
            }
    
            $scholarId = $scholar->id;
    
            $userId = $user->id;
    
            // Find the AlumniForm record to update based on the scholar ID
            $alumniForm = AlumniForm::where('scholar_id', $scholarId)->first();
    
            if (!$alumniForm) {
                return response()->json(['error' => 'Alumni form not found for the authenticated user'], 404);
            }
    
            // Update the AlumniForm with the provided data
            $alumniForm->update([
                'year_submitted' => $request->year_submitted,
                'company_name' => $request->company_name,
                'position_in_company' => $request->position_in_company,
                'company_location' => $request->company_location,
                'licensure_exam_type' => $request->licensure_exam_type,
                'exam_passed_date' => $request->exam_passed_date,
                'volunteer_group_name' => $request->volunteer_group_name,
                'yr_volunteered' => $request->yr_volunteered,
                'submission_status' => 'For Approval', // Assuming it's always set to 'For Approval' upon update
            ]);
    
            // Return the updated AlumniFormResource
            return new AlumniFormResource($alumniForm);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error in updating alumni form',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    public function updateSubmissionStatus(Request $request, $scholarId) 
    {
        try {
            // Find the Renewal Document object by scholar ID
            $alumniForm = AlumniForm::where('scholar_id', $scholarId)->first();
    
            if (!$alumniForm) {
                return response()->json([
                    'message' => 'Alumni Form not found for the scholar',
                ], 404);
            }
            
            // Get the ID of the logged-in user
            $loggedInUserId = Auth::id();
    
            // Update the Renewal Document Data with this request
            $alumniForm->update([
                'submission_status' => $request->input('submission_status'),
                'updated_by' => $loggedInUserId, 
                'remarks_message' => $request->input('remarks_message'),
            ]);
    
            // Return a success response
            return new AlumniFormResource($alumniForm);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Error updating Renewal Document',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function scholarAlumniDocuments()
    {
        $userId = Auth::id();

        // Retrieve renewal documents for the logged-in user
        $alumniDocuments= AlumniForm::where('user_id', $userId)->get();
    
        // Return the response
        return response()->json(new AlumniFormCollection($alumniDocuments), Response::HTTP_OK);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlumniForm $alumniForm)
    {
        //
    }
}
