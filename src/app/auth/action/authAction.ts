"use server"

import { authWithGoogle } from "@/db/firebase/auth/authWithGoogle";
import Login from "@/db/firebase/auth/login";
import Signup from "@/db/firebase/auth/signup"

export async function AuthSignup(formData: FormData) {
    console.log(formData)
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        console.error("Invalid form data");
        return;
    }

    const { result, error } = await Signup({ email, password });

    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
}

export async function AuthLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

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