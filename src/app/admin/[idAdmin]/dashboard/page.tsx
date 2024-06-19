import DashboardAdminData from '@/components/dashboardAdminData'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'

export default async function AdminDashboard() {
  return (
    <div>
      <h2 className='text-center my-6 text-3xl font-bold text-gray-800'>
        Dashboard
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 p-6'>
        <DashboardAdminData />
      </div>
    </div>
  )
}
