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
            'scholar_id' => $this->scholar_id,
            'scholarship_type_id' => $this->scholarship_type_id,
            'project_partner_id' => $this->project_partner_id,
            'gender' => $this->gender,
            'birthdate' => $this->birthdate,
            'birthplace' => $this->birthplace,
            'civil_status' => $this->civil_status,
            'num_fam_mem' => $this->num_fam_mem,
            'school_yr_started' => $this->school_yr_started,
            'school_yr_graduated' => $this->school_yr_graduated,
            'school_id' => $this->school_id,
            'program' => $this->program,
            'home_visit_sched' => $this->home_visit_sched,
            'home_address_id' => $this->home_address_id,
            'fb_account' => $this->fb_account,
            'scholar_status_id' => $this->scholar_status_id,
        ];
    }
}
