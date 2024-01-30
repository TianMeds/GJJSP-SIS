<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UndergradAcadDetailsResource extends JsonResource
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
            'undergrad_sy' => $this->undergrad_sy,
            'current_yr_level' => $this->current_yr_level,
            'gwa_current_school_yr' => $this->gwa_current_school_yr,
        ];
    }
}
