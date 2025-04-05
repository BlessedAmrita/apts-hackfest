import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const NotificationsList = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No notifications have been sent
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-white rounded-lg p-3 shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={notification.type === 'sms' ? 'outline' : 'secondary'}>
                  {notification.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="mt-1 text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">To: {notification.recipient}</p>
            </div>
            <div>
              {notification.status === 'delivered' ? (
                <Badge className="bg-green-100 text-green-600 border-green-200 hover:bg-green-200">
                  <Check className="h-3 w-3 mr-1" /> Delivered
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <X className="h-3 w-3 mr-1" /> Failed
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
