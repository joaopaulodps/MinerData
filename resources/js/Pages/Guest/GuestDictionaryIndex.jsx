import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function GuestDictionaryIndex({ auth, dictionary, message }) {
    return (
        <>
            <Head title="Dicionário" />
            <GuestLayout 
                {...{auth}}
            >
                <div className="py-12" style={{ 
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <h2 className='text-2xl font-bold mb-4 text-center text-white mt-2'>DICIONÁRIO</h2>
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {dictionary.length > 0 ? (
                                    dictionary.map((d, i) => (
                                        <div key={i} className="mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {d.title}
                                            </h2>
                                            {d.type &&
                                                <p className="text-base text-gray-700 dark:text-white mb-2">
                                                    Tipo de característica: {d.type}
                                                </p>
                                            }
                                            <p className="text-base text-gray-700 dark:text-white">
                                                {d.description}
                                            </p>
                                            {i < dictionary.length - 1 && <hr className="my-6 border-gray-300 dark:border-gray-700" />}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white-500 dark:text-white-400 text-center">{message}</p>
                                )}
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
            </GuestLayout>
        </>
    );
}
