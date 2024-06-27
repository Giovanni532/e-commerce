import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react';

interface FiltreArticlesProps {
    onFilterChange: (filters: any) => void;
    categories: {
        id: number,
        nomCategorie: string
    }[],
    sousCategories: {
        id: number,
        nomSousCategorie: string
    }[]
}

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

export default function FiltreArticles({ onFilterChange, categories, sousCategories }: FiltreArticlesProps) {
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSousCategories, setSelectedSousCategories] = useState([]);
    const [selectedEtat, setSelectedEtat] = useState([]);
    const [selectedTaille, setSelectedTaille] = useState([]);


    useEffect(() => {
        onFilterChange({
            categories: selectedCategories,
            sousCategories: selectedSousCategories,
            etat: selectedEtat,
            taille: selectedTaille,
            prix: selectedPrice
        });
    }, [selectedCategories, selectedSousCategories, selectedEtat, selectedTaille, selectedPrice, onFilterChange]);


    const handlePriceChange = (value: string[]) => {
        if (selectedPrice.length > 0) {
            if (selectedPrice[0] === value[0]) {
                setSelectedPrice([]);
            } else {
                setSelectedPrice(value as never);
            }
        } else {
            setSelectedPrice(value as never);
        }
    };

    return (
        <Accordion selectionMode='multiple' variant='light'>
            <AccordionItem subtitle="Prix" aria-label='prix'>
                <CheckboxGroup
                    value={selectedPrice}
                    onValueChange={(value) => handlePriceChange(value as never[])}>
                    <Checkbox size='md' key={1} value="asc">Moin cher au plus cher</Checkbox>
                    <Checkbox size='md' key={2} value="desc">Plus cher au moins cher</Checkbox>
                </CheckboxGroup>
            </AccordionItem>
            <AccordionItem subtitle="Catégories" aria-label='categories'>
                <CheckboxGroup
                    value={selectedCategories}
                    onValueChange={(value: string[]) => setSelectedCategories(value as never[])}>
                    {categories.map((categorie) => (
                        <Checkbox size="md" key={categorie.id} value={categorie.id.toString()}>{categorie.nomCategorie}</Checkbox>
                    ))}
                </CheckboxGroup>
            </AccordionItem>
            <AccordionItem subtitle="Sous-catégories" aria-label='sous-categories'>
                <CheckboxGroup
                    value={selectedSousCategories}
                    onValueChange={(value: string[]) => setSelectedSousCategories(value as never[])}>
                    {sousCategories.map((sousCategorie) => (
                        <Checkbox size="md" key={sousCategorie.id} value={sousCategorie.id.toString()}>{sousCategorie.nomSousCategorie}</Checkbox>
                    ))}
                </CheckboxGroup>
            </AccordionItem>
            <AccordionItem subtitle="Etat" aria-label='etat'>
                <CheckboxGroup
                    value={selectedEtat}
                    onValueChange={(value: string[]) => setSelectedEtat(value as never[])}>
                    {etat.map((etat) => (
                        <Checkbox size="md" key={etat.key} value={etat.key}>{etat.label}</Checkbox>
                    ))}
                </CheckboxGroup>
            </AccordionItem>
            <AccordionItem subtitle="Taille" aria-label='taille'>
                <CheckboxGroup
                    value={selectedTaille}
                    onValueChange={(value: string[]) => setSelectedTaille(value as never[])}>
                    {taille.map((taille) => (
                        <Checkbox size="md" key={taille.key} value={taille.key}>{taille.label}</Checkbox>
                    ))}
                </CheckboxGroup>
            </AccordionItem>
        </Accordion>
    );
}
