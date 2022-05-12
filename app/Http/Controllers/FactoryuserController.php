<?php

namespace App\Http\Controllers;

use App\Models\Factoryuser;
use Illuminate\Http\Request;

class FactoryuserController extends Controller
{
    public function index() 
    {
        return Factoryuser::all();
    }

    public function store(Request $request) 
    {
        return Factoryuser::create($request->all());
    }

    public function show(Factoryuser $factoryuser) 
    {

        return Factoryuser::find($factoryuser);
    }

    public function update(Request $request, Factoryuser $factoryuser) 
    {
        $factoryuser->update($request->all());

        return $factoryuser;
    }

    public function delete($id) 
    {
        $factoryuser = Factoryuser::find($id);
        $factoryuser->delete();

        return $factoryuser;   
    }

}
