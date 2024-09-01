import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Guest({ user, header, children, auth }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen">
            <nav
    className="relative border-b border-gray-200 dark:border-gray-700"
    style={{
        background: 'linear-gradient(135deg, rgba(255, 87, 34, 1), rgba(0, 0, 0, 1))'
    }}
>
                <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 overflow-hidden shadow-sm ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                    </Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('guest.mineralsIndex')} active={route().current('guest.mineralsIndex')}>
                                        Catálogo
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('guest.dictionaryIndex')} active={route().current('guest.dictionaryIndex')}>
                                        Dicionário
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        {auth?.user == null
                                            ?
                                            <NavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('login')}>
                                                Entrar
                                            </NavLink>
                                            :
                                            <NavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('dashboard.index')}>
                                                Dashboard
                                            </NavLink>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('guest.mineralsIndex')} active={route().current('guest.mineralsIndex')}>
                            Catálogo
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('guest.dictionaryIndex')} active={route().current('guest.dictionaryIndex')}>
                            Dicionário
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200"></div>
                            <div className="font-medium text-sm text-gray-500"></div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {
                                auth?.user == null
                                ?
                                <ResponsiveNavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('login')}>Entrar</ResponsiveNavLink>
                                :
                                <ResponsiveNavLink style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} href={route('dashboard.index')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
