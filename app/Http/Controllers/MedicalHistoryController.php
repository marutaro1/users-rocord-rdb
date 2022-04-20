<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicalHistory;

class MedicalHistoryController extends Controller
{
    public function index($id) 
    {
        $medical_histories = MedicalHistory::select('medical_histories.*')
        ->where('factoryuser_id', '=', $id)
        ->get();
        return $medical_histories;
    }

    public function store(Request $request) 
    {
        return MedicalHistory::create($request->all());
    }

    public function show($id)
    {

        return MedicalHistory::find($id);
    }

    public function update(Request $request, MedicalHistory $medical_history) 
    {
        $medical_history->update($request->all());
        
        return $medical_history;
    }
    
    public function delete(Request $request, MedicalHistory $medical_history) 
    {
        $medical_history->delete();

        return $medical_history;   
    }
}
