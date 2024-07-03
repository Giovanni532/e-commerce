'use client';

import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Input } from '@nextui-org/react';
import { createPaiementIntent } from '@/app/action/userAction';

interface PaymentFormProps {
    articles: any[];
    prixTotal: number;
    user: {
        id: string;
        idFirebase: string;
        nom: string | null;
        prenom: string | null;
        email: string | null;
        image: string | null;
        adresse: string | null;
        codePostal: string | null;
        ville: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: string;
    } | null;
    handleStep: (id: number, enCours: boolean, valide: boolean) => void;
    removeAllArticles: () => void;
}

const PaymentForm = ({ articles, prixTotal, user, handleStep, removeAllArticles }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        prenom: user?.prenom || '' as string,
        nom: user?.nom || '' as string,
        adresse: user?.adresse || '' as string,
        email: user?.email || '' as string,
        codePostal: user?.codePostal || '' as string,
        ville: user?.ville || '' as string,
        loading: false,
        errors: {} as Record<string, string>,
        success: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            loading: true,
        }));

        try {
            const response = await fetch('/api/stripe-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articles })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Une erreur est survenue lors de la création du paiement.');
            }

            const { clientSecret } = data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: `${formData.prenom} ${formData.nom}`,
                        address: {
                            line1: formData.adresse,
                            postal_code: formData.codePostal,
                            city: formData.ville,
                            country: 'CH',
                        },
                    },
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message || 'Une erreur est survenue lors du paiement.');
            } else {
                if (result.paymentIntent?.status === 'succeeded') {
                    const response = await createPaiementIntent(articles, { ...formData, errors: {} }, user?.id);
                    handleStep(2, false, true);
                    setFormData(response);
                    if (response.success) {
                        removeAllArticles();
                        handleStep(3, false, true);
                    }
                }
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (errorMessage.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                loading: false,
            }))
        }
    }, [errorMessage]);

    return (
        <form onSubmit={handleSubmit} className='gap-4 p-5'>
            <h1 className="text-2xl text-center font-bold text-primary">Vos informations</h1>
            <div className="flex space-x-4">
                <Input
                    type="text"
                    name="prenom"
                    label="Prénom"
                    labelPlacement='outside'
                    value={formData.prenom}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.prenom}
                    errorMessage={formData.errors.prenom}
                    required
                    className="block w-full px-3 py-2"
                />
                <Input
                    type="text"
                    name="nom"
                    label="Nom"
                    labelPlacement='outside'
                    value={formData.nom}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.nom}
                    errorMessage={formData.errors.nom}
                    required
                    className="block w-full px-3 py-2"
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="email"
                    label="Email"
                    labelPlacement='outside'
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.email}
                    errorMessage={formData.errors.email}
                    required
                    className="block w-full px-3 py-2"
                />
            </div>
            <div className="flex space-x-4">
                <Input
                    type="text"
                    name="codePostal"
                    label="Code postal"
                    labelPlacement='outside'
                    value={formData.codePostal}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.codePostal}
                    errorMessage={formData.errors.codePostal}
                    required
                    className="block w-full px-3 py-2"
                />
                <Input
                    type="text"
                    name="ville"
                    label="Ville"
                    labelPlacement='outside'
                    value={formData.ville}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.ville}
                    errorMessage={formData.errors.ville}
                    required
                    className="block w-full px-3 py-2"
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="adresse"
                    label="Adresse"
                    labelPlacement='outside'
                    value={formData.adresse}
                    onChange={handleChange}
                    isInvalid={!!formData.errors.adresse}
                    errorMessage={formData.errors.adresse}
                    required
                    className="block w-full px-3 py-2"
                />
            </div>
            <div className='mx-5 my-2 text-center'>
                <label className="block text-sm text-left font-medium text-gray-700">Numéro de carte</label>
                <div className='my-2 bg-gray-100 p-3 rounded-lg'>
                    <CardElement
                        options={{
                            hidePostalCode: true,
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    color='primary'
                    disabled={!stripe || formData.loading || articles.length === 0}
                    isLoading={formData.loading}
                    className='my-4'
                >
                    {formData.loading ? 'Paiement en cours...' : `Payer ${prixTotal} CHF`}
                </Button>
            </div>
            {errorMessage && <div className="my-2 text-sm text-center text-red-600">{errorMessage}</div>}
        </form>
    );
};

export default PaymentForm;