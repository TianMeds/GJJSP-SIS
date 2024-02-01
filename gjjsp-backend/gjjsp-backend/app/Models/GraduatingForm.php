<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GraduatingForm extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'submission_id',
        'future_company_name',
        'future_company_location',
        'future_position',
        'meeting_benefactor_sched'
    ];

    public $timestamps = false;
}
