'use client';
const EventSentimentPage = ({ params }) => {
  if (!params || !params.id) {
    return <div className="p-6 text-red-500">Error: Invalid Event ID</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Sentiment Analysis for Event {params.id}</h1>
      <p>Analyzing the sentiment for event ID: {params.id}...</p>
      <a href="/organiser/events" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Back to Events
      </a>
    </div>
  );
};

export default EventSentimentPage;
