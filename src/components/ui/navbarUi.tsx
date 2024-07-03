"use client";

import Link from "next/link";
import paths from "@/path";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Logout from "@/db/firebase/auth/logout";
import { Search, ShoppingBasket } from 'lucide-react';
import { useUserProvider } from "@/provider/userProvider";
import { UserRound, LogOut, Building } from 'lucide-react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Badge, Input } from "@nextui-org/react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { useStore } from "@/provider/storeProvider";
import { CardArticleSheet } from "../cardArticle";
import { useState } from "react";

export default function NavbarUi() {
    const { currentUser, setCurrentUser } = useUserProvider();
    const router = useRouter();
    const { articles } = useStore() as {
        articles: Array<{
            id: number;
            nomProduit: string;
            description: string;
            prix: number;
            taille: string;
            couleur: string;
            etat: string;
            urlsImages: string[];
            idCategorie: number;
            idSousCategorie: number;
        }>
    };
    const [query, setQuery] = useState("");

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
    }

    const handleSearch = () => {
        if (query) return router.push(`/articles?q=${query}`);
        if (!query) return router.push("/articles")

    }

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return handleSearch()
    }

    const handleLogout = async () => {
        await Logout();
        setCurrentUser(null);
        deleteCookie('currentUser');
        router.refresh();
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="light"
                        isIconOnly
                    >
                        <Badge color="danger" content={articles.length} isInvisible={articles.length === 0 ? true : false} shape="circle" size="md">
                            <ShoppingBasket className="h-6 w-6" />
                        </Badge>
                    </Button>
                </SheetTrigger>
                <SheetContent side='right'>
                    <SheetHeader>
                        <SheetTitle>Votre panier</SheetTitle>
                        <SheetClose />
                    </SheetHeader>
                    <SheetDescription>
                        {articles.length === 0 ? (
                            <p>Votre panier est vide</p>
                        ) : (
                            <div>
                                {articles.map(article => (
                                    <SheetClose className="py-2" key={article.id} asChild>
                                        <CardArticleSheet article={article} />
                                    </SheetClose>
                                ))}
                                <div className="flex justify-center mt-4">
                                    <SheetClose asChild>
                                        <Button
                                            href={paths.panierPath()}
                                            as={Link}
                                        >
                                            Voir le panier
                                        </Button>
                                    </SheetClose>
                                </div>
                            </div>
                        )}
                    </SheetDescription>
                </SheetContent>
            </Sheet>
            <div className="relative">
                <Input
                    isClearable
                    radius="lg"
                    placeholder="Rechercher un article ..."
                    value={query}
                    onKeyDown={handleKeyPress}
                    onChange={handleChange}
                    startContent={
                        <Search className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </div>
            {currentUser?.role === "ADMIN" ? (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            showFallback
                            isBordered
                            as="button"
                            className="transition-transform"
                            src={currentUser.image ? currentUser.image : ""}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                            key="Mon profile"
                            as={Link}
                            startContent={<UserRound className="text-xl pointer-events-none flex-shrink-0" />}
                            href={paths.userProfilePath(currentUser.id)}
                        >
                            Mon profile
                        </DropdownItem>
                        <DropdownItem
                            key="Dashbaord admin"
                            as={Link}
                            startContent={<Building className="text-xl pointer-events-none flex-shrink-0" />}
                            href={paths.adminDashboardPath(currentUser.id)}
                        >
                            Dashboard
                        </DropdownItem>
                        <DropdownItem
                            key="Deconnexion"
                            color="danger"
                            as={Link}
                            onClick={handleLogout}
                            startContent={<LogOut className="text-xl pointer-events-none flex-shrink-0" />}
                            href="/"
                        >
                            Déconnexion
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>)
                :
                currentUser?.role === "USER" ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                showFallback
                                isBordered
                                as="button"
                                className="transition-transform"
                                src={currentUser.image ? currentUser.image : ""}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem
                                key="Mon profile"
                                as={Link}
                                startContent={<UserRound className="text-xl pointer-events-none flex-shrink-0" />}
                                href={paths.userProfilePath(currentUser.id)}
                            >
                                Mon profile
                            </DropdownItem>
                            <DropdownItem
                                key="Deconnexion"
                                color="danger"
                                as={Link}
                                onClick={handleLogout}
                                startContent={<LogOut className="text-xl pointer-events-none flex-shrink-0" />}
                                href="/"
                            >
                                Déconnexion
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
                    :
                    <div className="flex items-center gap-4">
                        <Button
                            href="/auth"
                            as={Link}
                            variant="ghost"
                        >
                            Connexion
                        </Button>
                    </div>
            }</>
    )
}