<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UndergradAcadDetails extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'scholar_id',
        'undergrad_sy',
        'current_yr_level',
        'gwa_current_school_yr',
    ];

    public $timestamps = false;
}
