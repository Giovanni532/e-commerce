"use client";

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useUserProvider } from "@/provider/userProvider";
import Logout from "@/db/firebase/auth/logout";
import paths from "@/path";

export default function NavbarUi() {
    const { currentUser, setCurrentUser } = useUserProvider();

    const handleLogout = async () => {
        await Logout();
        setCurrentUser(null);
    }

    return (
        <>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] md:w-[300px] input-bg" />
            </div>
            {currentUser ?
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" as={Link} href="/">
                            Mon profil
                        </DropdownItem>
                        <DropdownItem key="avis" as={Link} href="/">
                            Mes avis
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                            Déconnexion
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
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