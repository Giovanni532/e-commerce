import { dbFirebase } from "@/db";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(dbFirebase);

interface LoginProps {
    email: string,
    password: string
}

export default async function Login({ email, password }: LoginProps) {
    let result = null,
        error = null,
        uid = "";
    try {
        result = await signInWithEmailAndPassword(auth, email, password)
        uid = result.user.uid;
    } catch (e: any) {
        error = formatErrorMessage(e);
    }

    return { uid, result, error };
}

function formatErrorMessage(error: FirebaseError): string {
    switch (error.code) {
        case "auth/user-not-found":
            return "Utilisateur non trouvé. Veuillez vérifier vos informations de connexion.";
        case "auth/wrong-password":
            return "Email ou mot de passe incorrect. Veuillez réessayer.";
        default:
            return "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
    }
}