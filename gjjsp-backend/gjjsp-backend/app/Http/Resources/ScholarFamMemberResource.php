<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarFamMemberResource extends JsonResource
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
            'father_name' => $this->father_name,
            'mother_name' => $this->mother_name,
            'relation_to_scholar' => $this->relation_to_scholar,
            'fam_mem_name' => $this->fam_mem_name,
            'occupation' => $this->occupation,
            'income' => $this->income,
            'fam_mem_mobile_num' => $this->fam_mem_mobile_num,
        ];
    }
}
