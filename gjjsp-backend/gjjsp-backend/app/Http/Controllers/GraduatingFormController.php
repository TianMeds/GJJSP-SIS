<?php

namespace App\Http\Controllers;

use App\Http\Resources\GraduatingFormResource;
use App\Http\Resources\GraduatingFormCollection;
use App\Models\GraduatingDocument;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class GraduatingFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(new GraduatingFormCollection(GraduatingDocument::all()),Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $user = Auth::user();

            $scholarId = $user->scholar->id;

            //Generate unique filename
            $copyOfReportCardName = Str::random(10).'.'.$request->copyOfReportCard->getClientOriginalExtension();
            $copyOfRegistrationFormName = Str::random(10).'.'.$request->copyOfRegistrationForm->getClientOriginalExtension();
            $scannedWrittenEssayName = Str::random(10).'.'.$request->scannedWrittenEssay->getClientOriginalExtension();
            $letterOfGratitudeName = Str::random(10).'.'.$request->letterOfGratitude->getClientOriginalExtension();
            $statementOfAccountName = Str::random(10).'.'.$request->statementOfAccount->getClientOriginalExtension();
            $graduationPictureName = Str::random(10).'.'.$request->graduationPicture->getClientOriginalExtension();
            $transcriptOfRecordsName = Str::random(10).'.'.$request->transcriptOfRecords->getClientOriginalExtension();

            $submission = null;
            
            $submission = GraduatingDocument::create([
                'scholar_id' => $scholarId,
                'user_id' => $user->id,
                'future_company' => $request->future_company,
                'future_company_location' => $request->future_company_location,
                'future_position' => $request->future_position,
                'meeting_benefactor_sched' => $request->meeting_benefactor_sched,
                'school_yr_submitted' => $request->school_yr_submitted,
                'term_submitted' => $request->term_submitted,
                'copyOfReportCard' => $copyOfReportCardName,
                'copyOfRegistrationForm' => $copyOfRegistrationFormName,
                'scannedWrittenEssay' => $scannedWrittenEssayName,
                'letterOfGratitude' => $letterOfGratitudeName,
                'statementOfAccount' => $statementOfAccountName,
                'graduationPicture' => $graduationPictureName,
                'transcriptOfRecords' => $transcriptOfRecordsName,
                'submission_status' => 'For Approval',
            ]);

            // Set Nextcloud API endpoint and credentials
            $nextcloudEndpoint = 'https://nextcloud.apc.edu.ph/remote.php/dav/files/cbmedallada/GraduatingDocuments/';
            $nextcloudUsername = 'cbmedallada';
            $nextcloudPassword = 'sm@llLamp50';

            //Store files
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->copyOfReportCard, $copyOfReportCardName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->copyOfRegistrationForm, $copyOfRegistrationFormName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->scannedWrittenEssay, $scannedWrittenEssayName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->letterOfGratitude, $letterOfGratitudeName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->statementOfAccount, $statementOfAccountName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->graduationPicture, $graduationPictureName);
            Storage::disk('public')->putFileAs($nextcloudEndpoint, $request->transcriptOfRecords, $transcriptOfRecordsName);

            $status = $request->input('status', 'graduating');

            foreach(['copyOfReportCard', 'copyOfRegistrationForm', 'scannedWrittenEssay', 'letterOfGratitude', 'statementOfAccount', 'graduationPicture', 'transcriptOfRecords'] as $fileType){
                if ($request->hasFile($fileType)) {
                    $file = $request->file($fileType);
                    ${$fileType} = $status . '_' . $file->getClientOriginalName();

                    $nextcloudApiUrl = $nextcloudEndpoint . ${$fileType};

                    $fileContent = file_get_contents($file);

                    try{
                        $response = Http::withBasicAuth($nextcloudUsername, $nextcloudPassword)
                            ->attach(
                                'file',
                                file_get_contents($file),
                                ${$fileType}
                            )
                            ->put($nextcloudApiUrl);

                        if($response->successful()){
                            $submission->{$fileType} = ${$fileType};
                            $fileNames[$fileType] = $nextcloudApiUrl;
                        }
                        else{
                            // Log the response and request details for debugging
                            Log::error('Nextcloud API Request Failed:');
                            Log::error('Request URL: ' . $nextcloudApiUrl);
                            Log::error('Response Status: ' . $response->status());
                            Log::error('Response Body: ' . $response->body());

                            return response()->json(["message" => "Failed to upload file to Nextcloud"], 500);
                        }
                    }
                    catch(\Exception $e){
                         // Log the API request exception for debugging
                         Log::error('Nextcloud API Request Exception: ' . $apiException->getMessage());
                         Log::error('Nextcloud API Request Exception Trace: ' . $apiException->getTraceAsString());
     
                         // Re-throw the exception to let it propagate for further analysis
                         throw $apiException;
                    }
                }
            }

            // Return JSON response
            return new GraduatingFormResource($submission);
        }
        catch (\Exception $e) {
            // Return JSON response
            return response()->json([
                'message' => 'Error in file upload',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GraduatingForm $graduatingForm)
    {
        return new GraduatingFormResource($graduatingForm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GraduatingForm $graduatingForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GraduatingForm $graduatingForm)
    {
        //
    }
}
