import { Router as WouterRouter } from "wouter";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import EmployeesPage from "@/pages/employees";
import RolesPage from "@/pages/roles";
import DepartmentsPage from "@/pages/departments";
import PayrollPage from "@/pages/payroll";
import PayrollHistoryPage from "@/pages/payroll-history";
import SalaryMasterPage from "@/pages/salary-master";
import AttendancePage from "@/pages/attendance";
import ProjectsPage from "@/pages/projects";
import LoanRequestsPage from "@/pages/loan-requests";
import AdvanceRequestsPage from "@/pages/advance-requests";
import ProfilePage from "@/pages/profile";
import { useEffect } from "react";
import { Toaster } from "sonner";
import TenantPage from "./pages/tenant";

function Router() {
  const [location] = useLocation();
  const isLoginPage = location === "/login";

  if (isLoginPage) {
    return <LoginPage />;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-icon": "3rem",
      }}
    >
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <Switch>
              <Route path="/" component={DashboardPage} />
              <Route path="/employees" component={EmployeesPage} />
              <Route path="/roles" component={RolesPage} />
              <Route path="/departments" component={DepartmentsPage} />
              <Route path="/payroll/salary-master" component={SalaryMasterPage} />
              <Route path="/payroll" component={PayrollPage} />
              <Route path="/payroll/history" component={PayrollHistoryPage} />
              <Route path="/attendance" component={AttendancePage} />
              <Route path="/projects" component={ProjectsPage} />
              <Route path="/loan-requests" component={LoanRequestsPage} />
              <Route path="/advance-requests" component={AdvanceRequestsPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/tenants" component={TenantPage} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster richColors position="top-center" />
        <WouterRouter base="/hr-payroll-v3">
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
