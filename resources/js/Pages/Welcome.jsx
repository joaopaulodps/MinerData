import GuestLayout from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Página Inicial" />
            <GuestLayout 
                {...{auth}}
            >
                <div className="py-12" style={{ 
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {/* Texto adaptável com diferentes tamanhos de tela */}
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontSize: 'clamp(16px, 4vw, 24px)' }}>
                                    {/* Texto completo para dispositivos maiores */}
                                    <p className="hidden sm:block">
                                        Olá, seja bem-vindo ao MinerData! Este site foi criado por estudantes, com o objetivo de compartilhar conhecimento sobre minerais de forma acessível e educativa. Nosso desejo é que você aproveite essa jornada para descobrir as incríveis peculiaridades do mundo mineral.
                                    </p>
                                    <p className="hidden sm:block mt-4">
                                        Os minerais são a base de muitos processos naturais e industriais, desempenhando um papel fundamental na formação das rochas e na composição do nosso planeta. Aqui no MinerData, você poderá explorar as características únicas de diversos minerais, entendendo suas propriedades, usos e importância no nosso dia a dia. Aproveite a viagem por esse fascinante universo!
                                    </p>

                                    {/* Texto curto para dispositivos móveis */}
                                    <p className="block sm:hidden" style={{ fontSize: '20px' }}>
                                        Olá, seja bem-vindo ao MinerData. Este site é produzido por estudantes com a finalidade de passar conhecimento sobre minerais. Aproveite a viagem por aqui!
                                    </p>
                                </div>
                                
                                {/* Botões */}
                                <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                                    <Link 
                                        href={route('guest.mineralsIndex')} 
                                        className="w-full sm:w-4/5 md:w-1/2 lg:w-1/2 relative text-center text-white font-bold py-2 px-4 rounded overflow-hidden transform transition-transform duration-300 hover:scale-105" 
                                        style={{
                                            height: '60px',
                                            backgroundImage: 'url(/storage/photos/background_catalogo.jpeg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem', // Aumentar o tamanho da fonte
                                            textShadow: '0 0 10px rgba(0, 0, 0, 0.7)', // Contorno do texto
                                        }}
                                    >
                                        <div 
                                            className="absolute inset-0 bg-gray-900 opacity-70 transition-opacity duration-300"
                                        ></div>
                                        <span className="relative z-10">Ir para o Catálogo</span>
                                    </Link>

                                    <Link 
                                        href={route('guest.dictionaryIndex')}
                                        className="w-full sm:w-4/5 md:w-1/2 lg:w-1/2 relative text-center text-white font-bold py-2 px-4 rounded overflow-hidden transform transition-transform duration-300 hover:scale-105" 
                                        style={{
                                            height: '60px',
                                            backgroundImage: 'url(/storage/photos/background_dicionario.jpeg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem', // Aumentar o tamanho da fonte
                                            textShadow: '0 0 10px rgba(0, 0, 0, 0.7)', // Contorno do texto
                                        }}
                                    >
                                        <div 
                                            className="absolute inset-0 bg-gray-900 opacity-70 transition-opacity duration-300"
                                        ></div>
                                        <span className="relative z-10">Ir para o Dicionário</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
