'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '');

interface StripeProviderProps {
    children: React.ReactNode;
}

const StripeProvider = ({ children }: StripeProviderProps) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
