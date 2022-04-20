<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index() 
    {
        return User::all();
    }
    
    public function store(array $data) 
    {
            return User::create([
                'name' => $data['name'],
                'user_department' => $data['user_department'],
                'user_official_position' => $data['user_official_position'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        
    }

    public function show($id) 
    {
        // $user_id = Auth::id();

        return User::find($id);
    }
}
