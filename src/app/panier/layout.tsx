import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
    title: "Mode revive | Panier",
    description: "Votre boutique de seconde main en ligne",
};

export default function LayoutPanier({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const articlesNotParse = getCookie("panierArticles", { cookies });

    if (!articlesNotParse) {
        return notFound();
    } else {
        return children;
    }
}
