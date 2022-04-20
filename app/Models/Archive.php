<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    // protected $table = 'archive';
    
    protected $fillable = [
        'factoryuser_id',
        'factoryuser_name',
        'factoryuser_number',
        'staff_id',
        'staff_name',
        'day',
        'archive_record',
        'archive_memo',
        'updated_at',
        'created_at',
    ];
}
