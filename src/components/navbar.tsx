"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ShoppingCart, Ribbon, Search } from 'lucide-react';
import { useUserProvider } from "@/provider/userProvider";
import Logout from "@/db/firebase/auth/logout";


export default function Navbar() {
    const { currentUser, userData } = useUserProvider();

    const handleLogout = async () => {
        await Logout();
    }

    return (
        <div className="relative">
            <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="light"
                                isIconOnly
                                className="lg:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <Link href="#">Articles</Link>
                            <Link href="#">Femme</Link>
                            <Link href="#">Home</Link>
                            <Link href="#">Contact</Link>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center">
                        <Ribbon className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <nav className="hidden lg:flex gap-4">
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Articles
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Femmes
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Hommes
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="light"
                                isIconOnly
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span className="sr-only">Toggle cart</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='right'>
                            <SheetHeader>
                                <SheetTitle>Votre panier</SheetTitle>
                                <SheetClose />
                            </SheetHeader>
                            <SheetDescription>
                                Votre panier est vide
                            </SheetDescription>
                        </SheetContent>
                    </Sheet>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] md:w-[300px] input-bg" />
                    </div>
                    {userData ?
                        <div className="flex items-center gap-4">
                            <Button
                                href="/"
                                as={Link}
                                variant="ghost"
                                onClick={handleLogout}
                            >
                                Deconnexion
                            </Button>
                        </div>

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

                    }
                </div>
            </header>
            <div className="mobile-menu fixed top-[-100%] left-0 w-full bg-white dark:bg-gray-950 z-50 transition-all duration-300 ease-in-out px-4 md:px-6 py-4">
                <nav className="grid gap-4">
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    >
                        Shop
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </div>
    )
}