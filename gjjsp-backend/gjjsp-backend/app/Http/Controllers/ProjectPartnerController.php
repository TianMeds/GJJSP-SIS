<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectPartnerCollection;
use App\Http\Resources\ProjectPartnerResource;
use App\Models\User;
use App\Models\ProjectPartner;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectPartnerAdded;
use App\Mail\ProjectPartnerUpdated;
use App\Mail\ProjectPartnerDeleted;

class ProjectPartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ProjectPartnerCollection(ProjectPartner::all()), Response::HTTP_OK);
    }

    /**
     * Total of Project Partners
     */

    public function totalProjectPartners()
    {
        $totalProjectPartners = ProjectPartner::count();

        return response()->json(['total_project_partners' => $totalProjectPartners], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Check if school_id is 'other'
            if ($request->has('school_id') && $request->input('school_id') === 'other') {
                // Create a new school entry
                $school = $this->storeSchool($request);
                // Set the school_id of the project partner to the newly created school's ID
                $request->merge(['school_id' => $school->id]);
            }

            // Create the project partner
            $projectPartner = ProjectPartner::create($request->only([
                'scholarship_categ_id',
                'project_partner_name',
                'project_partner_mobile_num',
                'school_id',
            ]));

            // Retrieve users with roles 1 and 2
            $users = User::whereIn('role_id', [1, 2])->get();

            try {
                // Send email to each user
                foreach ($users as $user) {
                    Mail::to($user->email_address)->send(new ProjectPartnerAdded($user, $projectPartner));
                }
            } catch (\Exception $e) {
                // Log or handle the error
                return response()->json(['error' =>  $e->getMessage()], 500);
            }


            // Return the created project partner as a resource
            return new ProjectPartnerResource($projectPartner);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in store method: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'method' => 'POST'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(ProjectPartner $projectPartner)
    {
        return new ProjectPartnerResource($projectPartner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProjectPartner $projectPartner, $id)
    {

        try {
            // Find the project partner by ID
            $projectPartner = ProjectPartner::findOrFail($id);

            $previousName = $projectPartner->project_partner_name;
            
            // Check if school_id is 'other'
            if ($request->has('school_id') && $request->input('school_id') === 'other') {
                // Create a new school entry
                $school = $this->storeSchool($request);
                // Set the school_id of the project partner to the newly created school's ID
                $request->merge(['school_id' => $school->id]);
            }
            
            // Update the project partner with the request data
            $projectPartner->update($request->all());

             // Retrieve users with roles 1 and 2
            $users = User::whereIn('role_id', [1, 2])->get();

            try {
                // Send email to each user
                foreach ($users as $user) {
                    Mail::to($user->email_address)->send(new ProjectPartnerUpdated($user, $previousName, $projectPartner));
                }
            } catch (\Exception $e) {
                // Log or handle the error
                return response()->json(['error' =>  $e->getMessage()], 500);
            }

            // Return the updated project partner as a resource
            return new ProjectPartnerResource($projectPartner);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in update method: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'method' => 'PUT'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function storeSchool(Request $request)
    {
         // Create a new school entry
        $school = School::create($request->only([
            'school_name',
            'school_type',
            'school_address',
        ]));

        return $school;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectPartner $projectPartner, $id)
    {
        $projectPartner = ProjectPartner::find($id);

        $deletedName = $projectPartner->project_partner_name;

        $deleted = ProjectPartner::destroy($id);
        
        if($deleted === 0) {
            return response()->json(['message' => 'Project Partner not found'], 404);
        } elseif ($deleted === null) {
           return response()->json(['message' => 'Error deleting project partner'], 500);
        }

        $users = User::whereIn('role_id', [1, 2])->get();

        try {
            // Send email to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new ProjectPartnerDeleted($user, $deletedName, $projectPartner));
            }
        } catch (\Exception $e) {
            // Log or handle the error
            return response()->json(['error' =>  $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Project Partner deleted'], 200);
    }

    public function restoreProjectPartner(ProjectPartner $projectPartner, $id)
    {
        $restored = ProjectPartner::withTrashed()->where('id', $id)->restore();

        if($restored === 0) {
            return response()->json(['message' => 'Project Partner not found'], 404);
        } elseif ($restored === null) {
           return response()->json(['message' => 'Error restoring project partner'], 500);
        }

        return response()->json(['message' => 'Project Partner restored'], 200);
    }
}
