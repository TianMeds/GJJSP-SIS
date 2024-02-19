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
use App\Mail\ScholarshipRestored;

class ScholarshipCategController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        // Check if the user's role_id is 1
        if ($user->role_id == 1) {
            // If role_id is 1, return all data including soft deleted
            return response()->json(new ScholarshipCategCollection(ScholarshipCateg::withTrashed()->get()), Response::HTTP_OK);
        } else {
            return response()->json(new ScholarshipCategCollection(ScholarshipCateg::all()), Response::HTTP_OK);
        }
       
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
        $scholarshipCateg = ScholarshipCateg::withTrashed()->find($id);

        if (!$scholarshipCateg) {
            return response()->json(['message' => 'Scholarship Category not found'], 404);
        }
    
        // Get the name of the scholarship category before restoration
        $restoredName = $scholarshipCateg->scholarship_categ_name;
    
        // Restore the scholarship category
        $restored = $scholarshipCateg->restore();
    
        if (!$restored) {
            return response()->json(['message' => 'Error restoring Scholarship Category'], 500);
        }
    
        // Send email notification
        try {
            // Retrieve users who need to be notified
            $users = User::whereIn('role_id', [1, 2])->get();
            
            // Send email to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new ScholarshipRestored($user, $restoredName, $scholarshipCateg));
            }
        } catch (\Exception $e) {
            // Log or handle the error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
        return response()->json(['message' => 'Scholarship Category restored successfully', 'restored_name' => $restoredName], 200);
    }
}
