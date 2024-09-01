import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';

export default function MineralsIndex({ auth, message, minerals }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Você tem certeza que deseja deletar este mineral?')) {
            destroy(route('minerals.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Minerais</h2>}
        >
            <Head title="Minerais" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link href={route('minerals.create')} className="btn btn-primary">
                                <PrimaryButton className='mb-8'>
                                    Adicionar Mineral
                                </PrimaryButton>
                            </Link>
                            {message ? (
                                <p>{message}</p>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center px-6 py-3">ID</th>
                                                <th scope="col" className="text-center px-6 py-3">Nome</th>
                                                <th scope="col" className="text-center px-6 py-3">Fórmula Química</th>
                                                <th scope="col" className="text-center px-6 py-3">Estrutura Cristalina</th>
                                                <th scope="col" className="text-center px-6 py-3">Clivagem</th>
                                                <th scope="col" className="text-center px-6 py-3">Dureza {'(Mohs)'}</th>
                                                <th scope="col" className="text-center px-6 py-3">Cor</th>
                                                <th scope="col" className="text-center px-6 py-3">Traço</th>
                                                <th scope="col" className="text-center px-6 py-3">Brilho</th>
                                                <th scope="col" className="text-center px-6 py-3">Foto</th>
                                                <th scope="col" className="text-center px-6 py-3">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {minerals.map((mineral, index) => (
                                                <tr className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700" key={'i'+index}>
                                                    <td className="px-4 py-4" scope="row">{mineral.id}</td>
                                                    <td className="px-4 py-4" scope="row">{mineral.name}</td>
                                                    <td className="px-4 py-4">{mineral.chemical_formula}</td>
                                                    <td className="px-4 py-4">{mineral.crystal_structure}</td>
                                                    <td className="px-4 py-4">{mineral.cleavage}</td>
                                                    <td className="px-4 py-4">{mineral.hardness}</td>
                                                    <td className="px-4 py-4">{mineral.color}</td>
                                                    <td className="px-4 py-4">{mineral.streak}</td>
                                                    <td className="px-4 py-4">{mineral.luster}</td>
                                                    <td className="px-4 py-4">
                                                        {mineral.photos && (
                                                            <a href={`/storage/${mineral.photos}`} target="_blank" rel="noopener noreferrer">
                                                                <img src={`/storage/${mineral.photos}`} alt={mineral.name} width="50" />
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <Link href={route('minerals.edit', mineral.id)} className="text-blue-500 hover:underline">Editar</Link>
                                                        <button onClick={() => handleDelete(mineral.id)} className="text-red-500 hover:underline ml-4">Deletar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
