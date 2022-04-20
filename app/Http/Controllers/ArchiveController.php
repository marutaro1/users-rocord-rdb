<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Archive;

class ArchiveController extends Controller
{
    public function index() 
    {
        
        return Archive::all();
    }
    
    public function store(Request $request) 
    {
        return Archive::create($request->all());
    }

    public function show(Archive $archive) 
    {

        return Archive::find($archive['id']);
    }

    public function update(Request $request, Archive $archive) 
    {
        $archive->update($request->all());

        return $archive;
    }

    public function delete(Archive $archive)
    {
       $archive->delete();

        return $archive;
    }
}
