"use client"

import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { createCategorie } from '@/app/action/adminAction'
import { useToast } from '@/components/ui/use-toast';

export default function AdminDashboardNewCategorie() {
    const { toast } = useToast();
    const [formState, setFormState] = React.useState({
        nomCategorie: "",
        loading: false,
        errors: "",
        succes: false
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormState({ ...formState, loading: true, errors: "", succes: false });

        const response = await createCategorie(formState);

        setFormState({ ...formState, ...response });

        if (response.errors.length === 0) {
            toast({
                description: "Catégorie créée avec succès",
            });
        }
    }

    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
            <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
                Ajoutez une catégorie a votre boutique
            </h2>
            <form className="flex flex-col space-y-4 max-w-md justify-center items-center align-center mx-auto" onSubmit={handleSubmit}>
                <Input
                    id="nomCategorie"
                    name="nomCategorie"
                    label="Nom de la catégorie"
                    labelPlacement='outside'
                    placeholder="Homme, femme, enfant..."
                    type="text"
                    onChange={(e) => setFormState({ ...formState, nomCategorie: e.target.value })}
                />
                <span className="text-red-500">{formState.errors}</span>
                <Button
                    type="submit"
                    color="primary"
                    isLoading={formState.loading}
                >
                    Ajouter
                </Button>
            </form>
        </div>
    )
}
