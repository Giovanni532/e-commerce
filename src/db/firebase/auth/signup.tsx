import { dbFirebase } from "@/db/index";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(dbFirebase);

interface SignupProps {
    email: string,
    password: string
}

export default async function Signup({ email, password }: SignupProps) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
        error = formatErrorMessage(e);
    }

    return { result, error };
}

function formatErrorMessage(error: FirebaseError): string {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "L'adresse e-mail est déjà utilisée. Veuillez choisir une autre adresse.";
        case "auth/weak-password":
            return "Le mot de passe est trop faible. Veuillez choisir un mot de passe plus fort.";
        default:
            return "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";
    }
}