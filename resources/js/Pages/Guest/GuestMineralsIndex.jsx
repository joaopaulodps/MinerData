import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function GuestMineralsIndex({ minerals, auth, message }) {
    const [filteredMinerals, setFilteredMinerals] = useState(minerals.sort((a, b) => a.name.localeCompare(b.name)));
    const [activeLetter, setActiveLetter] = useState('all');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    console.log(filteredMinerals)
    useEffect(() => {
        // Ordena os minerais em ordem alfabética descendente por padrão
        const sortedMinerals = minerals.sort((a, b) => b.name.localeCompare(a.name));
        setFilteredMinerals(sortedMinerals);
    }, [minerals]);

    const filterByLetter = (letter) => {
        const filtered = minerals.filter((mineral) => mineral.name.toUpperCase().startsWith(letter));
        setFilteredMinerals(filtered);
        setActiveLetter(letter);
    };

    const resetFilter = () => {
        // Resetar e reordenar os minerais ao clicar em "Todos"
        const sortedMinerals = minerals.sort((a, b) => b.name.localeCompare(a.name));
        setFilteredMinerals(sortedMinerals);
        setActiveLetter('all');
    };

    return (
        <>
            <Head title="Catálogo" />
            <GuestLayout 
                {...{ auth }}
            >
                <div className="py-12" style={{ 
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-center text-white mt-2">CATÁLOGO</h2>
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {/* Filtro alfabético */}
                                <div className="mb-6 flex flex-wrap justify-center justify-content-around gap-1">
                                    {alphabet.map((letter) => {
                                        const hasMinerals = minerals.some(mineral => mineral.name.toUpperCase().startsWith(letter));
                                        return (
                                            <button
                                                key={letter}
                                                onClick={() => hasMinerals && filterByLetter(letter)}
                                                disabled={!hasMinerals}
                                                className={`px-2 py-1 border rounded text-xs ${
                                                    !hasMinerals
                                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                        : activeLetter === letter
                                                            ? 'bg-orange-500 text-white dark:bg-orange-700'
                                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                                                }`}
                                                style={{ width: 'auto', minWidth: '2rem' }}
                                            >
                                                {letter}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={resetFilter}
                                        className={`px-2 py-1 border rounded text-xs ${
                                            activeLetter === 'all'
                                                ? 'bg-orange-500 text-white dark:bg-orange-700'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        Todos
                                    </button>
                                </div>

                                {/* Linha divisória */}
                                <hr className="border-gray-300 dark:border-gray-600 mb-4" />

                                {/* Ordenar por: */}
                                <div className="flex justify-end mb-4">
                                    <button 
                                        className="text-orange-500 dark:text-orange-400 hover:underline"
                                        onClick={() => setFilteredMinerals([...filteredMinerals].reverse())}
                                    >
                                        Ordenar por nome: {filteredMinerals[0]?.name > filteredMinerals[filteredMinerals.length - 1]?.name ? '↑' : '↓'}
                                    </button>
                                </div>

                                {/* Lista de minerais */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-content-around gap-4 px-4">
                                    {filteredMinerals.length > 0 &&
                                        filteredMinerals.map((mineral, i) => (
                                            <div key={i} className="mb-4 text-center">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                                    <a href={`/catalogo/${mineral.name}`} className="text-white-500 dark:hover:text-orange-500">
                                                        • {mineral.name}
                                                    </a>
                                                </h2>
                                            </div>
                                        ))
                                    }
                                </div>
                                {filteredMinerals.length === 0 && (
                                    <p className="text-white-500 dark:text-white-400 text-center">{message}</p>
                                )}
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
