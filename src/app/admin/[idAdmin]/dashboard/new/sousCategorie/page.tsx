import { createSousCategorie } from '@/app/action/adminAction'
import { Button, Input } from '@nextui-org/react'
import React from 'react'

export default async function AdminDashboardNewSousCategorie() {
    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
            <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
                Ajoutez une sous-catégorie a votre boutique
            </h2>
            <form className="flex flex-col space-y-4 max-w-md justify-center items-center align-center mx-auto" action={createSousCategorie}>
                <Input
                    id="nomSousCategorie"
                    name="nomSousCategorie"
                    label="Nom de la sous-catégorie"
                    placeholder="Robe, pantalon, t-shirt..."
                    type="text"
                />
                <Button type="submit" color="primary">Ajouter</Button>
            </form>
        </div>
    )
}
