<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RemarksResource extends JsonResource
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
            'remarks_message' => $this->remarks_message,
            'sent_datetime' => $this->sent_datetime,
        ];
    }
}
