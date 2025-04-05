'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Download, 
  Settings,
  Home
} from 'lucide-react';

// Remove TypeScript types in JSX
const SidebarItem = ({ icon, title, isActive, href }) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
        <span className="font-medium">{title}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col border-r bg-card p-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 text-lg font-semibold">Event Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and analyze your event feedback
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <SidebarItem 
          href="/" 
          icon={<Home className="h-5 w-5" />} 
          title="Dashboard" 
        />
        <SidebarItem 
          href="/analytics" 
          icon={<BarChart2 className="h-5 w-5" />} 
          title="Analytics" 
          isActive={true} 
        />
        <SidebarItem 
          href="/trends" 
          icon={<TrendingUp className="h-5 w-5" />} 
          title="Trends" 
        />
        <SidebarItem 
          href="/sentiment" 
          icon={<MessageSquare className="h-5 w-5" />} 
          title="Sentiment" 
        />
        <SidebarItem 
          href="/timeframe" 
          icon={<Clock className="h-5 w-5" />} 
          title="Time Frame" 
        />
        <SidebarItem 
          href="/downloads" 
          icon={<Download className="h-5 w-5" />} 
          title="Downloads" 
        />
        <SidebarItem 
          href="/settings" 
          icon={<Settings className="h-5 w-5" />} 
          title="Settings" 
        />
      </div>
    </div>
  );
};

export default Sidebar;
