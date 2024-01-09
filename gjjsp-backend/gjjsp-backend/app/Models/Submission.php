<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'submitted_by',
        'submission_type',
        'due_datetime',
        'term_submitted',
        'school_yr_submitted',
        'submitted_datetime',
        'submission_status',
        'updated_by',
    ];
}
