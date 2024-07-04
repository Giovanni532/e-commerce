import { z } from "zod";

export const newArticleSchema = z.object({
    nomProduit: z.string().min(3, { message: "Nom du produit invalide" }),
    taille: z.string().min(1).nullable().refine((val) => val !== null && val !== '', { message: "Taille invalide" }),
    couleur: z.string().min(1).nullable().refine((val) => val !== null && val !== '', { message: "Couleur invalide" }),
    etat: z.string().min(1).nullable().refine((val) => val !== null && val !== '', { message: "Etat invalide" }),
    prix: z.string().min(1, { message: "Prix invalide" }),
    description: z.string().min(10, { message: "Description invalide" }),
    idSousCategorie: z.string().min(1).nullable().refine((val) => val !== null && val !== '', { message: "Sous categorie invalide" }),
    idCategorie: z.string().min(1).nullable().refine((val) => val !== null && val !== '', { message: "Categorie invalide" }),
});

export const loginSchema = z.object({
    email: z.string().min(8, {message: "Email invalide"})
})

export const signupSchema = z.object({
    prenom: z.string().min(3, {message: "Prenom invalide"}),
    nom: z.string().min(3, {message: "Nom invalide"}),
    email: z.string().min(8, {message: "Email invalide"}),
    password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: "Votre mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre"})
})

export const paiementSchema = z.object({
    prenom: z.string().min(3, {message: "Prenom invalide"}),
    nom: z.string().min(3, {message: "Nom invalide"}),
    adresse: z.string().min(3, {message: "Adresse invalide"}),
    email: z.string().min(8, {message: "Email invalide"}),
    codePostal: z.string().min(4, {message: "Code postal invalide"}),
    ville: z.string().min(3, {message: "Ville invalide"}),
});

export const updateUserSchema = z.object({
    prenom: z.string().min(3, {message: "Prenom invalide"}),
    nom: z.string().min(3, {message: "Nom invalide"}),
    adresse: z.string().min(3, {message: "Adresse invalide"}),
    codePostal: z.string().min(4, {message: "Code postal invalide"}),
    ville: z.string().min(3, {message: "Ville invalide"})
});