import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#77DD77", "#FF6961"]; // Green for positive, red for negative

const SentimentChart = ({ summary }) => {
  if (!summary) return null;

  const { positive_total, negative_total } = summary;

  const total = positive_total + negative_total;
  const data = [
    { name: "Positive", value: positive_total, color: COLORS[0] },
    { name: "Negative", value: negative_total, color: COLORS[1] },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Overall Audience Mood</CardTitle>
        <CardDescription>Based on recent feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Responses"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
