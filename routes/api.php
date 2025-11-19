<?php

use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::put('/profile/company', [ProfileController::class, 'updateCompany']);
});

Route::apiResource('listings', ListingController::class);

require __DIR__ . '/auth.php';
