import React from 'react'
import CardCommande from './cardCommande';

interface CommandeUserProps {
    commandes: {
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
    }[]
}

export default function CommandeUser({ commandes }: CommandeUserProps) {

    const render = commandes.map(commande => {
        return (
            <CardCommande key={commande.id} commande={commande} />
        )
    })
    return (
        <>
            {commandes.length > 0 ? render : <p className='text-center'>Aucune commande</p>}
        </>
    )
}
