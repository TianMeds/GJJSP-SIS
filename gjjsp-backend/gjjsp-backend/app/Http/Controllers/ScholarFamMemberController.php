<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarFamMemberCollection;
use App\Http\Resources\ScholarFamMemberResource;
use App\Models\ScholarFamMember;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ScholarFamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ScholarFamMemberCollection(ScholarFamMember::all()), Response::HTTP_OK);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ScholarFamMember $scholarFamMember)
    {
        return new ScholarFamMemberResource($scholarFamMember);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScholarFamMember $id)
    {
        try {
            $userId = Auth::id();
    
            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();
    
            if ($scholar) {
    
                $scholarFamMem = ScholarFamMember::where('scholar_id', $scholar->id)->first();
    
                if ($scholarFamMem) {
                    $scholarFamMem->update($request->only([
                        'father_name',
                        'mother_name',
                        'relation_to_scholar',
                        'fam_mem_name',
                        'occupation',
                        'income',
                        'fam_mem_mobile_num',
                    ]));
                    return new ScholarFamMemberResource($scholarFamMem);
                } else {
                    return response()->json(['message' => 'Scholar Family Information not found'], Response::HTTP_NOT_FOUND);
                }
            }
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in updateScholarProfile: ' . $e->getMessage());
    
            return response([
                'status' => false,
                'message' => 'An error occurred while updating Scholar Family Information',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    
        return response([
            'status' => false,
            'message' => 'Scholar Family Information not found',
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScholarFamMember $scholarFamMember)
    {
        //
    }

    public function getScholarFam()
    {
        try {
            // Retrieve the authenticated user's ID
            $userId = Auth::id();

            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();

            if ($scholar) {
                // Find the scholar_fam_member using the scholar_id
                $scholarFamMem = ScholarFamMember::where('scholar_id', $scholar->id)->first();
            
                if ($scholarFamMem) {
                    // ScholarFamMember found, return as a resource
                    return new ScholarFamMemberResource($scholarFamMem);
                } else {
                    // ScholarFamMember not found for the authenticated user
                    return response()->json(['message' => 'ScholarFamMember not found for the authenticated user'], Response::HTTP_NOT_FOUND);
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
