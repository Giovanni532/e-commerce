"use client"

import React from 'react';
import { Label } from './ui/label';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { cn } from '@/lib/utils';

const taille = [
    { key: 'S', label: 'S' },
    { key: 'M', label: 'M' },
    { key: 'L', label: 'L' },
    { key: 'XL', label: 'XL' },
    { key: 'XXL', label: 'XXL' },
    { key: 'U', label: 'U' },
];

export default function FormArticle() {
    return (
        <form className="my-8 max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="nomProduit">Nom de produit</Label>
                    <Input id="nomProduit" name="nomProduit" placeholder="Pull nike" type="text" />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="nom">Taille</Label>
                    <Input id="nom" name='nom' placeholder="Durden" type="text" />
                </LabelInputContainer>
            </div>
            <Select
                items={taille}
                label="Favorite Animal"
                placeholder="Select an animal"
                className="max-w-xs"
            >
                {(taille) => <SelectItem key={taille.key}>{taille.label}</SelectItem>}
            </Select>
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
                Creer l'article
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
