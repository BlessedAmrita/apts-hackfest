import React from "react";
import { UsersRound, Calendar, TrendingUp, Star } from "lucide-react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card bg-${color} bg-opacity-20`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-${color} bg-opacity-30`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const EventStatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Events"
        value="24"
        icon={<Calendar className="text-blue-500" size={20} />}
        color="pastel-blue"
      />
      <StatCard
        title="Total Attendees"
        value="4,129"
        icon={<UsersRound className="text-purple-500" size={20} />}
        color="pastel-purple"
      />
      <StatCard
        title="Satisfaction Rate"
        value="92%"
        icon={<Star className="text-yellow-500" size={20} />}
        color="pastel-yellow"
      />
      <StatCard
        title="Growth Rate"
        value="+12.3%"
        icon={<TrendingUp className="text-green-500" size={20} />}
        color="pastel-green"
      />
    </div>
  );
};

export default EventStatCards;
