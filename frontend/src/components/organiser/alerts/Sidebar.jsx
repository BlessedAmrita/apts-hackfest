import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Bell, 
  ChevronRight, 
  FileText, 
  Home, 
  MessageCircle, 
  User, 
  Users 
} from "lucide-react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto pt-16 lg:pt-0`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={18} className="text-violet-500" />
              <span className="font-semibold text-lg">EventAlert</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={closeSidebar}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator />
          
          <nav className="space-y-1.5">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start bg-slate-100">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Issues
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Staff
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>
          
          <Separator />
          
          <div className="pt-2">
            <div className="rounded-lg bg-pastel-purple p-3">
              <h3 className="font-medium text-sm">Event in Progress</h3>
              <p className="text-xs text-muted-foreground">Summer Music Festival</p>
              <p className="text-xs text-muted-foreground mt-1">Day 2 of 3</p>
              <div className="mt-2 w-full bg-white rounded-full h-1.5">
                <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: "66%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
