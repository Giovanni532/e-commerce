"use client"

import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { DollarSign, BarChartHorizontal, UsersRound, CalendarCheck } from 'lucide-react';

interface DashboardAdminDataProps {
    chiffreAffaires: number;
    nombreCommandes: number;
    nombreUtilisateurs: number;
    nombreCommandesLivrees: number;
}

export default function DashboardAdminData({ chiffreAffaires, nombreCommandes, nombreUtilisateurs, nombreCommandesLivrees }: DashboardAdminDataProps) {
    return (
        <>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Votre chiffre d'affaires.
                    </h2>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody>
                    <p className='text-2xl font-bold'>$ {chiffreAffaires}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombre de commandes.
                    </h2>
                    <BarChartHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody>
                    <p className='text-2xl font-bold'>{nombreCommandes}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombres de nouveaux utilisateurs.
                    </h2>
                    <UsersRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody>
                    <p className='text-2xl font-bold'>{nombreUtilisateurs}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between p-4'>
                    <h2 className='text-md font-bold text-gray-700'>
                        Le nombe de commandes livrées
                    </h2>
                    <CalendarCheck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardBody>
                    <p className='text-2xl font-bold'>{nombreCommandesLivrees}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                </CardBody>
            </Card></>
    )
}
