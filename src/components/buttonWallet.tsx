"use client";

import { useStore } from '@/provider/storeProvider';
import { Button } from '@nextui-org/react';
import React from 'react';
import { ShoppingBasket } from 'lucide-react';

interface ButtonWalletProps {
    article: {
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
    },
}

export default function ButtonWalletCard({ article }: ButtonWalletProps) {
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

    const isInCart = articles.some(existingArticle => existingArticle.id === article.id);

    const handleAdd = () => {
        addArticle(article);
    };

    const handleRemove = () => {
        removeArticle(article.id);
    };

    if (isInCart) {
        return (
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="primary" radius="lg" size="sm" onClick={handleRemove}>
                Retirer du panier
            </Button>
        );
    }

    return (
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="primary" radius="lg" size="sm" onClick={handleAdd}>
            Ajoutez au panier
        </Button>
    );
}

export function ButtonWalletOnImage({ article }: ButtonWalletProps) {
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

    const isInCart = articles.some(existingArticle => existingArticle.id === article.id);

    const handleAdd = () => {
        addArticle(article);
    };

    const handleRemove = () => {
        removeArticle(article.id);
    };

    return (
        <Button isIconOnly variant="solid" radius="lg" size="md" onClick={isInCart ? handleRemove : handleAdd}>
            <div style={isInCart ? { position: 'absolute', left: 0, width: '100%', height: 2, backgroundColor: 'black', transform: 'rotate(-45deg)' } : { position: 'relative' }} />
            <ShoppingBasket />
        </Button>
    );
}