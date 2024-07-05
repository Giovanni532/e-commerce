import { storage } from "@/db";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function deleteImage(imagePath: string) {
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
}

export async function uploadImageAndGetUrl(image: File, userId: string, oldImagePath: string | null): Promise<string> {
    if (oldImagePath) {
        await deleteImage(oldImagePath);
    }

    const storageRef = ref(storage, `utilisateur/${userId}/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}