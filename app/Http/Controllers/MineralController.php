<?php

namespace App\Http\Controllers;
use App\Models\Mineral;
use App\Imports\MineralsImport;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\File;
class MineralController extends Controller
{
    public function index()
    {
        $minerals = Mineral::all();

        if ($minerals->isEmpty()) {
            return Inertia::render('Minerals/MineralsIndex', [
                'auth' => auth()->user(),
                'message' => 'Nenhum mineral cadastrado.',
                'minerals' => []
            ]);
        }
        else{

            $mineralsData = $minerals->map(function ($mineral) {
                return [
                    'id' => $mineral->id,
                    'name' => $mineral->name,
                    'chemical_formula' => $mineral->chemical_formula,
                    'crystal_structure' => $mineral->crystal_structure,
                    'cleavage' => $mineral->cleavage,
                    'hardness' => $mineral->hardness,
                    'color' => $mineral->color,
                    'streak' => $mineral->streak,
                    'luster' => $mineral->luster,
                    'photos' => $mineral->photos,
                ];
            });
            
            return Inertia::render('Minerals/MineralsIndex', [
                'auth' => auth()->user(),
                'minerals' => $mineralsData,
            ]);
        }
    }

    public function create()
    {
        return Inertia::render('Minerals/MineralsCreate', [
            'auth' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:minerals',
            'chemical_formula' => 'required|string|max:255|unique:minerals',
            'crystal_structure' => 'nullable|string|max:255',
            'cleavage' => 'nullable|string|max:255',
            'hardness' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'luster' => 'nullable|string|max:255',
            'streak' => 'nullable|string|max:255',
            'photos' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('photos')) {
            // Salva a imagem no diretório storage/app/public/photos
            $path = $request->file('photos')->store('photos', 'public');
            $validatedData['photos'] = $path;
        }

        Mineral::create($validatedData);

        return redirect()->route('minerals.create')->with('success', 'Mineral cadastrado com sucesso!');
    }


    public function upload(Request $request)
    {
        // Validação do arquivo CSV
        $validatedData = $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt,xlsx',
        ]);

        // Obtém o caminho real do arquivo
        $file = $request->file('csv_file');
        $extension = $file->getClientOriginalExtension();

        if ($extension === 'csv' || $extension === 'txt') {
            $path = $file->getRealPath();
            
            // Abrir o arquivo CSV para leitura
            if (($handle = fopen($path, 'r')) !== false) {
                $isFirstLine = true; // Flag para pular o cabeçalho
                while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                    if ($isFirstLine) {
                        $isFirstLine = false; // Pular a primeira linha (cabeçalhos)
                        continue;
                    }

                    // Verificar se os campos obrigatórios (nome e fórmula) estão presentes
                    $name = $row[1] ?? null;
                    $chemical_formula = $row[2] ?? null;

                    if (empty($name) || empty($chemical_formula)) {
                        // Se o nome ou a fórmula estiverem vazios, pular para a próxima linha
                        continue;
                    }

                    // Verificar se o mineral já existe no banco de dados
                    $existingMineral = Mineral::where('name', $name)
                                            ->orWhere('chemical_formula', $chemical_formula)
                                            ->first();

                    if ($existingMineral) {
                        // Se o mineral já existir (por nome ou fórmula), pular para a próxima linha
                        continue;
                    }

                    // Criar um novo mineral com base nos dados do CSV
                    Mineral::create([
                        'name' => $name,                       // Nome do mineral
                        'chemical_formula' => $chemical_formula, // Fórmula química
                        'streak' => $row[3] ?? null,            // Traço
                        'luster' => $row[4] ?? null,            // Brilho
                        'hardness' => $row[5] ?? null,           // Dureza
                        'crystal_structure' => $row[6] ?? null,  // Estrutura cristalina
                        'cleavage' => $row[7] ?? null,          // Clivagem
                        'color' => $row[8] ?? null,             // Cor
                    ]);
                }
                fclose($handle);
            }

        } elseif ($extension === 'xlsx') {
            // Código para importar XLSX usando maatwebsite/excel
            $data = Excel::toArray([], $file);

            $isFirstLine = true; // Flag para pular o cabeçalho
            foreach ($data[0] as $row) {
                if ($isFirstLine) {
                    $isFirstLine = false; // Pular a primeira linha (cabeçalhos)
                    continue;
                }

                $name = $row[1] ?? null;
                $chemical_formula = $row[2] ?? null;

                if (empty($name) || empty($chemical_formula)) {
                    continue;
                }

                $existingMineral = Mineral::where('name', $name)
                    ->orWhere('chemical_formula', $chemical_formula)
                    ->first();

                if ($existingMineral) {
                    continue;
                }

                Mineral::create([
                    'name' => $name,
                    'chemical_formula' => $chemical_formula,
                    'streak' => $row[3] ?? null,            
                    'luster' => $row[4] ?? null,            
                    'hardness' => $row[5] ?? null,           
                    'crystal_structure' => $row[6] ?? null,  
                    'cleavage' => $row[7] ?? null,          
                    'color' => $row[8] ?? null,            
                ]);
            }
        }
        return redirect()->route('minerals.create')->with('success', 'Minerais importados com sucesso!');
    }
        
    public function show(Mineral $mineral)
    {
        return inertia('Minerals/Show', compact('mineral'));
    }

    public function edit($id)
    {
        $mineral = Mineral::findOrFail($id);
        return inertia('Minerals/MineralsEdit', ['mineral' => $mineral]);
    }

    public function update(Request $request, $id)
    {
        $mineral = Mineral::find($id);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:minerals,name,' . $mineral->id,
            'chemical_formula' => 'required|string|max:255|unique:minerals,chemical_formula,' . $mineral->id,
            'crystal_structure' => 'nullable|string|max:255',
            'cleavage' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'luster' => 'nullable|string|max:255',
            'streak' => 'nullable|string|max:255',
            'hardness' => 'nullable|string|max:255',
            'photos' => $request->hasFile('photos') ? 'nullable|image|mimes:jpg,jpeg,png|max:2048' : 'nullable',
        ]);

        // Excluir a foto atual se o campo de fotos estiver vazio (foi removida pelo usuário)
        if($request->photos == null && $mineral->photos != null){
            Storage::disk('public')->delete($mineral->photos);
            $validatedData['photos'] = null; // Remove a referência à foto no banco de dados
        }

        // Substituir a foto se uma nova foi enviada
        if ($request->hasFile('photos')) {
            // Excluir a foto atual se existir
            if ($mineral->photos) {
                Storage::disk('public')->delete($mineral->photos);
            }

            // Salvar a nova imagem
            $path = $request->file('photos')->store('photos', 'public');
            $validatedData['photos'] = $path;
        }

        $mineral->update($validatedData);

        return redirect()->route('minerals.index')->with('message', 'Mineral atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $mineral = Mineral::findOrFail($id);
        if ($mineral->photos) {
            Storage::disk('public')->delete($mineral->photos);
        }
        $mineral->delete();

        return redirect()->route('minerals.index')->with('message', 'Mineral deletado com sucesso!');
    }

}

