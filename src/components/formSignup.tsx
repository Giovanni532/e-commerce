"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { AuthSignup, checkUser } from '@/app/action/authAction'
import { Button, Input } from '@nextui-org/react'
import { authWithGoogle } from '@/db/firebase/auth/authWithGoogle'
import { useRouter } from 'next/navigation'
import ProgressBar from './progress-bar'
import ButtonGoogle from './buttonGoogle'
import { useUserProvider } from '@/provider/userProvider'
import { fetchUserData } from '@/app/action/userAction'
import { setCookie } from 'cookies-next'

interface FormSignupProps {
    handleChange: () => void;
}

const FormSignup = ({ handleChange }: FormSignupProps) => {
    const [formState, setFormState] = useState({ message: {} as Record<string, string>, success: false, loading: false });
    const router = useRouter();
    const { setCurrentUser } = useUserProvider();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState({ ...formState, loading: true });

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const result = await AuthSignup(formData);
        setFormState(result);
        const user = await fetchUserData(result.message.uid);
        setCurrentUser(user);
        setCookie('currentUser', JSON.stringify(user));
        router.refresh();
    }


    const googleSubmit = async () => {
        setFormState({ message: { global: "" }, success: false, loading: true });
        const res = await authWithGoogle();
        setFormState({ ...res });
        if (res.user && res.success) {
            await checkUser(res.user.uid,
                res.user.email ? res.user.email : "",
                res.user.displayName ? res.user.displayName.split(" ")[0] : "",
                res.user.displayName ? res.user.displayName.split(" ")[1] : ""
            );
            const user = await fetchUserData(res.user.uid);
            setCurrentUser(user);
            setCookie('currentUser', JSON.stringify(user));
            router.refresh();
        }
    }

    if (formState.success) {
        setTimeout(() => { router.push('/') }, 2000);
        return <ProgressBar description="Vous allez être redirigée merci de patientez ..." />
    }

    return (
        <>
            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row p-4">
                    <Input
                        className='mx-2'
                        id="prenom"
                        name="prenom"
                        placeholder="Tyler"
                        type="text"
                        label="Prenom"
                        labelPlacement='outside'
                        isInvalid={!!formState.message.prenom}
                        errorMessage={formState.message.prenom}
                    />
                    <Input
                        className='mx-2'
                        id="nom"
                        name='nom'
                        placeholder="Durden"
                        type="text"
                        label="Nom"
                        labelPlacement='outside'
                        isInvalid={!!formState.message.nom}
                        errorMessage={formState.message.nom}
                    />
                </div>
                <Input className='p-4 mx-2'
                    id="email"
                    name="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    label="Email"
                    labelPlacement='outside'
                    isInvalid={!!formState.message.email}
                    errorMessage={formState.message.email}
                />
                <Input
                    className='p-4 mx-2'
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    label="Mot de passe"
                    labelPlacement='outside'
                    isInvalid={!!formState.message.password}
                    errorMessage={formState.message.password}
                />
                {formState.message.erreur && <p className="text-red-500 text-sm text-center mb-2">{formState.message.erreur}</p>}
                <Button
                    variant='solid'
                    color='primary'
                    className="w-full p-4 mx-2"
                    type="submit"
                    isLoading={formState.loading}
                >
                    S&apos;inscrire
                </Button>
            </form>
            <div className="flex flex-col space-y-4">
                {formState.message.global && <p className="text-red-500 text-sm text-center">{formState.message.global}</p>}
                <ButtonGoogle googleSubmit={googleSubmit} />
            </div>
            <p style={{ cursor: "pointer" }} className='text-neutral-600 mt-4 text-center' onClick={handleChange}>Vous avez un compte ?</p>
        </>
    );
}

export default FormSignup;
