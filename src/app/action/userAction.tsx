"use server"

import dbPrisma from "@/db";

export async function fetchUserData(idFirebase: string) {

    const data = await dbPrisma.utilisateur.findFirst({
        where: {
            idFirebase: idFirebase
        },
        include: {
            commandes: true
        }
    });

    return data;
}