import { z } from "zod";


export const newArticleSchema = z.object({
    nomProduit: z.string().min(3, {message: "Nom du produit invalide"}),
    taille: z.string().min(1, {message: "Taille invalide"}),
    couleur: z.string().min(1, {message: "Couleur invalide"}),
    etat: z.string().min(1, {message: "Etat invalide"}),
    prix: z.string().min(1, {message: "Prix invalide"}),
    description: z.string().min(10, {message: "Description invalide"}),
    idSousCategorie: z.string().min(1, {message: "Sous categorie invalide"}),
    idCategorie: z.string().min(1, {message: "Categorie invalide"}),
    images: z.any()
})

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