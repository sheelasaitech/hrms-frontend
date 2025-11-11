import { useState } from "react";
import { AttendanceCalendar } from "@/components/attendance-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AttendancePage() {
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const attendance = [
    { date: "2025-10-01", status: "Present" },
    { date: "2025-10-02", status: "Present" },
    { date: "2025-10-03", status: "Remote" },
    { date: "2025-10-04", status: "Present" },
    { date: "2025-10-07", status: "Present" },
    { date: "2025-10-08", status: "Half-day" },
    { date: "2025-10-09", status: "Present" },
    { date: "2025-10-10", status: "Leave" },
  ];

  const teamStats = [
    { department: "Engineering", attendance: 94, total: 45 },
    { department: "Sales", attendance: 96, total: 28 },
    { department: "Marketing", attendance: 89, total: 22 },
    { department: "HR", attendance: 100, total: 15 },
  ];

  const leaveRequests = [
    { id: 1, employee: "Sarah Johnson", type: "Casual", dates: "Oct 15-17", reason: "Family function", status: "Pending" },
    { id: 2, employee: "Michael Chen", type: "Sick", dates: "Oct 20", reason: "Medical checkup", status: "Approved" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted");
    setIsLeaveDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">Track employee attendance and leave requests</p>
        </div>
        <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-request-leave">
              <Plus className="w-4 h-4 mr-2" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
              <DialogDescription>Fill in the details for your leave request.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select required>
                  <SelectTrigger id="leaveType" data-testid="select-leave-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromDate">From Date</Label>
                  <input type="date" id="fromDate" className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm" required data-testid="input-from-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toDate">To Date</Label>
                  <input type="date" id="toDate" className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm" required data-testid="input-to-date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" rows={3} required data-testid="textarea-reason" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">Submit Request</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList>
          <TabsTrigger value="individual">My Attendance</TabsTrigger>
          <TabsTrigger value="team">Team Attendance</TabsTrigger>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <AttendanceCalendar month="October" year={2025} attendance={attendance} />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Department-wise Attendance</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamStats.map((stat) => (
                  <div key={stat.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stat.department}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.attendance}% ({Math.round((stat.attendance / 100) * stat.total)}/{stat.total} present)
                      </span>
                    </div>
                    <Progress value={stat.attendance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start justify-between p-4 rounded-lg border border-border hover-elevate"
                    data-testid={`leave-request-${request.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{request.employee}</h3>
                        <Badge variant="outline">{request.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <CalendarIcon className="w-3 h-3 inline mr-1" />
                        {request.dates}
                      </p>
                      <p className="text-sm mt-1">{request.reason}</p>
                    </div>
                    <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
