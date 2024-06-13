"use server"

import { dbPrisma } from "@/db"

interface AvisProps {
    idUtilisateur: string,
    idProduit: number,
    note: number,
    commentaire: string,
}

export async function createAvis({ idUtilisateur, idProduit, note, commentaire }: AvisProps) {
    await dbPrisma.avis.create({
        data: {
            idUtilisateur,
            idProduit,
            note,
            commentaire
        }
    })
    // Pas oublier de revalider le cache
}