import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { date: 'Jan', positive: 65, neutral: 28, negative: 7 },
  { date: 'Feb', positive: 59, neutral: 32, negative: 9 },
  { date: 'Mar', positive: 80, neutral: 13, negative: 7 },
  { date: 'Apr', positive: 81, neutral: 15, negative: 4 },
  { date: 'May', positive: 56, neutral: 29, negative: 15 },
  { date: 'Jun', positive: 55, neutral: 25, negative: 20 },
  { date: 'Jul', positive: 72, neutral: 18, negative: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between gap-2">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SentimentChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sentiment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#4CAF50" fill="#4CAF50" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#FFC107" fill="#FFC107" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#F44336" fill="#F44336" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
