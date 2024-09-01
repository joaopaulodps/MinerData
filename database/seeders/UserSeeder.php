<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'João Paulo',
            'email' => 'joaoxmg@gmail.com',
            'password' => '12345678', // Altere a senha conforme necessário
            'is_admin' => 1,
        ]);

        User::create([
            'name' => 'User One',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'), // Altere a senha conforme necessário
            'is_admin' => 1,
        ]);

        User::create([
            'name' => 'User Two',
            'email' => 'user2@example.com',
            'password' => Hash::make('password'), // Altere a senha conforme necessário
            'is_admin' => 0,
        ]);
    }
}
