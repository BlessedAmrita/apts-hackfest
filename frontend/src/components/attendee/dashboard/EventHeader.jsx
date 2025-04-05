import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; // adjust to your actual firebase config path

const EventHeader = ({
  eventName = "Annual Tech Conference 2025",
  attendeeName = "Alex Johnson"
}) => {
  const [greeting, setGreeting] = useState('');
  const [metadata, setMetadata] = useState(null);
  const { additionalData } = useSelector((state) => state.user);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // useEffect(() => {
  //   const fetchMetadata = async () => {
  //     if (!additionalData?.eventId) return;

  //     try {
  //       const docRef = doc(db, 'events', additionalData.eventId, 'metadata', 'info');
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setMetadata(docSnap.data());
  //       } else {
  //         console.log('No metadata info found!');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching metadata:', error);
  //     }
  //   };

  //   fetchMetadata();
  // }, [additionalData?.eventId]);
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!additionalData?.eventId) {
        console.log("No eventId found in additionalData.");
        return;
      }
  
      console.log("Fetching metadata for eventId:", additionalData.eventId);
  
      try {
        const docRef = doc(db, 'events', additionalData.eventId, 'metadata', 'info');
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setMetadata(docSnap.data());
        } else {
          console.log('No metadata info found!');
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };
  
    fetchMetadata();
  }, [additionalData?.eventId]);
  
  return (
    <div className="relative overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-event-yellow to-amber-400 opacity-90"></div>

      <div className="relative p-8 md:p-10 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-sm">
          {metadata?.name || eventName}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/90 text-lg">
              {greeting}, {attendeeName}!
            </p>
            <p className="text-white/80 text-sm md:text-base mt-1">
              Complete all forms to make the most of your event experience
            </p>
          </div>

          <div className="animate-float">
            <div className="inline-block bg-white/95 shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
              <p>Event ID: <span className="font-semibold">{additionalData.eventId}</span></p>
              <p>Attendee Status: <span className="text-green-600 font-semibold">Confirmed</span></p>
            </div>
          </div>
        </div>

        {metadata && (
          <div className="mt-6 bg-white/90 rounded-xl p-4 shadow-md text-gray-800 space-y-2">
            <p><strong>Description:</strong> {metadata.description}</p>
            <p><strong>Type:</strong> {metadata.type}</p>
            <p><strong>Location:</strong> {metadata.location}</p>
            <p><strong>Start Date:</strong> {metadata.startDate}</p>
            <p><strong>End Date:</strong> {metadata.endDate}</p>
            <p><strong>Created At:</strong> {metadata.createdAt?.toDate().toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventHeader;
