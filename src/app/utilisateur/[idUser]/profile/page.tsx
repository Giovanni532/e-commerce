import React from 'react'
import { fetchUserData, fetchUserOrders } from '@/app/action/userAction'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import TabsUser from '@/components/tabsUser'
import { NotebookText, Cog } from 'lucide-react';
import FormUpdateUser from '@/components/formUpdateUser'
import CommandeUser from '@/components/commandeUser'

interface UtilisateurProfileProps {
  params: {
    idUser: string
  }
}


export default async function UtilisateurProfile({ params }: UtilisateurProfileProps) {
  if (!params.idUser) return notFound();

  const user = await fetchUserData(params.idUser);

  if (!user) return notFound();
  const commandes = await fetchUserOrders(params.idUser);


  const tabs = [
    {
      title: "Commandes",
      icon: <NotebookText />,
      content: <CommandeUser commandes={commandes} />
    },
    {
      title: "Modifier mes informations",
      icon: <Cog />,
      content: <FormUpdateUser />
    },
  ]

  return (
    <div className='mx-10'>
      <Card className="flex flex-col md:flex-row max-w-lg mx-auto mt-10 p-5">
        <div className="flex justify-center items-center md:w-1/3">
          <Avatar
            showFallback
            isBordered
            color="primary"
            className="w-20 h-20"
            src={""}
          />
        </div>
        <CardBody className="flex flex-col md:flex-row justify-center text-center md:text-left md:w-2/3">
          <Divider orientation="vertical" className="hidden md:block" />
          <div className="flex flex-col pl-5 space-y-2">
            <h1 className="text-xl font-semibold">{`${user.nom} ${user.prenom}`}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{`${user.adresse}, ${user.codePostal}, ${user.ville}`}</p>
          </div>
        </CardBody>
      </Card>
      <TabsUser tabs={tabs} />
    </div>
  )
}
