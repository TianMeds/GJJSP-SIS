<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\ScholarResource;
use App\Http\Resources\ScholarCollection;
use App\Http\Resources;
use App\Models\Scholar;
use App\Models\User;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ScholarUpdated;
use App\Mail\ScholarDeleted;
use App\Mail\ScholarProfileUpdated;
use App\Mail\ScholarProfileDeleted;
use App\Mail\RenewalDocumentReminder;
use App\Mail\GraduatingDocumentReminder;

class ScholarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scholars = Scholar::with('user', 'scholarStatus', 'scholarship_categs', 'renewal_documents')
            ->whereHas('user', function ($query) {
                $query->whereNull('deleted_at');
            })
            ->get();

        return response()->json(new ScholarCollection($scholars), Response::HTTP_OK);
    }

    /**
     * Get the Total of Scholars
     */

    public function totalScholars()
    {
        $totalScholars = Scholar::count();

        return response()->json(['total_scholars' => $totalScholars], Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scholar = Scholar::create($request->only([
            'user_id','scholarship_categ_id','scholar_photo_filepath','gender','religion','birthdate','birthplace','civil_status','num_fam_mem','school_yr_started',
            'school_yr_graduated','school_id','program','home_visit_sched','home_address_id',
            'fb_account',
        ]));
        return new ScholarResource($scholar);
    }


    /**
     * Display the specified resource.
     */
    public function show(Scholar $scholar)
    {
        $scholarResource = new ScholarResource($scholar);

        // Include the ScholarStatus data
        $scholarResource->additional([
            'scholar_status' => [
                'id' => $scholar->scholar_status_id,
                'name' => $scholar->scholar_status_name,
            ],
            'user' => [
                'id' => $scholar->user_id,
                'first_name' => $scholar->user_first_name,
                'last_name' => $scholar->user_last_name,
                'middle_name' => $scholar->user_middle_name,
                'email_address' => $scholar->user_email_address,
                'user_mobile_num' => $scholar->user_mobile_num,
            ],
            'scholarship_categs' => [
                'id' => $scholar->scholarship_categ_id,
                'scholarship_categ_name' => $scholar->scholarship_categ_name,
            ],
            'renewal_documents' => [
                'id' => $scholar->renewal_document_id,
                'submission_status' => $scholar->submission_status,
            ]
            
        ]);

        return $scholarResource;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scholar $scholar)
    {
        $scholar->update($request->only([
            'scholar_photo_filepath','gender',
            'religion','birthdate','birthplace','civil_status','num_fam_mem','school_yr_started',
            'school_yr_graduated','school_id','program','home_visit_sched','home_address_id',
            'fb_account',
        ]));

        $users = User::whereIn('role_id', [1, 2])->get();

        // Send email notification to each user
        foreach ($users as $user) {
            Mail::to($user->email_address)->send(new ScholarUpdated($user, $scholar));
        }

        return new ScholarResource($scholar);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id)
    {
        try {
            $scholar = Scholar::where('user_id', $user_id)->first();
    
            if (!$scholar) {
                return response()->json(['message' => 'Scholar not found or already deleted'], 404);
            }
    
            $scholar->delete();
    
            return response()->json(['message' => 'Scholar deleted successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Error in destroy method: ' . $e->getMessage());
    
            return response()->json([
                'status' => false,
                'message' => 'Error deleting scholar',
                'method' => 'DELETE'
            ], 500);
        }
    }
    
    public function restoreScholar($id)
    {
        $scholar = Scholar::onlyTrashed()->findOrFail($id);
        $scholar->restore();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function scholarProfile()
    {
        try {
            // Retrieve the authenticated user's ID
            $userId = Auth::id();

            // Find the scholar profile that belongs to the authenticated user
            $scholar = Scholar::where('user_id', $userId)->first();

            if ($scholar) {
                // Scholar profile found, return as a resource
                return new ScholarResource($scholar);
            } else {
                // Scholar profile not found for the authenticated user
                return response()->json(['message' => 'Scholar profile not found for the authenticated user'], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in scholarProfile: ' . $e->getMessage());

            return response()->json(['message' => 'Error processing scholar profile'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function sendReminders(Request $request, $id)
    {
        // Find the scholar by its ID
        $scholar = Scholar::find($id);

        // Check if the scholar exists
        if (!$scholar) {
            return response()->json(['message' => 'Scholar not found'], Response::HTTP_NOT_FOUND);
        }

        // Find the user associated with the scholar
        $user = $scholar->user;

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Send renewal document reminder email
        Mail::to($user->email_address)->send(new RenewalDocumentReminder($scholar, $user));

        return response()->json(['message' => 'Renewal Document Reminder sent successfully'], Response::HTTP_OK);
    }

    public function graduatingReminders(Request $request, $id)
    {
        // Find the renewal document by its ID
        $scholar = Scholar::find($id);

        // Check if the renewal document exists
        if (!$scholar) {
            return response()->json(['message' => 'Scholar Graduating Document not found'], Response::HTTP_NOT_FOUND);
        }

        // Find the user associated with the scholar
        $user = $scholar->user;

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Send renewal document reminder email
        Mail::to($user->email_address)->send(new GraduatingDocumentReminder($scholar, $user));

        return response()->json(['message' => 'Graduating Document Reminder sent successfully'], Response::HTTP_OK);
    }



    public function updateScholarProfile(Request $request, $id)
    {
        try {
            // Retrieve the authenticated user's ID
            $userId = Auth::id();
    
            // Find the scholar by ID and make sure it belongs to the authenticated user
            $scholar = Scholar::where('id', $id)
                ->where('user_id', $userId)
                ->firstOrFail();
    
            // Get the original data of the scholar before the update
            $originalScholarData = $scholar->getOriginal();
    
            // Update the scholar with the request data
            $scholar->update($request->only([
                'gender', 'religion', 'birthdate', 'birthplace', 'civil_status', 'num_fam_mem',
                'school_yr_started', 'school_yr_graduated', 'school_id', 'program',
                'home_visit_sched', 'fb_account', 'street', 'zip_code', 'region_name', 'province_name',
                'cities_municipalities_name', 'barangay_name',
            ]));
    
            $updatedFields = [];
            foreach ($request->all() as $key => $value) {
                if (array_key_exists($key, $originalScholarData) && $originalScholarData[$key] !== $value) {
                    $updatedFields[$key] = $value;
                }
            }
    
            $users = User::whereIn('role_id', [1, 2])->get();
    
            // Send email notification to each user
            foreach ($users as $user) {
                Mail::to($user->email_address)->send(new ScholarProfileUpdated($user, $updatedFields, $scholar));
            }
    
            // Return the updated scholar as a resource
            return new ScholarResource($scholar);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in updateScholarProfile: ' . $e->getMessage());
    
            return response()->json(['message' =>  $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function updateOtherScholarProfile(Request $request, $user_id)
    {
        try {
            // Find the scholar by ID
            $scholar = Scholar::where('user_id', $user_id)->firstOrFail();

            // Check if school_id is 'other'
            if ($request->has('school_id') && $request->input('school_id') === 'other') {
                // Create a new school entry
                $school = $this->storeSchool($request);
                // Set the school_id of the scholar to the newly created school's ID
                $request->merge(['school_id' => $school->id]);
            }

            // Update the scholar with the request data
            $scholar->update($request->only([
                'scholarship_categ_id', 'project_partner_id', 'scholar_status_id', 'school_id',
            ]));

            // Return the updated scholar as a resource
            return new ScholarResource($scholar);
        } catch (\Exception $e) {
            // Log the exception for further investigation
            \Log::error('Error in updateOtherScholarProfile: ' . $e->getMessage());
    
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'method' => 'PUT'
            ], Response::HTTP_NOT_FOUND);
        } 
    }

    // public function updateSubmissionStatus(Request $request, $scholarId, $schoolYear, $term)
    // {
    //     // Find the scholar by id
    //     $scholar = Scholar::findOrFail($scholarId);
    
    //     // Check if the scholar has renewing data for the specified school year and term
    //     if (!isset($scholar->renewing[$schoolYear]) || !isset($scholar->renewing[$schoolYear][$term]) || empty($scholar->renewing[$schoolYear][$term])) {
    //         return response()->json(['message' => 'Renewal data not found for the specified school year and term'], 404);
    //     }
    
    //     // Update the submission status
    //     $submissionStatus = $request->input('submission_status');
    //     $scholar->renewing[$schoolYear][$term][0]['submission_status'] = $submissionStatus;
    
    //     // Save the changes
    //     $scholar->save();
    
    //     return response()->json(['message' => 'Submission status updated successfully'], 200);
    // }

    // public function updateSubmissionStatus(Request $request, $id) 
    // {
    //     try {
    //         // Find the Renewal Document object by ID
    //         $scholar = Scholar::findOrFail($id);
            
    //         // Get the ID of the logged-in user
    //         $loggedInUserId = Auth::id();

    //         // Update the Renewal Document Data with this request
    //         $scholar->update([
    //             'submission_status' => $request->input('submission_status'),
    //             'updated_by' => $loggedInUserId, // Set the updated_by field with the ID of the logged-in user
    //         ]);

    //         // Return a success response
    //         return new ScholarResource($scholar);
    //     } catch (\Exception $e) {
    //         // Return an error response
    //         return response()->json([
    //             'message' => 'Error updating Renewal Document',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    


    public function storeSchool(Request $request)
    {
         // Create a new school entry
        $school = School::create($request->only([
            'school_name',
            'school_type',
            'school_address',
        ]));

        return $school;
    }

    public function storeScholarProfile(Request $request)
    {
        $scholar = Scholar::create($request->only([
            'user_id', 'scholarship_categ_id', 'scholar_photo_filepath', 'project_partner_id', 'gender', 'religion', 'birthdate', 'birthplace', 'civil_status', 'num_fam_mem', 'school_yr_started', 'school_yr_graduated', 'school_id', 'program', 'home_visit_sched', 'home_address_id', 'fb_account', 'scholar_status_id'
        ]));
        return new ScholarResource($scholar);
    }
    // public function search(Request $request, $user_id)
    // {
    //     $scholars = Scholar::where('user_id', '=', $user_id)->get();
    //     return ScholarResource::collection($scholars);
    // }
}
