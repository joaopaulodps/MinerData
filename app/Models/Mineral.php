<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mineral extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'chemical_formula',
        'crystal_structure',
        'cleavage',
        'hardness',
        'color',
        'luster',
        'streak',
        'photos',
    ];

}
