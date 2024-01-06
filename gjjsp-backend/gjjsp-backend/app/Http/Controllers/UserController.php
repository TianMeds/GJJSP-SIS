<?php

namespace App\Http\Controllers;

use App\Mail\UserUpdate;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new UserCollection(User::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = User::create($request->only([
                'first_name', 'middle_name', 'last_name', 'user_mobile_num',
                'email_address', 'password', 'role_id', 'user_status',
            ]));
            
            return new UserResource($user);
        } 
        catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) { // MySQL error code for duplicate entry
                return response()->json(['message' => 'Email already exists'], 409); // 409 Conflict
            }
            
            // Handle other exceptions or errors
            return response()->json(['message' => 'Error occurred'], 500); // 500 Internal Server Error
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, $id)
    {
        $user = User::find($id);
        $user->update($request->all());

        if($user) {
            try{
                Mail::mailer('smtp')->to($user->email_address)->send(new UserUpdate($user));
                return response()->json([
                    'status' => true,
                    'message' => 'User has been updated',
                    'method' => 'POST',
                ], 200);
            }
            catch (\Exception $err){
                $user->delete();
                return response()->json([
                    'status' => false,
                    'message' => 'Could not send update Notification',
                    'method' => 'POST',
                ], 500);
            }
        }
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, $id)
    {
        $deleted = User::destroy($id);

        if ($deleted === 0) {
            return response()->json(['message' => 'User not found or already deleted'], 404);
        } elseif ($deleted === null) {
            return response()->json(['message' => 'Error deleting user'], 500);
        }
    
        return response()->json(['message' => 'User deleted successfully'], 200);

    }
    // public function search(Request $request, $first_name)
    // {
    //     $user = User::where('first_name', 'like', '%' . $first_name . '%')->get();
    //     return UserResource::collection($user);
    // }
}
