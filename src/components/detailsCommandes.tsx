import { Button, Card, CardBody, ModalBody, ModalFooter, ModalHeader, Image } from '@nextui-org/react'
import NextImage from 'next/image';
import React from 'react'

interface DetailsCommandesProps {
    utilisateur: {
        id: number,
        nom: string,
        prenom: string,
        email: string,
    };
    commandeProduits: {
        id: number,
        idProduit: number,
        idCommande: number,
        produit: {
            couleur: string,
            description: string,
            id: number,
            urlsImages: string[],
            nomProduit: string,
            prix: number,
            statut: string,
            taille: string,
            etat: string,
            idCategorie: number,
            idSousCategorie: number
        }
    }[];
    onClose: () => void;
    id: number;
}

export default function DetailsCommandes({ onClose, commandeProduits, id, utilisateur }: DetailsCommandesProps) {
    console.log(utilisateur)
    return (
        <>
            <ModalHeader>Details de la commande : #{id}</ModalHeader>
            <ModalBody>
                <p>Livraisons pour : {`${utilisateur.nom} ${utilisateur.prenom}`}</p>
                <p>Nombre d'articles commandées : {commandeProduits.length}</p>
                {
                    commandeProduits.map(commandeProduit => (
                        <Card
                            key={commandeProduit.produit.id}
                            isBlurred
                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            as={NextImage}
                                            alt="Album cover"
                                            className="object-cover"
                                            height={200}
                                            shadow="md"
                                            src={commandeProduit.produit.urlsImages[0]}
                                            width={200}
                                        />
                                    </div>

                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0">
                                                <h1 className="font-semibold text-foreground/90">{commandeProduit.produit.nomProduit}</h1>
                                                <p className="text-small text-foreground/80">Couleur : {commandeProduit.produit.couleur}</p>
                                                <h2 className="text-large font-medium mt-2">Etat : {commandeProduit.produit.etat}</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-3 gap-1">
                                            <div className="flex justify-between">
                                                <p className="text-small">Taille : {commandeProduit.produit.taille}</p>
                                                <p className="text-small text-foreground/50">Prix: {commandeProduit.produit.prix}CHF</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </ModalBody>
            <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                    Fermer
                </Button>
            </ModalFooter>
        </>
    )
}
