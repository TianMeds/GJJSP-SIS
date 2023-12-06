<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScholarController; 
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

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
    Route::post('/scholars', [ScholarController::class, 'store']);
    Route::put('/scholars/{user_id}', [ScholarController::class, 'update']);
    Route::delete('/scholars/{user_id}', [ScholarController::class, 'destroy']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{firstname}', [UserController::class, 'update']);
    Route::delete('/users/{firstname}', [UserController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


//Public Route
Route::apiResource('/scholars', ScholarController::class)->only(['index', 'show']);
Route::apiResource('/users', UserController::class)->only(['index', 'show']);
Route::get('/scholars/search/{user_id}', [ScholarController::class, 'search']);
Route::get('/users/search/{firstname}', [UserController::class, 'search']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->get('/scholar', function (Request $request){
    return $request->scholar();;
});

Route::middleware('auth:api')->get('/user', function (Request $request){
    return $request->scholar();;
});