<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipCategResource extends JsonResource
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
            'scholarship_categ_name' => $this->scholarship_categ_name,
            'alias' => $this->alias,
            'benefactor' => $this->benefactor,
            'scholarship_categ_status' => $this->scholarship_categ_status,
            'project_partner_id' => $this->project_partner_id,
        ];
    }
}
