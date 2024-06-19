import { fetchDashboardData } from '@/app/action/adminAction'
import DashboardAdminData from '@/components/dashboardAdminData'
import React from 'react'

export default async function AdminDashboard() {
  const { chiffreAffaires, nombreCommandes, nombreCommandesLivrees, nombreUtilisateurs } = await fetchDashboardData()
  return (
    <div>
      <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
        Dashboard
      </h2>
      <div>
        <DashboardAdminData
          chiffreAffaires={chiffreAffaires}
          nombreCommandes={nombreCommandes}
          nombreCommandesLivrees={nombreCommandesLivrees}
          nombreUtilisateurs={nombreUtilisateurs} />
      </div>
    </div>
  )
}
