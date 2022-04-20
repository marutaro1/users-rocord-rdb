<?php

namespace App\Http\Controllers;

use App\Models\Record;
use App\Models\Factoryuser;
use App\Models\UserIntermediaValue;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function index($id) 
    {
        $factoryuser_records = Record::select('records.*')
        ->where('factoryuser_id', '=', $id)
        ->whereNull('deleted_at')
        ->get();
        return $factoryuser_records;
    }

    public function store(Request $request) 
    {
        return Record::create($request->all());
    }

    public function show(Record $record) 
    {
        // $factoryuser_id = Factoryuser::insertGetId(['id' => $id]);
        // $record_find = Record::find($record['id']);
        // $record_id = Record::insertGetId(['id' => $record_find]);
        // UserIntermediaValue::insert(['factoryuser_id' => $factoryuser_id, 'record_id' => $record_id]);
        return Record::find($record['id']);
    }

    public function update(Request $request, $id)
    {
        $record = Record::find($id);
        $record->update($request->all());
        
        return $record;
    }
    public function delete($id)
    {
        $record = Record::find($id);
        $record->delete();

        return $record;   
    }

}
