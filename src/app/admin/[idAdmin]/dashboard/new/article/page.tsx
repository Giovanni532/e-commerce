import { fetchCategories, fetchSousCategories } from '@/app/action/adminAction'
import FormArticle from '@/components/formArticle'
import React from 'react'

export default async function AdminDashboardArticleNew() {
  const categories = await fetchCategories();
  const sousCategories = await fetchSousCategories();


  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
      <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
        Ajoutez un article a vorre boutique
      </h2>
      <FormArticle categorie={categories} sousCategorie={sousCategories} />
    </div>
  )
}
