<?php

namespace App\Imports;

use App\Models\Mineral;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MineralsImport implements ToCollection, ToModel
{

   /*  protected $failedRows = []; */
    private $current = 0;

    public function collection(Collection $collection)
    {

    }

    public function model(array $row)
    {
        $this->current++;
        if($this->current > 1){
            $mineral = new Mineral;
            $mineral->name = $row[0];
            $mineral->chemical_formula = $row[1];
            $mineral->crystal_structure = $row[2];
            $mineral->cleavage = $row[3];
            $mineral->color = $row[4];
            $mineral->streak = $row[5];
            $mineral->luster = $row[6];
            $mineral->save();
        }
    }

    /* public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            $rowNumber = $index + 2; // Considerando a linha de cabeçalho

            if (!$row['name'] || !$row['chemical_formula'] || Mineral::where('name', $row['name'])->exists() || Mineral::where('chemical_formula', $row['chemical_formula'])->exists()) {
                $this->failedRows[] = $rowNumber;
                continue;
            }

            Mineral::create([
                'name' => $row['name'],
                'chemical_formula' => $row['chemical_formula'],
                'crystal_structure' => $row['crystal_structure'] ?? null,
                'cleavage' => $row['cleavage'] ?? null,
                'color' => $row['color'] ?? null,
                'luster' => $row['luster'] ?? null,
                'streak' => $row['streak'] ?? null,
                'photos' => null, // Gerenciamento de fotos deve ser tratado separadamente
            ]);
        }
    }

    public function getFailedRows()
    {
        return $this->failedRows;
    } */
}
