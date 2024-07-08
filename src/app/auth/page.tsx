import { FormAuth } from "@/components/formAuth";

export default async function AuthPage() {
    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 mt-20">
            <h2 className="font-bold text-center text-xl text-neutral-800">
                Bienvenue sur <span className="text-primary">Mode Revive</span>
            </h2>
            <p className="text-neutral-600 text-center text-sm mt-2">
                Connectez vous pour accéder à votre compte.
            </p>
            <FormAuth />
        </div>
    )
}