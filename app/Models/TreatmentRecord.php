<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreatmentRecord extends Model
{
    protected $fillable = [
        'factoryuser_id',
        'day',
        'treatment_id',
        'treatment_value',
        'staff_name',
        'updated_at',
        'created_at',
    ];
}
