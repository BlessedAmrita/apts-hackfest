'use client';
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { MOCK_ISSUES } from '@/content/alert/mockData';

const OrganiserAlertsMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate notification count (pending issues)
  const pendingIssuesCount = MOCK_ISSUES.filter(issue => issue.status === "pending").length;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          notificationCount={pendingIssuesCount}
        />
        
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default OrganiserAlertsMain;
