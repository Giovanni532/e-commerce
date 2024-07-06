"use client";

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
import LinkMenu from "./linkMenu";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="relative bg-background">
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
                        <SheetContent side='left' className="flex flex-col items-center gap-2">
                            <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">Menu</h3>
                            <SheetClose asChild>
                                <LinkMenu
                                    href={paths.articlesPath()}
                                    text="Articles"
                                    isActif={pathname === paths.articlesPath()}
                                />
                            </SheetClose>
                            <SheetClose asChild>
                                <LinkMenu
                                    href={paths.contactPath()}
                                    text="Contact"
                                    isActif={pathname === paths.contactPath()}
                                />
                            </SheetClose>
                        </SheetContent>
                    </Sheet>
                    <LinkMenu href={paths.homePath()} text={<Ribbon/>} isActif={pathname === paths.homePath()}/>
                    <nav className="hidden lg:flex gap-4">
                        <LinkMenu
                            href={paths.articlesPath()}
                            text="Articles"
                            isActif={pathname === paths.articlesPath()}
                        />
                        <LinkMenu
                            href={paths.contactPath()}
                            text="Contact"
                            isActif={pathname === paths.contactPath()}
                        />
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <NavbarUi />
                </div>
            </header>
        </div>
    )
}