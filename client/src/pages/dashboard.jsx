import { KPICard } from "@/components/kpi-card";
import { PayrollChart } from "@/components/payroll-chart";
import { AttendanceChart } from "@/components/attendance-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Calendar, FolderKanban, Plus, FileCheck, UserPlus } from "lucide-react";

export default function DashboardPage() {
  const kpiData = [
    { title: "Total Employees", value: 156, icon: Users, trend: { value: 12, isPositive: true } },
    { title: "Monthly Payroll", value: "₹5.8L", icon: DollarSign, trend: { value: 5, isPositive: true } },
    { title: "Attendance Rate", value: "94%", icon: Calendar, trend: { value: 2, isPositive: true } },
    { title: "Active Projects", value: 24, icon: FolderKanban, trend: { value: 8, isPositive: false } },
  ];

  const payrollData = [
    { month: "Jan", amount: 450000 },
    { month: "Feb", amount: 480000 },
    { month: "Mar", amount: 520000 },
    { month: "Apr", amount: 510000 },
    { month: "May", amount: 550000 },
    { month: "Jun", amount: 580000 },
  ];

  const attendanceData = [
    { name: "Engineering", value: 45 },
    { name: "Sales", value: 28 },
    { name: "Marketing", value: 22 },
    { name: "HR", value: 15 },
    { name: "Operations", value: 35 },
  ];

  const recentActivities = [
    { id: 1, type: "Leave Request", user: "Sarah Johnson", action: "Requested 3 days leave", time: "2 hours ago", status: "Pending" },
    { id: 2, type: "Loan Approval", user: "Michael Chen", action: "Loan request approved", time: "5 hours ago", status: "Approved" },
    { id: 3, type: "Payroll", user: "System", action: "September payroll processed", time: "1 day ago", status: "Completed" },
    { id: 4, type: "New Employee", user: "Emily Rodriguez", action: "Joined Engineering team", time: "2 days ago", status: "Active" },
  ];

  const quickActions = [
    { title: "Add Employee", icon: UserPlus, action: () => console.log("Add employee") },
    { title: "Approve Leave", icon: FileCheck, action: () => console.log("Approve leave") },
    { title: "Generate Payroll", icon: DollarSign, action: () => console.log("Generate payroll") },
    { title: "New Project", icon: Plus, action: () => console.log("New project") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayrollChart data={payrollData} />
        <AttendanceChart data={attendanceData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-3 rounded-lg hover-elevate border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{activity.type}</span>
                      <Badge variant="secondary" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">{activity.user}</span> - {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={action.action}
                  data-testid={`button-${action.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
