<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;

Route::prefix('login')->group(function () {
    Route::post('/student',     [AuthController::class, 'loginStudent']);     // /api/login/student
    Route::post('/coordinator', [AuthController::class, 'loginCoordinator']); // /api/login/coordinator
});

// protegidas por token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});