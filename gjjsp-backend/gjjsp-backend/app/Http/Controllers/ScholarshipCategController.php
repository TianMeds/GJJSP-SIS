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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ScholarshipCateg $scholarshipCateg)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScholarshipCateg $scholarshipCateg)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScholarshipCateg $scholarshipCateg)
    {
        //
    }
}
