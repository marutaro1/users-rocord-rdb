<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manuel;

class ManuelController extends Controller
{
    public function index($id) 
    {
        $manuels = Manuel::select('manuels.*')
        ->where('factoryuser_id', '=', $id)
        ->get();
        return $manuels;
    }

    public function store(Request $request) 
    {
        return Manuel::create($request->all());
    }

    public function show($id)
    {

        return Manuel::find($id);
    }

    public function update(Request $request, Manuel $manuel) 
    {
        $manuel->update($request->all());
        
        return $manuel;
    }
    
    public function delete(Request $request, Manuel $manuel) 
    {
        $manuel->delete();

        return $manuel;   
    }
}
