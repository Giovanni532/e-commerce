import { PrismaClient } from "@prisma/client";
import { createClient } from '@supabase/supabase-js';
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const supabaseBucket = createClient(
    process.env.NEXT_PUBLIC_DATABASE_BUCKET_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const dbPrisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = dbPrisma

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default dbPrisma
export const dbSupabase = supabaseBucket;
export const dbFirebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(dbFirebase);
