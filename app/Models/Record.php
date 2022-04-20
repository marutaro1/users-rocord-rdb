<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        'factoryuser_id',
        'day',
        'day_record_check',
        'record_value',
        'staff_name',
        'updated_at',
        'created_at',
    ];
}