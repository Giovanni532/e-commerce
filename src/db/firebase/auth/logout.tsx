import { dbFirebase } from "@/db";
import { getAuth } from "firebase/auth";

const auth = getAuth(dbFirebase);

export default async function Logout() {
    try {
        await auth.signOut()
    } catch (e) {
        return "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer.";
    }
}