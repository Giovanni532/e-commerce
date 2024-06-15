import FormArticle from '@/components/formArticle'
import React from 'react'

export default async function AdminDashboardArticleNew() {
  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
      <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        Creer un article ici
      </h2>
      <p className="text-center text-sm text-neutral-800 dark:text-neutral-200">
        Vendez vos articles ici
      </p>
      <FormArticle />
    </div>
  )
}
