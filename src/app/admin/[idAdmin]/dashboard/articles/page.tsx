import { fetchArticles } from '@/app/action/adminAction'
import TableData from '@/components/tableData'
import React from 'react'

const columns = [
  {
    key: 'id',
    label: "Numéro d'article"
  },
  {
    key: 'nomProduit',
    label: 'Nom Produit'
  },
  {
    key: 'taille',
    label: 'Taille'
  },
  {
    key: 'etat',
    label: 'Etat'
  },
  {
    key: 'prix',
    label: 'Prix'
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

export default async function AdminDashboardArticles() {
  const articles = await fetchArticles()
  return (
    <div>
      <h1 className='text-center my-4'>AdminDashboardArticles</h1>
      <TableData columns={columns} articles={articles} />
    </div>
  )
}
