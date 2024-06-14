import { dbFirebase } from "@/db";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(dbFirebase);
const provider = new GoogleAuthProvider();


export const authWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    return {
      user: user,
      message: { global: "" },
      success: true,
      loading: false
    };
  } catch (error: any) {
    let errorMessage = "Une erreur est survenue lors de la connexion.";

    if (error.code) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = "La fenêtre de connexion a été fermée avant la fin du processus.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Problème de réseau. Veuillez vérifier votre connexion internet.";
          break;
        default:
          errorMessage = "Une erreur inconnue est survenue.";
          break;
      }
    }

    return {
      user: null,
      message: { global: errorMessage },
      success: false,
      loading: false
    };
  }
};