"use client"

import React from 'react';
import { Label } from './ui/label';
import { AutocompleteItem, Button, Input, Autocomplete } from '@nextui-org/react';
import { cn } from '@/lib/utils';

const taille = [
    { key: 'S', label: 'S' },
    { key: 'M', label: 'M' },
    { key: 'L', label: 'L' },
    { key: 'XL', label: 'XL' },
    { key: 'XXL', label: 'XXL' },
    { key: 'U', label: 'U' },
];

const etat = [
    { key: 'Neuf', label: 'Neuf' },
    { key: 'Bon état', label: 'Bon état' },
    { key: 'Très bon état', label: 'Très bon état' },
    { key: 'Moyen', label: 'Moyen' },
    { key: 'Mauvais', label: 'Mauvais' },
];

const couleur = [
    { key: '#FF0000', label: 'Rouge' },
    { key: '#0000FF', label: 'Bleu' },
    { key: '#00FF00', label: 'Vert' },
    { key: '#000000', label: 'Noir' },
    { key: '#FFFFFF', label: 'Blanc' },
    { key: '#FFFF00', label: 'Jaune' },
    { key: '#FF00FF', label: 'Magenta' },
    { key: '#00FFFF', label: 'Cyan' },
    { key: '#FFA500', label: 'Orange' },
    { key: '#800080', label: 'Violet' },
    { key: '#FFC0CB', label: 'Rose' },
];

export default function FormArticle() {
    return (
        <form className="my-8 max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Input id="nomProduit" name="nomProduit" labelPlacement='outside' label="Nom du produit" placeholder="Pull nike" type="text" />
                </LabelInputContainer>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <Autocomplete
                    name='taille'
                    defaultItems={taille}
                    labelPlacement='outside'
                    label="Choisir une taille"
                    placeholder="Sélectionner une taille"
                >
                    {(taille) => <AutocompleteItem key={taille.key} value={taille.label}>{taille.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    name='couleur'
                    defaultItems={couleur}
                    labelPlacement='outside'
                    label="Choisir une couleur"
                    placeholder="Sélectionner une couleur"
                >
                    {(couleur) => <AutocompleteItem key={couleur.key} value={couleur.label}>{couleur.label}</AutocompleteItem>}
                </Autocomplete>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <Autocomplete
                    name='etat'
                    defaultItems={etat}
                    labelPlacement='outside'
                    label="Choisir un état"
                    placeholder="Sélectionner un état"
                >
                    {(etat) => <AutocompleteItem key={etat.key} value={etat.label}>{etat.label}</AutocompleteItem>}
                </Autocomplete>
                <LabelInputContainer>
                    <Input
                        type="number"
                        label="Prix"
                        name='prix'
                        placeholder="0.00"
                        labelPlacement="outside"
                        startContent={
                            <div className="pointer-events-none">
                                <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                    />
                </LabelInputContainer>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <Autocomplete
                    name='taille'
                    defaultItems={taille}
                    labelPlacement='outside'
                    label="Choisir une taille"
                    placeholder="Sélectionner une taille"
                >
                    {(taille) => <AutocompleteItem key={taille.key} value={taille.label}>{taille.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    name='couleur'
                    defaultItems={couleur}
                    labelPlacement='outside'
                    label="Choisir une couleur"
                    placeholder="Sélectionner une couleur"
                >
                    {(couleur) => <AutocompleteItem key={couleur.key} value={couleur.label}>{couleur.label}</AutocompleteItem>}
                </Autocomplete>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="description">Ajouter une description</Label>
                <Input id="description" name="description" placeholder="Pull nike noir, ..." type="text" />
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
