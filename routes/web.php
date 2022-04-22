<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login','App\Http\Controllers\Auth\LoginController@showLoginForm')->name('login');
Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login')->name('login');
Route::post('/logout', 'App\Http\Controllers\Auth\LoginController@logout')->name('logout');
Route::get('/register', 'App\Http\Controllers\Auth\RegisterController@register')->name('register');
Route::post('/register', 'App\Http\Controllers\Auth\RegisterController@register')->name('register');

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');

Route::get('/factoryusers/{login_user_id}', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

