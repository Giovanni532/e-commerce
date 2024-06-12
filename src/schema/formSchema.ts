import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(8, {message: "Email invalide"})
})

const passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")

export const signupSchema = z.object({
    prenom: z.string().min(3, {message: "Prenom invalide"}),
    nom: z.string().min(3, {message: "Nom invalide"}),
    email: z.string().min(8, {message: "Email invalide"}),
    password: z
        .string()
        .min(8, {message: "Votre mot de passe doit au moins contenir 8 caractere"})
})