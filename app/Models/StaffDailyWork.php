<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffDailyWork extends Model
{
    protected $fillable = [
        'staff_name',
        'day',
        'department',
        'phs',
        'works',
        'complete_work_check',
    ];
}

