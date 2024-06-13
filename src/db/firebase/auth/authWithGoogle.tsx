import { dbFirebase } from "@/db";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(dbFirebase);
const provider = new GoogleAuthProvider();

export const authWithGoogle = async () => {
  let user = null
  const res = await signInWithPopup(auth, provider)
  user = res.user;

  return user ? { user: user, message: { global: "Connexion réussie" }, success: true, loading: false }
    :
    { user: user, message: { global: "Connexion non réussie" }, success: false, loading: false };
}