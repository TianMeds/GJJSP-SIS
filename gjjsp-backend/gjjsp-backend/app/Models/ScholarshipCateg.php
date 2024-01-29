<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScholarshipCateg extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'scholarship_categ_name',
        'alias',
        'benefactor',
        'scholarship_categ_status',
    ];
}
