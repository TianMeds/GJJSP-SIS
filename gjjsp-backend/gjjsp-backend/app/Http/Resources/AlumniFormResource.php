<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlumniFormResource extends JsonResource
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
            'scholar_id' => $this->scholar_id,
            'year_submitted' => $this->year_submitted,
            'company_name' => $this->company_name,
            'position_in_company' => $this->position_in_company,
            'company_location' => $this->company_location,
            'licensure_exam_type' => $this->licensure_exam_type,
            'exam_passed_date' => $this->exam_passed_date,
            'volunteer_group_name' => $this->volunteer_group_name,
            'yr_volunteered' => $this->yr_volunteered,
            'submission_status' => $this->submission_status,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user_first_name' =>$this->user->first_name,
            'user_last_name' =>$this->user->last_name,
            'user_middle_name' =>$this->user->middle_name,
        ];
    }
}
