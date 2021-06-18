<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relationships
     */

    public function completedCourses()
    {
        return $this->belongsToMany(Course::class)->withPivot('grade')->withTimestamps();
    }

    /**
     * Helpers
     */


    /**
     * Used for Authorization of Certain Actions
     *
     * @return string[]
     */
    public static function getDevUsers()
    {
        return [
            "ava@psu.edu",
            "kelly@psu.edu"
        ];
    }

}
