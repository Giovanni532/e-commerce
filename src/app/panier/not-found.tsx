import LinkMenu from '@/components/linkMenu';
import paths from '@/path'
import { Frown } from 'lucide-react';
import React from 'react'

export default function PanierNotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 md:px-6">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <Frown className="h-20 w-20 text-primary dark:text-red-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Votre panier est vide !
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Vous n&apos;avez pas d&apos;articles dans votre panier. Ajoutez des articles pour continuer.
                </p>
                <LinkMenu
                    isButton={false}
                    text="Retournez à la liste des articles"
                    isActif={false}
                    href={paths.articlesPath()}
                />
            </div>
        </div>
    )
}
