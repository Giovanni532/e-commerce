import React from 'react'
import { fetchArticles, fetchCategories, fetchSousCategories } from '../action/adminAction';
import Articles from '@/components/articles';

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  const categories = await fetchCategories();
  const sousCategories = await fetchSousCategories();

  return <Articles articles={articles} categories={categories} sousCategories={sousCategories} />
}
