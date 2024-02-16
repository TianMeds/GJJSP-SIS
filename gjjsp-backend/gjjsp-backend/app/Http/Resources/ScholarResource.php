<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
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
            'home_visit_sched' => $this->home_visit_sched,
            'fb_account' => $this->fb_account,
            'street' => $this->street,
            'zip_code' => $this->zip_code,
            'region_name' => $this->region_name,
            'province_name' => $this->province_name,
            'cities_municipalities_name' => $this->cities_municipalities_name,
            'barangay_name' => $this->barangay_name,
            'scholar_status_id' => $this->scholar_status_id,
            // 'scholar_status_name' => $this->getScholarStatusNameAttribute() ?? 'N/A',
            'user_first_name' => $this->user->first_name,
            'user_last_name' => $this->user->last_name,
            'user_middle_name' => $this->user->middle_name,
            'user_email_address' => $this->user->email_address,
            'submission_status' => $this->renewal_documents->pluck('submission_status')->all(),
            'gwa_value' => $this->renewal_documents->pluck('gwa_value')->all(),
            'gwa_remarks' => $this->renewal_documents->pluck('gwa_remarks')->all(),
            'school_yr_submitted' => $this->renewal_documents->pluck('school_yr_submitted')->all(),
            'term_submitted' => $this->renewal_documents->pluck('term_submitted')->all(),
            'copyOfReportCard' => $this->renewal_documents->pluck('copyOfReportCard')->all(),
            'copyOfRegistrationForm' => $this->renewal_documents->pluck('copyOfRegistrationForm')->all(),
            'scannedWrittenEssay' => $this->renewal_documents->pluck('scannedWrittenEssay')->all(),
            'letterOfGratitude' => $this->renewal_documents->pluck('letterOfGratitude')->all(),
            'updated_by' => $this->renewal_documents->pluck('updated_by')->all(),
            'updated_at' => $this->updated_at,
            'future_company' => $this->graduating_documents->pluck('future_company')->all(),
            'future_company_location' => $this->graduating_documents->pluck('future_company_location')->all(),
            'future_position' => $this->graduating_documents->pluck('future_position')->all(),
            'meeting_benefactor_sched' => $this->graduating_documents->pluck('meeting_benefactor_sched')->all(),
            'statementOfAccount' => $this->graduating_documents->pluck('statementOfAccount')->all(),
            'graduationPicture' => $this->graduating_documents->pluck('graduationPicture')->all(),
            'transcriptOfRecords' => $this->graduating_documents->pluck('transcriptOfRecords')->all(),

            // 'user_mobile_num' => $this->getUserMobileNumAttribute() ?? 'N/A',
            // 'scholarship_categ_name' => $this->getScholarshipCategNameAttribute() ?? 'N/A',
        ];
    }
}
