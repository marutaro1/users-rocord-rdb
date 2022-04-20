<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factoryuser extends Model
{
    protected $fillable = [
                'number',
                'factoryuser_name',
                'birthday',
                'care_level',
                'day_record_check',
                'updated_at',
                'created_at',
            ];
}
