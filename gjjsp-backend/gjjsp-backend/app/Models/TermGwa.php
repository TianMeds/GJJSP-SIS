<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TermGwa extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'submission_id',
        'gwa_value',
    ];

    public $timestamps = false;
}
