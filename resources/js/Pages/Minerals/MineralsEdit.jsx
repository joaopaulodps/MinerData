import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function MineralsEdit({ auth, mineral, message }) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: mineral.name || '',
    chemical_formula: mineral.chemical_formula || '',
    crystal_structure: mineral.crystal_structure || '',
    cleavage: mineral.cleavage || '',
    hardness: mineral.hardness || '',
    color: mineral.color || '',
    luster: mineral.luster || '',
    streak: mineral.streak || '',
    photos: mineral.photos || null,
  });

  const [currentPhoto, setCurrentPhoto] = useState(mineral.photos ? `/storage/${mineral.photos}` : null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData(name, files ? files[0] : value);
};

  const handlePhotoDelete = () => {
    setData('photos', null);
    setCurrentPhoto(null);
    setPreviewPhoto(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('minerals.update', mineral.id), {
        onSuccess: () => reset()
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar Mineral</h2>}>
        <Head title="Editar Mineral" />
        <div className='py-12'>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200">

                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div>
                                <label htmlFor="name" className='text-white bg-dark'>Nome</label>
                                <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 block w-full" />
                                {errors.name && <div className="text-red-600">{errors.name}</div>}
                            </div>
                            <div>
                                <label htmlFor="chemical_formula" className='text-white bg-dark'>Fórmula Química</label>
                                <input type="text" name="chemical_formula" value={data.chemical_formula} onChange={handleChange} required className="mt-1 block w-full" />
                                {errors.chemical_formula && <div className="text-red-600">{errors.chemical_formula}</div>}
                            </div>
                            <div>
                                <label htmlFor="crystal_structure" className='text-white bg-dark'>Estrutura Cristalina</label>
                                <input type="text" name="crystal_structure" value={data.crystal_structure} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.crystal_structure && <div className="text-red-600">{errors.crystal_structure}</div>}
                            </div>
                            <div>
                                <label htmlFor="cleavage" className='text-white bg-dark'>Clivagem</label>
                                <input type="text" name="cleavage" value={data.cleavage} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.cleavage && <div className="text-red-600">{errors.cleavage}</div>}
                            </div>
                            <div>
                                <label htmlFor="hardness" className='text-white bg-dark'>Dureza</label>
                                <input type="text" name="hardness" value={data.hardness} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.hardness && <div className="text-red-600">{errors.hardness}</div>}
                            </div>
                            <div>
                                <label htmlFor="color" className='text-white bg-dark'>Cor</label>
                                <input type="text" name="color" value={data.color} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.color && <div className="text-red-600">{errors.color}</div>}
                            </div>
                            <div>
                                <label htmlFor="luster" className='text-white bg-dark'>Brilho</label>
                                <input type="text" name="luster" value={data.luster} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.luster && <div className="text-red-600">{errors.luster}</div>}
                            </div>
                            <div>
                                <label htmlFor="streak" className='text-white bg-dark'>Traço</label>
                                <input type="text" name="streak" value={data.streak} onChange={handleChange} className="mt-1 block w-full" />
                                {errors.streak && <div className="text-red-600">{errors.streak}</div>}
                            </div>
                            <div>
                                <label htmlFor="photos" className='text-white bg-dark'>Imagem</label>
                                <input type="file" name="photos" onChange={handleChange} accept=".jpg,.jpeg,.png" className="mt-1 block w-full" />
                                {errors.photos && <div className="text-red-600">{errors.photos}</div>}
                            </div>

                            {currentPhoto && (
                                <div className="mt-4">
                                <img src={currentPhoto} alt="Foto atual" className="h-20 w-20 object-cover mb-2" />
                                <SecondaryButton type="button" onClick={handlePhotoDelete} className="text-red-500 hover:underline">Excluir foto</SecondaryButton>
                                </div>
                            )}

                            {previewPhoto && (
                                <div className="mt-4">
                                <img src={previewPhoto} alt="Pré-visualização da foto" className="h-20 w-20 object-cover" />
                                </div>
                            )}

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton type="submit" className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 dark:focus:ring-gray-500 disabled:opacity-25 transition ease-in-out duration-150" disabled={processing}>
                                Atualizar Mineral
                                </PrimaryButton>
                            </div>
                        </form>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="mt-4"
                            >
                            <div className="text-green-600">Mineral atualizado com sucesso!</div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}
