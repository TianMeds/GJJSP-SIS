<?php

namespace App\Http\Controllers;


use App\Http\Resources\ScholarResource;
use App\Http\Resources\ScholarCollection;
use App\Http\Resources;
use App\Models\Scholar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScholarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ScholarCollection(Scholar::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scholar = Scholar::create($request->only([
            'user_id','scholarship_type_id','project_partner_id','scholar_photo_filepath','gender',
            'religion','birthdate','birthplace','civil_status','num_fam_mem','school_yr_started',
            'school_yr_graduated','school_id','program','home_visit_sched','home_address_id',
            'fb_account','scholar_status_id',
        ]));
        return new ScholarResource($scholar);
    }

    /**
     * Display the specified resource.
     */
    public function show(Scholar $scholar)
    {
        return new ScholarResource($scholar);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scholar $scholar)
    {
        $scholar->update($request->only([
            'user_id','scholarship_type_id','project_partner_id','scholar_photo_filepath','gender',
            'religion','birthdate','birthplace','civil_status','num_fam_mem','school_yr_started',
            'school_yr_graduated','school_id','program','home_visit_sched','home_address_id',
            'fb_account','scholar_status_id',
        ]));
        return new ScholarResource($scholar);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scholar $scholar)
    {
        $scholar->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
    public function search(Request $request, $user_id)
    {
        $scholars = Scholar::where('user_id', '=', $user_id)->get();
        return ScholarResource::collection($scholars);
    }
}
