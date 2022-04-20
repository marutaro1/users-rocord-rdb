<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ArchiveMemo;

class ArchiveMemoController extends Controller
{
    //
    public function index() 
    {
        
        return ArchiveMemo::all();
    }

    public function store(Request $request) 
    {
        return ArchiveMemo::create($request->all());
    }

    public function show(ArchiveMemo $memo) 
    {

        return ArchiveMemo::find($memo['id']);
    }

    public function delete(ArchiveMemo $memo)
    {
       $memo->delete();

        return $memo;
    }
}
