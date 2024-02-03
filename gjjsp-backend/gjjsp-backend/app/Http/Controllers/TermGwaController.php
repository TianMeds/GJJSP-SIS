<?php

namespace App\Http\Controllers;

use App\Http\Resources\TermGwaResource;
use App\Http\Resources\TermGwaCollection;
use App\Models\TermGwa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TermGwaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new TermGwaCollection(TermGwa::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $termGwa = TermGwa::create($request->only([
                'gwa_value', 'gwa_remarks'
            ]));
            
            return new TermGwaResource($termGwa);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error in creating term GWA',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TermGwa $termGwa)
    {
        return new TermGwaResource($termGwa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TermGwa $termGwa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TermGwa $termGwa)
    {
        //
    }
}
