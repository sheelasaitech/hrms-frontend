import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState("October 2025");

  const payrollEntries = [
    {
      id: "1",
      employeeId: "emp1",
      employeeName: "Sarah Johnson",
      basic: 50000,
      da: 10000,
      hra: 15000,
      allowances: 8000,
      pf: 6000,
      esi: 750,
      tds: 5000,
      reimbursements: 3000,
      loanDeduction: 0,
      advanceDeduction: 0,
      hasSalaryMaster: true,
    },
    {
      id: "2",
      employeeId: "emp2",
      employeeName: "Michael Chen",
      basic: 45000,
      da: 9000,
      hra: 13500,
      allowances: 6000,
      pf: 5400,
      esi: 675,
      tds: 4200,
      reimbursements: 5000,
      loanDeduction: 2000,
      advanceDeduction: 0,
      hasSalaryMaster: true,
    },
    {
      id: "3",
      employeeId: "emp3",
      employeeName: "Emily Rodriguez",
      basic: 0,
      da: 0,
      hra: 0,
      allowances: 0,
      pf: 0,
      esi: 0,
      tds: 0,
      reimbursements: 0,
      loanDeduction: 0,
      advanceDeduction: 0,
      hasSalaryMaster: false,
    },
  ];

  const calculateNetPay = (entry) => {
    const gross = entry.basic + entry.da + entry.hra + entry.allowances + entry.reimbursements;
    const deductions = entry.pf + entry.esi + entry.tds + entry.loanDeduction + entry.advanceDeduction;
    return gross - deductions;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll Entry</h1>
          <p className="text-muted-foreground mt-1">Process monthly payroll for employees</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48" data-testid="select-month">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="October 2025">October 2025</SelectItem>
              <SelectItem value="September 2025">September 2025</SelectItem>
              <SelectItem value="August 2025">August 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          💡 <strong>Salary values are auto-filled from Salary Master.</strong> You can adjust reimbursements or other
          monthly changes. Loan and advance deductions are automatically applied from approved requests.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Employee Payroll Details - {selectedMonth}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {payrollEntries.map((entry) => (
              <Card
                key={entry.id}
                className={`border-2 ${!entry.hasSalaryMaster ? "border-destructive" : ""}`}
                data-testid={`payroll-entry-${entry.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{entry.employeeName}</CardTitle>
                    {entry.hasSalaryMaster ? (
                      <Badge variant="default">From Salary Master</Badge>
                    ) : (
                      <Badge variant="destructive">No Salary Master Entry</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!entry.hasSalaryMaster ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please define salary structure in <strong>Salary Master</strong> before processing payroll for
                        this employee.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-muted-foreground">
                          Earnings (from Salary Master)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Basic</Label>
                            <Input value={entry.basic} disabled className="bg-muted" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">DA</Label>
                            <Input value={entry.da} disabled className="bg-muted" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">HRA</Label>
                            <Input value={entry.hra} disabled className="bg-muted" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Allowances</Label>
                            <Input value={entry.allowances} disabled className="bg-muted" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-muted-foreground">
                          Deductions (from Salary Master)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">PF</Label>
                            <Input value={entry.pf} disabled className="bg-muted" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">ESI</Label>
                            <Input value={entry.esi} disabled className="bg-muted" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">TDS</Label>
                            <Input value={entry.tds} disabled className="bg-muted" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-muted-foreground">
                          Monthly Adjustments (Editable)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Reimbursements</Label>
                            <Input
                              type="number"
                              defaultValue={entry.reimbursements}
                              className="bg-background"
                              data-testid={`input-reimbursements-${entry.id}`}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">
                              Loan Deduction{" "}
                              {entry.loanDeduction > 0 && <span className="text-primary">(Auto)</span>}
                            </Label>
                            <Input
                              value={entry.loanDeduction}
                              disabled
                              className="bg-destructive/10 font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">
                              Advance Deduction{" "}
                              {entry.advanceDeduction > 0 && <span className="text-primary">(Auto)</span>}
                            </Label>
                            <Input
                              value={entry.advanceDeduction}
                              disabled
                              className="bg-destructive/10 font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end items-center gap-4 pt-3 border-t border-border">
                        <span className="font-semibold">Net Pay:</span>
                        <span className="text-2xl font-bold text-primary" data-testid={`net-pay-${entry.id}`}>
                          ₹{calculateNetPay(entry).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" data-testid="button-submit-payroll">
          <DollarSign className="w-4 h-4 mr-2" />
          Submit Payroll for {selectedMonth}
        </Button>
      </div>
    </div>
  );
}
