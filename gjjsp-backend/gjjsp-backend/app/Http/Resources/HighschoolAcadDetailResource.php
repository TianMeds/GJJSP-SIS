<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HighschoolAcadDetailResource extends JsonResource
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
            'track_name' => $this->track_name,
            'gwa_school_yr_graduated' => $this->gwa_school_yr_graduated,
            'school_name' => $this->school_name,
            'school_address' => $this->school_address,
            'school_yr_graduated_hs' => $this->school_yr_graduated_hs,
        ];
    }
}
