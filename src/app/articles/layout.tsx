import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mode revive | Articles en ligne",
    description: "Votre boutique de seconde main en ligne",
};

export default function LayoutArticles({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return children;
}
