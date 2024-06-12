"use server"

import { dbPrisma } from "@/db";
import { authWithGoogle } from "@/db/firebase/auth/authWithGoogle";
import Login from "@/db/firebase/auth/login";
import Signup from "@/db/firebase/auth/signup"

export async function AuthSignup(formData: FormData) {
    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (typeof email !== "string" || typeof password !== "string" || typeof prenom !== "string" || typeof nom !== "string") {
        console.error("Invalid form data");
        return;
    }

    const { result, error } = await Signup({ email, password });

    if (error) {
        console.error(error);
    } else {
        dbPrisma.utilisateur.create({
            data: {
                prenom,
                nom,
                email,
            },
        });
    }
}

export async function AuthLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (typeof email !== "string" || typeof password !== "string") {
        console.error("Invalid form data");
        return;
    }

    const { result, error } = await Login({ email, password });

    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
}


export async function AuthGoogle() {
    const res = await authWithGoogle()

    console.log(res);
}