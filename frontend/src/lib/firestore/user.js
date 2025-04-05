import { db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const saveAttendeeOnboarding = async (uid, formData) => {
  if (!uid) throw new Error('User not logged in');

  const userRef = doc(db, 'users', uid);

  const payload = {
    ...formData,
    role: 'attendee',
    isOnboarded: true,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(userRef, payload, { merge: true });
};
