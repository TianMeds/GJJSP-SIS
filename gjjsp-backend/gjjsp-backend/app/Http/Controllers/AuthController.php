<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarResource;
use App\Http\Resources\ScholarCollection;
use App\Mail\UserCredential;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Scholar;
use App\Models\Role;
use App\Models\ScholarFamMember;
use App\Models\HighschoolAcadDetails;   
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
class AuthController extends Controller
{


    public function register(Request $request){
        $fields = $request->validate([
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|string',
            'user_mobile_num' => 'required|string',
            'email_address' => 'required|string|unique:users,email_address',
            'password' => 'required|string',
            'role_id' => 'required|integer',
            'user_status' => 'required|string',
        ]);

        // Extract the password before hashing it - For sending Credential
        $plainPassword = $fields['password'];
        $phoneNumber = $fields['user_mobile_num']; 

        $user = User::create([
            'first_name' => $fields['first_name'],
            'middle_name' => $fields['middle_name'],
            'last_name' => $fields['last_name'],
            'user_mobile_num' => $phoneNumber,
            'email_address' => $fields['email_address'],
            'password' => bcrypt($plainPassword),
            'role_id' => $fields['role_id'],
            'user_status' => $fields['user_status'],
        ]);


        if ($user->role_id === "3") {
            // Create Scholar profile separately
            $scholar = Scholar::create([
                'user_id' => $user->id,
            ]);

            // Create Scholar Family Member profile separately
            $scholarFamMember = ScholarFamMember::create([
                'scholar_id' => $scholar->id,
            ]);

            // Create Scholar Highschool Academic Details profile separately
            $highschoolAcadDetails = HighschoolAcadDetails::create([
                'scholar_id' => $scholar->id,
            ]);
        }

        
        if ($user) {

            try {
                Mail::mailer('smtp')->to($user->email_address)->send(new UserCredential($user, $plainPassword));

                // Sending SMS after user creation
                $basic = new \Vonage\Client\Credentials\Basic("53ea6fdd", "VG8vvjUb99KI5gZG");
                $client = new \Vonage\Client($basic);

                $message = 'Hello from GJJSP! Your account has been created successfully.';

                $response = $client->sms()->send(
                    new \Vonage\SMS\Message\SMS($phoneNumber, 'GJJSP', $message)
                );

                $smsMessage = $response->current();

                if ($smsMessage->getStatus() == 0) {
                    return response()->json([
                        'status' => true,
                        'message' => 'User has been added, credential sent to the given email, and SMS sent.',
                        'method' => 'POST',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Could not send SMS. User added and email sent. Please try again later.',
                        'method' => 'POST',
                    ], 500);
                }
            } catch (\Exception $err) {
                $user->delete();
                return response()->json([
                    'status' => false,
                    'message' => 'Could not send user credentials or SMS. Please try again ',
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
