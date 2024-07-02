import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { cookies } from "next/headers";


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
        return (
            <div className="flex flex-col items-center justify-center gap-8 px-4 md:px-6">
                <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Votre panier est vide
                    </h1>
                </div>
            </div>
        );
    } else {
        return children;
    }
}
