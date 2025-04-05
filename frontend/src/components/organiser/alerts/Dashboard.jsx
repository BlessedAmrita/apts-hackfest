import React, { useState } from "react";
import { MOCK_ISSUES } from "@/content/alert/mockData";
import { Issue, SeverityLevel } from "@/content/alert/types";
import IssueCard from "./IssueCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";
import NotificationsList from "./NotificationsList";

const Dashboard = () => {
  const [issues, setIssues] = useState([...MOCK_ISSUES]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const allNotifications = issues.flatMap(issue => issue.notificationsSent);
  const pendingIssuesCount = issues.filter(issue => issue.status === "pending").length;

  const handleResolveIssue = (issueId) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: "resolved" } : issue
      )
    );
    toast({
      title: "Issue resolved",
      description: "The issue has been marked as resolved.",
    });
  };

  const handleEscalateIssue = (issueId) => {
    toast({
      title: "Issue escalated",
      description: "The issue has been escalated to the management team.",
      variant: "destructive",
    });
  };

  const handleViewDetails = (issueId) => {
    toast({
      title: "View details",
      description: "Viewing issue details (to be implemented).",
    });
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === "" ||
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = filterSeverity === "all" || issue.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search issues"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>{filterSeverity === "all" ? "Severity" : filterSeverity}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>{filterStatus === "all" ? "Status" : filterStatus}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onResolve={handleResolveIssue}
                    onEscalate={handleEscalateIssue}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No issues found matching your filters</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterSeverity("all");
                      setFilterStatus("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Notification Logs</h3>
            <p className="text-sm text-gray-500">
              Review all SMS and push notifications sent for event issues
            </p>
          </div>

          <NotificationsList notifications={allNotifications} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
