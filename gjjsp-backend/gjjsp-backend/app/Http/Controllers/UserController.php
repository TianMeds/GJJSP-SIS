<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $user = User::create($request->only([
            'first_name','middle_name','last_name','user_mobile_num',
            'email_address','password','role_id','user_status',
        ]));
        return new UserResource($user);
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
    public function update(Request $request, User $user)
    {
        $user->update($request->only([
            'first_name','middle_name','last_name','user_mobile_num',
            'email_address','password','role_id','user_status',
        ]));
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
    public function search(Request $request, $first_name)
    {
        $user = User::where('first_name', 'like', '%' . $first_name . '%')->get();
        return UserResource::collection($user);
    }
}
