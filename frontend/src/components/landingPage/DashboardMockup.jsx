'use client';

import React from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { 
  Bell, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Check
} from "lucide-react";

const sentimentData = [
  { time: "10:00", positive: 65, negative: 12, neutral: 23 },
  { time: "11:00", positive: 68, negative: 14, neutral: 18 },
  { time: "12:00", positive: 52, negative: 28, neutral: 20 },
  { time: "13:00", positive: 40, negative: 42, neutral: 18 },
  { time: "14:00", positive: 55, negative: 25, neutral: 20 },
  { time: "15:00", positive: 75, negative: 10, neutral: 15 },
];

const issueData = [
  { name: "Check-in Queue", value: 35 },
  { name: "Food Quality", value: 25 },
  { name: "Session Delays", value: 15 },
  { name: "App Issues", value: 25 },
];

const COLORS = ["#ff8042", "#FACC15", "#0088FE", "#00C49F"];

const DashboardMockup = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Sentiment Trends</h3>
            <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">LIVE</div>
          </div>
          <LineChart width={200} height={100} data={sentimentData}>
            <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Top Issues</h3>
            <AlertCircle size={16} className="text-yellow-500" />
          </div>
          <PieChart width={100} height={100}>
            <Pie
              data={issueData}
              cx={50}
              cy={50}
              innerRadius={25}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {issueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Recent Alerts</h3>
          <Bell size={16} className="text-yellow-500" />
        </div>
        <div className="space-y-2">
          <div className="bg-white p-2 rounded border border-red-100 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-xs text-gray-700">Long wait times at entrance gate</span>
          </div>
          <div className="bg-white p-2 rounded border border-yellow-100 flex items-center gap-2">
            <AlertCircle size={14} className="text-yellow-500" />
            <span className="text-xs text-gray-700">Food vendor complaints increasing</span>
          </div>
          <div className="bg-white p-2 rounded border border-green-100 flex items-center gap-2">
            <Check size={14} className="text-green-500" />
            <span className="text-xs text-gray-700">Main stage experience rated highly</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 p-2 rounded-lg flex flex-col items-center">
          <MessageSquare size={20} className="text-blue-500 mb-1" />
          <span className="text-xs font-medium text-gray-700">1,245</span>
          <span className="text-xs text-gray-500">Messages</span>
        </div>
        <div className="bg-yellow-50 p-2 rounded-lg flex flex-col items-center">
          <Users size={20} className="text-yellow-500 mb-1" />
          <span className="text-xs font-medium text-gray-700">5,678</span>
          <span className="text-xs text-gray-500">Attendees</span>
        </div>
        <div className="bg-green-50 p-2 rounded-lg flex flex-col items-center">
          <TrendingUp size={20} className="text-green-500 mb-1" />
          <span className="text-xs font-medium text-gray-700">78%</span>
          <span className="text-xs text-gray-500">Satisfaction</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;