<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Scholar;

class GraduatingDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'user_id',
        'future_company',
        'future_company_location',
        'future_position',
        'meeting_benefactor_sched',
        'school_yr_submitted',
        'term_submitted',
        'copyOfReportCard',
        'copyOfRegistrationForm',
        'scannedWrittenEssay',
        'letterOfGratitude',
        'statementOfAccount',
        'graduationPicture',
        'transcriptOfRecords',
        'submission_status',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scholar()
    {
        return $this->belongsTo(Scholar::class);
    }
    
}
