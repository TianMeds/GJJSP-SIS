<?php

namespace App\Http\Controllers;

use App\Http\Resources\UndergradAcadDetailsResource;
use App\Http\Resources\UndergradAcadDetailsCollection;
use App\Models\UndergradAcadDetails;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UndergradAcadDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new UndergradAcadDetailsCollection(UndergradAcadDetails::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $undergradAcadDetails = UndergradAcadDetails::create($request->only([
            'undergrad_sy',
            'current_yr_level',
            'gwa_current_school_yr',
        ]));
        return new UndergradAcadDetailsResource($undergradAcadDetails);
    }

    /**
     * Display the specified resource.
     */
    public function show(UndergradAcadDetails $undergradAcadDetails)
    {
        return new UndergradAcadDetailsResource($undergradAcadDetails);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UndergradAcadDetails $undergradAcadDetails, $id)
    {
        try {
            $userId = Auth::id();
    
            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();
    
            if ($scholar) {
    
                $undergradAcadDetails = UndergradAcadDetails::where('scholar_id', $scholar->id)->first();
    
                if ($undergradAcadDetails) {
                    $undergradAcadDetails->update($request->only([
                        'undergrad_sy',
                        'current_yr_level',
                        'gwa_current_school_yr',
                    ]));
    
                    return new UndergradAcadDetailsResource($undergradAcadDetails);
                }
    
                return response()->json(['message' => 'Undergrad Details not found!'], Response::HTTP_NOT_FOUND);
            }
        } 
        catch (QueryException $e) {
            return response([
                'status' => false,
                'message' => 'Error updating Undergrad Details!',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UndergradAcadDetails $undergradAcadDetails, $id)
    {
        $deleted = UndergradAcadDetails::destroy($id);

        if($deleted === 0) {
            return response()->json(['message' => 'Undergrad Details not found!'], Response::HTTP_NOT_FOUND);
        }
        elseif($deleted === null) {
            return response()->json(['message' => 'Error deleting Undergrad Details!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Undergrad Details deleted!'], Response::HTTP_OK);
    }


    public function restoreUndergradAcadDetail($id)
    {
        $restored = UndergradAcadDetails::withTrashed()->where('id', $id)->restore();

        if($restored === 0) {
            return response()->json(['message' => 'Undergrad Details not found!'], Response::HTTP_NOT_FOUND);
        }
        elseif($restored === null) {
            return response()->json(['message' => 'Error restoring Undergrad Details!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Undergrad Details restored!'], Response::HTTP_OK);
    }


    public function getUndergradAcadDetail()
    {
        try {
            $userId = Auth::id(); // Retrieve the authenticated user's I

            $scholar = Scholar::where('user_id', $userId)->first();

            if ($scholar) {
                $undergradAcadDetails = UndergradAcadDetails::where('scholar_id', $scholar->id)->first();

                if ($undergradAcadDetails) {
                    return new UndergradAcadDetailsResource($undergradAcadDetails);
                } else {
                    return response()->json(['message' => 'Undergrad Details not found!'], Response::HTTP_NOT_FOUND);
                }
            }
            else{
                return response()->json(['message' => 'Scholar not found!'], Response::HTTP_NOT_FOUND);
            
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing Undergrad Details!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
