"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext({});

interface StoreProviderProps {
    children: React.ReactNode;
}

type Article = {
    id: number;
    nomProduit: string;
    description: string;
    prix: number;
    taille: string;
    couleur: string;
    etat: string;
    urlsImages: string[];
    idCategorie: number;
    idSousCategorie: number;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const storedArticles = localStorage.getItem('panierArticles');
        if (storedArticles) {
            setArticles(JSON.parse(storedArticles));
        }
    }, []);

    const addArticle = (article: Article) => {
        const articleExists = articles.some(existingArticle => existingArticle.id === article.id);
        if (!articleExists) {
            const updatedArticles = [...articles, article];
            setArticles(updatedArticles);
            localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
        }
    };

    const removeArticle = (id: number) => {
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
        localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
    };

    const removeAllExcept = (articleToBuy: Article) => {
        const articleExists = articles.some(article => article.id === articleToBuy.id);
        let updatedArticles;

        if (articleExists) {
            updatedArticles = articles.filter(article => article.id === articleToBuy.id);
        } else {
            updatedArticles = [articleToBuy];
        }

        setArticles(updatedArticles);
        localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
    };

    const removeAllArticles = () => {
        setArticles([]);
        localStorage.setItem('panierArticles', JSON.stringify([]));
    };

    const store = {
        articles,
        addArticle,
        removeArticle,
        removeAllExcept,
        removeAllArticles
    };

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const store = useContext(StoreContext);
    return store;
};