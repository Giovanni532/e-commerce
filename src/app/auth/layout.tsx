import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mode revive | Page de connexion",
    description: "Votre boutique de seconde main en ligne",
};

export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return children;
}
