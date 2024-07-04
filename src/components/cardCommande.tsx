"use client";

import React, { useEffect, useState } from 'react'
import { fetchArticlesById } from '@/app/action/adminAction';
import { Button, Card, CardBody, CardHeader, Image, Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import NextImage from 'next/image';
import { useMediaQuery } from 'react-responsive';
import paths from '@/path';
import { useRouter } from 'next/navigation';

interface CardCommandeProps {
    commande: {
        id: number;
        dateCommande: string;
        idUtilisateur: string | null;
        email: string | null;
        statut: string;
        adresse: string;
        ville: string;
        codePostal: string;
        dateLivraison: string;
        prixTotal: number;
        utilisateur: {
            id: string;
            idFirebase: string;
            nom: string | null;
            prenom: string | null;
            email: string | null;
            image: string | null;
            adresse: string | null;
            ville: string | null;
            codePostal: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: string;
        } | null;
        paiements: any[];
        commandeProduits: {
            id: number;
            idCommande: number;
            idProduit: number;
        }[];
    };
}

type Article = {
    id: number,
    nomProduit: string,
    description: string,
    urlsImages: string[],
    prix: number,
    couleur: string,
    taille: string,
    etat: string,
    idCategorie: number,
    idSousCategorie: number
} | null;

export default function CardCommande({ commande }: CardCommandeProps) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' });
    const [articles, setArticles] = useState<Article[]>([]);
    const [articlesLinks, setArticlesLinks] = useState<{ key: number, label: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await Promise.all(
                commande.commandeProduits.map(async (commandeProduit) => {
                    const article = await fetchArticlesById(commandeProduit.idProduit);
                    return article;
                })
            );

            setArticles(fetchedArticles);

            const links = fetchedArticles.map(article => ({
                key: article?.id || 0,
                label: article?.nomProduit || '',
            }));
            setArticlesLinks(links);

            setLoading(false);
        };

        fetchArticles();
    }, [commande.commandeProduits]);

    const handleClick = (id: number) => {
        router.push(paths.articleDetailPath(id.toString()));
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className='flex flex-col md:flex-row mx-auto p-5'>
            <CardHeader className={isTabletOrMobile ? 'max-w-xs w-full' : 'max-w-xs w-1/3'}>
                <Carousel>
                    <CarouselContent>
                        {articles.map((article) => (
                            <CarouselItem key={article?.id} className='flex justify-center'>
                                <Image
                                    as={NextImage}
                                    src={article?.urlsImages[0]}
                                    alt={article?.nomProduit}
                                    objectFit='cover'
                                    objectPosition='center'
                                    layout='responsive'
                                    width={150}
                                    height={150}
                                    className='rounded-xl'
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardHeader >
            <CardBody className='flex flex-col gap-y-2'>
                <p className="text-gray-700">
                    <span className="font-semibold">Nombre d'articles :</span> {commande.commandeProduits.length}
                </p>
                <div className="text-gray-700">
                    <span className="font-semibold">Adresse de livraison :</span><br />
                    <span>{commande.adresse}, {commande.codePostal}, {commande.ville}</span>
                </div>
                <div className="text-gray-700">
                    <span className="font-semibold">Statut de la commande :</span><br />
                    <span>{commande.statut}</span>
                </div>
                <div className="text-gray-700">
                    <span className="font-semibold">Date de livraison prévue le :</span><br />
                    <span>{commande.dateLivraison}</span>
                </div>
                <div className="text-gray-700">
                    <span className="font-semibold">Prix total de la commande :</span><br />
                    <span>{commande.prixTotal} CHF</span>
                </div>
                <div className='flex justify-end'>
                    <Dropdown backdrop="blur">
                        <DropdownTrigger>

                            <Button
                                color='primary'
                                variant='flat'
                                endContent={<ArrowRight />}
                            >
                                Voir les articles
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions" items={articlesLinks}>
                            {(item) => (
                                <DropdownItem
                                    key={item.key}
                                    color="primary"
                                    onClick={() => handleClick(item.key)}
                                >
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                </div>
            </CardBody>
        </Card>
    )
}
