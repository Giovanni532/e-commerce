import React from 'react'
import Link from "next/link"
import { Compass } from 'lucide-react';
import paths from '@/path';

export default function ArticleNotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 md:px-6">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <Compass className="h-20 w-20 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Oops, cette article est introuvable !</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    La page que vous cherchez n&apos;existe pas, pas de soucis nous avons plein d&apos;autres articles sur notre plateforme.
                </p>
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href={paths.homePath()}
                >
                    Retournez à la page d&apos;accueil
                </Link>
            </div>
        </div>
    )
}
