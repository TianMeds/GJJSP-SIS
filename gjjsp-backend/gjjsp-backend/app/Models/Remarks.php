<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Remarks extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholar_id',
        'renewal_document_id',
        'remarks_message',
        'sent_datetime',
    ];

    protected $primaryKey = 'sent_datetime';

    public $timestamps = true;

    // Define the format for the timestamps
    const CREATED_AT = 'sent_datetime';
    const UPDATED_AT = 'sent_datetime';

    public function renewalDocument()
{
    return $this->belongsTo(RenewalDocument::class);
}

}
