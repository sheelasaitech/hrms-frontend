import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayslipTemplate } from "@/components/payslip-template";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { PayrollChart } from "@/components/payroll-chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PayrollHistoryPage() {
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const payrollHistory = [
    { month: "October 2025", status: "Processed", amount: 580000, date: "2025-10-31" },
    { month: "September 2025", status: "Processed", amount: 550000, date: "2025-09-30" },
    { month: "August 2025", status: "Processed", amount: 520000, date: "2025-08-31" },
    { month: "July 2025", status: "Pending", amount: 0, date: null },
  ];

  const chartData = [
    { month: "May", amount: 550000 },
    { month: "Jun", amount: 580000 },
    { month: "Jul", amount: 520000 },
    { month: "Aug", amount: 520000 },
    { month: "Sep", amount: 550000 },
    { month: "Oct", amount: 580000 },
  ];

  const samplePayslipData = {
    employeeName: "Sarah Johnson",
    employeeId: "EMP001",
    role: "Manager",
    department: "Engineering",
    month: "October 2025",
    basic: 50000,
    da: 10000,
    hra: 15000,
    allowances: 8000,
    pf: 6000,
    esi: 750,
    tds: 5000,
    reimbursements: 3000,
    netPay: 74250,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll History</h1>
        <p className="text-muted-foreground mt-1">View and download payroll records</p>
      </div>

      <PayrollChart data={chartData} />

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="manager">Manager</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payroll Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payrollHistory.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover-elevate"
                    data-testid={`payroll-record-${idx}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{record.month}</h3>
                      <p className="text-sm text-muted-foreground">
                        {record.date ? `Processed on ${record.date}` : "Not yet processed"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {record.status === "Processed" && (
                        <span className="font-bold text-lg">₹{record.amount.toLocaleString()}</span>
                      )}
                      <Badge variant={record.status === "Processed" ? "default" : "secondary"}>
                        {record.status}
                      </Badge>
                      {record.status === "Processed" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPayslip(samplePayslipData)}
                            data-testid={`button-view-${idx}`}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" data-testid={`button-download-${idx}`}>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {["admin", "hr", "manager", "staff"].map((role) => (
          <TabsContent key={role} value={role}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{role} Payroll Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Filtered payroll records for {role} role</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payslip Details</DialogTitle>
          </DialogHeader>
          {selectedPayslip && <PayslipTemplate data={selectedPayslip} variant="manager" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
