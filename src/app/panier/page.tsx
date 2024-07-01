"use client";

import React, { useState } from 'react';
import StripeProvider from '@/provider/stripeProvider';
import { useStore } from '@/provider/storeProvider';
import PaymentForm from '@/components/paymentsForm';
import { Button, Card } from '@nextui-org/react';
import CardArticleSheet from '@/components/cardArticleSheet';
import { useUserProvider } from '@/provider/userProvider';
import { useRouter } from 'next/navigation';
import paths from '@/path';

export default function PanierPage() {
    const router = useRouter();
    const { currentUser } = useUserProvider();
    const [invitedUser, setInvitedUser] = useState(false)
    const { articles } = useStore() as {
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
    };

    const totalArticles = articles.reduce((acc, article) => acc + article.prix, 0);

    return (
        <StripeProvider>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='mt-12'>
                        <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
                        {articles.map((article) => (
                            <div key={article.id} className='my-5'>
                                <CardArticleSheet article={article} />
                            </div>
                        ))}
                    </div>
                    <Card className='mt-12'>
                        {invitedUser || currentUser ? (
                            <PaymentForm articles={articles} prixTotal={totalArticles} />
                        ) : (
                            <div className='text-center'>
                                <h2 className="text-2xl font-bold my-5">Vous n'êtes pas connecté</h2>
                                <p>Pour continuer vous avez deux options :</p>
                                <div className="flex justify-between mx-20">
                                    <Button
                                        onClick={() => router.push(paths.authPath())}
                                    >
                                        Se connecter
                                    </Button>
                                    <Button
                                        onClick={() => setInvitedUser(true)}
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
    );
}
