<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'role',
        'dob', 'gender', 'blood_group', 'national_id', 'religion',
        'present_address', 'permanent_address', 'photo', 'wallet_balance',
        'parent_id', 'left_child_id', 'right_child_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->password)) {
                $user->password = Hash::make(bin2hex(random_bytes(4)));
            }
        });
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
        'wallet_balance' => 'decimal:2',
        'dob' => 'date',
    ];

    // Parent node
    public function parentUser()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    // Left child relationship
    public function leftChild()
    {
        return $this->belongsTo(User::class, 'left_child_id')->with(['leftChild', 'rightChild']);
    }

    // Right child relationship
    public function rightChild()
    {
        return $this->belongsTo(User::class, 'right_child_id')->with(['leftChild', 'rightChild']);
    }

}
