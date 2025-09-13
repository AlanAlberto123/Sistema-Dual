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

Route::middleware('auth:sanctum')->get('/coordinator/me', [CoordinatorController::class, 'me']);



// protegidas por token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:student')->group(function () {
    Route::get('/student/documents', [StudentDocumentController::class,'index']);
    Route::post('/student/documents', [StudentDocumentController::class,'store']);
  });

  // Coordinador
  Route::middleware('role:coordinator')->group(function () {
    Route::get('/coordinator/documents', [CoordinatorDocumentController::class,'index']);          // pendientes
    Route::patch('/coordinator/documents/{document}', [CoordinatorDocumentController::class,'review']); // aprobar/rechazar
  });

  // Descarga/preview (ambos, con policy)
  Route::get('/documents/{document}/download', [DocumentController::class,'download']);
});