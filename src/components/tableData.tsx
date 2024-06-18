"use client"

import {
    Pagination,
    Tooltip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Selection,
    ChipProps,
    SortDescriptor
} from "@nextui-org/react";
import { Pencil, Eye, Trash2 } from 'lucide-react';


import React from 'react'

interface TableDataProps {
    columns: { key: string, label: string }[],
    articles: {
        id: number;
        nomProduit: string;
        description: string;
        prix: number;
        couleur: string;
        etat: string;
        taille: string;
        idSousCategorie: number;
        idCategorie: number;
        urlsImages: string[]
    }[]
}

export default function TableData({ columns, articles }: TableDataProps) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 7;
    const pages = Math.ceil(articles.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return articles.slice(start, end);
    }, [page, articles]);

    return (
        <Table isStriped
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}>
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
            </TableHeader>
            <TableBody emptyContent={"Aucun articles a afficher"}>
                {items.map((article) => (
                    <TableRow key={article.id}>
                        {columns.map((column) => (
                            column.key === "action" ?
                                <TableCell className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Eye />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Modifiez l'article">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Pencil />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Supprimer l'article">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <Trash2 />
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                :
                                <TableCell key={column.key}>{getKeyValue(article, column.key)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
