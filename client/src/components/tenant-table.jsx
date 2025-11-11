import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

export function TenantTable({ tenants, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const tenantsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(tenants.length / tenantsPerPage);
    const indexOfLast = currentPage * tenantsPerPage;
    const indexOfFirst = indexOfLast - tenantsPerPage;
    const currentTenants = tenants.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="rounded-lg border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead>Company Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Subscription End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant._id} className="hover-elevate" data-testid={`row-tenant-${tenant._id}`}>
                            <TableCell className="font-medium">{tenant.companyName}</TableCell>
                            <TableCell className="text-muted-foreground">{tenant.email}</TableCell>
                            <TableCell>{tenant.contactPerson}</TableCell>
                            <TableCell>{tenant.contactNumber}</TableCell>
                            <TableCell>
                                {new Date(tenant.subscriptionExpDate).toISOString().split("T")[0]}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={tenant.status === "active" ? "default" : "secondary"}
                                    data-testid={`badge-status-${tenant.id}`}
                                >
                                    {tenant.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => onEdit?.(tenant)}
                                        data-testid={`button-edit-${tenant.id}`}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => onDelete?.(tenant.id)}
                                        data-testid={`button-delete-${tenant.id}`}
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ✅ Pagination Controls */}
            <Pagination className="py-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {totalPages > 5 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
