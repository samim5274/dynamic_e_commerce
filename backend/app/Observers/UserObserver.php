<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function updating(User $user){
        if($user->point >= 2500){
            $user->rank = "Platinam";
        }
        elseif($user->poin >= 1000){
            $user->rank = "Dimond";
        }
        elseif($user->point >= 500){
            $user->rank = "Gold";
        } elseif ($user->points >= 100) {
            $user->rank = 'Silver';
        } else {
            $user->rank = 'Bronze';
        }
    }
}
