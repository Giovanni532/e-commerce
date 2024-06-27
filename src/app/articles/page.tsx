import React from 'react'
import { fetchArticles, fetchCategories, fetchSousCategories } from '../action/adminAction';
import Articles from '@/components/articles';

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  const categories = await fetchCategories();
  const sousCategories = await fetchSousCategories();

  return <Articles articles={articles} categories={categories} sousCategories={sousCategories} />
}

// Generate static paths

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.map(article => {
    return {
      id: article.id.toString()
    }
  })
}