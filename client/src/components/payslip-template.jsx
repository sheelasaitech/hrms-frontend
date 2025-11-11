import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PayslipTemplate({ data, variant }) {
  const grossEarnings = data.basic + data.da + data.hra + data.allowances + (data.reimbursements || 0);
  const totalDeductions = data.pf + data.esi + data.tds;

  const variantColors = {
    admin: "border-l-4 border-l-chart-1",
    hr: "border-l-4 border-l-chart-2",
    manager: "border-l-4 border-l-chart-3",
    staff: "border-l-4 border-l-chart-4",
  };

  return (
    <Card className={`${variantColors[variant]}`}>
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Payslip</h2>
            <p className="text-sm text-muted-foreground mt-1">For the month of {data.month}</p>
          </div>
          <Badge variant="secondary" className="uppercase">
            {variant}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Employee Name</p>
            <p className="font-semibold">{data.employeeName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Employee ID</p>
            <p className="font-semibold">{data.employeeId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-semibold">{data.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-semibold">{data.department}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Earnings</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Basic Salary</span>
              <span className="font-medium">₹{data.basic.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Dearness Allowance (DA)</span>
              <span className="font-medium">₹{data.da.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">House Rent Allowance (HRA)</span>
              <span className="font-medium">₹{data.hra.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Other Allowances</span>
              <span className="font-medium">₹{data.allowances.toLocaleString()}</span>
            </div>
            {data.reimbursements && data.reimbursements > 0 && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Reimbursements</span>
                <span className="font-medium">₹{data.reimbursements.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between py-2 bg-muted/50 px-2 rounded">
              <span className="font-semibold">Gross Earnings</span>
              <span className="font-bold">₹{grossEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Deductions</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Provident Fund (PF)</span>
              <span className="font-medium">₹{data.pf.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">ESI</span>
              <span className="font-medium">₹{data.esi.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">TDS</span>
              <span className="font-medium">₹{data.tds.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 bg-muted/50 px-2 rounded">
              <span className="font-semibold">Total Deductions</span>
              <span className="font-bold">₹{totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Net Pay</span>
            <span className="text-2xl font-bold text-primary">₹{data.netPay.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" data-testid="button-download-payslip">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
