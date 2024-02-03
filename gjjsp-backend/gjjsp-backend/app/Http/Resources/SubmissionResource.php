<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
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
            'submitted_by' => $this->submitted_by,
            'submission_type' => $this->submission_type,
            'school_yr_submitted' => $this->school_yr_submitted,
            'term_submitted' => $this->term_submitted,
            'submitted_datetime' => $this->submitted_datetime,
            'submission_status' => $this->submission_status,
            'updated_by' => $this->updated_by,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
