import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar, Download, Filter } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor sentiment and engagement metrics across your events
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-orange-100 text-white hover:bg-white hover:text-orange-100">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </Button>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] h-9 bg-orange-100 text-white">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="exhibition">Exhibitions</SelectItem>
            <SelectItem value="concert">Concerts</SelectItem>
            <SelectItem value="conference">Conferences</SelectItem>
            <SelectItem value="meetup">Meetups</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="default" size="sm" className="flex items-center gap-2 bg-orange-button text-white hover:bg-white hover:text-orange-button">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
