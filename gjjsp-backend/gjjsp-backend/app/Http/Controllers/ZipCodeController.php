<?php

namespace App\Http\Controllers;

use App\Http\Resources\ZipCodeResource;
use App\Http\Resources\ZipCodeCollection;
use App\Models\ZipCode;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ZipCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ZipCodeCollection(ZipCode::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $zipCode = ZipCode::create($request->only([
            'zip_code_value'
        ]));

        return new ZipCodeResource($zipCode);
    }

    /**
     * Display the specified resource.
     */
    public function show(ZipCode $zipCode)
    {
        return new ZipCodeResource($zipCode);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ZipCode $zipCode, $id)
    {
        $zipCode = ZipCode::find($id);
        $zipCode->update($request->all());
        return new ZipCodeResource($zipCode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ZipCode $zipCode)
    {
        //
    }
}
