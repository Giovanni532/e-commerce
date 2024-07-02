"use server"

import dbPrisma from "@/db";
import { paiementSchema } from "@/schema/formSchema";

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


export async function createPaiementIntent(articles: any[], idUtilisateur: string, formState: {
    prenom: string;
    nom: string;
    adresse: string;
    email: string;
    codePostal: string;
    ville: string;
    loading: boolean;
    errors: Record<string, string>;
    success: boolean;
}) {
    console.log('articles', articles);
    console.log('idUtilisateur', idUtilisateur);
    console.log('formState', formState);



    const validation = paiementSchema.safeParse(formState);

    if (!validation.success) {
        const errors = validation.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);
        return { ...formState, errors, loading: false };
    } else {
        await dbPrisma.produit.updateMany({
            where: {
                id: {
                    in: articles.map(article => article.id)
                }
            },
            data: {
                etat: 'vendu'
            }
        });

        await dbPrisma.utilisateur.update({
            where: {
                id: idUtilisateur
            },
            data: {
                adresse: formState.adresse,
                ville: formState.ville,
                codePostal: formState.codePostal
            }
        });

        const commande = await dbPrisma.commande.create({
            data: {
                statut: 'en attente',
                adresse: formState.adresse,
                ville: formState.ville,
                codePostal: formState.codePostal,
                dateLivraison: '',
                dateCommande: '',
                prixTotal: articles.reduce((acc, article) => acc + article.prix, 0),
                email: formState.email,
                idUtilisateur
            }
        });

        await dbPrisma.commandeProduit.createMany({
            data: articles.map(article => ({
                idProduit: article.id,
                idCommande: commande.id,
            }))
        });

        await dbPrisma.paiement.create({
            data: {
                idCommande: commande.id,
                datePaiement: commande.dateCommande,
                montant: commande.prixTotal,
                methodePaiement: 'carte de crédit'
            }
        });
        return { ...formState, loading: false, success: true };
    }
}


export async function fetchUserOrders(idUtilisateur: string) {

    const data = await dbPrisma.commande.findMany({
        where: {
            idUtilisateur
        }
    });

    return data;
}