"use server"

import dbPrisma from "@/db";
import { getCurrentDate, getDateIn14Days } from "@/lib/dateGenerator";
import { paiementSchema } from "@/schema/formSchema";
import { revalidatePath } from "next/cache";

export async function fetchUserDataWithFirebase(idFirebase: string) {

    const data = await dbPrisma.utilisateur.findFirst({
        where: {
            idFirebase
        },
    });

    return data;
}

export async function fetchUserData(id: string) {

    const data = await dbPrisma.utilisateur.findFirst({
        where: {
            id
        },
    });

    return data;
}


export async function createPaiementIntent(
    articles: any[],
    formState: {
        prenom: string;
        nom: string;
        adresse: string;
        email: string;
        codePostal: string;
        ville: string;
        loading: boolean;
        errors: Record<string, string>;
        success: boolean;
    },
    idUtilisateur?: string,
) {
    const validation = paiementSchema.safeParse(formState);

    if (!validation.success) {
        const errors = validation.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);
        return { ...formState, errors, loading: false };
    } else {
        const updateArticles = await dbPrisma.produit.updateMany({
            where: {
                id: {
                    in: articles.map(article => article.id)
                }
            },
            data: {
                statut: 'Vendu'
            }
        });

        if (idUtilisateur) {
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
        }

        const commande = await dbPrisma.commande.create({
            data: {
                statut: 'En attente',
                adresse: formState.adresse,
                ville: formState.ville,
                codePostal: formState.codePostal,
                dateLivraison: getDateIn14Days(),
                dateCommande: getCurrentDate(),
                prixTotal: articles.reduce((acc, article) => acc + article.prix, 0),
                email: formState.email,
                idUtilisateur: idUtilisateur || null
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
                montant: commande.prixTotal,
                methodePaiement: 'carte de crédit'
            }
        });

        revalidatePath('/');
        return { ...formState, loading: false, success: true };
    }
}



export async function fetchUserOrders(idUtilisateur: string) {
    const data = await dbPrisma.commande.findMany({
        where: {
            idUtilisateur
        },
        include: {
            utilisateur: true,
            paiements: true,
            commandeProduits: true
        }
    });

    return data;
}