import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, mineralCount, mineralsWithPhotosCount, mineralsWithoutPhotosCount, photoCount, userCount, adminUserCount }) {

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Caixa 1 - Minerais */}
                            <Link href={route('minerals.index')} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded shadow">
                                <h3 className="text-lg font-semibold">Minerais</h3>
                                <p className="text-sm">Nº minerais cadastrados: {mineralCount}</p>
                                <p className="text-sm">Nº minerais com foto: {mineralsWithPhotosCount}</p>
                                <p className="text-sm">Nº minerais sem foto: {mineralsWithoutPhotosCount}</p>
                            </Link>

                            {/* Caixa 2 - Fotos */}
                            <Link href={route('minerals.index')} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded shadow">
                                <h3 className="text-lg font-semibold">Fotos</h3>
                                <p className="text-sm">Nº de fotos: {photoCount}</p>
                            </Link>

                            {/* Caixa 3 - Usuários */}
                            <Link href={route('users.index')} className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded shadow">
                                <h3 className="text-lg font-semibold">Usuários</h3>
                                <p className="text-sm">Nº de usuários cadastrados: {userCount}</p>
                                <p className="text-sm">Nº de usuários admin: {adminUserCount}</p>
                            </Link>

                            {/* Caixa 4 - Configurações */}
                            <Link href={route('settings.edit')} className="bg-red-500 hover:bg-red-600 text-white p-4 rounded shadow text-center">
                                <h3 className="text-lg font-semibold">Configurações</h3>
                                <p className="text-2xl">⚙️</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
