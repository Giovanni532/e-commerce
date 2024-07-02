"use client";

import React, { useState } from 'react';
import StripeProvider from '@/provider/stripeProvider';
import { useStore } from '@/provider/storeProvider';
import PaymentForm from '@/components/paymentsForm';
import { Button, Card } from '@nextui-org/react';
import { CardArticlePanier } from '@/components/cardArticle';
import { useUserProvider } from '@/provider/userProvider';
import { useRouter } from 'next/navigation';
import paths from '@/path';
import Stepper from '@/components/stepper';
import SuccessCommande from '@/components/successCommande';

export default function PanierPage() {
    const router = useRouter();
    const { currentUser } = useUserProvider();
    const [invitedUser, setInvitedUser] = useState(false)
    const { articles, removeAllArticles } = useStore() as {
        articles: Array<{
            id: number;
            nomProduit: string;
            description: string;
            prix: number;
            taille: string;
            couleur: string;
            etat: string;
            urlsImages: string[];
            idCategorie: number;
            idSousCategorie: number;
        }>;
        removeAllArticles: () => void;
    };
    const [step, setStep] = useState([
        {
            id: 1,
            title: 'Votre panier',
            enCours: invitedUser || currentUser ? false : true,
            valide: invitedUser || currentUser ? true : false,
        },
        {
            id: 2,
            title: 'Informations de paiement',
            enCours: invitedUser || currentUser ? true : false,
            valide: false,
        },
        {
            id: 3,
            title: 'Confirmation de commande',
            enCours: false,
            valide: false,
        },
    ]);

    const handleInvited = () => {
        setInvitedUser(true);
        handleStep(1, false, true);
        handleStep(2, true, false);
    }

    const handleStep = (id: number, enCours: boolean, valide: boolean) => {
        setStep((prevStep) =>
            prevStep.map((s) => {
                if (s.id === id) {
                    return { ...s, enCours, valide };
                }
                return s;
            })
        );
    };

    const totalArticles = articles.reduce((acc, article) => acc + article.prix, 0);

    return (
        <>
            <Stepper step={step} />
            {!step[2].valide ? (
                <StripeProvider>
                    <div className="container mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className='mt-12'>
                                {articles.length === 0 ? (
                                    <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                                        <h1 className="text-2xl font-bold tracking-tighter ">
                                            Votre panier est vide
                                        </h1>
                                    </div>
                                ) : articles.map((article) => (
                                    <>
                                        <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
                                        <div key={article.id} className='my-5'>
                                            <CardArticlePanier article={article} />
                                        </div>
                                    </>
                                ))}
                            </div>
                            <Card className='mt-12'>
                                {invitedUser || currentUser ? (
                                    <PaymentForm articles={articles} prixTotal={totalArticles} user={currentUser} handleStep={handleStep} removeAllArticles={removeAllArticles} />
                                ) : (
                                    <div className='text-center'>
                                        <h2 className="text-2xl font-bold my-5">Vous n&apos;êtes pas connecté</h2>
                                        <p>Pour continuer vous avez deux options :</p>
                                        <div className="flex justify-between max-w-md mx-auto py-5">
                                            <Button
                                                onClick={() => router.push(paths.authPath())}
                                            >
                                                Se connecter
                                            </Button>
                                            <Button
                                                onClick={handleInvited}
                                            >
                                                Continuer sans se connecter
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                </StripeProvider>
            ) : (
                <SuccessCommande isInvited={invitedUser} />
            )}
        </>
    );
}
