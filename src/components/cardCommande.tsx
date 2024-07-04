import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react'

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

export default function CardCommande({ commande }: CardCommandeProps) {
    return (
        <Card>
            <CardHeader>
                <h1>{commande.dateCommande}</h1>
            </CardHeader>
            <CardBody>
                <p>{commande.statut}</p>
                <p>{commande.adresse}</p>
                <p>{commande.ville}</p>
                <p>{commande.codePostal}</p>
                <p>{commande.dateLivraison}</p>
                <p>{commande.prixTotal}</p>
            </CardBody>
        </Card>
    )
}
