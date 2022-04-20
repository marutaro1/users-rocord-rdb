<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyWork extends Model
{
    protected $fillable = [
        'user_department',
        'day_of_week',
        'work',
    ];
}
