"use client"

import React from 'react'
import { Button, Input, Textarea } from '@nextui-org/react'

export default function ContactPage() {
    const [formState, setFormState] = React.useState({
        nom: '',
        prenom: '',
        email: '',
        message: '',
        errors: {} as Record<string, string | null>,
        success: false,
        loading: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormState({ ...formState, loading: true })
        console.log(formState)
    }


    return (
        <div className="container mt-20">
            <h1 className='text-center'>Formulaire de contact</h1>
            <p className='text-center'>Vous pouvez nous contacter en remplissant ce formulaire</p>
            <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
                <div className="flex flex-col-md:flew-row p-4">
                    <Input
                        isRequired
                        className='p-2'
                        id="nom"
                        name="nom"
                        type="text"
                        label="Votre nom"
                        labelPlacement='outside'
                        value={formState.nom}
                        onChange={handleChange}
                        isInvalid={!!formState.errors.nom}
                        errorMessage={formState.errors.nom}
                    />
                    <Input
                        isRequired
                        className='p-2'
                        id="prenom"
                        name="prenom"
                        type="text"
                        label="Votre prénom"
                        labelPlacement='outside'
                        value={formState.prenom}
                        onChange={handleChange}
                        isInvalid={!!formState.errors.prenom}
                        errorMessage={formState.errors.prenom}
                    />
                </div>
                <Input
                    isRequired
                    className='px-6'
                    id="email"
                    name="email"
                    type="text"
                    label="Votre email"
                    labelPlacement='outside'
                    value={formState.email}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.email}
                    errorMessage={formState.errors.email}
                />
                <Textarea
                    isRequired
                    className='p-6'
                    id="message"
                    name="message"
                    type="text"
                    label="Votre message"
                    labelPlacement='outside'
                    value={formState.message}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.message}
                    errorMessage={formState.errors.message}
                />
                <Button
                    variant='solid'
                    color='primary'
                    className="w-full"
                    type="submit"
                    isLoading={formState.loading}
                >
                    Envoyer
                </Button>
            </form>
        </div>
    )
}
