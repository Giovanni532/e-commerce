"use server";
import { dbPrisma } from "@/db";

export const findUser = async (idFirebase: string) => {
    return await dbPrisma.utilisateur.findUnique({
        where: {
            idFirebase,
        },
    });
}