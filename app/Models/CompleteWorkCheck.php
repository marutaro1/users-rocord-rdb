<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompleteWorkCheck extends Model
{
    protected $fillable = [
        'staff_id',
        'staff_name',
        'day',
        'work_check',
        'staff_memo',
    ];
}
