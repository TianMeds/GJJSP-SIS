<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Remarks extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'submission_id',
        'remarks_message',
        'sent_datetime',
    ];

    public $timestamps = false;
}
