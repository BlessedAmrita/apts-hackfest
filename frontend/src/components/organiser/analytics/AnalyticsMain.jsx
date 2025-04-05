import React from 'react';
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import SentimentChart from './SentimentChart';
import KeywordCloud from './KeywordCloud';
import EngagementMetrics from './EngagementMetrics';
import TimeAnalysis from './TimeAnalysis';
import ReportDownload from './ReportDownload';
import DashboardHeader from './DashboardHeader';
import { 
  SmilePlus, 
  Frown, 
  MessageSquare, 
  Users, 
  Share2 
} from 'lucide-react';

const AnalyticsMain = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <DashboardHeader />

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <StatCard 
              title="Positive Sentiment" 
              value="72%" 
              colorClass="pastel-mint"
              icon={<SmilePlus className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title="Negative Sentiment" 
              value="12%" 
              colorClass="pastel-pink"
              icon={<Frown className="h-5 w-5" />}
              trend={{ value: 3, isPositive: false }}
            />
            <StatCard 
              title="Total Feedback" 
              value="1,243" 
              colorClass="pastel-blue"
              icon={<MessageSquare className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Attendance Rate" 
              value="89%" 
              colorClass="pastel-lavender"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 4, isPositive: true }}
            />
            <StatCard 
              title="Social Shares" 
              value="542" 
              colorClass="pastel-peach"
              icon={<Share2 className="h-5 w-5" />}
              trend={{ value: 6, isPositive: true }}
            />
          </div>

          {/* Charts and Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SentimentChart />
            <KeywordCloud />
          </div>

          {/* Engagement & Time Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <EngagementMetrics />
            <TimeAnalysis />
          </div>

          {/* Report Download */}
          <div className="mb-6">
            <ReportDownload />
          </div>

        </main>
      </div>
    </div>
  );
};

export default AnalyticsMain;
