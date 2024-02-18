<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarshipCategCollection;
use App\Http\Resources\ScholarshipCategResource;
use App\Models\User;
use App\Models\ScholarshipCateg;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\CategoryAdded;
use App\Mail\CategoryUpdated;
use App\Mail\CategoryDeleted;

class ScholarshipCategController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new ScholarshipCategCollection(ScholarshipCateg::all()), Response::HTTP_OK);
    }

    /**
     * Total of Scholarship Categories
     */

    public function totalScholarships()
    {
        $totalScholarshipCateg = ScholarshipCateg::count();

        return response()->json(['total_scholarship_categ' => $totalScholarshipCateg], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scholarshipCateg = ScholarshipCateg::create($request->only([
            'scholarship_categ_name',
            'alias',
            'benefactor',
            'scholarship_categ_status',
        ]));
    
        // Retrieve users with roles 1 and 2
        $users = User::whereIn('role_id', [1, 2])->get();
    
        try {
            // Send email to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new CategoryAdded($user, $scholarshipCateg));
            }
        } catch (\Exception $e) {
            // Log or handle the error
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    
        return new ScholarshipCategResource($scholarshipCateg);
    }
    /**
     * Display the specified resource.
     */
    public function show(ScholarshipCateg $scholarshipCateg)
    {
        return new ScholarshipCategResource($scholarshipCateg);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ScholarshipCateg $scholarshipCateg, $id)
    {
        $scholarshipCateg = ScholarshipCateg::find($id);

        $previousName = $scholarshipCateg->scholarship_categ_name;

        $scholarshipCateg->update($request->all());
        
         // Retrieve users with roles 1 and 2
        $users = User::whereIn('role_id', [1, 2])->get();

        try {
            // Send email to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new CategoryUpdated($user, $previousName, $scholarshipCateg));
            }
        } catch (\Exception $e) {
            // Log or handle the error
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
        return new ScholarshipCategResource($scholarshipCateg);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScholarshipCateg $scholarshipCateg, $id)
    {
        $scholarshipCateg = ScholarshipCateg::find($id);

        $deletedName = $scholarshipCateg->scholarship_categ_name;
        
        $deleted = ScholarshipCateg::destroy($id);

        if ($deleted === 0) {
            return response()->json(['message' => 'Category not found or already deleted'], 404);
        } elseif ($deleted === null) {
            return response()->json(['message' => 'Error deleting category'], 500);
        }

        $users = User::whereIn('role_id', [1, 2])->get();

        try {
            // Send email to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new CategoryDeleted($user, $deletedName, $scholarshipCateg));
            }
        } catch (\Exception $e) {
            // Log or handle the error
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }


    public function restoreScholarship(ScholarshipCateg $scholarshipCateg, $id)
    {
        $restored = ScholarshipCateg::withTrashed()->where('id', $id)->restore();

        if ($restored === 0) {
            return response()->json(['message' => 'Scholarship Category not found or already restored'], 404);
        } elseif ($restored === null) {
            return response()->json(['message' => 'Error restoring Scholarship Category '], 500);
        }
    
        return response()->json(['message' => 'Scholarship Category  restored successfully'], 200);
    }
}
