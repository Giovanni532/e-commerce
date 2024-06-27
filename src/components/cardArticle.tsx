"use client"

import React from 'react'
import { Card, Image } from '@nextui-org/react'
import NextImage from 'next/image'

interface CardArticleProps {
    article: {
        id: number,
        nomProduit: string,
        description: string,
        prix: number,
        taille: string,
        couleur: string,
        etat: string,
        urlsImages: string[],
        idCategorie: number,
        idSousCategorie: number
    }
}

export default function CardArticle({ article }: CardArticleProps) {
    return (
        <Card>
            <Image
                src={article.urlsImages[0]}
                as={NextImage}
                width={200}
                height={200}
                priority
                alt={article.nomProduit}
            />
            <h2>{article.nomProduit}</h2>
            <p>{article.description}</p>
            <p>{article.prix}</p>
            <p>{article.taille}</p>
            <p>{article.couleur}</p>
            <p>{article.etat}</p>
            <p>{article.idCategorie}</p>
            <p>{article.idSousCategorie}</p>
        </Card>
    )
}
