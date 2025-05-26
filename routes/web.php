<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => view('react'));
Route::get('/register', fn () => view('react'));
Route::get('/dashboard', fn () => view('react'));

// Optional: add receipt/create route early
Route::get('/create-receipt', fn () => view('react'));
Route::get('/manage', fn () => view('react'));
