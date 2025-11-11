import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, DollarSign, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SalaryMasterPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const employees = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Chen" },
    { id: "3", name: "Emily Rodriguez" },
    { id: "4", name: "Alex Parker" },
  ];

  const salaryData = [
    {
      id: "1",
      employeeId: "1",
      employeeName: "Sarah Johnson",
      basic: 50000,
      da: 10000,
      hra: 15000,
      allowances: 8000,
      pf: 6000,
      esi: 750,
      tds: 5000,
    },
    {
      id: "2",
      employeeId: "2",
      employeeName: "Michael Chen",
      basic: 45000,
      da: 9000,
      hra: 13500,
      allowances: 6000,
      pf: 5400,
      esi: 675,
      tds: 4200,
    },
  ];

  const calculateGross = (salary) => {
    return salary.basic + salary.da + salary.hra + salary.allowances;
  };

  const calculateNet = (salary) => {
    const gross = calculateGross(salary);
    return gross - (salary.pf + salary.esi + salary.tds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salary master entry submitted");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Salary Master</h1>
          <p className="text-muted-foreground mt-1">Define salary structure for employees</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-salary">
              <Plus className="w-4 h-4 mr-2" />
              Add Salary Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Define Employee Salary Structure</DialogTitle>
              <DialogDescription>
                Set up salary components for an employee. These values will be used as defaults in payroll entry.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employee">Select Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee} required>
                  <SelectTrigger id="employee" data-testid="select-employee">
                    <SelectValue placeholder="Choose employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Earnings Components
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic">Basic Salary (₹)</Label>
                    <Input
                      id="basic"
                      type="number"
                      placeholder="50000"
                      required
                      data-testid="input-basic"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="da">Dearness Allowance (₹)</Label>
                    <Input
                      id="da"
                      type="number"
                      placeholder="10000"
                      required
                      data-testid="input-da"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hra">House Rent Allowance (₹)</Label>
                    <Input
                      id="hra"
                      type="number"
                      placeholder="15000"
                      required
                      data-testid="input-hra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances">Other Allowances (₹)</Label>
                    <Input
                      id="allowances"
                      type="number"
                      placeholder="8000"
                      required
                      data-testid="input-allowances"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-destructive" />
                  Deduction Components
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pf">Provident Fund (₹)</Label>
                    <Input
                      id="pf"
                      type="number"
                      placeholder="6000"
                      required
                      data-testid="input-pf"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="esi">ESI (₹)</Label>
                    <Input
                      id="esi"
                      type="number"
                      placeholder="750"
                      required
                      data-testid="input-esi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tds">TDS (₹)</Label>
                    <Input
                      id="tds"
                      type="number"
                      placeholder="5000"
                      required
                      data-testid="input-tds"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Note:</strong> These values will be automatically populated in the payroll entry form.
                  You can still adjust them monthly if needed (for reimbursements, bonuses, etc.).
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">
                  Save Salary Structure
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee Name</TableHead>
                  <TableHead className="text-right">Basic</TableHead>
                  <TableHead className="text-right">DA</TableHead>
                  <TableHead className="text-right">HRA</TableHead>
                  <TableHead className="text-right">Allowances</TableHead>
                  <TableHead className="text-right">PF</TableHead>
                  <TableHead className="text-right">ESI</TableHead>
                  <TableHead className="text-right">TDS</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryData.map((salary) => (
                  <TableRow key={salary.id} className="hover-elevate" data-testid={`row-salary-${salary.id}`}>
                    <TableCell className="font-medium">{salary.employeeName}</TableCell>
                    <TableCell className="text-right">₹{salary.basic.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{salary.da.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{salary.hra.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{salary.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">₹{salary.pf.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">₹{salary.esi.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">₹{salary.tds.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{calculateGross(salary).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="default" className="font-semibold">
                        ₹{calculateNet(salary).toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`button-edit-${salary.id}`}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
