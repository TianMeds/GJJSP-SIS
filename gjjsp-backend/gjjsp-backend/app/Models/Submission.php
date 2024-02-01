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
        'school_yr_submitted',
        'term_submitted',
        'due_datetime',
        'school_yr_submitted',
        'submitted_datetime',
        'submission_status',
        'updated_by',
    ];

    public $timestamps = false;
}
