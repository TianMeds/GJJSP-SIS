<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RenewalDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'gwa_value',
        'gwa_remarks',
        'copyOfReportCard', 
        'copyOfRegistrationForm',
        'scannedWrittenEssay',
        'letterOfGratitude',
    ];

    public $timestamps = false;
}
