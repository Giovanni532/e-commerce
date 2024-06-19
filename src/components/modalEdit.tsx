"use client"

import React from "react";
import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import FormUpdateArticle from "./formUpdateArticle";
import FormUpdateCommande from "./formUpdateCommande";

interface ModalEditProps {
    isCommande: boolean;
    article?: any;
    commande?: any;
    categories?: any;
    sousCategories?: any;
}

export default function ModalEdit({ isCommande, article, commande, categories, sousCategories }: ModalEditProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <span
                onClick={onOpen}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
                <Pencil className="text-sm pointer-events-none flex-shrink-0" />
            </span>
            <Modal
                size="xl"
                scrollBehavior="outside"
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
                            <ModalHeader className="flex flex-col gap-1">{isCommande ? "Modifiez le statut de la commande" : "Modifiez l'article"}</ModalHeader>
                            {isCommande ? (
                                <FormUpdateCommande
                                    commande={commande}
                                    onClose={onClose}
                                />
                            )
                                :
                                (
                                    <FormUpdateArticle
                                        article={article}
                                        categories={categories}
                                        sousCategories={sousCategories}
                                        onClose={onClose}
                                    />
                                )
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
