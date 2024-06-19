import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { DollarSign } from 'lucide-react';

export default function DashboardAdminData() {
    return (
        <>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Votre chiffre d'affaires.
                    </h2>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody></CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombre de commandes.
                    </h2>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody></CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombres de nouveaux utilisateurs.
                    </h2>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody></CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombe de commandes livrées
                    </h2>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody></CardBody>
            </Card></>
    )
}
