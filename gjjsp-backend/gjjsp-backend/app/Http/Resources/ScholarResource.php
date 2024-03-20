<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Models\Remarks;
use App\Http\Resources\RemarksResource;

class ScholarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $userId = Auth::id();
        $scholarId = $this->id;

        // Fetch remarks associated with renewal documents for this scholar
        $remarks = Remarks::whereHas('renewalDocument', function ($query) use ($scholarId) {
            $query->where('scholar_id', $scholarId);
        })->get();

        // Group renewal documents by school year and term
        // $renewalsGrouped = [];
        // foreach ($this->renewal_documents as $document) {
        //     $schoolYear = $document->school_yr_submitted;
        //     $term = $document->term_submitted;

        //     if (!isset($renewalsGrouped[$schoolYear])) {
        //         $renewalsGrouped[$schoolYear] = [];
        //     }

        //     if (!isset($renewalsGrouped[$schoolYear][$term])) {
        //         $renewalsGrouped[$schoolYear][$term] = [];
        //     }

        //     $renewalsGrouped[$schoolYear][$term][] = [
        //         'submission_status' => $document->submission_status,
        //         'gwa_value' => $document->gwa_value,
        //         'gwa_remarks' => $document->gwa_remarks,
        //         'copyOfReportCard' => $document->copyOfReportCard,
        //         'copyOfRegistrationForm' => $document->copyOfRegistrationForm,
        //         'scannedWrittenEssay' => $document->scannedWrittenEssay,
        //         'letterOfGratitude' => $document->letterOfGratitude,
        //         'updated_by' => $document->updated_by,
        //         'updated_at' => $this->updated_at,
        //         'remarks' => $remarks->where('renewal_document_id', $document->id)->pluck('remarks_message')->first(),
        //     ];
        // }


        // Group renewal documents by school year and term
        $renewalsGrouped = [];
        foreach ($this->renewal_documents as $document) {
            $schoolYear = $document->school_yr_submitted;
            $term = $document->term_submitted;
        
            if (!isset($renewalsGrouped[$schoolYear])) {
                $renewalsGrouped[$schoolYear] = [];
            }
        
            // Add the document to the term array directly
            array_unshift($renewalsGrouped[$schoolYear], [
                'term' => $term,
                'id' => $document->id,
                'submission_status' => $document->submission_status,
                'gwa_value' => $document->gwa_value,
                'gwa_remarks' => $document->gwa_remarks,
                'copyOfReportCard' => $document->copyOfReportCard,
                'copyOfRegistrationForm' => $document->copyOfRegistrationForm,
                'scannedWrittenEssay' => $document->scannedWrittenEssay,
                'letterOfGratitude' => $document->letterOfGratitude,
                'updated_by' => $document->updated_by,
                'updated_at' => $this->updated_at,
                'remarks_message' => $document->remarks_message,
            ]);
        }
        
        // Now $renewalsGrouped contains the data with term 2 first, term 1 last
        

        // Group graduating documents only by school year
        $graduatingGrouped = [];
        foreach ($this->graduating_documents as $document) {
            $schoolYear = $document->school_yr_submitted;

            if (!isset($graduatingGrouped[$schoolYear])) {
                $graduatingGrouped[$schoolYear] = [];
            }

            $graduatingGrouped[$schoolYear][] = [
                'submission_status' => $document->submission_status,
                'graduateName' => $document->graduateName,
                'schoolGraduated' => $document->schoolGraduated,
                'addressSchool' => $document->addressSchool,
                'yearEnteredGraduated' => $document->yearEnteredGraduated,
                'program' => $document->program,
                'street' => $document->street,
                'user_email_address' => $document->user_email_address,
                'user_mobile_num' => $document->user_mobile_num,
                'futurePlan' => $document->futurePlan,
                'updated_by' => $document->updated_by,
                'updated_at' => $this->updated_at,
                'copyOfReportCard' => $document->copyOfReportCard,
                'copyOfRegistrationForm' => $document->copyOfRegistrationForm,
                'scannedWrittenEssay' => $document->scannedWrittenEssay,
                'letterOfGratitude' => $document->letterOfGratitude,
                'statementOfAccount' => $document->statementOfAccount,
                'graduationPicture' => $document->graduationPicture,
                'transcriptOfRecords' => $document->transcriptOfRecords,
                'remarks_message' => $document->remarks_message,
            ];
        }

        $alumniGrouped = [];
        foreach ($this->alumni_forms as $document) {
            $yearSubmitted = $document->year_submitted;
        
            // If the year submitted is not already set as key, initialize it as an empty array
            if (!isset($alumniGrouped[$yearSubmitted])) {
                $alumniGrouped[$yearSubmitted] = [];
            }
        
            // Add alumni data to the array indexed by the year submitted
            $alumniGrouped[$yearSubmitted][] = [
                'company_name' => $document->company_name,
                'position_in_company' => $document->position_in_company,
                'company_location' => $document->company_location,
                'licensure_exam_type' => $document->licensure_exam_type,
                'exam_passed_date' => $document->exam_passed_date,
                'volunteer_group_name' => $document->volunteer_group_name,
                'yr_volunteered' => $document->yr_volunteered,
                'submission_status' => $document->submission_status,
                'updated_by' => $document->updated_by,
                'updated_at' => $this->updated_at,
                'remarks_message' => $document->remarks_message,
            ];
        }
        
        // Now, $alumniGrouped is in the desired format, convert it to an object
        $alumniObject = (object) $alumniGrouped;


        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'scholarship_categ_id' => $this->scholarship_categ_id,
            'project_partner_id' => $this->project_partner_id,
            'gender' => $this->gender,
            'religion' => $this->religion,
            'birthdate' => $this->birthdate,
            'birthplace' => $this->birthplace,
            'civil_status' => $this->civil_status,
            'num_fam_mem' => $this->num_fam_mem,
            'school_yr_started' => $this->school_yr_started,
            'school_yr_graduated' => $this->school_yr_graduated,
            'school_id' => $this->school_id,
            'program' => $this->program,
            'acad_terms' => $this->acad_terms,
            'home_visit_sched' => $this->home_visit_sched,
            'fb_account' => $this->fb_account,
            'street' => $this->street,
            'zip_code' => $this->zip_code,
            'region_name' => $this->region_name,
            'province_name' => $this->province_name,
            'cities_municipalities_name' => $this->cities_municipalities_name,
            'barangay_name' => $this->barangay_name,
            'scholar_status_id' => $this->scholar_status_id,
            'user_first_name' => $this->user->first_name,
            'user_last_name' => $this->user->last_name,
            'user_middle_name' => $this->user->middle_name,
            'user_email_address' => $this->user->email_address,
            'user_mobile_num' => $this->user->user_mobile_num,
            'renewing' => $renewalsGrouped, 
            'graduating' => $graduatingGrouped,
            'alumni' => $alumniObject,
        ];
    }
}
