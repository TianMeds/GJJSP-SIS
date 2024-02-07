<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlumniForm extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'year_submitted',
        'company_name',
        'position_in_company',
        'company_location',
        'licensure_exam_type',
        'exam_passed_date',
        'volunteer_group_name',
        'yr_volunteered'
    ];

    public $timestamps = false;
}
