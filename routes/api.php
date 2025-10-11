<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('/login/student', [AuthController::class, 'loginStudent']);
    Route::post('/login/coordinator', [AuthController::class, 'loginCoordinator']);
    Route::post('/login/admin', [AuthController::class, 'loginAdmin']);
});

Route::middleware(['auth:sanctum','ability:student'])->group(function () {
    // rutas de estudiante...
});

Route::middleware(['auth:sanctum','ability:coordinator'])->group(function () {
    // rutas de coordinador
});

Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    // rutas de admin
});