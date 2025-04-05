import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Exhibition A', attendance: 85, feedback: 62, social: 44 },
  { name: 'Concert B', attendance: 92, feedback: 45, social: 78 },
  { name: 'Conference C', attendance: 78, feedback: 53, social: 29 },
  { name: 'Meetup D', attendance: 95, feedback: 73, social: 51 },
  { name: 'Workshop E', attendance: 88, feedback: 81, social: 36 },
];

const EngagementMetrics = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Engagement by Event Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `${value}%`} 
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar 
                dataKey="attendance" 
                name="Attendance Rate" 
                fill="hsl(var(--pastel-mint))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="feedback" 
                name="Feedback Rate" 
                fill="hsl(var(--pastel-blue))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="social" 
                name="Social Mentions" 
                fill="hsl(var(--pastel-purple))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
