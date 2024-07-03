"use client"

import { Card } from '@nextui-org/react';
import React, { useState, useMemo } from 'react';
import FiltreArticles from './filtreArticles';
import CardArticle from './cardArticle';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation'

interface ArticlesProps {
    articles: {
        id: number,
        nomProduit: string,
        description: string,
        prix: number,
        taille: string,
        couleur: string,
        etat: string,
        urlsImages: string[],
        idCategorie: number,
        idSousCategorie: number
    }[],
    categories: {
        id: number,
        nomCategorie: string
    }[],
    sousCategories: {
        id: number,
        nomSousCategorie: string
    }[]
}

export default function Articles({ articles, categories, sousCategories }: ArticlesProps) {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<{
        categories: string[],
        sousCategories: string[],
        etat: string[],
        taille: string[],
        prix: string[]
    }>({ categories: [], sousCategories: [], etat: [], taille: [], prix: [] });
    const searchQuery = searchParams && searchParams.get("q");

    const handleFilterChange = (newFilters: { categories: string[], sousCategories: string[], etat: string[], taille: string[], prix: string[] }) => {
        setFilters(newFilters);
    };

    const filteredArticles = useMemo(() => {
        let filtered = articles.filter(article => {
            const matchCategory = filters.categories.length === 0 || filters.categories.includes(article.idCategorie.toString());
            const matchSousCategory = filters.sousCategories.length === 0 || filters.sousCategories.includes(article.idSousCategorie.toString());
            const matchEtat = filters.etat.length === 0 || filters.etat.includes(article.etat);
            const matchTaille = filters.taille.length === 0 || filters.taille.includes(article.taille);
            const matchQuery = !searchQuery || article.nomProduit.toLowerCase().includes(searchQuery.toLowerCase());

            return matchCategory && matchSousCategory && matchEtat && matchTaille && matchQuery;
        });

        if (filters.prix[0] === "asc") {
            filtered = filtered.sort((a, b) => a.prix - b.prix);
        } else if (filters.prix[0] === "desc") {
            filtered = filtered.sort((a, b) => b.prix - a.prix);
        }

        return filtered;
    }, [articles, filters]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-8 p-4 md:p-8">
            <Card className='flex flex-col p-4 md:h-screen md:max-h-[60vh] md:overflow-auto'>
                <h2 className='p-2'>
                    Filtrer les articles
                </h2>
                <FiltreArticles onFilterChange={handleFilterChange} categories={categories} sousCategories={sousCategories} />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8">
                {filteredArticles.length === 0 ? (
                    <h2 className="flex flex-col items-center justify-center p-4">Aucun articles trouvés</h2>
                ) : (
                    filteredArticles.map((article) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, exit: { duration: 0.2 } }}
                        >
                            <CardArticle article={article} />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
