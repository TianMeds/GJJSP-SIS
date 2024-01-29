<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Submission extends Model
{
    use HasFactory , SoftDeletes;

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
