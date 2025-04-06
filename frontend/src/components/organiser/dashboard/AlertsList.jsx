import React from "react";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const alertData = [
  {
    id: "1",
    type: "warning",
    message: "Ticket sales below target for Beach Festival",
    event: "Beach Festival 2023",
    time: "2 hours ago"
  },
  {
    id: "2",
    type: "info",
    message: "New vendor application received",
    event: "Food & Wine Expo",
    time: "4 hours ago"
  },
  {
    id: "3",
    type: "success",
    message: "Tech Conference sold out!",
    event: "Tech Summit 2023",
    time: "Yesterday"
  },
  {
    id: "4",
    type: "warning",
    message: "Weather alert for outdoor event",
    event: "Summer Concert Series",
    time: "Yesterday"
  },
];

const getAlertIcon = (type) => {
  switch (type) {
    case "warning":
      return <AlertTriangle size={18} className="text-amber-500" />;
    case "info":
      return <Info size={18} className="text-blue-500" />;
    case "success":
      return <CheckCircle2 size={18} className="text-green-500" />;
    default:
      return null;
  }
};

const getAlertStyles = (type) => {
  switch (type) {
    case "warning":
      return "bg-amber-50 hover:bg-amber-100";
    case "info":
      return "bg-blue-50 hover:bg-blue-100";
    case "success":
      return "bg-green-50 hover:bg-green-100";
    default:
      return "";
  }
};

const AlertsList = () => {
  return (
    <Card className="bg-orange-scard/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <CardDescription>Issues that need your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alertData.map((alert) => (
            <div
              key={alert.id}
              className={cn("alert-item flex items-start gap-3 p-3 rounded-md transition-colors", getAlertStyles(alert.type))}
            >
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{alert.event}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
