import React, { useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import ButtonBuy from "./buttonBuy";
import ButtonWallet from "./buttonWallet";
import { motion, AnimatePresence } from "framer-motion";

interface CardArticleSheetProps {
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
    };
}

export default function CardArticleSheet({ article }: CardArticleSheetProps) {
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
                            <div className="relative col-span-6 md:col-span-4">
                                <Image
                                    as={NextImage}
                                    alt={article.nomProduit}
                                    className="object-cover h-24"
                                    height={200}
                                    shadow="md"
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
                                    <ButtonWallet article={article} />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
