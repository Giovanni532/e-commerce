"use client"

import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/db';
import { Input, Button } from '@nextui-org/react';
import { forgotPassword } from '@/app/action/userAction';
import LinkMenu from '@/components/linkMenu';
import paths from '@/path';

export default function ForgotPasswordPage() {

    const [formState, setFormState] = useState({
        email: '',
        error: '',
        success: false,
        loading: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const forgotPasswordAction = forgotPassword.bind(null, formState.email);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormState({ ...formState, loading: true, error: '' });
        const result = await forgotPasswordAction();
        if (result.success) {
            await sendPasswordResetEmail(auth, formState.email);
            setFormState({
                ...formState,
                loading: false,
                success: true,
                error: '',
            });
        } else {
            setFormState({
                ...formState,
                loading: false,
                success: false,
                error: 'Une erreur est survenue lors de la demande de réinitialisation.',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-3xl font-semibold text-center text-gray-800 my-4">Mot de passe oublié</h1>
            <p className="text-lg text-center text-gray-600 mb-6">Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id='email'
                    type="email"
                    name="email"
                    label="Adresse email"
                    labelPlacement="outside"
                    value={formState.email}
                    onChange={handleChange}
                    isRequired
                    fullWidth
                    className="block w-full px-3 py-2"
                />
                <Button type="submit" color="primary" fullWidth>Envoyer</Button>
                {formState.success && <div className='text-center space-y-2'>
                    <p className="text-primary text-center mt-4">Un email de réinitialisation a été envoyé à votre adresse.</p>
                    <LinkMenu href={paths.authPath()} text="Retournez à la page de connexion" isActif={false} isButton={false} />
                </div>
                }
                {formState.error && <p className="text-red-500 text-center mt-4">{formState.error}</p>}
            </form>
        </div>
    );
};

