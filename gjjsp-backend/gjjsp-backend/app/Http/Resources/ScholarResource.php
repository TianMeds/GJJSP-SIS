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
            // 'user_first_name' => $this->getUserFirstNameAttribute() ?? 'N/A',
            // 'user_last_name' => $this->getUserLastNameAttribute() ?? 'N/A',
            // 'user_middle_name' => $this->getUserMiddleNameAttribute() ?? 'N/A',
            // 'user_email_address' => $this->getUserEmailAddressAttribute() ?? 'N/A',
            // 'user_mobile_num' => $this->getUserMobileNumAttribute() ?? 'N/A',
            // 'scholarship_categ_name' => $this->getScholarshipCategNameAttribute() ?? 'N/A',
        ];
    }
}
