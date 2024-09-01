<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MineralController;
use App\Http\Controllers\DictionaryController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/catalogo', [GuestController::class, 'mineralsIndex'])->name('guest.mineralsIndex');
Route::get('/catalogo/{mineral_name}', [GuestController::class, 'mineralShow'])->name('guest.mineralShow');
Route::get('/dicionario', [GuestController::class, 'dictionaryIndex'])->name('guest.dictionaryIndex');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::get('/minerais', [MineralController::class, 'index'])->name('minerals.index');
    Route::get('/minerais/criar', [MineralController::class, 'create'])->name('minerals.create');
    Route::post('/minerais/criar', [MineralController::class, 'store'])->name('minerals.store');
    Route::get('/minerais/id={id}', [MineralController::class, 'edit'])->name('minerals.edit');
    Route::post('/minerais/id={id}', [MineralController::class, 'update'])->name('minerals.update');
    Route::delete('/minerais/id={id}', [MineralController::class, 'destroy'])->name('minerals.destroy');
    Route::post('/minerais/upload', [MineralController::class, 'upload'])->name('minerals.upload');
    Route::post('/minerals/adicionar-foto', [MineralController::class, 'addPhoto'])->name('minerals.addPhoto');

    Route::get('/dicionario', [DictionaryController::class, 'index'])->name('dictionary.index');
    Route::get('/dicionario/criar', [DictionaryController::class, 'create'])->name('dictionary.create');
    Route::post('/dicionario/criar', [DictionaryController::class, 'store'])->name('dictionary.store');
    Route::get('/dicionario/id={id}', [DictionaryController::class, 'edit'])->name('dictionary.edit');
    Route::patch('/dicionario/id={id}', [DictionaryController::class, 'update'])->name('dictionary.update');
    Route::delete('/dicionario/id={id}', [DictionaryController::class, 'destroy'])->name('dictionary.destroy');

    Route::get('/usuarios', [UserController::class, 'index'])->name('users.index');
    Route::post('/usuarios', [UserController::class, 'store'])->name('users.store');
    Route::put('/usuarios/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/usuarios', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/configuracoes', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::post('/configuracoes', [SettingsController::class, 'update'])->name('settings.update');
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__.'/auth.php';
