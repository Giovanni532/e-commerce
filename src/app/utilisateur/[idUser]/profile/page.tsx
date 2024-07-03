import { Avatar, Card, CardBody } from '@nextui-org/react'
import React from 'react'

export default async function UtilisateurProfile() {
  return (
    <div className='mx-10'>
      <Card className='flex flex-col md:flex-row max-w-lg mx-auto mt-10'>
        <Avatar></Avatar>
        <CardBody>
          <h1>Profile</h1>
        </CardBody>
      </Card>
    </div>
  )
}
