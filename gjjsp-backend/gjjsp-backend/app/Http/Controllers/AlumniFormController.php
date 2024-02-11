<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlumniFormResource;
use App\Http\Resources\AlumniFormCollection;
use App\Models\AlumniForm;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

            // Retrieve the authenticated user's ID

            $user = Auth::user();
        
            // Assuming you have a relationship between users and scholars, 
            // retrieve the scholar_id of the authenticated user
            $scholarId = $user->scholar->id;
            
            // Create the AlumniForm with the scholar_id included
            $alumniForm = AlumniForm::create([
                'scholar_id' => $scholarId,
                'user_id' => $user->id,
                'year_submitted' => $request->year_submitted,
                'company_name' => $request->company_name,
                'position_in_company' => $request->position_in_company,
                'company_location' => $request->company_location,
                'licensure_exam_type' => $request->licensure_exam_type,
                'exam_passed_date' => $request->exam_passed_date,
                'volunteer_group_name' => $request->volunteer_group_name,
                'yr_volunteered' => $request->yr_volunteered,
            ]);
    

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
    public function update(Request $request, AlumniForm $alumniForm, )
    {
        // try {
        //     // Retrieve the authenticated user's ID
        //     $userId = Auth::id();
    
        //     // Find the scholar by ID and make sure it belongs to the authenticated user
        //     $scholar = Scholar::where('id', $id)
        //         ->where('user_id', $userId)
        //         ->firstOrFail();
    
        //     // Update the scholar with the request data
        //     $scholar->update($request->only([
        //         'company_name',
        //         'position_in_company',
        //         'company_location',
        //         'licensure_exam_type',
        //         'exam_passed_date',
        //         'volunteer_group_name',
        //         'yr_volunteered',
        //     ]));
    
        //     // Return the updated scholar as a resource
        //     return new ScholarResource($scholar);
        // } catch (\Exception $e) {
        //     // Log the exception for further investigation
        //     \Log::error('Error in updateScholarProfile: ' . $e->getMessage());
    
        //     return response()->json(['message' => 'Scholar not found or does not belong to the authenticated user'], Response::HTTP_NOT_FOUND);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlumniForm $alumniForm)
    {
        //
    }
}
