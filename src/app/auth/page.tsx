import { FormAuth } from "@/components/formAuth";

export default async function AuthPage() {
    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
            <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
                Bienvenue sur <span className="text-primary">Mode Revive</span>
            </h2>
            <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
                Connectez vous pour accéder à votre compte.
            </p>
            <FormAuth />
        </div>
    )
}