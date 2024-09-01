<?php

namespace App\Http\Controllers;

use App\Models\Mineral;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Exibe o painel principal.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Contar o número total de minerais cadastrados
        $mineralCount = Mineral::count();

        // Contar o número de minerais que possuem fotos
        $mineralsWithPhotosCount = Mineral::whereNotNull('photos')->count();

        // Contar o número de minerais que não possuem fotos
       $mineralsWithoutPhotosCount = $mineralCount - $mineralsWithPhotosCount;

        // Contar o número de fotos na pasta /public/storage/photos
        $photoDirectory = public_path('storage/photos');
        $photoCount = File::exists($photoDirectory) ? count(File::files($photoDirectory)) : 0;

        // Contar o número total de usuários cadastrados
        $userCount = User::count();

        // Contar o número de usuários que são administradores
        $adminUserCount = User::where('is_admin', true)->count();
        // Retornar a resposta com os dados para o componente Dashboard
        return Inertia::render('Dashboard', [
            'auth' => auth()->user(),
            'mineralCount' => $mineralCount,
            'mineralsWithPhotosCount' => $mineralsWithPhotosCount,
            'mineralsWithoutPhotosCount' => $mineralsWithoutPhotosCount,
            'photoCount' => $photoCount,
            'userCount' => $userCount,
            'adminUserCount' => $adminUserCount,
        ]);
    }
}
