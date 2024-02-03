<?php

namespace App\Http\Controllers;

use App\Http\Resources\GraduatingFormResource;
use App\Http\Resources\GraduatingFormCollection;
use App\Models\GraduatingForm;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GraduatingFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new GraduatingFormCollection(GraduatingForm::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $graduatingForm = GraduatingForm::create($request->only([
                'user_id', 'future_company_name', 'future_company_location', 'future_position', 'meeting_benefactor_sched'
            ]));
            
            return new GraduatingFormResource($graduatingForm);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error in creating graduating form',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GraduatingForm $graduatingForm)
    {
        return new GraduatingFormResource($graduatingForm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GraduatingForm $graduatingForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GraduatingForm $graduatingForm)
    {
        //
    }
}
