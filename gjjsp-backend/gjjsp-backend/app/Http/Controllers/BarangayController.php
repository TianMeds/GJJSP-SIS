<?php

namespace App\Http\Controllers;

use App\Http\Resources\BarangayResource;
use App\Http\Resources\BarangayCollection;
use App\Models\Barangay;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BarangayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new BarangayCollection
        (Barangay::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $barangay = Barangay::create($request->only([
            'barangay_name',
            'city_municipality_id',
            'zip_code_id'
        ]));

        return new BarangayResource($barangay);
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        return new BarangayResource($barangay);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barangay $barangay, $id)
    {
        $barangay = Barangay::find($id);
        $barangay->update($request->all());
        return new BarangayResource($barangay);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        //
    }
}
