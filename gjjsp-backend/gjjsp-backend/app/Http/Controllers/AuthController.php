<?php

namespace App\Http\Controllers;
use App\Mail\UserCredential;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Scholar;
use App\Models\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
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
        ]);

        // Extract the password before hashing it - For sending Credential
        $plainPassword = $fields['password'];

        $user = User::create([
            'first_name' => $fields['first_name'],
            'middle_name' => $fields['middle_name'],
            'last_name' => $fields['last_name'],
            'user_mobile_num' => $fields['user_mobile_num'],
            'email_address' => $fields['email_address'],
            'password' => bcrypt($plainPassword),
            'role_id' => $fields['role_id'],
            'user_status' => $fields['user_status'],
        ]);
        
        if($user) {
            try{
                Mail::mailer('smtp')->to($user->email_address)->send(new UserCredential($user, $plainPassword));
                return response()->json([
                    'status' => true,
                    'message' => 'User has been added, credential will be sent to the given email',
                    'method' => 'POST',
                ], 200);
            }
            catch (\Exception $err){
                $user->delete();
                return response()->json([
                    'status' => false,
                    'message' => 'Could not send user credentials. Please try again ',
                    'method' => 'POST',
                ], 500);
            }
        } 

        return response()->json([
            'status' => false,
            'message' => 'Something went wrong',
            'method' => 'POST',
        ], 500);

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
                'status' => false,
                'message' => 'Incorrect Password',
                'method' => 'POST',
            ], 401);
        }

        $role = $user->role_id;

        $roles_name = [
            1 => 'Scholar Administrator',
            2 => 'Scholar Manager',
            3 => 'Scholar'
        ];

        $roleName = $roles_name[$role] ?? 'unknown';
        
        $remember_token = $user->createToken('remember_token', expiresAt: now()->addMinute(30))->plainTextToken;
        $expires_at = now()->addMinute(30)->format('Y-m-d H:i:s');
        $response = [
            'user' => $user,
            'roles_name' => $roleName,
            'remember_token' => $remember_token,
            'expires_at' => $expires_at
        ];
        return response($response, 201);
    }
    public function logout(Request $request){
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response([
            'status' => true,
            'message' => 'Successfully your logged Out',
            'method' => 'DELETE',
        ], 200);
    }

 
    /* public function refreshToken(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $request->user()->tokens()->delete(); // Revoke all user's tokens
    
        $remember_token = $request->user()->createToken('remember_token')->plainTextToken;
        $expiresAt = now()->addMinute(30)->format('Y-m-d H:i:s');
    
        return response()->json([
            'remember_token' => $remember_token,
            'expires_at' => $expiresAt
        ]);
    }
    */
}
