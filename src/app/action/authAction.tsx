"use server"

import { dbPrisma } from "@/db";
import Login from "@/db/firebase/auth/login";
import Signup from "@/db/firebase/auth/signup";
import { signupSchema, loginSchema } from "@/schema/formSchema";


export async function AuthSignup(formData: FormData) {
    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signupData = { prenom, nom, email, password };

    const validation = signupSchema.safeParse(signupData);

    if (!validation.success) {
        const errors = validation.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);

        return { user: { user: "" }, message: errors, success: false, loading: false };
    }

    const { uid, error } = await Signup({ email, password });

    if (error) {
        return { user: { user: "" }, message: { erreur: error }, success: false, loading: false };
    } else {
        let idFirebase = uid;
        const userPrisma = await dbPrisma.utilisateur.create({
            data: {
                idFirebase,
                prenom,
                nom,
                email,
            },
        });
        return { user: { userPrisma }, message: { succes: "Compte créé avec succès" }, success: true, loading: false };
    }
}

export async function AuthLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const loginData = { email, password };

    const validation = loginSchema.safeParse(loginData);

    if (!validation.success) {
        const errors = validation.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);
        return { user: { user: null }, message: errors, success: false, loading: false };
    }

    const { result, error } = await Login({ email, password });

    if (error) {
        return { user: { user: null }, message: { erreur: error }, success: false, loading: false };
    } else {
        const user = await dbPrisma.utilisateur.findUnique({
            where: {
                idFirebase: result?.user.uid,
            },
        });
        return { user: user, message: { succes: "Connexion réussie" }, success: true, loading: false };
    }
}

export const checkUser = async (id: string, email: string, prenom: string, nom: string) => {
    try {
        const userExist = await dbPrisma.utilisateur.findUnique({
            where: {
                idFirebase: id,
            },
        });

        if (!userExist) {
            await dbPrisma.utilisateur.create({
                data: {
                    idFirebase: id,
                    email,
                    nom,
                    prenom,
                },
            });
        }
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Unable to connect to the database.");
    }
}
