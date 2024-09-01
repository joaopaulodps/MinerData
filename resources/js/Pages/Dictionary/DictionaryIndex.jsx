import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';

export default function DictionaryIndex({ auth, message, dictionary }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Você tem certeza que deseja deletar este texto?')) {
            destroy(route('dictionary.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dicionário</h2>}
        >
            <Head title="Dicionário" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link href={route('dictionary.create')} className="btn btn-primary">
                                <PrimaryButton className='mb-8'>
                                    Adicionar Significado
                                </PrimaryButton>
                            </Link>
                            {message ? (
                                <p>{message}</p>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center px-6 py-3">ID</th>
                                            <th scope="col" className="text-center px-6 py-3">Título</th>
                                            <th scope="col" className="text-center px-6 py-3">Tipo</th>
                                            <th scope="col" className="text-center px-6 py-3">Descrição curta</th>
                                            <th scope="col" className="text-center px-6 py-3">Descrição completa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dictionary.map((dict, index) => (
                                            <tr className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700" key={'i'+index}>
                                                <td className="px-4 py-4" scope="row">{dict.id}</td>
                                                <td className="px-4 py-4" scope="row">{dict.name}</td>
                                                <td className="px-4 py-4">{dict.type}</td>
                                                <td className="px-4 py-4">{dict.tiny_description}</td>
                                                <td className="px-4 py-4">{dict.description}</td>
                                                <td className="px-4 py-4">
                                                    <Link href={route('dictionary.edit', dict.id)} className="text-blue-500 hover:underline">Editar</Link>
                                                    <button onClick={() => handleDelete(dict.id)} className="text-red-500 hover:underline ml-4">Deletar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
