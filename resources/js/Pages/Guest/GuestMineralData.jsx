import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function GuestMineralData({ mineral, auth, nextMineral }) {
    return (
        <>
            <Head title={mineral.name} />
            <GuestLayout {...{ auth }}>
                <div className="py-12" style={{
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col items-center">
                                <div className="w-full flex justify-between mb-4">
                                    <a href={route('guest.mineralsIndex')}>
                                        <SecondaryButton >
                                            Voltar para o Catálogo
                                        </SecondaryButton>
                                    </a>
                                    <a href={`/catalogo/${nextMineral?.name}`}>
                                        <PrimaryButton className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                            Próximo Mineral
                                        </PrimaryButton>
                                    </a>
                                </div>

                                <h1 className="text-3xl font-bold mb-4 text-center">{mineral.name}</h1>

                                {mineral.photos ? (
                                    <a href={`/storage/${mineral.photos}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`/storage/${mineral.photos}`} 
                                            alt={mineral.name}
                                            className="h-64 object-contain"
                                            style={{ width: 'auto' }}
                                        />
                                    </a>
                                ) : (
                                    <div className="flex items-center justify-center h-64 w-64 bg-gray-300 text-gray-700 text-center">
                                        Não tem imagem
                                    </div>
                                )}

                                <div className="mt-6 mb-2 flex flex-col">
                                    <div className="mb-4 flex items-center text-lg">
                                        <strong>Fórmula Química:</strong> <span className='ml-2'>{mineral.chemical_formula}</span>
                                    </div>
                                    <div className="mb-4 flex items-center text-lg">
                                        <strong>Estrutura Cristalina:</strong> <span className='ml-2'>{mineral.crystal_structure}</span>
                                    </div>
                                    <div className='mb-4 flex items-center text-lg'>
                                        <strong>Dureza {'(Mohs)'}:</strong> <span className='ml-2'>{mineral.hardness}</span>
                                    </div>
                                    {mineral.color && 
                                        <div className="mb-4 flex items-center text-lg">
                                            <strong>Cor:</strong> <span className='ml-2'>{mineral.color}</span>
                                        </div>
                                    }
                                    <div className="mb-4 flex items-center text-lg">
                                        <strong>Brilho:</strong> <span className='ml-2'>{mineral.luster}</span>
                                    </div>
                                    <div className="mb-4 flex items-center text-lg">
                                        <strong>Traço:</strong> <span className='ml-2'>{mineral.streak}</span>
                                    </div>
                                    <div className="mb-4 flex items-center text-lg">
                                        <strong>Clivagem:</strong> <span className='ml-2'>{mineral.cleavage}</span>
                                    </div>
                                </div>
                                {/* Botão para subir para o topo */}
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="fixed bottom-4 right-4 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-lg rounded"
                                >
                                    ↑
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
