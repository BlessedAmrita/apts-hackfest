import React from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  description,
  icon,
  colorClass = "orange-pcard",
  trend,
  className,
}) => {
  return (
    <Card className={cn("stats-card", colorClass, className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "sentiment-positive" : "sentiment-negative"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                vs last event
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </Card>
  );
};

export default StatCard;
