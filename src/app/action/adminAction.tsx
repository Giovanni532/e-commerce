"use server"

import dbPrisma from "@/db";
import { newArticleSchema } from "@/schema/formSchema";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "@/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/sendEmail";

// Fetch categories, sous-categories, articles and commandes

export async function fetchCategories() {
    const response = await dbPrisma.categorie.findMany();
    return response
}

export async function fetchSousCategories() {
    const response = await dbPrisma.sousCategorie.findMany();
    return response;
}

export async function fetchArticlesAdmin() {
    const response = await dbPrisma.produit.findMany({
        include: {
            sousCategorie: true,
            categorie: true
        }
    });
    return response;
}

export async function fetchArticles() {
    const response = await dbPrisma.produit.findMany({
        include: {
            sousCategorie: true,
            categorie: true
        },
        where: {
            statut: "En vente"
        }
    });
    return response;
}

export async function fetchArticlesById(id: number) {
    const response = await dbPrisma.produit.findFirst({
        where: {
            id
        }
    });
    return response;
}

export async function fetchCommandes() {
    const response = await dbPrisma.commande.findMany({
        include: {
            utilisateur: true,
            commandeProduits: {
                include: {
                    produit: true
                }
            }
        }
    });
    return response;
}


// Create a new article or category

interface FormSousCategorie {
    nomSousCategorie: string;
    loading: boolean;
    errors: string;
    succes: boolean;
}

export async function createSousCategorie(formState: FormSousCategorie) {
    const nomSousCategorie = formState.nomSousCategorie;

    if (nomSousCategorie.length === 0) {
        return { errors: "Veuillez renseigner le nom de la sous-catégorie", loading: false, succes: false };
    }

    const existingSousCategorie = await dbPrisma.sousCategorie.findFirst({
        where: {
            nomSousCategorie
        }
    });

    if (existingSousCategorie) {
        return { errors: "Cette sous-catégorie existe deja", loading: false, succes: false };
    } else {
        await dbPrisma.sousCategorie.create({
            data: {
                nomSousCategorie
            }
        });

        revalidatePath("/");
        revalidatePath("/articles");
        return { errors: "", loading: false, succes: true };
    }
}

interface FormCategorie {
    nomCategorie: string;
    loading: boolean;
    errors: string;
    succes: boolean;
}

export async function createCategorie(formState: FormCategorie) {
    const nomCategorie = formState.nomCategorie;

    if (nomCategorie.length === 0) {
        return { errors: "Veuillez renseigner le nom de la catégorie", loading: false, succes: false };
    }

    const existingCategorie = await dbPrisma.categorie.findFirst({
        where: {
            nomCategorie
        }
    });

    if (existingCategorie) {
        return { errors: "Cette catégorie existe deja", loading: false, succes: false };
    } else {
        await dbPrisma.categorie.create({
            data: {
                nomCategorie
            }
        });

        revalidatePath("/");
        revalidatePath("/articles");
        return { errors: "", loading: false, succes: true };
    }
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
    revalidatePath("/articles");
    return { errors: {}, loading: false };
}

// Delete article or commandes

export async function deleteArticle(id: number) {
    await dbPrisma.produit.delete({
        where: {
            id
        }
    });
    revalidatePath("/");
}

export async function deleteCommande(id: number) {
    await dbPrisma.commande.delete({
        where: {
            id
        }
    });
    revalidatePath("/");
    revalidatePath("/articles");
}

// Update article or commandes

export async function updateArticle(id: number, formState: any) {
    try {

        const res = await dbPrisma.produit.update({
            where: {
                id
            },
            data: {
                nomProduit: formState.nomProduit,
                taille: formState.taille,
                couleur: formState.couleur,
                etat: formState.etat,
                prix: formState.prix,
                description: formState.description,
                idSousCategorie: formState.idSousCategorie,
                idCategorie: formState.idCategorie
            }
        });

        if (!res) {
            throw new Error("Une erreur est survenue.");
        }
    } catch (error) {
        throw new Error("Une erreur est survenue.");
    }
    revalidatePath("/");
    revalidatePath("/articles");
}

type FormUpdateUser = {
    id: number;
    idUtilisateur: string;
    statut: string;
}

export async function updateCommande(id: number, formState: FormUpdateUser) {
    try {
        const res = await dbPrisma.commande.update({
            where: {
                id
            },
            data: {
                statut: formState.statut
            }
        });

        if (!res) {
            throw new Error("Une erreur est survenue.");
        }

        const user = await dbPrisma.utilisateur.findFirst({
            where: {
                id: formState.idUtilisateur
            }
        }) as { email: string };


        const emailContent = `<p>Bonjour,</p><p>Le statut de votre commande a été mis à jour à : ${formState.statut}</p><p>Merci pour votre confiance.</p>`;
        await sendEmail({
            to: user.email,
            subject: 'Mise à jour de votre commande',
            html: emailContent,
        });

    } catch (error) {
        throw new Error("Une erreur est survenue.");
    }
    revalidatePath("/");
    revalidatePath(`/utilisateur/${formState.idUtilisateur}/profile`);
}

// Data for admin dahsboard

export async function fetchDashboardData() {
    const commandes = await dbPrisma.commande.findMany();
    const utilisateurs = await dbPrisma.utilisateur.findMany();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const chiffreAffaires = commandes.reduce((acc, commande) => {
        const commandeMonth = commande.createdAt.getMonth() + 1;
        const commandeYear = commande.createdAt.getFullYear();
        if (commandeMonth === currentMonth && commandeYear === currentYear) {
            acc += commande.prixTotal;
        }
        return acc;
    }, 0);

    const nombreCommandes = commandes.filter((commande) => {
        const commandeMonth = commande.createdAt.getMonth() + 1;
        const commandeYear = commande.createdAt.getFullYear();
        return commandeMonth === currentMonth && commandeYear === currentYear;
    }).length;

    const nombreUtilisateurs = utilisateurs.filter((utilisateur) => {
        const utilisateurMonth = utilisateur.createdAt.getMonth() + 1;
        const utilisateurYear = utilisateur.createdAt.getFullYear();
        return utilisateurMonth === currentMonth && utilisateurYear === currentYear;
    }).length;

    const nombreCommandesLivrees = commandes.filter((commande) => {
        const commandeMonth = commande.createdAt.getMonth() + 1;
        const commandeYear = commande.createdAt.getFullYear();
        return commandeMonth === currentMonth && commandeYear === currentYear && commande.statut === "Livrée";
    }).length;

    return {
        chiffreAffaires,
        nombreCommandes,
        nombreUtilisateurs,
        nombreCommandesLivrees
    };
}