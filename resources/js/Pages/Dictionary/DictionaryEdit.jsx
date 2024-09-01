import React, { useState, useEffect } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function DictionaryEdit({ auth, dictionary, message }) {
    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm({
        name: dictionary.name || '',
        type: dictionary.type || '',
        tiny_description: dictionary.tiny_description || '',
        description: dictionary.description || '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, files ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('dictionary.update', dictionary.id), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar Significado</h2>}
        >
            <Head title="Editar Significado" />
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <span style={{color: 'red'}}> * Campos obrigatórios</span>
                                </div>
                                <div>
                                    <label htmlFor="name" className='text-white bg-dark'>Título<span style={{color: 'red'}}> *</span></label>
                                    <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="type" className='text-white bg-dark'>Tipo</label>
                                    <input type="text" name="type" value={data.type} onChange={handleChange} className="mt-1 block w-full" />
                                    {errors.type && <div className="text-red-600">{errors.type}</div>}
                                </div>
                                <div>
                                    <label htmlFor="tiny_description" className='text-white bg-dark'>Texto Curto</label>
                                    <input type="text" name="tiny_description" value={data.tiny_description} onChange={handleChange} className="mt-1 block w-full" />
                                    {errors.tiny_description && <div className="text-red-600">{errors.tiny_description}</div>}
                                </div>
                                <div>
                                    <label htmlFor="description" className='text-white bg-dark'>Texto Longo<span style={{color: 'red'}}> *</span></label>
                                    <input type="text" name="description" value={data.description} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.description && <div className="text-red-600">{errors.description}</div>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton type="submit" className="btn btn-primary" disabled={processing}>Salvar</PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Significado atualizado com sucesso!</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
