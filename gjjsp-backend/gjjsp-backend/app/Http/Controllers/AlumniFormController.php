<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlumniFormResource;
use App\Http\Resources\AlumniFormCollection;
use App\Models\AlumniForm;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        //
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
    public function update(Request $request, AlumniForm $alumniForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlumniForm $alumniForm)
    {
        //
    }
}
