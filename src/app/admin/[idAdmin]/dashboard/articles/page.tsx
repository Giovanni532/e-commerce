import { fetchArticlesAdmin, fetchCategories, fetchSousCategories } from '@/app/action/adminAction'
import TableDataArticles from '@/components/tableDataArticles';
import React from 'react'

const columns = [
  {
    key: 'id',
    label: "Numéro d'article",
    sortable: true
  },
  {
    key: 'nomProduit',
    label: 'Nom Produit',
  },
  {
    key: 'taille',
    label: 'Taille',
    sortable: true
  },
  {
    key: 'etat',
    label: 'Etat',
    sortable: true
  },
  {
    key: 'prix',
    label: 'Prix',
    sortable: true
  },
  {
    key: 'statut',
    label: 'Statut',
    sortable: true
  },
  {
    key: 'description',
    label: 'Description'
  },
  {
    key: 'action',
    label: 'Action'
  },
]

const statusOptions = [
  { name: "En vente", key: "En vente" },
  { name: "Vendu", key: "Vendu" },
];

export default async function AdminDashboardArticles() {
  const articles = await fetchArticlesAdmin()
  const categories = await fetchCategories()
  const sousCategories = await fetchSousCategories()
  return (
    <div>
      <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
        Gestion des Articles
      </h2>
      <TableDataArticles
        columns={columns}
        articles={articles}
        statusOptions={statusOptions}
        categories={categories}
        sousCategories={sousCategories}
      />
    </div>
  )
}
