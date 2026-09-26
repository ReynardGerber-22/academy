<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;

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
Route::get('/health', fn () => response()->json(['status' => 'ok']));
Route::get('/admin/test', fn () => response()->json([
    'message' => 'Super-admin access confirmed.',
]))->middleware(['web', 'auth:sanctum', 'role:super-admin']);
Route::get('/admin/users', [AdminUserController::class, 'index'])
    ->middleware(['web', 'auth:sanctum', 'role:super-admin']);
Route::get('/admin/users/{user}', [AdminUserController::class, 'show'])
    ->middleware(['web', 'auth:sanctum', 'role:super-admin']);
Route::patch('/admin/users/{user}', [AdminUserController::class, 'update'])
    ->middleware(['web', 'auth:sanctum', 'role:super-admin']);
Route::get('/admin/roles', [AdminUserController::class, 'roles'])
    ->middleware(['web', 'auth:sanctum', 'role:super-admin']);
Route::patch('/admin/users/{user}/roles', [AdminUserController::class, 'updateRoles'])
    ->middleware(['web', 'auth:sanctum', 'role:super-admin']);
