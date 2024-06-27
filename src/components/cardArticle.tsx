"use client"

import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Image, Skeleton } from '@nextui-org/react'
import NextImage from 'next/image'
import ButtonBuy from './buttonBuy'
import ButtonWallet from './buttonWallet'
import paths from '@/path'
import { useRouter } from 'next/navigation'

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
    const [isLoaded, setIsLoaded] = React.useState(false);
    const router = useRouter()

    const handlePress = () => {
        router.push(paths.articleDetailPath(article.id.toString()))
    }

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 500)
    }, [isLoaded])

    return (
        <Card className="space-y-5 p-4 md:max-h-[45vh] md:overflow-auto" radius="lg" isPressable onPress={handlePress}>
            <div className='flex mx-auto'>
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <Image
                        alt={article.nomProduit}
                        as={NextImage}
                        className="object-cover object-center rounded-xl h-48"
                        src={article.urlsImages[0]}
                        quality={100}
                        height={300}
                        width={500}
                    />
                </Skeleton>
            </div>
            <CardBody className="space-y-3">
                <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                    <h4 className="font-bold text-large">{article.nomProduit}</h4>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                    <small className="text-default-500 pb-1">Etat : {article.etat}</small>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                    <p className="text-tiny uppercase font-bold">Prix : {article.prix}CHF</p>
                </Skeleton>
            </CardBody>
            <CardFooter className="justify-between">
                <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                    <ButtonBuy />
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                    <ButtonWallet article={article} />
                </Skeleton>
            </CardFooter>
        </Card>
    )
}
