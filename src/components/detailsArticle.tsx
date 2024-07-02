import { Button, Card, CardBody, ModalBody, ModalFooter, ModalHeader, Image } from '@nextui-org/react'
import NextImage from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react'

interface DetailsArticleProps {
    article: {
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
    };
    onClose: () => void;
}

export default function DetailsArticle({ onClose, article }: DetailsArticleProps) {
    return (
        <>
            <ModalHeader>Details de l&apos;article : {article.nomProduit}</ModalHeader>
            <ModalBody>
                <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                        {article.urlsImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card
                                        className="border-none h-[400px]"
                                        shadow='sm'
                                    >
                                        <CardBody className="flex items-center justify-center ">
                                            <Image
                                                as={NextImage}
                                                alt={`Image ${index} de l'article ${article.nomProduit}`}
                                                height={400}
                                                shadow="sm"
                                                src={image}
                                                width={200}
                                            />
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm max-w-sm mx-auto">
                                    <p className="text-blakc-700 font-semibold mb-2">Prix : {article.prix} CHF</p>
                                    <p className="text-gray-500 mb-2">Couleur : {article.couleur}</p>
                                    <p className="text-gray-500 mb-2">Taille : {article.taille}</p>
                                    <p className="text-gray-500 mb-2">État : {article.etat}</p>
                                    <p className="text-gray-700 mb-2">Description : {article.description}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                    Fermer
                </Button>
            </ModalFooter>
        </>
    )
}
