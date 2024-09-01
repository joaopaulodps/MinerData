import React, { useState } from 'react';
import { Link, Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function UsersDashboard({ auth, users }) {
    const { data, setData, post, put, delete: destroy, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: 0, // Valor padrão como "Não"
        user_ids: [],
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    
    // Hook para acessar erros e mensagens da sessão
    const { errors } = usePage().props;

    const handleDelete = () => {
        if (confirm('Você tem certeza que deseja deletar o(s) usuário(s) selecionado(s)?')) {
            destroy(route('users.destroy'), {
                preserveScroll: true,
                onSuccess: () => reset('user_ids'),
            });
        }
    };

    const openModal = (user = null) => {
        setIsEditing(!!user);
        setEditingUserId(user?.id || null);
        setData({
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            password_confirmation: '',
            is_admin: user?.is_admin || 0,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsEditing(false);
        setEditingUserId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editingUserId) {
            if(auth.id == editingUserId && data.is_admin == 0){
                return alert("Não pode retirar o administrador desse usuário");
            }
            else{
                put(route('users.update', editingUserId), { onSuccess: closeModal })
            }
        } else {
            post(route('users.store'), { onSuccess: closeModal });
        }
    };

    const handleCheckboxChange = (id) => {
        setData('user_ids', data.user_ids?.includes(id)
            ? data.user_ids.filter(userId => userId !== id)
            : [...data.user_ids, id]
        );
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-background") {
            closeModal();
        }
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Usuários" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Exibe um alerta caso haja uma mensagem de erro */}
                            {errors && Object.keys(errors).length > 0 && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">

                                        <p >{errors[0]}</p>

                                </div>
                            )}
                            <PrimaryButton onClick={() => openModal()} className="btn btn-primary mb-4 mr-4">Adicionar Usuário</PrimaryButton>
                            <DangerButton onClick={handleDelete} className="btn btn-danger ml-2 mb-4">Deletar Selecionados</DangerButton>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr>
                                        {/* <th className="px-6 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    if (data.user_ids?.length === users?.length) {
                                                        setData('user_ids', []);
                                                    } else {
                                                        setData('user_ids', users.map(user => user.id));
                                                    }
                                                }}
                                                checked={data.user_ids?.length === users?.length}
                                            />
                                        </th> */}
                                        <th className='px-6 py-3'></th>
                                        <th className="px-6 py-3">Nome</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Administrador</th>
                                        <th className="px-6 py-3 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(user.id)}
                                                    checked={data.user_ids?.includes(user.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.is_admin == 1 ? 'Sim' : 'Não'}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => openModal(user)} className="text-blue-500 hover:underline">Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    id="modal-background"
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-white dark:bg-gray-800 p-10 rounded-lg">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            {isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={data.name || ''}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email || ''}
                                    onChange={e => setData('email', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    value={data.password || ''}
                                    onChange={e => setData('password', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder={isEditing ? 'Deixe em branco para manter' : ''}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation || ''}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="mb-4">

                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Administrador
                                </label>
                                <select
                                    value={data.is_admin}
                                    onChange={e => setData('is_admin', parseInt(e.target.value))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    >
                                    <option value={0}>Não</option>
                                    <option value={1}>Sim</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {isEditing ? 'Atualizar' : 'Adicionar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
