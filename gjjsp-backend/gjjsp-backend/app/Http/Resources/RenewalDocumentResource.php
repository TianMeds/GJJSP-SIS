<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RenewalDocumentResource extends JsonResource
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
            'gwa_value' => $this->gwa_value,
            'gwa_remarks' => $this->gwa_remarks,
            'school_yr_submitted' => $this->school_yr_submitted,
            'term_submitted' => $this->term_submitted,
            'copyOfReportCard' => $this->copyOfReportCard,
            'copyOfRegistrationForm' => $this->copyOfRegistrationForm,
            'scannedWrittenEssay' => $this->scannedWrittenEssay,
            'letterOfGratitude' => $this->letterOfGratitude,
            'submission_status' => $this->submission_status,
            'remarks_message' => $this->remarks_message,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user_first_name' =>$this->user->first_name,
            'user_last_name' =>$this->user->last_name,
            'user_middle_name' =>$this->user->middle_name,

        ];
    }
}
