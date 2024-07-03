"use client"

import React, { useState } from 'react';
import { AuthLogin, checkUser } from '@/app/action/authAction';
import { Button, Divider, Input } from '@nextui-org/react';
import { authWithGoogle } from '@/db/firebase/auth/authWithGoogle';
import { useRouter } from 'next/navigation';
import ProgressBar from './progress-bar';
import ButtonGoogle from './buttonGoogle';
import { useUserProvider } from '@/provider/userProvider'
import { fetchUserData } from '@/app/action/userAction';
import { setCookie } from 'cookies-next';
import { Link } from "@nextui-org/react";

interface FormLoginProps {
    handleChange: () => void;
}

const FormLogin = ({ handleChange }: FormLoginProps) => {
    const [formState, setFormState] = useState({ message: {} as Record<string, string | null>, success: false, loading: false });
    const router = useRouter();
    const { setCurrentUser } = useUserProvider();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState({ ...formState, loading: true });

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const result = await AuthLogin(formData);
        console.log('Result:', result);
        setFormState(result);
        const user = await fetchUserData(result.message.uid)
        if (user) {
            setCurrentUser(user);
            setCookie('currentUser', JSON.stringify(user));
            router.refresh();
        }
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
        return <ProgressBar description="Vous allez être redirigée merci de patientez ..." />;
    }

    return (
        <>
            <form className="mt-10" onSubmit={handleSubmit}>
                <Input
                    className='p-4'
                    color='secondary'
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    label="Email"
                    labelPlacement='outside'
                    isInvalid={!!formState.message.email}
                    errorMessage={formState.message.email}
                />
                <Input
                    className='p-4 mb-2'
                    color='secondary'
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
                    className="w-full"
                    type="submit"
                    isLoading={formState.loading}
                >
                    Se connecter
                </Button>
            </form>
            <Divider className="my-5" />
            <div className="flex flex-col space-y-4">
                {formState.message.global && <p className="text-red-500 text-sm text-center">{formState.message.global}</p>}
                <ButtonGoogle googleSubmit={googleSubmit} />
                <Link color='secondary' className='mx-auto' onClick={handleChange}>Vous n&apos;avez pas de compte ?</Link>
            </div>
        </>
    );
}

export default FormLogin;
