<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectPartner extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'scholarship_categ_id',
        'project_partner_name',
        'project_partner_mobile_num',
        'school_id',
    ];
}
