import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import CreateIssueModal from "./CreateIssueModel";

const Header = ({ toggleSidebar, notificationCount }) => {
  const isMobile = useIsMobile();
  const [showCreateIssue, setShowCreateIssue] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 sm:px-6">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
            EventAlert
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreateIssue(true)} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Report Issue</span>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>
      {showCreateIssue && (
        <CreateIssueModal open={showCreateIssue} onClose={() => setShowCreateIssue(false)} />
      )}
    </>
  );
};

export default Header;
