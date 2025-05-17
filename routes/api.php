<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ReceiptController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::middleware('auth:api')->group(function () {
    Route::get('/receipts', [ReceiptController::class, 'index']); // admin list all
   
    Route::post('/receipts', [ReceiptController::class, 'store']);

});

// ✅ Public access to download PDFs without authentication
Route::get('/receipts/{id}/pdf', [ReceiptController::class, 'generatePdf']);