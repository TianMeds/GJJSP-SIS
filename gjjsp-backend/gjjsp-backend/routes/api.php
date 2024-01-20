<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScholarController; 
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScholarshipCategController;
use App\Http\Controllers\ProjectPartnerController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\ScholarStatusController;
use App\Http\Controllers\PromptController;

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
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile/{id}', [UserController::class, 'updateProfile']);

    //Scholars Route
    Route::apiResource('/scholars', ScholarController::class)->only(['index', 'show']);
    Route::post('/scholars', [ScholarController::class, 'store']);
    Route::put('/scholars/{user_id}', [ScholarController::class, 'update']);
    Route::delete('/scholars/{user_id}', [ScholarController::class, 'destroy']);
    Route::get('/scholars/search/{user_id}', [ScholarController::class, 'search']);

    //Scholars Profile Route
    Route::post('/scholarsProfile', [ScholarController::class, 'storeScholarProfile']);
    Route::put('/scholarsProfile/{id}', [ScholarController::class, 'updateScholarProfile']);
    Route::get('/scholarsProfile', [ScholarController::class, 'scholarProfile']);

    //Roles Route
    Route::apiResource('/roles', RoleController::class)->only(['index', 'show']);

    //Auth Route
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
   // Route::get('/refresh-token', [AuthController::class,'refreshToken']); 

   //Scholarship Route
    Route::apiResource('/scholarships', ScholarshipCategController::class)->only(['index', 'show']);
    Route::post('/scholarships', [ScholarshipCategController::class, 'store']);
    Route::put('/scholarships/{id}', [ScholarshipCategController::class, 'update']);
    Route::delete('/scholarships/{id}', [ScholarshipCategController::class, 'destroy']);

    //ProjectPartner Route
    Route::apiResource('/project-partners', ProjectPartnerController::class)->only(['index', 'show']);
    Route::post('/project-partners', [ProjectPartnerController::class, 'store']);
    Route::put('/project-partners/{id}', [ProjectPartnerController::class, 'update']);
    Route::delete('/project-partners/{id}', [ProjectPartnerController::class, 'destroy']);

    Route::apiResource('/scholar-status', ScholarStatusController::class)->only(['index', 'show']);

    //Submission Route
});


//Public Route
Route::post('/login', [AuthController::class, 'login']);
Route::get('submissions', [SubmissionController::class, 'index'])->name('submission');
Route::post('submissions', [SubmissionController::class, 'submission']);
Route::post('/generate-prompt', [PromptController::class, 'generate']);

Route::middleware('auth:api')->get('/scholar', function (Request $request){
    return $request->scholar();;
});

Route::middleware('auth:api')->get('/user', function (Request $request){
    return $request->scholar();;
});