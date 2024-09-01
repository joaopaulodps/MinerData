<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
        /**
     * Exibe a lista de usuários.
     */
    public function index()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return Inertia::render('Users/UsersDashboard', [
                'auth' => auth()->user(),
                'message' => 'Nenhum usuário cadastrado.',
                'users' => []
            ]);
        }
        else{

            $usersData = $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                ];
            });
            
            return Inertia::render('Users/UsersDashboard', [
                'auth' => auth()->user(),
                'users' => $usersData,
            ]);
        }
    }

    /**
     * Cria um novo usuário.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => 'required', 'confirmed',
            'is_admin' => 'required|boolean',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin,
        ]);

        // Redireciona para a lista de usuários com mensagem de sucesso
        return redirect()->route('users.index')->with('message', 'Usuário criado com sucesso!');
    }

    /**
     * Edita um usuário existente.
     */
    public function update(Request $request, $id)
    {
        // Encontra o usuário pelo ID
        $user = User::findOrFail($id);

        // Valida os dados do usuário
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => $request->password ? 'string|min:8|confirmed' : 'nullable',
            'is_admin' => 'required|boolean',
        ]);

        // Atualiza os dados do usuário
        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $request->password ? Hash::make($validatedData['password']) : $user->password,
            'is_admin' => $validatedData['is_admin'],
        ]);

        // Redireciona para a lista de usuários com mensagem de sucesso
        return redirect()->route('users.index')->with('message', 'Usuário atualizado com sucesso!');
    }

    /**
     * Remove um ou vários usuários.
     */
    public function destroy(Request $request)
    {
        // Valida a seleção dos IDs dos usuários para deletar
        $validatedData = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        // Verifica a contagem total de usuários e se a exclusão de todos os usuários foi solicitada
        $totalUsers = User::count();
        $selectedUsersCount = count($validatedData['user_ids']);

        if ($selectedUsersCount >= $totalUsers) {
            // Se tentar excluir todos os usuários, retorne com um erro
            return redirect()->route('users.index')->withErrors('Não é possível excluir todas as contas. Deve haver pelo menos um usuário restante.');
        }

        // Deleta os usuários selecionados
        User::whereIn('id', $validatedData['user_ids'])->delete();

        // Redireciona para a lista de usuários com mensagem de sucesso
        return redirect()->route('users.index')->with('message', 'Usuário(s) deletado(s) com sucesso!');
    }
}
