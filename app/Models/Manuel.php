<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manuel extends Model
{
    protected $fillable = [
        'factoryuser_id',
        'manuel_value',
        'manuel_title',
        'staff_name',
        'updated_at',
        'created_at',
    ];
}
