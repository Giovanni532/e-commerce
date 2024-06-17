"use server"

import dbPrisma, { dbSupabase } from "@/db";
import { newArticleSchema } from "@/schema/formSchema";

let categoriesCache: any = null;
let sousCategoriesCache: any = null;

export async function fetchCategories() {
    if (!categoriesCache) {
        const response = await dbPrisma.categorie.findMany();
        categoriesCache = response;
    }
    return categoriesCache;
}

export async function fetchSousCategories() {
    if (!sousCategoriesCache) {
        const response = await dbPrisma.sousCategorie.findMany();
        sousCategoriesCache = response;
    }
    return sousCategoriesCache;
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

        return { errors };
    }

    try {
        const uploadedImages = await Promise.all(Array.from(images).map(async (image) => {
            const { data, error } = await dbSupabase.storage
                .from('e-commerce')
                .upload(`public/${image.name}`, image);

            if (error) {
                console.error('Error uploading image:', error);
                throw new Error('Error uploading image');
            }

            return data?.path ? `https://<your-supabase-url>/storage/v1/object/public/${data.path}` : null;
        }));

        const validImageUrls = uploadedImages.filter(url => url !== null) as string[];

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
                images: {
                    create: validImageUrls.map((urlImage) => ({
                        urlImage
                    }))
                }
            }
        });

        if (!res) {
            return { errors: { global: "Une erreur est survenue, veuillez réessayer." } };
        }

        return { errors: {} };
    } catch (error) {
        console.error('Error creating article:', error);
        return { errors: { global: "Une erreur est survenue, veuillez réessayer." } };
    }
}