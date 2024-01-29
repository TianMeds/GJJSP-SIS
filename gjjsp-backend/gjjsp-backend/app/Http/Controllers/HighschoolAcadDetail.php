<?php

namespace App\Http\Controllers;

use App\Http\Resources\HighschoolAcadDetailResource;
use App\Http\Resources\HighschoolAcadDetailCollection;
use App\Models\HighschoolAcadDetails;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HighschoolAcadDetail extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new HighschoolAcadDetailCollection
        (HighschoolAcadDetail::all()), Response::HTTP_OK);
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
        $highschoolAcadDetails = HighschoolAcadDetails::find($id);
        $highschoolAcadDetails->update($request->only([
            'track_name',
            'gwa_school_yr_graduated',
            'school_name',
            'school_address',
            'school_yr_graduated_hs',
        ]));

        return new HighschoolAcadDetailResource($highschoolAcadDetails);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HighschoolAcadDetails $highschoolAcadDetails)
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
}
