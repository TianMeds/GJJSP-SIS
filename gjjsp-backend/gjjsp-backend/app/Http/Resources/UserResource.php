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
        ];
    }
}
