'use client';

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, Input } from '@nextui-org/react';

const PaymentForm: React.FC<{ articles: any[] }> = ({ articles }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        adresse: '',
        codePostal: '',
        ville: '',
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

        setIsLoading(true);

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
                    // Handle post-payment logic here
                    alert('Paiement réussi !');
                }
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='gap-4'>
            <div className="flex space-x-4">
                <Input
                    type="text"
                    name="prenom"
                    label="Prénom"
                    labelPlacement='outside'
                    value={formData.prenom}
                    onChange={handleChange}
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
                    required
                    className="block w-full px-3 py-2"
                />
            </div>
            <div className='mx-5 my-2'>
                <label className="block text-sm font-medium text-gray-700">Numéro de carte</label>
                <CardElement
                    options={{ hidePostalCode: true }}
                    className="my-1 p-3"
                />
                <Button
                    type="submit"
                    disabled={!stripe || isLoading}
                >
                    {isLoading ? 'Paiement en cours...' : 'Payer'}
                </Button>
            </div>
            {errorMessage && <div className="mt-2 text-sm text-center text-red-600">{errorMessage}</div>}
        </form>
    );
};

export default PaymentForm;