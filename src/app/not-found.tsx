import React from 'react'
import Link from "next/link"
import { Compass } from 'lucide-react';
import paths from '@/path';

export default function NotFoundRoot() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 md:px-6">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <Compass className="h-20 w-20 text-red-500 dark:text-red-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Oops, cette page semble introuvable !
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    La page que vous cherchez n&apos;existe pas, pas de soucis nous avons plein d&apos;autres articles sur notre plateforme.
                </p>
                <Link className="text-blue-500 hover:underline" href={paths.homePath()}>
                    Retournez à l&apos;accueil
                </Link>
            </div>
        </div>
    )
}
