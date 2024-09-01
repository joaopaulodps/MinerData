import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import NavLink from '@/Components/NavLink';

export default function NotFound({ auth }) {
    return (
        <>
            <Head title="Catálogo" />
            <GuestLayout {...{ auth }}>
                <div className="pt-12" style={{
                    backgroundImage: 'url("/storage/photos/background_not_found.jpeg")', // Substitua pelo caminho da sua imagem
                    backgroundSize: 'cover', // Faz com que a imagem cubra todo o espaço
                    backgroundPosition: 'center', // Centraliza a imagem
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de sobreposição semi-transparente
                    backgroundBlendMode: 'overlay',
                    minHeight: '90vh',
                    display: 'flex', // Adiciona flexbox para centralização
                    alignItems: 'flex-end', // Alinha verticalmente ao centro
                    justifyContent: 'center', // Alinha horizontalmente ao centro
                    
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative">
                        <div className="bg-transparent flex flex-col items-center justify-center h-full relative">
                            {/* Balão de fala */}
                            <div className="absolute bottom-full mb-8 w-64 text-center bg-white text-gray-900 border border-gray-300 rounded-xl p-6 shadow-lg"
                                 style={{ 
                                     position: 'relative',
                                     borderRadius: '100px', // Garante a distância mínima de 40px para o cabeçalho
                                 }}>
                                <p className="text-lg font-semibold">Parece que não tem nada para explorar aqui.</p>
                                <NavLink href={route('guest.mineralsIndex')}><p className="text-lg font-semibold" style={{color: '#FF5722'}}>Vamos olhar os minerais já explorados clicando aqui.</p></NavLink>
                                {/* Triângulo do balão de fala */}
                                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-l-8 border-r-8 border-t-white border-l-transparent border-r-transparent"></div>
                            </div>
                            {/* Imagem */}
                            <img src="/storage/photos/not_found.png" alt="Descrição da Imagem" className="max-w-full" style={{ height: '300px' }} />
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
