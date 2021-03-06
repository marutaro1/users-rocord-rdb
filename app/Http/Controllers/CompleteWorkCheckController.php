<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompleteWorkCheck;

class CompleteWorkCheckController extends Controller
{
    public function index() 
    {
        return CompleteWorkCheck::all();
    }

    public function store(Request $request) 
    {
        return CompleteWorkCheck::create($request->all());
    }

    public function show($id) 
    {

        return CompleteWorkCheck::find($id);
    }

    public function update(Request $request, $id) 
    {
        $completeworkcheck = CompleteWorkCheck::find($id);
        $completeworkcheck->update($request->all());

        return $completeworkcheck;
    }
}
