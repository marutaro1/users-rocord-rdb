<?php

namespace App\Http\Controllers;

use App\Models\DailyWork;
use Illuminate\Http\Request;

class DailyWorkController extends Controller
{
    public function index() 
    {
        return DailyWork::all();
    }

    public function store(Request $request) 
    {
        return DailyWork::create($request->all());
    }
}
