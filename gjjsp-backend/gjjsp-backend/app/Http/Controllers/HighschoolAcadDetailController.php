<?php

namespace App\Http\Controllers;

use App\Http\Resources\HighschoolAcadDetailResource;
use App\Http\Resources\HighschoolAcadDetailCollection;
use App\Models\HighSchoolAcadDetails;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ScholarProfileUpdated;

class HighschoolAcadDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new HighschoolAcadDetailCollection
        (HighschoolAcadDetails::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $highschoolAcadDetails = HighschoolAcadDetails::create($request->only([
            'track_name',
            'gwa_school_yr_graduated',
            'school_name',
            'school_address',
            'school_yr_graduated_hs',
        ]));

        return new HighschoolAcadDetailResource($highschoolAcadDetails);
    }

    /**
     * Display the specified resource.
     */
    public function show(HighschoolAcadDetails $highschoolAcadDetails)
    {
        return new HighschoolAcadDetailResource($highschoolAcadDetails);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HighschoolAcadDetails $highschoolAcadDetails, $id)
    {
        try{
            $userId = Auth::id();

            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();

            if ($scholar) {

                $highschoolAcadDetails = HighschoolAcadDetails::where('scholar_id', $scholar->id)->first();

                if ($highschoolAcadDetails) {

                    $originalHighschoolAcadDetails = $highschoolAcadDetails->toArray();

                    $highschoolAcadDetails->update($request->only([
                        'track_name',
                        'strand_name',
                        'gwa_school_yr_graduated',
                        'school_name',
                        'school_address',
                        'school_yr_graduated_hs',
                    ]));

                    $updatedHighschoolAcadDetails = [];
                    foreach ($request->all() as $key => $value) {
                        if ($originalHighschoolAcadDetails[$key] !== $value) {
                            $updatedHighschoolAcadDetails[$key] = $value;
                        }
                    }
                    
                    $users = User::whereIn('role_id', [1, 2])->get();

                    // Send email notification to each user
                    foreach ($users as $user) {
                        Mail::to($user->email_address)->send(new ScholarProfileUpdated($user, $updatedHighschoolAcadDetails, $scholar));
                    }


                    return new HighschoolAcadDetailResource($highschoolAcadDetails);
                }
                else {
                    return response()->json(['message' => 'High School Details not found!'], Response::HTTP_NOT_FOUND);
                }
            }
            else {
                return response()->json(['message' => 'Scholar not found!'], Response::HTTP_NOT_FOUND);
            }
        }
        catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => 'Error updating High School Details!',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response([
            'status' => false,
            'message' => 'High School Details not found!',
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HighschoolAcadDetails $highschoolAcadDetails, $id)
    {
        $deleted = HighSchoolAcadDetails::destroy($id);

        if($deleted === 0) {
            return response()->json(['message' => 'High School Details not found!'], Response::HTTP_NOT_FOUND);
        }
        elseif($deleted === null) {
            return response()->json(['message' => 'Error deleting High School Details!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'High School Details deleted!'], Response::HTTP_OK);
    }

    public function restoreHighschoolAcadDetail(HighschoolAcadDetails $highschoolAcadDetails, $id)
    {
        $restored = HighSchoolAcadDetails::withTrashed()->where('id', $id)->restore();

        if ($restored === 0) {
            return response()->json(['message' => 'High school details not found or already restored'], 404);
        } elseif ($restored === null) {
            return response()->json(['message' => 'Error restoring High school details'], 500);
        }
    
        return response()->json(['message' => 'High school details restored successfully'], 200);
    }

    public function getHighschoolAcadDetail()
    {
        try {
            // Retrieve the authenticated user's ID
            $userId = Auth::id();

            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();

            if ($scholar) {
                // Find the highschool_acad_details using the scholar_id
                $highschoolAcadDetails = HighschoolAcadDetails::where('scholar_id', $scholar->id)->first();
            
                if ($highschoolAcadDetails) {
                    // HighschoolAcadDetails found, return as a resource
                    return new HighschoolAcadDetailResource($highschoolAcadDetails);
                } else {
                    // HighschoolAcadDetails not found for the authenticated user
                    return response()->json(['message' => 'HighschoolAcadDetails not found for the authenticated user'], Response::HTTP_NOT_FOUND);
                }
            } else {
                // Scholar profile not found for the authenticated user
                return response()->json(['message' => 'Scholar profile not found for the authenticated user'], Response::HTTP_NOT_FOUND);
            }
           
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in scholarProfile: ' . $e->getMessage());

            return response()->json(['message' => 'Error processing scholar profile'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


}
