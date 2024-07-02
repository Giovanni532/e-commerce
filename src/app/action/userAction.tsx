"use server"

import dbPrisma from "@/db";

export async function fetchUserData(idFirebase: string) {

    const data = await dbPrisma.utilisateur.findFirst({
        where: {
            idFirebase: idFirebase
        },
        include: {
            commandes: true
        }
    });

    return data;
}

export async function createPaiementIntent(articles: any[], idUtilisateur: string, formState: any) {

    const commande = await dbPrisma.commande.create({
        data: {
            statut: 'en attente',
            adresse: '',
            ville: '',
            codePostal: '',
            dateLivraison: '',
            dateCommande: '',
            prixTotal: articles.reduce((acc, article) => acc + article.prix, 0),
            idUtilisateur
        }
    });

    const commandeProduit = await dbPrisma.commandeProduit.createMany({
        data: articles.map(article => ({
            idProduit: article.id,
            idCommande: commande.id,
        }))
    });

    const paiement = await dbPrisma.paiement.create({
        data: {
            idCommande: commande.id,
            datePaiement: commande.dateCommande,
            montant: commande.prixTotal,
            methodePaiement: 'carte de crédit'
        }
    });

}


export async function fetchUserOrders(idUtilisateur: string) {

    const data = await dbPrisma.commande.findMany({
        where: {
            idUtilisateur
        }
    });

    return data;
}