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
        'graduateName',
        'schoolGraduated',
        'addressSchool',
        'yearEnteredGraduated',
        'program',
        'street',
        'user_email_address',
        'user_mobile_num',
        'futurePlan',
        'school_yr_submitted',
        'copyOfReportCard',
        'copyOfRegistrationForm',
        'scannedWrittenEssay',
        'letterOfGratitude',
        'statementOfAccount',
        'graduationPicture',
        'transcriptOfRecords',
        'submission_status',
        'remarks_message',
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
