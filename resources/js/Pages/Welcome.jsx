import GuestLayout from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Página Inicial" />
            <GuestLayout 
                {...{auth}}
                /* header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Página Inicial</h2>} */
            >
                <div className="py-12" style={{ 
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                colocar alguma coisa aqui
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
