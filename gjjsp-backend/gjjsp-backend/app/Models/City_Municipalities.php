<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City_Municipalities extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_municipality_name',
        'province_id',
    ];

    public $timestamps = false;
}
