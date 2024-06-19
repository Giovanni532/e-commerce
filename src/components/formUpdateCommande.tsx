import React from 'react'
import { ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
import { date } from 'zod';
import { updateCommande } from '@/app/action/adminAction';

const statut = [
    { key: 'En attente', label: 'En attente' },
    { key: 'En cours de traitement', label: 'En cours de traitement' },
    { key: 'Expédiée', label: 'Expédiée' },
    { key: 'Livrée', label: 'Livrée' },
    { key: 'Annulée', label: 'Annulée' },
];

interface FormUpdateProps {
    commande: {
        id: number;
        dateCommande: string;
        idUtilisateur: string;
        statut: string;
        adresse: string;
        ville: string;
        codePostal: string;
        dateLivraison: string;
        prixTotal: number;
    },
    onClose: () => void;
}

export default function FormUpdateCommande({ commande, onClose }: FormUpdateProps) {
    const [formState, setFormState] = React.useState({
        id: commande.id,
        statut: commande.statut,
    });

    const updateCommandeAction = updateCommande.bind(null, commande.id, formState)

    return (
        <form action={updateCommandeAction}>
            <ModalBody>
                <div className="flex flex-col w-full">
                    <Select
                        name='statut'
                        labelPlacement='outside'
                        label="Sélectionner un statut"
                        placeholder={commande.statut}
                        onChange={(e) => setFormState({ ...formState, statut: e.target.value })}
                    >
                        {statut.map((statutItem) => (
                            <SelectItem key={statutItem.key} value={statutItem.label}>{statutItem.label}</SelectItem>
                        ))}
                    </Select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                    Annuler la modification
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                    Modifiez
                </Button>
            </ModalFooter>
        </form>
    )
}
