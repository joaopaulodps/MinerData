import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Settings({ auth, siteName, logoPath, success }) {
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [loadingCount, setLoadingCount] = useState(0); // Contador para múltiplos carregamentos
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        siteName: siteName || '',
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Inicia o carregamento
        post(route('settings.update'), {
            forceFormData: true, // Permite o envio de arquivos via FormData
            onSuccess: () => {
                // Após o sucesso, simula o congelamento e dois carregamentos seguidos
                setTimeout(() => {
                    setLoadingCount(1); // Primeiro carregamento
                    setTimeout(() => {
                        setLoadingCount(2); // Segundo carregamento
                        setTimeout(() => {
                            window.location.reload(); // Recarrega a página após o segundo carregamento
                        }, 1000); // Tempo do segundo carregamento
                    }, 1000); // Tempo do primeiro carregamento
                }, 1000); // Tempo de congelamento inicial
            },
            onError: () => {
                setLoading(false); // Encerra o carregamento se houver erro
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Configurações do Site" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Configurações do Site</h2>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="siteName" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Nome do Site</label>
                                    <input 
                                        type="text" 
                                        name="siteName" 
                                        value={data.siteName} 
                                        onChange={e => setData('siteName', e.target.value)} 
                                        className="mt-1 block w-full" 
                                        required 
                                    />
                                    {errors.siteName && <div className="text-red-600">{errors.siteName}</div>}
                                </div>
                                <div>
                                    <label htmlFor="logo" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Logo do Site</label>
                                    <input 
                                        type="file" 
                                        name="logo" 
                                        accept="image/*"
                                        onChange={e => setData('logo', e.target.files[0])} 
                                        className="mt-1 block w-full" 
                                    />
                                    {logoPath && (
                                        <a href={`/storage/${logoPath}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`/storage/${logoPath}`} alt="Logo atual" className="h-24 mt-4" />
                                        </a>
                                    )}
                                    {errors.logo && <div className="text-red-600">{errors.logo}</div>}
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        className="mr-4"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Configurações Salvas!</p>
                                    </Transition>
                                    <PrimaryButton type="submit" className="btn btn-primary" disabled={processing || loading}>
                                        {loading ? 'Salvando...' : 'Salvar'}
                                    </PrimaryButton>
                                </div>
                                {loadingCount > 0 && (
                                    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${loadingCount === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                        <div className="text-white text-lg">{loadingCount === 1 ? 'Carregando...' : 'Atualizando...'}</div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
