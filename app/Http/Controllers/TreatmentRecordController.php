<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TreatmentRecord;

class TreatmentRecordController extends Controller
{
    public function index($id) 
    {
        $treatment_records = TreatmentRecord::select('treatment_records.*')
        ->where('factoryuser_id', '=', $id)
        ->whereNull('deleted_at')
        ->get();
        return $treatment_records;
    }

    public function store(Request $request) 
    {
        return TreatmentRecord::create($request->all());
    }

    public function show($id)
    {

        return TreatmentRecord::find($id);
    }

    public function update(Request $request, $id) 
    {
        $treatment_record = TreatmentRecord::find($id);
        $treatment_record->update($request->all());
        
        return $treatment_record;
    }
    
    public function delete($id) 
    {
        $treatment = TreatmentRecord::find($id);
        $treatment->delete();

        return $treatment;   
    }
}
