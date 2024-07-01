"use client";

import React from 'react';
import StripeProvider from '@/provider/stripeProvider';
import { useStore } from '@/provider/storeProvider';
import PaymentForm from '@/components/paymentsForm';
import { Card } from '@nextui-org/react';
import CardArticleSheet from '@/components/cardArticleSheet';

export default function PanierPage() {
    const { articles, removeArticle } = useStore() as {
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
        removeArticle: (id: number) => void;
    };

    return (
        <StripeProvider>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
                        {articles.map((article) => (
                            <div key={article.id} className='my-5'>
                                <CardArticleSheet article={article} />
                            </div>
                        ))}
                    </div>
                    <Card className='mt-12'>
                        <PaymentForm articles={articles} />
                    </Card>
                </div>
            </div>
        </StripeProvider>
    );
}
