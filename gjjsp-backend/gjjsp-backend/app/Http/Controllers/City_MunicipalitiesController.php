<?php

namespace App\Http\Controllers;

use App\Http\Resources\City_MunicipalityResource;
use App\Http\Resources\City_MunicipalityCollection;
use App\Models\City_Municipalities;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class City_MunicipalitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new City_MunicipalityCollection(City_Municipalities::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $city_Municipalities = City_Municipalities::create($request->only([
            'city_municipality_name',
            'province_id',
        ]));

        return new City_MunicipalityResource($city_Municipalities);
    }

    /**
     * Display the specified resource.
     */
    public function show(City_Municipalities $city_Municipalities)
    {
        return new City_MunicipalityResource($city_Municipalities);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City_Municipalities $city_Municipalities, $id)
    {
        $city_Municipalities = City_Municipalities::find($id);
        $city_Municipalities->update($request->all());
        return new City_MunicipalityResource($city_Municipalities);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City_Municipalities $city_Municipalities)
    {
        //
    }
}
