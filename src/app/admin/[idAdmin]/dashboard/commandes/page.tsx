import { fetchCommandes } from '@/app/action/adminAction'
import TableDataCommandes from '@/components/tableDataCommandes';
import React from 'react'

const columns = [
  {
    key: 'id',
    label: "Numéro de commande",
    sortable: true
  },
  {
    key: 'dateCommande',
    label: 'Date de la commande',
    sortable: true
  },
  {
    key: 'dateLivraison',
    label: 'Date de livraison',
    sortable: true
  },
  {
    key: 'prixTotal',
    label: 'Total',
    sortable: true
  },
  {
    key: 'adresse',
    label: 'Adresse',
    sortable: true
  },
  {
    key: 'ville',
    label: 'Ville',
    sortable: true
  },
  {
    key: 'codePostal',
    label: 'Code Postal',
    sortable: true
  },
  {
    key: 'statut',
    label: 'Statut',
    sortable: true
  },
  {
    key: 'action',
    label: 'Action'
  },
]

const statusOptions = [
  { name: "En attente", key: "En attente" },
  { name: "En cours de traitement", key: "En cours de traitement" },
  { name: "Expédiée", key: "Expédiée" },
  { name: "Livré", key: "Livré" },
  { name: "Annulé", key: "Annulé" },
];

export default async function AdminDashboardCommandes() {
  const commandes = await fetchCommandes();
  return (
    <div>
      <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
        Gestion des Commandes
      </h2>
      <TableDataCommandes columns={columns} commandes={commandes} statusOptions={statusOptions} />
    </div>
  )
}
