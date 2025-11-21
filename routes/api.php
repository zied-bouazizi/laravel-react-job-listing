<?php

use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::put('/profile/company', [ProfileController::class, 'updateCompany']);

    Route::post('/listings', [ListingController::class, 'store']);
});

Route::get('/listings', [ListingController::class, 'index']);
Route::get('/listings/{listing}', [ListingController::class, 'show']);

require __DIR__ . '/auth.php';
