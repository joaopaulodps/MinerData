<?php

namespace App\Http\Controllers;
use App\Models\Dictionary;
use App\Models\Mineral;
use Inertia\Inertia;

use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function mineralsIndex()
    {
        $minerals = Mineral::orderBy('name', 'asc')->get();

        if ($minerals->isEmpty()) {
            return Inertia::render('Guest/GuestMineralsIndex', [
                'message' => 'Nenhum mineral encontrado.',
                'minerals' => []
            ]);
        }
        else{
            $mineralsData = $minerals->map(function ($mineral) {
                return [
                    'name' => $mineral->name
                ];
            });
            
            return Inertia::render('Guest/GuestMineralsIndex', [
                'minerals' => $mineralsData,
            ]);
        }
    }

    public function mineralShow($mineral_name)
    {
        // Buscando o mineral com base no nome
        $mineral = Mineral::where('name', $mineral_name)->first();

        // Passando os dados do mineral para o frontend
        if($mineral){
            $nextMineral = Mineral::where('id', '!=', $mineral->id)
            ->inRandomOrder()
            ->first();
            
            $dictionary = Dictionary::all();
            
            return inertia('Guest/GuestMineralData', compact('mineral', 'nextMineral', 'dictionary'));
        }
        else {
            // Se o mineral não existir, renderiza a página de erro personalizada
            return Inertia::render('MineralNotFound', [
                'mineralName' => $mineral_name,
            ]);
        }

    }

    public function dictionaryIndex()
    {
        $dictionary = Dictionary::all();

        if ($dictionary->isEmpty()) {
            return Inertia::render('Guest/GuestDictionaryIndex', [
                'message' => 'Nenhum significado cadastrado.',
                'dictionary' => []
            ]);
        }
        else{
            $dictionaryData = $dictionary->map(function ($d) {
                return [
                    'title' => $d->name,
                    'type' => $d->type,
                    'description' => $d->description,
                ];
            });
            
            return Inertia::render('Guest/GuestDictionaryIndex', [
                'dictionary' => $dictionaryData,
            ]);
        }
    }
}
