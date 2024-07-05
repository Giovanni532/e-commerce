"use client"

import { updateUser } from '@/app/action/userAction';
import { Button, Input } from '@nextui-org/react'
import React, { useCallback, useRef, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Images } from 'lucide-react';
import { uploadImageAndGetUrl } from '@/db/firebase/auth/updateUserImage';
import { useUserProvider } from '@/provider/userProvider';

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
    };
}

export default function FormUpdateUser({ user }: FormUpdateUserProps) {
    const { toast } = useToast();
    const { setUserAndCookie } = useUserProvider();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [formState, setFormState] = useState({
        id: user.id,
        nom: user.nom || '',
        prenom: user.prenom || '',
        adresse: user.adresse || '',
        ville: user.ville || '',
        codePostal: user.codePostal || '',
        image: user.image || '',
        errors: {} as Record<string, string | null>,
        loading: false,
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
        setFormState((prevFormState) => ({
            ...prevFormState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState((prevFormState) => ({ ...prevFormState, loading: true, errors: {} }));

        try {
            const imageUrl = selectedFiles && selectedFiles.length > 0
                ? await uploadImageAndGetUrl(selectedFiles[0], user.id, formState.image)
                : formState.image;

            const updatedFormState = { ...formState, image: imageUrl };
            const res = await updateUser(updatedFormState);

            if (Object.keys(res.errors).length === 0) {
                setUserAndCookie({
                    ...updatedFormState,
                    idFirebase: user.idFirebase,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    role: user.role,
                });
                toast({
                    description: "Modification de votre compte réalisée avec succès",
                });
            }

            setSelectedFiles(null);
            setFormState((prevFormState) => ({ ...updatedFormState, loading: false }));
        } catch (error) {
            console.error("Error updating user:", error);
            setFormState((prevFormState) => ({ ...prevFormState, loading: false, errors: { submit: "Une erreur s'est produite" } }));
        }
    }, [formState, selectedFiles, setUserAndCookie, toast, user]);

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
                    color={!!formState.errors.image ? 'danger' : 'success'}
                    endContent={<Images />}
                    className={!!formState.errors.image ? 'w-full text-white my-2' : 'w-full text-white my-4'}
                    onClick={handleButtonClick}
                >
                    {formState.image.length > 0
                        ? 'Modifier l\'image'
                        : 'Ajouter une image'
                    }
                </Button>
                {selectedFiles && selectedFiles.length > 0 && <p className="text-center text-sm mb-2">Image sélectionnée {selectedFiles[0].name}</p>}
                {formState.errors.image && <p className="text-red-500 text-center text-sm mb-2">Une image est requise</p>}
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
                    {formState.loading ? 'En cours...' : 'Modifier'}
                </Button>
            </div>
        </form>
    )
}
