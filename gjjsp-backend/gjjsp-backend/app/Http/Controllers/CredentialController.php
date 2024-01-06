<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CredentialController extends Controller
{
    public function verify($user_id, Request $request) {
        if (!$request->hasValidSignature()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid/Expired url provided',
                'method' => 'GET',
            ], 401);
        }
        else {
            $user = User::findOrFail($user_id);
            $user->user_status = 'Active';
            $user->save();
            return response()->json([
                'status' => true,
                'message' => 'User has been verified',
                'method' => 'GET',
            ], 200);
        }
    }
}
