'use client';

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

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
                            country: 'CH', // Vous pouvez ajuster le pays ici
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Prénom</label>
                <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Nom</label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Adresse</label>
                <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Code Postal</label>
                <input
                    type="text"
                    name="codePostal"
                    value={formData.codePostal}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Ville</label>
                <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Numéro de carte</label>
                <CardElement options={{ hidePostalCode: true }} />
            </div>
            <button type="submit" disabled={!stripe || isLoading}>
                {isLoading ? 'Paiement en cours...' : 'Payer'}
            </button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default PaymentForm;
