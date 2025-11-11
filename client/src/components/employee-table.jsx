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

export function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="hover-elevate" data-testid={`row-employee-${employee.id}`}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell className="text-muted-foreground">{employee.email}</TableCell>
              <TableCell>{employee.roleName}</TableCell>
              <TableCell>{employee.departmentName}</TableCell>
              <TableCell>{employee.joinDate}</TableCell>
              <TableCell>
                <Badge
                  variant={employee.status === "Active" ? "default" : "secondary"}
                  data-testid={`badge-status-${employee.id}`}
                >
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit?.(employee)}
                    data-testid={`button-edit-${employee.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete?.(employee.id)}
                    data-testid={`button-delete-${employee.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
