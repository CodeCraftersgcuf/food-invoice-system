<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ReceiptController;
use App\Http\Controllers\API\ManageController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/receipts', [ReceiptController::class, 'index']); // admin list all
    Route::post('/receipts', [ReceiptController::class, 'store']);

    // Management dashboard endpoints (move these inside the same group)
    Route::get('/manage/overview', [ManageController::class, 'overview']);
    Route::get('/manage/invoices', [ManageController::class, 'invoices']);
    Route::get('/manage/clients', [ManageController::class, 'clients']);
    Route::get('/manage/payments', [ManageController::class, 'payments']);
    Route::get('/manage/reports', [ManageController::class, 'reports']);

    // Optionally, add CRUD for manage (reuse existing endpoints or add new as needed)
    Route::post('/manage/invoices', [ManageController::class, 'createInvoice']);
    Route::put('/manage/invoices/{id}', [ManageController::class, 'updateInvoice']);
    Route::delete('/manage/invoices/{id}', [ManageController::class, 'deleteInvoice']);
    Route::post('/manage/invoices/{id}/email', [ManageController::class, 'sendInvoiceEmail']);
    Route::post('/manage/invoices/{id}/mark-status', [ManageController::class, 'markInvoiceStatus']);

    Route::post('/manage/clients', [ManageController::class, 'createClient']);
    Route::put('/manage/clients/{id}', [ManageController::class, 'updateClient']);
    Route::delete('/manage/clients/{id}', [ManageController::class, 'deleteClient']);

    Route::post('/manage/payments', [ManageController::class, 'createPayment']);
    Route::put('/manage/payments/{id}', [ManageController::class, 'updatePayment']);
    Route::delete('/manage/payments/{id}', [ManageController::class, 'deletePayment']);
});

// ✅ Public access to download PDFs without authentication
Route::get('/receipts/{id}/pdf', [ReceiptController::class, 'generatePdf']);