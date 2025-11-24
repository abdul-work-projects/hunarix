"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  DollarSign,
  Activity,
  Moon,
  Sun,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  MousePointerClick,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  {
    title: "Overview",
    href: "/admin/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: MousePointerClick,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Usage",
    href: "/admin/usage",
    icon: BarChart3,
  },
  {
    title: "Finance",
    href: "/admin/finance",
    icon: DollarSign,
  },
  {
    title: "System",
    href: "/admin/system",
    icon: Activity,
  },
];

function NavContent({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    // Clear any auth tokens/session data here
    // For now, just redirect to login
    router.push("/login");
    onNavigate?.();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon
                className={cn(
                  "h-5 w-5 relative z-10",
                  isActive && "text-primary-foreground"
                )}
              />
              {!collapsed && (
                <span className="relative z-10">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="border-t border-border p-3 space-y-1">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "w-full justify-start gap-3",
            collapsed && "justify-center"
          )}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {!collapsed && <span>Toggle theme</span>}
        </Button>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}

// Mobile Header with Sheet
export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:hidden">
      <Link href="/admin/overview" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
          <Cpu className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Hunarix - Admin Console
        </span>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-16 items-center border-b border-border px-4">
            <Link
              href="/admin/overview"
              className="flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                <Cpu className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DocuAI</span>
            </Link>
          </div>
          <NavContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Desktop Sidebar
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-40 hidden h-screen border-r border-border bg-card/50 backdrop-blur-xl lg:block"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/admin/overview" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                <Cpu className="h-5 w-5 text-primary-foreground" />
              </div>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                >
                  Hunarix
                </motion.span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <NavContent collapsed={collapsed} />
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
