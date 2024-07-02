"use client";

import React from 'react';
import { Button, Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';
import ButtonBuy from './buttonBuy';
import { ArrowRight } from 'lucide-react';
import paths from '@/path';
import { useRouter } from 'next/navigation';
import ButtonWalletCard, { ButtonWalletOnImage } from './buttonWallet';
import { AnimatePresence, motion } from 'framer-motion';

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
        <Card className="space-y-1 p-4 mx-auto" radius="lg" isPressable onPress={handlePress}>
            <div className='relative mx-auto'>
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <div className="absolute top-0 right-0 rounded-full z-10" style={{ marginTop: -10, marginRight: -10 }}>
                        <ButtonWalletOnImage article={article} />
                    </div>
                    <Image
                        alt={article.nomProduit}
                        as={NextImage}
                        className="object-cover rounded-xl h-60 z-0"
                        src={article.urlsImages[0]}
                        quality={100}
                        height={700}
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
                        onClick={handlePress}
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

export function CardArticleSheet({ article }: CardArticleProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                key={article.id}
            >
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <div className="relative col-span-6 md:col-span-4 mx-auto">
                                <Image
                                    as={NextImage}
                                    alt={article.nomProduit}
                                    className="object-cover h-24"
                                    height={200}
                                    shadow="sm"
                                    src={article.urlsImages[0]}
                                    width={200}
                                />
                            </div>
                            <div className="flex flex-col col-span-6 md:col-span-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0">
                                        <h1 className="text-large font-medium mt-2">{article.nomProduit}</h1>
                                        <p className="text-small text-foreground/80 pb-2">Prix : {article.prix} CHF</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <ButtonBuy />
                                    <ButtonWalletCard article={article} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}

export function CardArticlePanier({ article }: CardArticleProps) {

    const router = useRouter();

    const handlePress = () => {
        router.push(paths.articleDetailPath(article.id.toString()));
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                key={article.id}
            >
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <div className="relative col-span-6 md:col-span-4 mx-auto">
                                <Image
                                    as={NextImage}
                                    alt={article.nomProduit}
                                    className="object-cover h-40"
                                    height={200}
                                    shadow="sm"
                                    src={article.urlsImages[0]}
                                    width={200}
                                />
                            </div>
                            <div className="flex flex-col col-span-6 md:col-span-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-0">
                                        <h1 className="text-large font-medium pl-2">{article.nomProduit}</h1>
                                        <p className="text-small text-foreground/80 pb-2 pl-2">Prix : {article.prix} CHF</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between py-2">
                                    <ButtonWalletCard article={article} />
                                    <Button
                                        onClick={handlePress}
                                        className="text-tiny"
                                        variant="light"
                                        color="primary"
                                        radius="lg"
                                        size="sm"
                                        endContent={<ArrowRight className='h-4' />}>
                                        Voir plus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}