import { useState } from "react";
import { EmployeeTable } from "@/components/employee-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const employees = [
    { id: "1", name: "Sarah Paulson", email: "sarah.j@company.com", roleId: "1", roleName: "Manager", departmentId: "1", departmentName: "Engineering", joinDate: "2023-01-15", status: "Active", phone: null, avatar: null },
    { id: "2", name: "Michael Chen", email: "michael.c@company.com", roleId: "2", roleName: "Staff", departmentId: "2", departmentName: "Sales", joinDate: "2023-03-20", status: "Active", phone: null, avatar: null },
    { id: "3", name: "Emily Rodriguez", email: "emily.r@company.com", roleId: "3", roleName: "HR", departmentId: "3", departmentName: "Human Resources", joinDate: "2023-05-10", status: "Active", phone: null, avatar: null },
    { id: "4", name: "Alex Parker", email: "alex.p@company.com", roleId: "2", roleName: "Staff", departmentId: "1", departmentName: "Engineering", joinDate: "2023-07-22", status: "Active", phone: null, avatar: null },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add employee form submitted");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-employee">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter employee details to add them to the system.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required data-testid="input-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select required>
                    <SelectTrigger id="role" data-testid="select-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select required>
                    <SelectTrigger id="department" data-testid="select-department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" required data-testid="input-join-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" data-testid="input-phone" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">Add Employee</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-employees"
          />
        </div>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={(emp) => console.log("Edit:", emp)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
