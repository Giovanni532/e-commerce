"use client"

import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from '@nextui-org/react';
import { cn } from '@/lib/utils';

export default function FormArticle() {
    return (
        <form className="my-8 max-w-lg">
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            <Button
                variant='solid'
                color='primary'
                className="w-full"
                type="submit"
                
            >
                Se connecter
            </Button>
        </form>
    )
}

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