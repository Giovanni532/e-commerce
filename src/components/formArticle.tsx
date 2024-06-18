"use client"

import React, { useRef, useState } from 'react';
import { Label } from './ui/label';
import { SelectItem, Button, Input, Select, Textarea } from '@nextui-org/react';
import { cn } from '@/lib/utils';
import { createArticle } from '@/app/action/adminAction';
import { Images } from 'lucide-react';
import { useFormState } from 'react-dom';

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

interface FormArticleProps {
    categorie: { id: number; nomCategorie: string }[];
    sousCategorie: { id: number; nomSousCategorie: string }[];
}

export default function FormArticle({ categorie, sousCategorie }: FormArticleProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState({ errors: {} as Record<string, string | null>, loading: false });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState({ ...formState, loading: true });
        const result = await createArticle(formState, new FormData(event.currentTarget));
        setTimeout(() => setFormState({ ...result }), 500);
    };

    return (
        <form className="my-8 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Input id="nomProduit" name="nomProduit" labelPlacement='outside' label="Nom du produit" placeholder="Pull nike" type="text" />
                    {formState.errors.nomProduit && <p className="text-red-500 text-sm">{formState.errors.nomProduit}</p>}
                </LabelInputContainer>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div className="flex flex-col w-full">
                    <Select
                        name='taille'
                        labelPlacement='outside'
                        label="Sélectionner une taille"
                        placeholder="S"
                    >
                        {taille.map((tailleItem) => (
                            <SelectItem key={tailleItem.key} value={tailleItem.label}>{tailleItem.label}</SelectItem>
                        ))}
                    </Select>
                    {formState.errors.taille && <p className="text-red-500 text-sm">{formState.errors.taille}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='couleur'
                        labelPlacement='outside'
                        label="Sélectionner une couleur"
                        placeholder="Rouge"
                    >
                        {couleur.map((couleurItem) => (
                            <SelectItem key={couleurItem.key} value={couleurItem.label}>{couleurItem.label}</SelectItem>
                        ))}
                    </Select>
                    {formState.errors.couleur && <p className="text-red-500 text-sm">{formState.errors.couleur}</p>}
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div className="flex flex-col w-full">
                    <Select
                        name='etat'
                        labelPlacement='outside'
                        label="Sélectionner un état"
                        placeholder="Neuf"
                    >
                        {etat.map((etatItem) => (
                            <SelectItem key={etatItem.key} value={etatItem.label}>{etatItem.label}</SelectItem>
                        ))}
                    </Select>
                    {formState.errors.etat && <p className="text-red-500 text-sm">{formState.errors.etat}</p>}
                </div>
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
                    {formState.errors.prix && <p className="text-red-500 text-sm">{formState.errors.prix}</p>}
                </LabelInputContainer>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div className="flex flex-col w-full">
                    <Select
                        name='idCategorie'
                        labelPlacement='outside'
                        label="Sélectionner une categorie"
                        placeholder="Femme"
                    >
                        {categorie.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.nomCategorie}</SelectItem>
                        ))}
                    </Select>
                    {formState.errors.idCategorie && <p className="text-red-500 text-sm">{formState.errors.idCategorie}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <Select
                        name='idSousCategorie'
                        labelPlacement='outside'
                        label="Sélectionner une sous categorie"
                        placeholder="Robe"
                    >
                        {sousCategorie.map((sousCat) => (
                            <SelectItem key={sousCat.id} value={sousCat.id}>{sousCat.nomSousCategorie}</SelectItem>
                        ))}
                    </Select>
                    {formState.errors.idSousCategorie && <p className="text-red-500 text-sm">{formState.errors.idSousCategorie}</p>}
                </div>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="description">Ajouter une description</Label>
                <Textarea id="description" name="description" placeholder="Pull nike noir, ..." type="text" />
                {formState.errors.description && <p className="text-red-500 text-sm">{formState.errors.description}</p>}
            </LabelInputContainer>
            <Button
                color='success'
                endContent={<Images />}
                className="text-white w-full my-4"
                onClick={handleButtonClick}
            >
                {selectedFiles && selectedFiles.length > 0
                    ? `${selectedFiles.length} images sélectionnées`
                    : 'Ajoutez des images'}
            </Button>
            <input
                type="file"
                name='images'
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <Button
                variant='solid'
                color='primary'
                className="w-full"
                type="submit"
                isLoading={formState.loading}
            >
                {formState.loading ? 'En cours...' : 'Créer l\'article'}
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
