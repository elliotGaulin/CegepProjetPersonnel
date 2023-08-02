<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});

//Opérations sur les fichiers
Route::prefix('files')->controller(FileController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', 'store');
        Route::get('/', 'index');
        Route::get('/{file}', 'show');
        Route::delete('/{file}', 'destroy');
        Route::get('/{file}/download', 'download');
    });
    Route::get('public/{file}/download', 'publicDownload');
});
