"use client";

import React from 'react';
import { Button, Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';
import ButtonBuy from './buttonBuy';
import { ArrowRight } from 'lucide-react';
import paths from '@/path';
import { useRouter } from 'next/navigation';
import { ButtonWalletOnImage } from './buttonWallet';

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
    const router = useRouter();

    const handlePress = () => {
        router.push(paths.articleDetailPath(article.id.toString()));
    }

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, [isLoaded]);

    return (
        <Card className="space-y-5 p-4" radius="lg" isPressable onPress={handlePress}>
            <div className='relative mx-auto'>
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <div className="absolute top-0 right-0 rounded-xl z-10">
                        <ButtonWalletOnImage article={article} />
                    </div>
                    <Image
                        alt={article.nomProduit}
                        as={NextImage}
                        className="object-cover object-center rounded-xl h-48 z-0"
                        src={article.urlsImages[0]}
                        quality={100}
                        height={300}
                        width={500}
                        priority
                    />
                </Skeleton>
            </div>
            <CardBody className="space-y-3">
                <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                    <h4 className="font-bold text-large">{article.nomProduit}</h4>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                    <small className="text-default-500 pb-1">{article.description}</small>
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                    <p className="text-tiny uppercase font-bold">Prix : {article.prix}CHF</p>
                </Skeleton>
            </CardBody>
            <CardFooter className="justify-between items-center">
                <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                    <ButtonBuy />
                </Skeleton>
                <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                    <Button
                        className="text-tiny"
                        variant="light"
                        color="primary"
                        radius="lg"
                        size="sm"
                        endContent={<ArrowRight className='h-4' />}>
                        Voir plus
                    </Button>
                </Skeleton>
            </CardFooter>
        </Card>
    );
}
