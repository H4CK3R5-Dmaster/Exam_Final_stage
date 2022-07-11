<?php

namespace App\Service;

use DateTime;

class UserService
{

    public function getAge($old)
    {


        $dob = $old;
        $now = new DateTime('now');

        $diff = $now->diff($dob);

        $age = $diff->y;
        return $age;
    }
}
