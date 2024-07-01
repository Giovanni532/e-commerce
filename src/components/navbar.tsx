import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Ribbon } from 'lucide-react';
import paths from "@/path";
import NavbarUi from "./ui/navbarUi";

export default async function Navbar() {
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
                        <SheetContent side='left' className="flex flex-col gap-2">
                            <SheetClose asChild>
                                <Link href={paths.articlesPath()}>Articles</Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href={paths.articlesPath()}>Femme</Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href={paths.articlesPath()}>Homme</Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href={paths.articlesPath()}>Contact</Link>
                            </SheetClose>
                        </SheetContent>
                    </Sheet>
                    <Link href={paths.homePath()} className="flex items-center">
                        <Ribbon className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <nav className="hidden lg:flex gap-4">
                        <Link
                            href={paths.articlesPath()}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Articles
                        </Link>
                        <Link
                            href={paths.articlesPath()}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Femmes
                        </Link>
                        <Link
                            href={paths.articlesPath()}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Hommes
                        </Link>
                        <Link
                            href={paths.articlesPath()}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <NavbarUi />
                </div>
            </header>
        </div>
    )
}