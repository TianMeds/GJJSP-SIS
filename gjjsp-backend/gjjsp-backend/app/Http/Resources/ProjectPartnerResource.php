<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectPartnerResource extends JsonResource
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
            'scholarship_categ_id' => $this->scholarship_categ_id,
            'project_partner_name' => $this->project_partner_name,
            'project_partner_mobile_num' => $this->project_partner_mobile_num,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'school_id' => $this->school_id,
        ];
    }
}
