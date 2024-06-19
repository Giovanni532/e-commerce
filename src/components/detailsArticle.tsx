import { Button, ModalFooter, ModalHeader } from '@nextui-org/react'
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
            <ModalHeader>Details de l'article :</ModalHeader>
            <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                    Fermer
                </Button>
            </ModalFooter>
        </>
    )
}
