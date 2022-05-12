<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FactoryuserController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\ArchiveMemoController;
use App\Http\Controllers\DailyWorkController;
use App\Http\Controllers\StaffDailyWorkController;
use App\Http\Controllers\CompleteWorkCheckController;
use App\Http\Controllers\ManuelController;
use App\Http\Controllers\MedicalHistoryController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\TreatmentRecordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user_id}', [UserController::class, 'show']);

Route::get('/factoryusers', [FactoryuserController::class, 'index']);
Route::post('/factoryusers', [FactoryuserController::class, 'store']);
Route::get('/factoryusers/{factoryuser}', [FactoryuserController::class, 'show']);
Route::put('/factoryusers/{factoryuser}', [FactoryuserController::class, 'update']);
Route::delete('/factoryusers/{factoryuser}', [FactoryuserController::class, 'delete']);

Route::get('/factoryusers/{factoryuser}/records', [RecordController::class, 'index']);
Route::post('/factoryusers/{factoryuser}/records', [RecordController::class, 'store']);
Route::get('/factoryusers/factoryuser/records/{record}', [RecordController::class, 'show']);
Route::put('/factoryusers/factoryuser/records/{record}', [RecordController::class, 'update']);
Route::delete('/factoryusers/factoryuser/records/{record}', [RecordController::class, 'delete']);

Route::get('/factoryusers/{factoryuser}/manuels', [ManuelController::class, 'index']);
Route::post('/factoryusers/{factoryuser}/manuels', [ManuelController::class, 'store']);
Route::get('/factoryusers/manuels/{manuel}', [ManuelController::class, 'show']);
Route::put('/factoryusers/manuels/{manuel}', [ManuelController::class, 'update']);
Route::delete('/factoryusers/manuels/{manuel}', [ManuelController::class, 'delete']);

Route::get('/factoryusers/{factoryuser}/medical_histories', [MedicalHistoryController::class, 'index']);
Route::post('/factoryusers/{factoryuser}/medical_histories', [MedicalHistoryController::class, 'store']);
Route::get('/factoryusers/medical_histories/{medical_history}', [MedicalHistoryController::class, 'show']);
Route::put('/factoryusers/medical_histories/{medical_history}', [MedicalHistoryController::class, 'update']);
Route::delete('/factoryusers/medical_histories/{medical_history}', [MedicalHistoryController::class, 'delete']);

Route::get('/factoryusers/{factoryuser}/treatments', [TreatmentRecordController::class, 'index']);
Route::post('/factoryusers/{factoryuser}/treatments', [TreatmentRecordController::class, 'store']);
Route::get('/factoryusers/treatments/{treatment}', [TreatmentRecordController::class, 'show']);
Route::put('/factoryusers/treatments/{treatment}', [TreatmentRecordController::class, 'update']);
Route::delete('/factoryusers/treatments/{treatment}', [TreatmentRecordController::class, 'delete']);

Route::get('/treatments', [TreatmentController::class, 'index']);
Route::post('/treatments', [TreatmentController::class, 'store']);
Route::get('/treatments/{treatment}', [TreatmentController::class, 'show']);
Route::put('/treatments/{treatment}', [TreatmentController::class, 'update']);
Route::delete('/treatments/{treatment}', [TreatmentController::class, 'delete']);

Route::get('/archives', [ArchiveController::class, 'index']);
Route::post('/archives', [ArchiveController::class, 'store']);
Route::get('/archives/{archive}', [ArchiveController::class, 'show']);
Route::put('/archives/{archive}', [ArchiveController::class, 'update']);
Route::delete('/archives/{archive}', [ArchiveController::class, 'delete']);

Route::get('/memos', [ArchiveMemoController::class, 'index']);
Route::post('/memos', [ArchiveMemoController::class, 'store']);
Route::get('/memos/{memo}', [ArchiveMemoController::class, 'show']);
Route::delete('/memos/{memo}', [ArchiveMemoController::class, 'delete']);

Route::get('/daily_work', [DailyWorkController::class, 'index']);
Route::post('/daily_work', [DailyWorkController::class, 'store']);

Route::get('/staff_daily_work', [StaffDailyWorkController::class, 'index']);
Route::post('/staff_daily_work', [StaffDailyWorkController::class, 'store']);

Route::get('/complete_works', [CompleteWorkCheckController::class, 'index']);
Route::post('/complete_works', [CompleteWorkCheckController::class, 'store']);
Route::get('/complete_works/{complete_work_id}', [CompleteWorkCheckController::class, 'show']);
Route::put('/complete_works/{complete_work_id}', [CompleteWorkCheckController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
