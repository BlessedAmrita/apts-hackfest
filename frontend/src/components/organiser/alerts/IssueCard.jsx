import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { getSeverityClass, getSeverityColor } from "@/content/alert/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, MessageSquare, Smartphone } from "lucide-react";

const IssueCard = ({ issue, onResolve, onEscalate, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);
  const severityClass = getSeverityClass(issue.severity);
  const severityColor = getSeverityColor(issue.severity);

  const hasSmsNotifications = issue.notificationsSent.some(n => n.type === 'sms');
  const hasPushNotifications = issue.notificationsSent.some(n => n.type === 'push');

  return (
    <div className={`issue-card animate-fade-in ${severityClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-1">{issue.title}</h3>
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="text-gray-600">{issue.location}</span>
            •
            <span className="text-gray-600">
              {formatDistanceToNow(new Date(issue.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={severityColor}>
            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
          </Badge>
          <Badge variant={issue.status === "resolved" ? "outline" : "secondary"} className="capitalize">
            {issue.status}
          </Badge>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
          <p className="text-gray-600">{issue.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {hasSmsNotifications && (
              <div className="flex items-center text-xs text-gray-500">
                <Smartphone className="h-3 w-3 mr-1" />
                <span>SMS sent</span>
              </div>
            )}
            {hasPushNotifications && (
              <div className="flex items-center text-xs text-gray-500">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>Push sent</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <span className="font-medium">Reported by:</span> {issue.reportedBy}
          </div>
          {issue.assignedTo && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Assigned to:</span> {issue.assignedTo}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs p-1 h-8"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              Less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              More
            </>
          )}
        </Button>

        <div className="flex items-center gap-1">
          {issue.status !== "resolved" && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => onResolve(issue.id)}
            >
              <Check className="h-3 w-3 mr-1" />
              Resolve
            </Button>
          )}

          <Button
            variant={issue.severity === "critical" ? "destructive" : "default"}
            size="sm"
            className="text-xs h-8"
            onClick={() =>
              issue.status !== "resolved" ? onEscalate(issue.id) : onViewDetails(issue.id)
            }
          >
            {issue.status !== "resolved" ? "Escalate" : "View Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
