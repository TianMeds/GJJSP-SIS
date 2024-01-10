<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarshipCategCollection;
use App\Http\Resources\ScholarshipCategResource;
use App\Models\ScholarshipCateg;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScholarshipCategController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ScholarshipCategCollection(ScholarshipCateg::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scholarshipCateg = ScholarshipCateg::create($request->only([
            'scholarship_categ_name',
            'alias',
            'benefactor',
            'scholarship_categ_status',
        ]));
        
        return new ScholarshipCategResource($scholarshipCateg);
    }

    /**
     * Display the specified resource.
     */
    public function show(ScholarshipCateg $scholarshipCateg)
    {
        return new ScholarshipCategResource($scholarshipCateg);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScholarshipCateg $scholarshipCateg, $id)
    {
        $scholarshipCateg = ScholarshipCateg::find($id);
        $scholarshipCateg->update($request->all());
        return new ScholarshipCategResource($scholarshipCateg);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScholarshipCateg $scholarshipCateg, $id)
    {
        $deleted = ScholarshipCateg::destroy($id);

        if ($deleted === 0) {
            return response()->json(['message' => 'User not found or already deleted'], 404);
        } elseif ($deleted === null) {
            return response()->json(['message' => 'Error deleting user'], 500);
        }
    
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
