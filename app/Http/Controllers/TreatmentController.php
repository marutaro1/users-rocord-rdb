<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Treatment;

class TreatmentController extends Controller
{
    public function index() 
    {
        return Treatment::all();
    }

    public function store(Request $request) 
    {
        return Treatment::create($request->all());
    }

    public function show($id)
    {

        return Treatment::find($id);
    }

    public function update(Request $request, Treatment $treatment) 
    {
        $treatment->update($request->all());
        
        return $treatment;
    }
    
    public function delete(Request $request, Treatment $treatment) 
    {
        $treatment->delete();

        return $treatment;   
    }
}
