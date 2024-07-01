// app/panier/page.tsx
"use client";

import React from 'react';
import StripeProvider from '@/provider/stripeProvider';
import { useStore } from '@/provider/storeProvider';
import PaymentForm from '@/components/paymentsForm';

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
            <div>
                <h1>Panier</h1>
                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <h2>{article.nomProduit}</h2>
                            <p>{article.description}</p>
                            <p>{article.prix} CHF</p>
                            <button onClick={() => removeArticle(article.id)}>Retirer</button>
                        </li>
                    ))}
                </ul>
                <PaymentForm articles={articles} />
            </div>
        </StripeProvider>
    );
}
