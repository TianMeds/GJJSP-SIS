<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholar_status_name',
        'scholar_status_description'
    ];
}
