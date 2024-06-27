"use client"

import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import ButtonBuy from './buttonBuy'
import ButtonWallet from './buttonWallet'

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
        <Card className="py-4" isPressable>
            <CardHeader className="overflow-visible py-2">
                <Image
                    alt={article.nomProduit}
                    as={NextImage}
                    className="object-cover rounded-xl h-48"
                    src={article.urlsImages[0]}
                    quality={100}
                    height={300}
                    width={400}
                />
            </CardHeader>
            <CardBody className="pb-2 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{article.nomProduit}</h4>
                <small className="text-default-500 pb-1">Etat : {article.etat}</small>
                <p className="text-tiny uppercase font-bold">Prix : {article.prix}CHF</p>
            </CardBody>
            <CardFooter className="justify-between">
                <ButtonBuy />
                <ButtonWallet article={article} />
            </CardFooter>
        </Card>
    )
}
