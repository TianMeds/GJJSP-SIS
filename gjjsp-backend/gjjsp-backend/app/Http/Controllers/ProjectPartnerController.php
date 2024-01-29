<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectPartnerCollection;
use App\Http\Resources\ProjectPartnerResource;
use App\Models\ProjectPartner;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $projectPartner = ProjectPartner::create($request->only([
            'scholarship_categ_id',
            'project_partner_name',
            'project_partner_mobile_num',
            'school_id',
        ]));

        return new ProjectPartnerResource($projectPartner);
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
        $projectPartner = ProjectPartner::find($id);
        $projectPartner->update($request->all());
        return new ProjectPartnerResource($projectPartner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectPartner $projectPartner, $id)
    {
        $deleted = ProjectPartner::destroy($id);
        
        if($deleted === 0) {
            return response()->json(['message' => 'Project Partner not found'], 404);
        } elseif ($deleted === null) {
           return response()->json(['message' => 'Error deleting project partner'], 500);
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
