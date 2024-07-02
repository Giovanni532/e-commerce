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

    const handleBuy = () => {
        removeAllExcept(article)
        router.push(paths.panierPath())
    }

    return (
        <Button className="text-tiny text-white" variant="flat" color="primary" radius="lg" size="sm" onClick={handleBuy}>
            Achetez
        </Button>
    )
}
