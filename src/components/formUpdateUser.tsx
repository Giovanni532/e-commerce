"use client"

import { updateUser } from '@/app/action/userAction';
import { Button, Input, image } from '@nextui-org/react'
import React, { useRef, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Images } from 'lucide-react';

interface FormUpdateUserProps {
    user: {
        id: string;
        idFirebase: string;
        nom: string | null;
        prenom: string | null;
        email: string | null;
        image: string | null;
        adresse: string | null;
        ville: string | null;
        codePostal: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: string;
    } | null
}

export default function FormUpdateUser({ user }: FormUpdateUserProps) {
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [formState, setFormState] = useState({
        nom: user?.nom || '',
        prenom: user?.prenom || '',
        adresse: user?.adresse || '',
        ville: user?.ville || '',
        codePostal: user?.codePostal || '',
        image: user?.image || '',
        errors: {} as Record<string, string | null>,
        loading: false
    });

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState({ ...formState, loading: true, errors: {} });
        // if (!selectedFiles || selectedFiles.length === 0) {
        //     setFormState({ ...formState, errors: { image: 'Une image est requise' }, loading: false });
        //     return;
        // }
        const res = await updateUser(user?.id, { ...formState, loading: true, errors: {} });
        if (Object.keys(res.errors).length === 0) {
            toast({
                description: "Modification avec succès",
            })
        }

        setTimeout(() => setFormState(res), 500);
    }

    return (
        <form className='w-full' onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row max-w-sm mx-auto">
                <Input
                    type='text'
                    name='nom'
                    label='Nom'
                    labelPlacement='outside'
                    onChange={handleChange}
                    isInvalid={!!formState.errors.nom}
                    errorMessage={formState.errors.nom}
                    defaultValue={formState.nom}
                    className='p-2'
                />
                <Input
                    type='text'
                    name='prenom'
                    label='prenom'
                    labelPlacement='outside'
                    onChange={handleChange}
                    isInvalid={!!formState.errors.prenom}
                    errorMessage={formState.errors.prenom}
                    defaultValue={formState.prenom}
                    className='p-2'
                />
            </div>
            <div className="flex flex-col md:flex-row max-w-sm mx-auto">
                <Input
                    type='text'
                    name='codePostal'
                    label='Code Postal'
                    labelPlacement='outside'
                    onChange={handleChange}
                    isInvalid={!!formState.errors.codePostal}
                    errorMessage={formState.errors.codePostal}
                    defaultValue={formState.codePostal}
                    className='p-2'
                />
                <Input
                    type='text'
                    name='ville'
                    label='Ville'
                    labelPlacement='outside'
                    onChange={handleChange}
                    isInvalid={!!formState.errors.ville}
                    errorMessage={formState.errors.ville}
                    defaultValue={formState.ville}
                    className='p-2'
                />
            </div>
            <div className="flex flex-col max-w-sm mx-auto">
                <Input
                    type='text'
                    name='adresse'
                    label='Adresse'
                    labelPlacement='outside'
                    onChange={handleChange}
                    isInvalid={!!formState.errors.adresse}
                    errorMessage={formState.errors.adresse}
                    defaultValue={formState.adresse}
                    className='p-2'
                />
                <Button
                    color={!!formState.errors.images ? 'danger' : 'success'}
                    endContent={<Images />}
                    className={!!formState.errors.images ? 'w-full text-white my-2' : 'w-full text-white my-4'}
                    onClick={handleButtonClick}
                >
                    {selectedFiles && selectedFiles.length > 0
                        ? `${selectedFiles.length} images sélectionnées`
                        : 'Ajoutez une image'}
                </Button>
                {formState.errors.images && <p className="text-red-500 text-center text-sm mb-2">Une image est requise</p>}
                <input
                    type="file"
                    name='image'
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <Button
                    type='submit'
                    color='primary'
                    isDisabled={formState.loading}
                    isLoading={formState.loading}
                    className='m-4'
                >
                    Enregistrer
                </Button>
            </div>
        </form>
    )
}
