<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Scholar;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    protected static function boot()
    {
        parent::boot();

        // Listen for the 'created' event
        static::created(function ($user) {
            // Check if the user has a role_id of 3 (Scholar)
            if ($user->role_id === 3) {
                // Create a Scholar record for the user
                $user->scholar()->create([
                    'user_id' => $user->id,
                ]);
            }
        });
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'user_mobile_num',
        'email_address',
        'password',
        'role_id',
        'user_status',
        'scholar_status_id',
        'scholarship_categ_id',
        'project_partner_id',
        'school_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function scholar()
    {
        return $this->hasMany(Scholar::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }   
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'user_id' => 'integer'
    ];
    
}
