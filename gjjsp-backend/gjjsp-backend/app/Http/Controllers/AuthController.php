<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Scholar;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function register(Request $request){
        $fields = $request->validate([
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'user_mobile_num' => 'required|string',
            'email_address' => 'required|string|unique:users,email_address',
            'password' => 'required|string',
            'role_id' => 'required|integer',
            'user_status' => 'required|string',
            'gender' => 'required|string',
            'religion' => 'required|string',
            'birthdate' => 'required|date',
            'birthplace' => 'required|string',
            'civil_status' => 'required|string',
            'num_fam_mem' => 'required|integer',
            'school_yr_started' => 'required|date_format:Y',
            'school_yr_graduated' => 'required|date_format:Y',
            'school_id' => 'required|integer',
            'program' => 'required|string',
            'home_visit_sched' => 'required|date',
            'home_address_id' => 'required|integer',
            'fb_account' => 'required|string',
            'scholar_status_id' => 'required|integer',
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'middle_name' => $fields['middle_name'],
            'last_name' => $fields['last_name'],
            'user_mobile_num' => $fields['user_mobile_num'],
            'email_address' => $fields['email_address'],
            'password' => bcrypt($fields['password']),
            'role_id' => $fields['role_id'],
            'user_status' => $fields['user_status'],
            'gender' => $fields['gender'],
            'religion' => $fields['religion'],
            'birthdate' => $fields['birthdate'],
            'birthplace' => $fields['birthplace'],
            'civil_status' => $fields['civil_status'],
            'num_fam_mem' => $fields['num_fam_mem'],
            'school_yr_started' => $fields['school_yr_started'],
            'school_yr_graduated' => $fields['school_yr_graduated'],
            'school_id' => $fields['school_id'],
            'program' => $fields['program'],
            'home_visit_sched' => $fields['home_visit_sched'],
            'home_address_id' => $fields['home_address_id'],
            'fb_account' => $fields['fb_account'],
            'scholar_status_id' => $fields['scholar_status_id'],
        ]);

        $token = $user->createToken('mytoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    public function login(Request $request){
        $fields = $request->validate([
            'email_address' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email_address', $fields['email_address'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $token = $user->createToken('mytoken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }
    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
}
