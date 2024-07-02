import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Mode revive | Panier",
    description: "Votre boutique de seconde main en ligne",
};

export default function LayoutPanier({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        { children }
    );
}
