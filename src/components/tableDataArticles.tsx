"use client"

import React from 'react'
import {
    Pagination,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip
} from "@nextui-org/react";
import { Search, ChevronDown } from 'lucide-react';
import { capitalize } from '@/lib/utils';
import ModalDelete from './modalDelete';
import ModalEdit from './modalEdit';
import ModalDetails from './modalDetails';


const statusColorMap: Record<string, ChipProps["color"]> = {
    EnVente: "success",
    vendu: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "nomProduit", "prix", "statut", "action"];

interface TableDataProps {
    columns: { key: string, label: string, sortable?: boolean }[],
    articles: {
        id: number;
        nomProduit: string;
        description: string;
        prix: number;
        couleur: string;
        etat: string;
        taille: string;
        statut: string;
        idSousCategorie: number;
        idCategorie: number;
        urlsImages: string[]
    }[],
    statusOptions: { name: string, key: string }[],
    categories: { id: number, nomCategorie: string }[],
    sousCategories: { id: number, nomSousCategorie: string }[]
}


export default function TableDataArticles({ columns, articles, statusOptions, categories, sousCategories }: TableDataProps) {
    type Articles = typeof articles[0];
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "prix",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredArticles = [...articles];

        if (hasSearchFilter) {
            filteredArticles = filteredArticles.filter((article) =>
                article.nomProduit.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredArticles = filteredArticles.filter((article) =>
                Array.from(statusFilter).includes(article.statut),
            );
        }

        return filteredArticles;
    }, [articles, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Articles, b: Articles) => {
            const first = a[sortDescriptor.column as keyof Articles] as number;
            const second = b[sortDescriptor.column as keyof Articles] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((article: Articles, columnKey: React.Key) => {
        const cellValue = article[columnKey as keyof Articles];

        switch (columnKey) {
            case "statut":
                return (
                    <Chip color={statusColorMap[cellValue as string]}>{cellValue}</Chip>
                );
            case "action":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalDetails isCommande={true} article={article} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Modifiez l'article">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalEdit
                                    isCommande={false}
                                    article={article}
                                    categories={categories}
                                    sousCategories={sousCategories}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Supprimer l'article">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <ModalDelete isCommande={false} id={article.id} nomArticle={article.nomProduit} />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "prix":
                return <span>{cellValue} CHF</span>;
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Rechercher un article"
                        startContent={<Search />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                                    Statut
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.key} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDown className="text-small" />} variant="flat">
                                    Colonne
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.key} className="capitalize">
                                        {capitalize(column.label)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total d'articles: {articles.length} </span>
                    <label className="flex items-center text-default-400 text-small">
                        Articles par page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        articles.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Tous les articles sont sélectionnés"
                        : `${selectedKeys.size} sur ${filteredItems.length} article selectionné`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Précedente
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Suivante
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        align="start"
                        allowsSorting={column.sortable}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Aucun articles trouvée"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
