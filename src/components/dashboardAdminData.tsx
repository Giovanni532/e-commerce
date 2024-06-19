"use client"

import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react';
import { DollarSign, BarChartHorizontal, UsersRound, CalendarCheck, MoveDown, MoveUp } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement
);

interface DashboardAdminDataProps {
    chiffreAffaires: number;
    nombreCommandes: number;
    nombreUtilisateurs: number;
    nombreCommandesLivrees: number;
}

const AnimatedNumber = ({ value }: { value: number }) => {
    const [animatedValue, setAnimatedValue] = React.useState(0);
    const { number } = useSpring({
        number: animatedValue,
        from: { number: 0 },
        delay: 400,
        config: { mass: 1, tension: 170, friction: 26 },
    });

    React.useEffect(() => {
        setAnimatedValue(value);
    }, [value]);

    return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>;
};

export default function DashboardAdminData({ chiffreAffaires, nombreCommandes, nombreUtilisateurs, nombreCommandesLivrees }: DashboardAdminDataProps) {
    const dataBar = {
        labels: ['Chiffre d\'affaires', 'Commandes', 'Utilisateurs', 'Commandes livrées'],
        datasets: [
            {
                label: 'Statistiques',
                data: [chiffreAffaires, nombreCommandes, nombreUtilisateurs, nombreCommandesLivrees],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Statistiques du mois',
            },
        },
    };

    const dataLine = {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
            {
                label: 'Chiffre d\'affaires',
                data: [chiffreAffaires / 4, chiffreAffaires / 2, chiffreAffaires * 3 / 4, chiffreAffaires],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chiffre d\'affaires hebdomadaire',
            },
        },
    };

    const tabs = [
        {
            title: "chiffres",
            label: "Chiffres",
            content: (
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 p-6'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between p-4'>
                            <h2 className='text-md font-bold text-gray-700'>
                                Votre chiffre d&apos;affaires.
                            </h2>
                            <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardBody>
                            <p
                                className={chiffreAffaires !== 0 ?
                                    'text-green-600 text-bold text-2xl flex items-center'
                                    : 'text-red-600 text-bold text-2xl flex items-center'}
                            >
                                {chiffreAffaires !== 0 ? <MoveUp /> : <MoveDown />}$ <AnimatedNumber value={chiffreAffaires} />
                            </p>
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
                            <p
                                className={nombreCommandes !== 0 ?
                                    'text-green-600 text-bold text-2xl flex items-center'
                                    : 'text-red-600 text-bold text-2xl flex items-center'}
                            >
                                {nombreCommandes !== 0 ? <MoveUp /> : <MoveDown />} <AnimatedNumber value={nombreCommandes} /></p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between p-4'>
                            <h2 className='text-md font-bold text-gray-700'>
                                Le nombre de nouveaux utilisateurs.
                            </h2>
                            <UsersRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardBody>
                            <p className={nombreUtilisateurs !== 0 ?
                                'text-green-600 text-bold text-2xl flex items-center'
                                : 'text-red-600 text-bold text-2xl flex items-center'}
                            >
                                {nombreUtilisateurs !== 0 ? <MoveUp /> : <MoveDown />} <AnimatedNumber value={nombreUtilisateurs} /></p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between p-4'>
                            <h2 className='text-md font-bold text-gray-700'>
                                Le nombre de commandes livrées
                            </h2>
                            <CalendarCheck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardBody>
                            <p className={nombreCommandesLivrees !== 0 ?
                                'text-green-600 text-bold text-2xl flex items-center' :
                                'text-red-600 text-bold text-2xl flex items-center'}
                            >
                                {nombreCommandesLivrees !== 0 ? <MoveUp /> : <MoveDown />} <AnimatedNumber value={nombreCommandesLivrees} /></p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Ce calcul est basé sur le mois.</p>
                        </CardBody>
                    </Card>
                </div>
            )
        },
        {
            title: "graphiques",
            label: "Graphiques",
            content: (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-6">
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between p-4'>
                            <h2 className='text-md font-bold text-gray-700'>
                                Statistiques du mois.
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Bar data={dataBar} options={optionsBar} />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between p-4'>
                            <h2 className='text-md font-bold text-gray-700'>
                                Chiffre d&apos;affaires hebdomadaire.
                            </h2>
                        </CardHeader>
                        <CardBody>
                            <Line data={dataLine} options={optionsLine} />
                        </CardBody>
                    </Card>
                </div>
            )
        },
    ];

    return (
        <Tabs
            aria-label="Dynamic tabs"
            items={tabs}
            placement='top'
        >
            {(item) => (
                <Tab key={item.title} title={item.label}>
                    {item.content}
                </Tab>
            )}
        </Tabs>
    );
}
