import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function MineralsCreate({ auth, message }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        chemical_formula: '',
        crystal_structure: '',
        cleavage: '',
        color: '',
        luster: '',
        streak: '',
        hardness: '',
        photos: null,
        excel_file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, files ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('minerals.store'), {
            onSuccess: () => reset()
        });
    };

    const handleExcelUpload = (e) => {
        e.preventDefault();
        post(route('minerals.upload'), {
            onSuccess: () => reset()
        });
    };
    
    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Cadastrar Mineral</h2>}
        >
            <Head title="Cadastrar Mineral" />
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 ">
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                <div>
                                    <label htmlFor="name" className="text-white bg-dark">Nome</label>
                                    <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="chemical_formula" className="text-white bg-dark">Fórmula Química</label>
                                    <input type="text" name="chemical_formula" value={data.chemical_formula} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.chemical_formula && <div className="text-red-600">{errors.chemical_formula}</div>}
                                </div>
                                <div>
                                    <label htmlFor="crystal_structure" className="text-white bg-dark">Estrutura Cristalina</label>
                                    <input type="text" name="crystal_structure" value={data.crystal_structure} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.crystal_structure && <div className="text-red-600">{errors.crystal_structure}</div>}
                                </div>
                                <div>
                                    <label htmlFor="cleavage" className="text-white bg-dark">Clivagem</label>
                                    <input type="text" name="cleavage" value={data.cleavage} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.cleavage && <div className="text-red-600">{errors.cleavage}</div>}
                                </div>
                                <div>
                                    <label htmlFor="hardness" className="text-white bg-dark">Dureza</label>
                                    <input type="text" name="hardness" value={data.hardness} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.hardness && <div className="text-red-600">{errors.hardness}</div>}
                                </div>
                                <div>
                                    <label htmlFor="color" className="text-white bg-dark">Cor</label>
                                    <input type="text" name="color" value={data.color} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.color && <div className="text-red-600">{errors.color}</div>}
                                </div>
                                <div>
                                    <label htmlFor="luster" className="text-white bg-dark">Brilho</label>
                                    <input type="text" name="luster" value={data.luster} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.luster && <div className="text-red-600">{errors.luster}</div>}
                                </div>
                                <div>
                                    <label htmlFor="streak" className="text-white bg-dark">Traço</label>
                                    <input type="text" name="streak" value={data.streak} onChange={handleChange} required className="mt-1 block w-full" />
                                    {errors.streak && <div className="text-red-600">{errors.streak}</div>}
                                </div>
                                <div>
                                    <label htmlFor="photos" className="text-white bg-dark">Imagem</label>
                                    <input type="file" name="photos" onChange={handleChange} accept=".jpg,.jpeg,.png" className="mt-1 block w-full" />
                                    {errors.photos && <div className="text-red-600">{errors.photos}</div>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton type="submit" className="btn btn-primary" disabled={processing}>Salvar</PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Mineral cadastrado com sucesso!</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 mt-4 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800">
                            <form onSubmit={handleExcelUpload} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="csv_file" className='text-white bg-dark lg'>Adicione Arquivo {'(.csv ou .xlsx | máx. 2mb)'}</label>
                                    <input type="file" name="csv_file" onChange={handleChange} accept=".csv, .xlsx" className="mt-6 mr-2 block w-full" />
                                    {errors.csv_file && <div className="text-red-600 ">{errors.csv_file}</div>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton type="submit" className="btn btn-primary" disabled={processing}>Salvar</PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Minerais cadastrados com sucesso!</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
