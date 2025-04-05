import React from "react";
import {
  LayoutDashboard,
  Calendar,
  BarChart,
  Bell,
  Settings,
  Users,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "#",
      active: true,
    },
    {
      icon: <Calendar size={20} />,
      label: "Events",
      href: "#",
    },
    {
      icon: <BarChart size={20} />,
      label: "Analytics",
      href: "#",
    },
    {
      icon: <Bell size={20} />,
      label: "Alerts",
      href: "#",
    },
    {
      icon: <Users size={20} />,
      label: "Attendees",
      href: "#",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "#",
    },
  ];

  return (
    <div className="h-screen w-64 bg-sidebar fixed left-0 top-0 border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <PlusCircle size={24} className="text-primary" />
          FestiFlex Hub
        </h1>
      </div>
      <nav className="px-3 py-2 flex-1">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={cn("nav-link", item.active && "active")}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pastel-purple flex items-center justify-center">
            <span className="text-primary font-medium">JD</span>
          </div>
          <div>
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">Event Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
