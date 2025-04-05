import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { time: '9 AM', engagement: 20, sentiment: 65 },
  { time: '10 AM', engagement: 35, sentiment: 70 },
  { time: '11 AM', engagement: 50, sentiment: 75 },
  { time: '12 PM', engagement: 40, sentiment: 60 },
  { time: '1 PM', engagement: 30, sentiment: 55 },
  { time: '2 PM', engagement: 45, sentiment: 68 },
  { time: '3 PM', engagement: 60, sentiment: 72 },
  { time: '4 PM', engagement: 75, sentiment: 78 },
  { time: '5 PM', engagement: 85, sentiment: 82 },
  { time: '6 PM', engagement: 70, sentiment: 85 },
  { time: '7 PM', engagement: 55, sentiment: 80 },
  { time: '8 PM', engagement: 40, sentiment: 75 },
];

const TimeAnalysis = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Time-Based Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="time" />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `${value}`}
                domain={[0, 100]}
                label={{ value: 'Engagement', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                label={{ value: 'Sentiment', angle: -90, position: 'insideRight', style: { textAnchor: 'middle' } }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="engagement"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sentiment"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAnalysis;
