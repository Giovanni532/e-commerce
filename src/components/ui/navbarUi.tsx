"use client";

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useUserProvider } from "@/provider/userProvider";
import Logout from "@/db/firebase/auth/logout";
import { UserRound, LogOut, Building } from 'lucide-react';

import paths from "@/path";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function NavbarUi() {
    const { currentUser, setCurrentUser } = useUserProvider();
    const router = useRouter();

    const handleLogout = async () => {
        await Logout();
        setCurrentUser(null);
        deleteCookie('currentUser');
        router.refresh();
    }

    return (
        <>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <Input placeholder="Chercher ..." className="pl-8 sm:w-[200px] md:w-[300px] input-bg" />
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