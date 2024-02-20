<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'email_address' => $this->email_address,
            'user_mobile_num' => $this->user_mobile_num,
            'password' => $this->password,
            'role_id' => $this->role_id,
            'user_status' => $this->user_status,
            'scholar_status_id' => $this->scholar->pluck('scholar_status_id')->all(),
            'scholarship_categ_id' => $this->scholar->pluck('scholarship_categ_id')->all(),
            'project_partner_id' => $this->scholar->pluck('project_partner_id')->all(),
            'school_id' => $this->scholar->pluck('school_id')->all(),
            'deleted_at' => $this->deleted_at,
        ];
    }
}
