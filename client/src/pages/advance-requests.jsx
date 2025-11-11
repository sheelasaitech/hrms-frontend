import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";

export default function AdvanceRequestsPage() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const advanceRequests = [
    { id: 1, amount: 25000, month: "November 2025", status: "Approved", requestDate: "2025-10-20" },
    { id: 2, amount: 15000, month: "October 2025", status: "Pending", requestDate: "2025-10-10" },
    { id: 3, amount: 20000, month: "September 2025", status: "Rejected", requestDate: "2025-09-05" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Advance request submitted:", { amount, month });
    setAmount("");
    setMonth("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Advance Salary Requests</h1>
        <p className="text-muted-foreground mt-1">Request salary advances for upcoming months</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>New Advance Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="advanceAmount">Advance Amount (₹)</Label>
                <Input
                  id="advanceAmount"
                  type="number"
                  placeholder="25000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  data-testid="input-advance-amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advanceMonth">For Month</Label>
                <Select value={month} onValueChange={setMonth} required>
                  <SelectTrigger id="advanceMonth" data-testid="select-advance-month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="November 2025">November 2025</SelectItem>
                    <SelectItem value="December 2025">December 2025</SelectItem>
                    <SelectItem value="January 2026">January 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 The advance amount will be deducted from your salary for the selected month.
                </p>
              </div>
              <Button type="submit" className="w-full" data-testid="button-submit-advance">
                <CreditCard className="w-4 h-4 mr-2" />
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
              {advanceRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-border hover-elevate"
                  data-testid={`advance-request-${request.id}`}
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
                    <p className="text-sm">For month: <span className="font-medium">{request.month}</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Requested on {request.requestDate}</p>
                    {request.status === "Approved" && (
                      <p className="text-xs text-primary mt-2">
                        💡 Will be deducted from {request.month} payroll
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
