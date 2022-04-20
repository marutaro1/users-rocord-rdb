<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserIntermediateValue extends Model
{
    protected $fillable = [
            'factoryuser_id',
            'record_id',
            'manuel_id',
            'medical_history_id',
            'treatment_id',
    ];
}
