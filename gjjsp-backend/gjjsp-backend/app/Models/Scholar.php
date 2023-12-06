<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholar extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'scholarship_type_id',
        'project_partner_id',
        'scholar_photo_filepath',
        'gender',
        'religion',
        'birthdate',
        'birthplace',
        'civil_status',
        'num_fam_mem',
        'school_year_started',
        'school_year_graduated',
        'school_id',
        'program',
        'home_visit_sched',
        'home_address_id',
        'fb_account',
        'scholar_status_id',
    ];
    protected $guarded;
}
