"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Chrome } from 'lucide-react'
import { AuthLogin } from '@/app/auth/action/authAction'
import { Button } from '@nextui-org/react'
import { authWithGoogle } from '@/db/firebase/auth/authWithGoogle'
import { useRouter } from 'next/navigation'
import ProgressBar from './progress-bar'

interface FormLoginProps {
    handleChange: () => void;
}

const FormLogin = ({ handleChange }: FormLoginProps) => {
    const [formState, setFormState] = useState({ message: '', success: false, loading: false });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState({ ...formState, loading: true });

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const result = await AuthLogin(formData);
        setFormState(result);

        if (result.success) {
            setTimeout(() => {router.push('/')}, 2000);
        }
    }


    const googleSubmit = async () => {
        setFormState({ ...formState, loading: true });
        await authWithGoogle()
            .then(() => {
                setFormState({ ...formState, success: true, loading: false });
            })
            .catch((error) => {
                setFormState({ ...formState, message: error.message, success: false, loading: false });
            });
    }

    if (formState.success) {
        return <ProgressBar title="Redirection en cours ..." description="Vous aller être rediriger vers votre profil"/>
    }

    return (
        <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            <div>{formState.message}</div>
            <Button
                variant='solid'
                color='primary'
                className="w-full"
                type="submit"
                isLoading={formState.loading}
            >
                Se connecter
                <BottomGradient />
            </Button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="flex flex-col space-y-4">
                <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    onClick={googleSubmit}
                >
                    <Chrome className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                    </span>
                    <BottomGradient />
                </button>
            </div>
            <p style={{ cursor: "pointer" }} className='text-neutral-600 mt-4 text-center' onClick={handleChange}>Vous n'avez pas de compte ?</p>
        </form>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default FormLogin;
