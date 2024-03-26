<?php

namespace App\Http\Controllers;

use App\Http\Resources\RemarksResource;
use App\Http\Resources\RemarksCollection;
use App\Models\Remarks;
use App\Models\Scholar;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RemarksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new RemarksCollection
        (Remarks::all()), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Remarks $remarks)
    {
        return new RemarksResource($remarks);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Remarks $remarks, $id)
{
    try {
        $userId = Auth::id();

        // Find the scholar profile that belongs to the authenticated user
        $scholar = Scholar::where('user_id', $userId)->first();

        if ($scholar) {

            // Find the remarks associated with the renewal document
            $remarks = Remarks::where('renewal_document_id', $id)->first();

            if ($remarks) {
                $remarks->update($request->only([
                    'remarks_message',
                ]));

                return new RemarksResource($remarks);
            }
        }
    } catch (\Exception $e) {
       return response([
        'status' => false,
        'message' => 'Error updating remarks. Please try again.',
        'error' => $e->getMessage(),
       ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Remarks $remarks)
    {
        //
    }
}
