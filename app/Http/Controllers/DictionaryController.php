<?php

namespace App\Http\Controllers;
use App\Models\Dictionary;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DictionaryController extends Controller
{
    public function index()
    {
        $dictionary = Dictionary::all();

        if ($dictionary->isEmpty()) {
            return Inertia::render('Dictionary/DictionaryIndex', [
                'auth' => auth()->user(),
                'message' => 'Nenhum significado cadastrado.',
                'dictionary' => []
            ]);
        }
        else{

            $dictionaryData = $dictionary->map(function ($dictionary) {
                return [
                    'id' => $dictionary->id,
                    'name' => $dictionary->name,
                    'type' => $dictionary->type,
                    'tiny_description' => $dictionary->tiny_description,
                    'description' => $dictionary->description,
                    /* 'edit_url' => route('Dictionarys.edit', $Dictionary), */
                ];
            });
            
            return Inertia::render('Dictionary/DictionaryIndex', [
                'auth' => auth()->user(),
                'dictionary' => $dictionaryData,
            ]);
        }
    }

    public function create()
    {
        return Inertia::render('Dictionary/DictionaryCreate', [
            'auth' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tiny_description' => 'required|string',
            'description' => 'required|string',
        ]);

        Dictionary::create($validatedData);

        return redirect()->route('dictionary.create')->with('success', 'Significado cadastrado com sucesso!');
    }

    public function show(Dictionary $dictionary)
    {
        return inertia('Dictionary/Show', compact('dictionary'));
    }

    public function edit($id)
    {
        $dictionary = Dictionary::findOrFail($id);
        return inertia('Dictionary/DictionaryEdit', ['dictionary' => $dictionary]);
    }

    public function update(Request $request, $id)
    {
        $dictionary = Dictionary::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tiny_description' => 'required|string',
            'description' => 'required|string',
        ]);

        $dictionary->update($validated);

        return redirect()->route('dictionary.index')->with('message', 'Significado atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $dictionary = Dictionary::findOrFail($id);

        $dictionary->delete();

        return redirect()->route('dictionary.index')->with('message', 'Significado deletado com sucesso!');
    }
}
