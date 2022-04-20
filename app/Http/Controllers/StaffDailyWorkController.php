<?php

namespace App\Http\Controllers;

use App\Models\StaffDailyWork;
use Illuminate\Http\Request;

class StaffDailyWorkController extends Controller
{
    public function index() 
    {
        return StaffDailyWork::all();
    }

    public function store(Request $request) 
    {
        return StaffDailyWork::create($request->all());
    }
}
