import paths from '@/path'
import { Frown } from 'lucide-react';
import Link from 'next/link'
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
                <Link className="text-primary hover:underline" href={paths.articlesPath()}>
                    Cherchez un article qui me convient
                </Link>
            </div>
        </div>
    )
}
