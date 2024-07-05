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
    "En attente": "success",
    "En cours de traitement": "warning",
    "Expédiée": "primary",
    "Livré": "primary",
    "Annulé": "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "dateCommande", "dateLivraison", "statut", "prixTotal", "action"];

interface TableDataProps {
    columns: { key: string, label: string, sortable?: boolean }[],
    commandes: {
        id: number;
        dateCommande: string;
        idUtilisateur: string | null;
        email: string | null;
        statut: string;
        adresse: string;
        ville: string;
        codePostal: string;
        dateLivraison: string;
        prixTotal: number;
    }[],
    statusOptions: { name: string, key: string }[]
}

export default function TableDataCommandes({ columns, commandes, statusOptions }: TableDataProps) {
    type Commandes = typeof commandes[0];
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
    }, [columns, visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredCommandes = [...commandes];

        if (hasSearchFilter) {
            filteredCommandes = filteredCommandes.filter((commande) =>
                commande.id.toString().toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredCommandes = filteredCommandes.filter((commande) =>
                Array.from(statusFilter).includes(commande.statut),
            );
        }

        return filteredCommandes;
    }, [hasSearchFilter, statusOptions.length, commandes, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Commandes, b: Commandes) => {
            const first = a[sortDescriptor.column as keyof Commandes] as number;
            const second = b[sortDescriptor.column as keyof Commandes] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((commande: Commandes, columnKey: React.Key) => {
        const cellValue = commande[columnKey as keyof Commandes];

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
                                <ModalDetails id={commande.id} isCommande={true} commande={commande} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Modifiez la commande">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalEdit isCommande={true} commande={commande} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Supprimer la commande">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <ModalDelete isCommande={true} id={commande.id} nomArticle='' />
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
                        placeholder="Rechercher un commande"
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
                    <span className="text-default-400 text-small">Total des commandes: {commandes.length} </span>
                    <label className="flex items-center text-default-400 text-small">
                        Commandes par page:
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
        columns,
        onClear,
        statusOptions,
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        commandes.length,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Tous les commandes sont sélectionnés"
                        : `${selectedKeys.size} sur ${filteredItems.length} commande selectionné`}
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
    }, [filteredItems.length, onNextPage, onPreviousPage, selectedKeys, page, pages]);

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
            aria-label='Table des commandes'
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
            <TableBody emptyContent={"Aucun commandes trouvée"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
