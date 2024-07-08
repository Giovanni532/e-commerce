import paths from '@/path'
import { CheckCircle } from 'lucide-react'
import React from 'react'
import LinkMenu from './linkMenu';

export default function SuccessContact() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 px-4 md:px-6 mt-20">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <CheckCircle className="h-20 w-20 text-primary dark:text-green-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Votre message a été envoyé avec succès !
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Nous vous remercions pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <LinkMenu text="Retournez à la page d'accueil" isActif={false} isButton={false} href={paths.homePath()} />
            </div>
        </div>
    )
}
