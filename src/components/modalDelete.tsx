"use client"

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { deleteArticle, deleteCommande } from "@/app/action/adminAction";

interface ModalDeleteProps {
    isCommande: boolean;
    id: number;
    nomArticle: string;
}

export default function ModalDelete({ isCommande, id, nomArticle }: ModalDeleteProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const removeCommande = deleteCommande.bind(null,id);
    const removeArticle = deleteArticle.bind(null,id);

    return (
        <>
            <span
                onClick={onOpen}
                color="danger"
                className="text-lg text-danger cursor-pointer active:opacity-50"
            >
                <Trash2 className="text-sm pointer-events-none flex-shrink-0" />
            </span>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{isCommande ? 'Êtes vous sur de vouloir supprimer cette commande ?' : `Êtes vous sur de vouloir supprimer l'article ${nomArticle}`}</ModalHeader>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Non, je ne suis pas sur
                                </Button>
                                <form action={isCommande ? removeCommande : removeArticle}>
                                <Button type="submit" color="danger" onPress={onClose}>
                                    Oui, je suis sur
                                </Button>
                                </form>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
