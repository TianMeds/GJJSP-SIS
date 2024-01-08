<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPartner extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholarship_categ_id',
        'project_partner_name',
        'project_partner_mobile_num',
        'school_id',
    ];
}
