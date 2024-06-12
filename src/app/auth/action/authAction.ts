"use server"

import { dbPrisma } from "@/db";
import { authWithGoogle } from "@/db/firebase/auth/authWithGoogle";
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
        const errors = validation.error.errors.map((err) => err.message).join(", ");
        return { message: errors, success: false, loading: false };
    }

    const { result, error } = await Signup({ email, password });

    if (error) {
        console.error(error);
        return { message: error, success: false, loading: false };
    } else {
        await dbPrisma.utilisateur.create({
            data: {
                prenom,
                nom,
                email,
            },
        });
        return { message: "Compte crée avec succes", success: true, loading: false };
    }
}

export async function AuthLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const loginData = { email, password };

    const validation = loginSchema.safeParse(loginData);

    if (!validation.success) {
        const errors = validation.error.errors.map((err) => err.message).join(", ");
        return { message: errors, success: false, loading: false };;
    }

    const { result, error } = await Login({ email, password });

    if (error) {
        console.error(error);
        return { message: error, success: false, loading: false };
    } else {
        return { message: "Connexion réussie", success: true, loading: false };
    }
}

export async function AuthGoogle() {
    return await authWithGoogle();
}