"use server"

import dbPrisma from "@/db"

interface AvisProps {
    idUtilisateur: string,
    note: number,
    commentaire: string,
}

export async function createAvis({ idUtilisateur, note, commentaire }: AvisProps) {
    await dbPrisma.avis.create({
        data: {
            idUtilisateur,
            note,
            commentaire
        }
    })
    // Pas oublier de revalider le cache
}