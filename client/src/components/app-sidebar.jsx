import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Calendar,
  FolderKanban,
  FileText,
  User,
  Building2,
  Briefcase,
  CreditCard,
  BadgeDollarSign,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Tenants",
    url: "/tenants",
    icon: Building2,
  },
  {
    group: "Employee Master",
    items: [
      {
        title: "Roles",
        url: "/roles",
        icon: Briefcase,
      },
      {
        title: "Departments",
        url: "/departments",
        icon: Building2,
      },
      {
        title: "Employees",
        url: "/employees",
        icon: Users,
      },
    ],
  },
  {
    group: "Payroll",
    items: [
      {
        title: "Salary Master",
        url: "/payroll/salary-master",
        icon: DollarSign,
      },
      {
        title: "Payroll Entry",
        url: "/payroll",
        icon: FileText,
      },
      {
        title: "Payroll History",
        url: "/payroll/history",
        icon: FileText,
      },
      {
        title: "Loan Requests",
        url: "/loan-requests",
        icon: BadgeDollarSign,
      },
      {
        title: "Advance Requests",
        url: "/advance-requests",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Calendar,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const accessLevels = JSON.parse(localStorage.getItem("accessLevels")) || {};

  const hasViewAccess = (key) => {
    const crtKey = key.toLowerCase().trim().replace(/\s+/g, "_");
    const level = accessLevels[crtKey];
    return level && level[0] === "1"; // first digit = view permission
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">HR Payroll</h1>
            <p className="text-xs text-muted-foreground">Attendance & Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((item, index) => {
          // 🟡 Handle grouped items (like Employee Master)
          if ("group" in item && item.items) {
            const visibleItems = item.items.filter((sub) => hasViewAccess(sub.title));
            if (visibleItems.length === 0) return null; // hide entire group if none visible

            return (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {visibleItems.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={location === subItem.url}
                        >
                          <Link href={subItem.url}>
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          // 🟢 Handle single menu items
          const itemKey = item.title.toLowerCase();
          if (!hasViewAccess(itemKey)) return null;

          return (
            <SidebarGroup key={index}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
