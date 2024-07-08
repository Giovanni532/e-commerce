import paths from '@/path'
import { CheckCircle } from 'lucide-react'
import React from 'react'
import LinkMenu from './linkMenu';

interface SuccessCommandeProps {
    isInvited: boolean;
    userId: string | undefined;
}

export default function SuccessCommande({ isInvited, userId }: SuccessCommandeProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-8 px-4 md:px-6">
            <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                <CheckCircle className="h-20 w-20 text-primary dark:text-green-400" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Votre commande a été passée avec succès !
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Merci pour votre achat. Vous recevrez une confirmation par e-mail avec les détails de votre commande.
                </p>
                {isInvited ? (
                    <div className='flex flex-col gap-4'>
                        <p className="text-gray-500 dark:text-gray-400">
                            Vous avez passé cette commande en tant qu&apos;invité. Si vous souhaitez suivre votre commande, veuillez créer un compte.
                        </p>
                        <LinkMenu text="Créé un compte" isActif={true} isButton={true} href={paths.authPath()} />
                    </div>
                ) : (userId && (
                    <div className='flex flex-col gap-4'>
                        <p className="text-gray-500 dark:text-gray-400">
                            Vous pouvez suivre votre commande dans votre profil.
                        </p>
                        <LinkMenu text="Mon compte" isActif={true} isButton={true} href={paths.userProfilePath(userId)} />
                    </div>
                )
                )}
                <LinkMenu text="Retournez à la page d'accueil" isActif={false} isButton={false} href={paths.homePath()} />
            </div>
        </div>
    )
}
