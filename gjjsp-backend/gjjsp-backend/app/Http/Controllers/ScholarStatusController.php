<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarStatusCollection;
use App\Http\Resources\ScholarStatusResource;
use App\Models\ScholarStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScholarStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ScholarStatusCollection(ScholarStatus::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scholarStatus = ScholarStatus::create($request->only([
            'scholar_status_name',
            'scholar_status_description'
        ]));
        return new ScholarStatusResource($scholarStatus);
    }

    /**
     * Display the specified resource.
     */
    public function show(ScholarStatus $scholarStatus)
    {
        return new ScholarStatusResource($scholarStatus);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScholarStatus $scholarStatus)
    {
        $scholarStatus->update($request->all());
        return new ScholarStatusResource($scholarStatus);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScholarStatus $scholarStatus, $id)
    {
        $deleted = ScholarStatus::destroy($id);

        if($deleted === 0) {
            return response()->json(['message' => 'Scholar status not found'], 404);
        }
        elseif($deleted === null) {
            return response()->json(['message' => 'Error occurred'], 500);
        }
        return response()->json(['message' => 'Scholar status deleted'], 200);
    }
}
