"use client";

import React from 'react'
import StripeProvider from '@/provider/stripeProvider'
import { useStore } from '@/provider/storeProvider';

export default function PanierPage() {
    const { articles, addArticle, removeArticle } = useStore() as {
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
        addArticle: (article: {
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
        }) => void;
        removeArticle: (id: number) => void;
    };


    return (
        <StripeProvider>
            <div>Panier</div>
        </StripeProvider>
    )
}
