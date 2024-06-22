import React from 'react'
import { fetchArticles } from '../action/adminAction';
import { Card, Checkbox, CheckboxGroup, Accordion, AccordionItem } from '@nextui-org/react';

export default async function Articles() {
  const articles = await fetchArticles();
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-8">
      <Card className='flex flex-col p-4'>
        <h2>
          Filtrer les articles
        </h2>
      </Card>
      <div className="grid grid-cols-3 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-8">
        {articles.length === 0 ? (
            <h2 className="flex flex-col items-center justify-center p-4">No articles found</h2>
        ) : (
          articles.map((article) => (
            <Card key={article.id} className="flex flex-col p-4">
              <h2>{article.nomProduit}</h2>
              <p>{article.description}</p>
              <p>{article.prix}</p>
              <p>{article.taille}</p>
              <p>{article.couleur}</p>
              <p>{article.etat}</p>
              <p>{article.idCategorie}</p>
              <p>{article.idSousCategorie}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
