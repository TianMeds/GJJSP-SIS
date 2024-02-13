<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchoolCollection;
use App\Http\Resources\SchoolResource;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new SchoolCollection
        (School::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $school = School::create($request->only([
            'school_name',
            'school_type',
            'school_address',
        ]));

        return new SchoolResource($school);
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return new SchoolResource($school);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school, $id)
    {
        $school = School::find($id);
        $school->update($request->only([
            'school_name',
            'school_type',
            'school_address'
        ]));
        return new SchoolResource($school);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school, $id)
    {
        $deleted = School::destroy($id);

        if($deleted === 0) {
            return response()->json([
                'message' => 'School not found'
            ], 404);
        }
        elseif ($deleted === null) {
            return response()->json([
                'message' => 'Error deleting school'
            ], 500);
        }

        return response()->json([
            'message' => 'School deleted'
        ], 200);
    }

    public function restoreSchool(School $school, $id)
    {
        $restored = School::withTrashed()->where('id', $id)->restore();

        if ($restored === 0) {
            return response()->json(['message' => 'School not found or already restored'], 404);
        } elseif ($restored === null) {
            return response()->json(['message' => 'Error restoring School'], 500);
        }
    
        return response()->json(['message' => 'School restored successfully'], 200);
    }
}
