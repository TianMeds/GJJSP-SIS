<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScholarResource;
use App\Http\Resources\ScholarCollection;
use App\Mail\UserCredential;
use App\Mail\PasswordResetNotification;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Scholar;
use App\Models\Role;
use App\Models\ScholarFamMember;
use App\Models\HighschoolAcadDetails;
use App\Models\UndergradAcadDetails;
use App\Models\RenewalDocument;
use App\Models\GraduatingDocument;
use App\Models\Remarks;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\PasswordResetRequest;
use App\Models\PasswordReset;
use App\Http\Resources\UserResource;
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


        if ($user->role_id === "3") {
            // Create Scholar profile separately
            $scholar = Scholar::create([
                'user_id' => $user->id,
                'scholar_status_id' => '1',
            ]);

            // Create Scholar Family Member profile separately
            $scholarFamMember = ScholarFamMember::create([
                'scholar_id' => $scholar->id,
            ]);

            // Create Scholar Highschool Academic Details profile separately
            $highschoolAcadDetails = HighschoolAcadDetails::create([
                'scholar_id' => $scholar->id,
            ]);

            // Create Scholar Undergrad Academic Details profile separately
            $undergradAcadDetails = UndergradAcadDetails::create([
                'scholar_id' => $scholar->id,
            ]);

            $remakrs = Remarks::create([
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
                    new \Vonage\SMS\Message\SMS($user->user_mobile_num, 'GJJSP', $message)
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
                    'message' => $err->getMessage(),
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
            'remember_token' => $remember_token,
            'role' => $roleName,
        ];
        
        // Create and attach cookie
        $cookie = cookie('remember_token', $remember_token, 30); // 30 minutes
        return response($response, 201)->withCookie($cookie);
}
    public function logout(Request $request)
    {
        // Revoke the current access token for the authenticated user
        $request->user()->currentAccessToken()->delete();

        // Forget the token cookie
        $cookie = cookie()->forget('remember_token');

        // Return a JSON response indicating successful logout
        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
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

    public function forgot(Request $request)
    {
        $request->validate([
            'email_address' => 'required|email|exists:users,email_address',
        ]);
    
        $user = User::where('email_address', $request->input('email_address'))->first();
    
        if (!$user || !$user->email_address) {
            return response()->error('No Record Found', 'Incorrect Email Address Provided', 404);
        }
    
        $resetPasswordToken = str_pad(random_int(1, 9999), 4, '0', STR_PAD_LEFT);
    
        if (!$userPassReset = PasswordReset::where('email_address', $user->email_address)->first()) {
            PasswordReset::create([
                'email_address' => $user->email_address,
                'token' => $resetPasswordToken
            ]);
        } else {
            $userPassReset->update([
                'email_address' => $user->email_address,
                'token' => $resetPasswordToken
            ]);
        }
    
        Mail::mailer('smtp')->to($user->email_address)->send(new PasswordResetNotification($user, $resetPasswordToken));
    
        return response()->json(['message' => 'A code has been Sent to your email address']);
    }

    public function reset(Request $request)
    {
        $validatedData = $request->validate([
            'email_address' => 'required|email|exists:users,email_address',
            'token' => 'required',
            'password' => ['required', 'min:8', 'confirmed'],
        ]);
    
        $user = User::where('email_address', $validatedData['email_address'])->first();
    
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'No Record Found',
                'error' => 'Incorrect Email Address Provided',
            ], 404);

        }
    
        $resetRequest = PasswordReset::where('email_address', $user->email_address)->first();
    
        if (!$resetRequest || $resetRequest->token != $validatedData['token']) {
            return response()->error('An Error occurred. Please Try again', 'Invalid Token Provided', 400);
        }
    
        $user->fill([
            'password' =>  Hash::make($validatedData['password']),
        ]);
    
        $user->save();
    
        $user->tokens()->delete();
    
        $resetRequest->delete();
    
        $token = $user->createToken('remember_token')->plainTextToken;
    
        $loginResponse = [
            'user' => UserResource::make($user),
            'remember_token' => $token,
        ];
    
        return response()->json([
            'status' => true,
            'message' => 'Password Reset Successful',
            'data' => $loginResponse,
        ], 201);
    }
    
    


    // public function reset(Request $request)
    // {
    //     $request->validate([
    //         'email_address' => ['required', 'exists:users,email_address'],
    //     ]);

    //     $attributes = $request->only(['email_address']);

    //     $user = User::where('email_address', $attributes['email_address'])->first();

    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'User not found',
    //             'method' => 'POST',
    //         ], 404);
    //     }

    //     $token = bin2hex(random_bytes(32));

    //     $resetRequest = PasswordReset::updateOrCreate(
    //         ['email_address' => $user->email_address],
    //         ['token' => $token]
    //     );

    //     $resetRequest->save();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Password reset link sent to your email',
    //         'method' => 'POST',
    //     ], 200);
    // }
    
}
