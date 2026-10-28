<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForumController;

Route::get('/user', function (Request $request) {
    $user = $request->user();

    return $user->setRelation(
        'roles',
        $user->roles()->pluck('name')->values(),
    );
})->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/health', fn() => response()->json(['status' => 'ok']));
Route::get('/admin/users', [AdminUserController::class, 'index'])
    ->middleware(['web', 'auth:sanctum']);
Route::get('/admin/users/{user}', [AdminUserController::class, 'show'])
    ->middleware(['web', 'auth:sanctum']);
Route::patch('/admin/users/{user}', [AdminUserController::class, 'update'])
    ->middleware(['web', 'auth:sanctum']);
Route::get('/admin/roles', [AdminUserController::class, 'roles'])
    ->middleware(['web', 'auth:sanctum']);
Route::patch('/admin/users/{user}/roles', [AdminUserController::class, 'updateRoles'])
    ->middleware(['web', 'auth:sanctum']);
Route::delete('/admin/users/{user}', [AdminUserController::class, 'destroy'])
    ->middleware(['web', 'auth:sanctum']);
Route::get('/forums', [ForumController::class, 'index'])
    ->middleware(['web', 'auth:sanctum']);
Route::post('/forums', [ForumController::class, 'store'])
    ->middleware(['web', 'auth:sanctum']);
Route::patch('/forums/{forum}', [ForumController::class, 'update'])
    ->middleware(['web', 'auth:sanctum']);
Route::delete('/forums/{forum}', [ForumController::class, 'destroy'])
    ->middleware(['web', 'auth:sanctum']);
Route::get('/forums/{forum}', [ForumController::class, 'show'])
    ->middleware(['web', 'auth:sanctum']);
