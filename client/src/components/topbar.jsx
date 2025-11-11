import { Bell, Search, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { serverAPi } from "@/utils/axios";

export function Topbar() {
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const handleLogout = async () => {
    console.log("Logout triggered");
    setLoading(true);
    try {
      const res = await serverAPi.post("/api/user/logout");
      const result = res.data;
      if (result.status === 1) {
        toast?.success(result.message || "Logged out successfully");
        localStorage.removeItem("user");
        localStorage.removeItem("accessLevels");
        // ✅ Redirect to login page
        setLocation("/login");
      } else {
        toast?.error(result.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast?.error(err.response?.data?.message || "Something went wrong during logout");
    } finally {
      setLoading(false);
    }
  };
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-50 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        {/* <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees, projects..."
            className="pl-10"
            data-testid="input-search"
          />
        </div> */}
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDarkMode}
          data-testid="button-theme-toggle"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button size="icon" variant="ghost" data-testid="button-notifications">
          <Bell className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">{userInfo?.name}</span>
                <span className="text-xs text-muted-foreground">{userInfo?.role}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLocation("/profile")} data-testid="menu-profile">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
