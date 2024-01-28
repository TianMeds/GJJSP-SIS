<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScholarFamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholar_id',
        'father_name',
        'mother_name',
        'relation_to_scholar',
        'fam_mem_name',
        'occupation',
        'income',
        'fam_mem_mobile_num',
    ];

    public $timestamps = false;
}
