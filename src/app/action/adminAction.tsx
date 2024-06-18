"use server"

import dbPrisma from "@/db";
import { newArticleSchema } from "@/schema/formSchema";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "@/db";
import { revalidatePath } from "next/cache";
import { toast } from "@/components/ui/use-toast";

// Fetch categories, sous-categories, articles and commandes

export async function fetchCategories() {
    const response = await dbPrisma.categorie.findMany();
    return response
}

export async function fetchSousCategories() {
    const response = await dbPrisma.sousCategorie.findMany();
    return response;
}

export async function fetchArticles() {
    const response = await dbPrisma.produit.findMany();
    return response;
}

export async function fetchCommandes() {
    const response = await dbPrisma.commande.findMany({
        include: {
            commandeProduits: {
                include: {
                    produit: true
                }
            }
        }
    });
    return response;
}


// Create a new article

export async function createSousCategorie(formData: FormData) {
    const nomSousCategorie = formData.get("nomSousCategorie") as string;

    await dbPrisma.sousCategorie.create({
        data: {
            nomSousCategorie
        }
    });

    revalidatePath("/");
}

export async function createCategorie(formData: FormData) {
    const nomCategorie = formData.get("nomCategorie") as string;

    await dbPrisma.categorie.create({
        data: {
            nomCategorie
        }
    });

    revalidatePath("/");
}

export async function createArticle(formState: any, formData: FormData) {
    const nomProduit = formData.get("nomProduit") as string;
    const taille = formData.get("taille") as string;
    const couleur = formData.get("couleur") as string;
    const etat = formData.get("etat") as string;
    const prix = formData.get("prix") as string;
    const description = formData.get("description") as string;
    const idSousCategorie = formData.get("idSousCategorie") as string;
    const idCategorie = formData.get("idCategorie") as string;
    const images = formData.getAll("images") as unknown as FileList;

    const article = {
        nomProduit,
        taille,
        couleur,
        etat,
        prix,
        description,
        idSousCategorie,
        idCategorie,
        images
    };

    const validation = newArticleSchema.safeParse(article);

    if (!validation.success) {
        const errors = validation.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);

        return { errors, loading: false };
    }

    try {
        const idImage = (await dbPrisma.produit.findMany()).length;

        const uploadedImageUrls = await Promise.all(Array.from(images).map(async (file) => {
            const storageRef = ref(storage, `e-commerce/produit/${idImage}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        }));

        const res = await dbPrisma.produit.create({
            data: {
                nomProduit,
                taille,
                couleur,
                etat,
                prix: parseFloat(prix),
                description,
                idSousCategorie: parseInt(idSousCategorie),
                idCategorie: parseInt(idCategorie),
                urlsImages: uploadedImageUrls
            }
        });

        if (!res) {
            return { errors: { global: "Une erreur est survenue, veuillez réessayer." }, loading: false };
        }
        revalidatePath("/");
        return { errors: {}, loading: false };
    } catch (error) {
        console.error('Error creating article:', error);
        return { errors: { global: "Une erreur est survenue, veuillez réessayer." }, loading: false };
    }
}