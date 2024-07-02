import paths from '@/path'
import { Button } from '@nextui-org/react';
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SuccessCommandeProps {
    isInvited: boolean;
}

export default function SuccessCommande({ isInvited }: SuccessCommandeProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-8 px-4 md:px-6">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <CheckCircle className="h-20 w-20 text-green-500 dark:text-green-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Votre commande a été passée avec succès !
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Merci pour votre achat. Vous recevrez une confirmation par e-mail avec les détails de votre commande.
                </p>
                {isInvited && (
                    <div className='flex flex-col gap-4'>
                        <p className="text-gray-500 dark:text-gray-400">
                            Vous avez passé cette commande en tant qu&apos;invité. Si vous souhaitez suivre votre commande, veuillez créer un compte.
                        </p>
                        <Button as={Link} href={paths.authPath()} size='md'>
                            Créé un compte
                        </Button>
                    </div>
                )}
                <Link className="text-blue-500 hover:underline" href={paths.homePath()}>
                    Retournez à la page d&apos;accueil
                </Link>
            </div>
        </div>
    )
}
