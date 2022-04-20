<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchiveMemo extends Model
{
    protected $fillable = [
        'factoryuser_id',
        'staff_id',
        'staff_name',
        'day',
        'memo_record',
        'updated_at',
        'created_at',
    ];
}
