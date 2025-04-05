import React from "react";
import Sidebar from "./Sidebar";
import EventStatCards from "./EventStatCards";
import SentimentChart from "./SentimentChart";
import AlertsList from "./AlertsList";
import EventsList from "./EventsList";
import CreateEventButton from "./CreateEventButton";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="p-6">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your events.
                </p>
              </div>
              <CreateEventButton />
            </div>

            {/* Stats Overview */}
            <EventStatCards />

            {/* Middle Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <SentimentChart />
              <AlertsList />
            </div>

            {/* Events List */}
            <EventsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
