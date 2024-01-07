<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScholarController; 
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScholarshipCategController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Protected Route
Route::group(['middleware' => ['auth:sanctum']], function() {

    //CRUD USERS 
    Route::apiResource('/users', UserController::class)->only(['index', 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    
    //Scholars Route
    Route::apiResource('/scholars', ScholarController::class)->only(['index', 'show']);
    Route::post('/scholars', [ScholarController::class, 'store']);
    Route::put('/scholars/{user_id}', [ScholarController::class, 'update']);
    Route::delete('/scholars/{user_id}', [ScholarController::class, 'destroy']);
    Route::get('/scholars/search/{user_id}', [ScholarController::class, 'search']);

    //Roles Route
    Route::apiResource('/roles', RoleController::class)->only(['index', 'show']);

    //Auth Route
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
   // Route::get('/refresh-token', [AuthController::class,'refreshToken']); 

   //Scholarship Route
    // Route::post('/scholarships', [ScholarshipController::class, 'store']);
    // Route::put('/scholarships/{id}', [ScholarshipController::class, 'update']);
    // Route::delete('/scholarships/{id}', [ScholarshipController::class, 'destroy']);
});


//Public Route
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('/scholarships', ScholarshipCategController::class)->only(['index', 'show']);

Route::middleware('auth:api')->get('/scholar', function (Request $request){
    return $request->scholar();;
});

Route::middleware('auth:api')->get('/user', function (Request $request){
    return $request->scholar();;
});