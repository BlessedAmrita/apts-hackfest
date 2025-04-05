import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const keywords = [
  { text: "Amazing", value: 52, sentiment: "positive" },
  { text: "Entertaining", value: 43, sentiment: "positive" },
  { text: "Informative", value: 38, sentiment: "positive" },
  { text: "Engaging", value: 35, sentiment: "positive" },
  { text: "Professional", value: 29, sentiment: "positive" },
  { text: "Innovative", value: 27, sentiment: "positive" },
  { text: "Okay", value: 22, sentiment: "neutral" },
  { text: "Average", value: 20, sentiment: "neutral" },
  { text: "Fine", value: 18, sentiment: "neutral" },
  { text: "Crowded", value: 15, sentiment: "negative" },
  { text: "Boring", value: 12, sentiment: "negative" },
  { text: "Expensive", value: 11, sentiment: "negative" },
  { text: "Delayed", value: 9, sentiment: "negative" },
  { text: "Fun", value: 30, sentiment: "positive" },
  { text: "Outstanding", value: 25, sentiment: "positive" },
];

const KeywordCloud = () => {
  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive';
      case 'neutral':
        return 'sentiment-neutral';
      case 'negative':
        return 'sentiment-negative';
      default:
        return '';
    }
  };

  const getKeywordSize = (value) => {
    if (value > 40) return 'text-3xl font-bold';
    if (value > 30) return 'text-2xl font-semibold';
    if (value > 20) return 'text-xl font-medium';
    if (value > 10) return 'text-lg';
    return 'text-md';
  };

  // Sort keywords by value for better display
  const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Keyword Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center">
          {sortedKeywords.map((keyword, index) => (
            <span
              key={index}
              className={`${getSentimentClass(keyword.sentiment)} ${getKeywordSize(keyword.value)} transition-all`}
            >
              {keyword.text}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordCloud;
