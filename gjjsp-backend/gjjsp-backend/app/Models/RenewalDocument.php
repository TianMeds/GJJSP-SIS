<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class RenewalDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'gwa_value',
        'gwa_remarks',
        'school_yr_submitted',
        'term_submitted',
        'copyOfReportCard', 
        'copyOfRegistrationForm',
        'scannedWrittenEssay',
        'letterOfGratitude',
        'submission_status',
        'updated_by',
    ];


    public $timestamps = false;
}
