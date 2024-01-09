<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarshipCateg extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholarship_categ_name',
        'alias',
        'benefactor',
        'scholarship_categ_status',
        'project_partner_id',
    ];
}
