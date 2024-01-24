<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProvinceResource;
use App\Http\Resources\ProvinceCollection;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProvinceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ProvinceCollection(Province::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $province = Province::create($request->only([
            'province_name',
            'region_id',
        ]));

        return new ProvinceResource($province);
    }

    /**
     * Display the specified resource.
     */
    public function show(Province $province)
    {
        return new ProvinceResource($province);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Province $province, $id)
    {
        $province = Province::find($id);
        $province->update($request->all());
        return new ProvinceResource($province);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Province $province)
    {
        //
    }
}
