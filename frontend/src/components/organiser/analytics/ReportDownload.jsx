import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart2, MessageSquare } from 'lucide-react';

const reports = [
  {
    id: '1',
    title: 'Sentiment Analysis - Q2 2023',
    description: 'Complete sentiment breakdown with trends and key insights',
    date: '2023-06-30',
    type: 'sentiment',
    format: 'PDF'
  },
  {
    id: '2',
    title: 'Engagement Metrics - Last 6 Months',
    description: 'Comprehensive view of audience engagement across events',
    date: '2023-07-15',
    type: 'engagement',
    format: 'Excel'
  },
  {
    id: '3',
    title: 'Keyword Analysis - Summer Events',
    description: 'Most mentioned keywords and associated sentiment scores',
    date: '2023-08-01',
    type: 'keywords',
    format: 'CSV'
  },
  {
    id: '4',
    title: 'Sentiment Trends - Annual Report',
    description: 'Year-over-year sentiment analysis with recommendations',
    date: '2023-12-15',
    type: 'sentiment',
    format: 'PDF'
  },
];

const ReportDownload = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'sentiment':
        return <MessageSquare className="h-5 w-5" />;
      case 'engagement':
        return <BarChart2 className="h-5 w-5" />;
      case 'keywords':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleDownload = (report) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${report.title} in ${report.format} format...`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reports.map((report) => (
        <Card key={report.id} className="bg-orange-scard/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon(report.type)}
              {report.title}
            </CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{report.date}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(report)}
              className="gap-2 bg-orange-button text-white hover:bg-white hover:text-orange-button"
            >
              <Download className="h-4 w-4 " />
              Download
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportDownload;
