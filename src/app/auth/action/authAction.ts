"use server"

import { dbPrisma } from "@/db";
import { authWithGoogle } from "@/db/firebase/auth/authWithGoogle";
import Login from "@/db/firebase/auth/login";
import Signup from "@/db/firebase/auth/signup";
import { signupSchema, loginSchema } from "@/schema/formSchema";

type FormState = {
    message: string,
    success: boolean
  }

export async function AuthSignup(prevState: FormState, formData: FormData) {
    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signupData = { prenom, nom, email, password };

    const validation = signupSchema.safeParse(signupData);

    if (!validation.success) {
        const errors = validation.error.errors.map((err) => err.message).join(", ");
        return { message: errors, success: false };
    }

    const { result, error } = await Signup({ email, password });

    if (error) {
        console.error(error);
        return { message: error, success: false };
    } else {
        await dbPrisma.utilisateur.create({
            data: {
                prenom,
                nom,
                email,
            },
        });
        return { message: "Votre compte à bien été crée vous allez être rediriger", success: true };
    }
}

export async function AuthLogin(prevState: FormState,formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const loginData = {email, password};

    const validation = loginSchema.safeParse(loginData);

    if (!validation.success) {
        const errors = validation.error.errors.map((err) => err.message).join(", ");
        return { message: errors, success: false };
    }

    const { result, error } = await Login({ email, password });

    if (error) {
        console.error(error);
        return { message: error, success: false };
    } else {
        return { message: "Connexion réussie", success: true };
    }
}

export async function AuthGoogle (){
    return await authWithGoogle();
}