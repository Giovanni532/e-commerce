"use client"

import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Eye } from 'lucide-react';
import DetailsCommandes from './detailsCommandes';
import DetailsArticle from './DetailsArticle';

interface ModalDetailsProps {
    isCommande: boolean;
    commandes?: any;
    article?: any;
    id?: any;
}


export default function ModalDetails({ commandes, isCommande, article, id }: ModalDetailsProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <span
                onClick={onOpen}
                color="danger"
                className="text-lg cursor-pointer active:opacity-50"
            >
                <Eye className="text-sm pointer-events-none flex-shrink-0" />
            </span>
            <Modal
                size='xl'
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
                        isCommande ? (
                            <DetailsCommandes id={id} onClose={onClose} commandeProduits={commandes.commandeProduits} />
                        ) : (
                            <DetailsArticle onClose={onClose} article={article} />
                        )
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
