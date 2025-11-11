import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

export default function LoanRequestsPage() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const loanRequests = [
    { id: 1, amount: 50000, reason: "Home renovation", date: "2025-10-15", status: "Approved", employee: "You" },
    { id: 2, amount: 30000, reason: "Medical emergency", date: "2025-09-10", status: "Pending", employee: "You" },
    { id: 3, amount: 75000, reason: "Education expenses", date: "2025-08-05", status: "Rejected", employee: "You" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan request submitted:", { amount, reason });
    setAmount("");
    setReason("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loan Requests</h1>
        <p className="text-muted-foreground mt-1">Request and manage employee loans</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>New Loan Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  data-testid="input-loan-amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain the purpose of the loan..."
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  data-testid="textarea-loan-reason"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Request Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  data-testid="input-loan-date"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-submit-loan">
                <DollarSign className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loanRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-border hover-elevate"
                  data-testid={`loan-request-${request.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">₹{request.amount.toLocaleString()}</h3>
                      <Badge
                        variant={
                          request.status === "Approved"
                            ? "default"
                            : request.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                    <p className="text-xs text-muted-foreground mt-1">Requested on {request.date}</p>
                    {request.status === "Approved" && (
                      <p className="text-xs text-primary mt-2">
                        💡 This amount will be auto-deducted from your payroll
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
