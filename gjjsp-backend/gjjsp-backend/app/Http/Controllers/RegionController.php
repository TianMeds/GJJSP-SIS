<?php

namespace App\Http\Controllers;

use App\Http\Resources\RegionResource;
use App\Http\Resources\RegionCollection;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new RegionCollection(Region::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $region = Region::create($request->only([
            'region_name',
        ]));

        return new RegionResource($region);
    }

    /**
     * Display the specified resource.
     */
    public function show(Region $region)
    {
        return new RegionResource($region);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Region $region, $id)
    {
        $region = Region::find($id);
        $region->update($request->all());
        return new RegionResource($region);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Region $region)
    {
        //
    }
}
