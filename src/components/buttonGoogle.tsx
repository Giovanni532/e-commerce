"use client"

import { Button } from '@nextui-org/react';
import { Chrome } from 'lucide-react';
import React from 'react'

interface ButtonGoogleProps {
    googleSubmit: () => void,
}

export default function ButtonGoogle({ googleSubmit }: ButtonGoogleProps) {
    return (
        <Button
            onClick={googleSubmit}
            variant="ghost"
            color="primary"
            radius="lg"
        >
            <Chrome className="h-4 w-4" />
            Google
        </Button>
    )
}
