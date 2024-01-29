<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HighschoolAcadDetails extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'track_name',
        'gwa_school_yr_graduated',
        'school_name',
        'school_address',
        'school_yr_graduated_hs',
    ];

    public $timestamps = false;
}
