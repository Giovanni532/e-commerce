"use client"

import paths from '@/path'
import { useStore } from '@/provider/storeProvider'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Article {
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
    }
};


export default function ButtonBuy({ article }: Article) {
    const { removeAllExcept } = useStore() as {
        removeAllExcept: (article: {
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
    };
    const router = useRouter();

    const handleBuy = async () => {
        const page = document.querySelector('.page-transition');

        if (page) {
            page.classList.add('page-transition-exit');
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        removeAllExcept(article);
        router.push(paths.panierPath());

        if (page) {
            await new Promise(resolve => setTimeout(resolve, 500));
            page.classList.remove('page-transition-exit');
            page.classList.add('page-transition-enter');
        }
    }

    return (
        <Button variant="ghost" color="primary" radius="lg" size="sm" onClick={handleBuy}>
            Acheter
        </Button>
    )
}
