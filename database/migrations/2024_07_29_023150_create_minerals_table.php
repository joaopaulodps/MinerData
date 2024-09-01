<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('minerals', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();                   // Nome
            $table->string('chemical_formula')->unique();       // Fórmula Quimica
            $table->string('hardness')->nullable();             // Dureza
            $table->string('crystal_structure')->nullable();    // Estrutura Cristalina
            $table->string('cleavage')->nullable();             // Clivagem
            $table->string('color')->nullable();                // Cor
            $table->string('luster')->nullable();               // Brilho
            $table->string('streak')->nullable();               // Traço
            $table->string('photos')->nullable();               // Imagem
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minerals');
    }
};
