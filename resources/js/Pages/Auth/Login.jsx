import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Entrar" />
            <GuestLayout
                {...status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            >
                <div className="py-12" style={{ 
                    background: 'linear-gradient(135deg, #FF5722, #000000)',
                    minHeight: '100vh',
                }}>
                    <div className="max-w-[600px] mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className='text-2xl mb-4 font-bold text-center'>Entrar</h1>
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="email" value="E-mail" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Senha" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Entrar
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
