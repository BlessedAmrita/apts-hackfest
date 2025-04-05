'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import CommunityForumMain from '@/components/attendee/communityForum/CommunityForumMain';

const CommunityForumPage = () => {
  const { eventId } = useParams();

  return (
    <div>
      <CommunityForumMain eventId={eventId} />
    </div>
  );
};

export default CommunityForumPage;
