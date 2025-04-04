import { db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const submitOnboarding = async (formData, user, router, dispatch) => {
  if (!user?.uid) {
    console.error('User not found!');
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { ...formData, isOnboarded: true }, { merge: true });

    dispatch(setUser({ ...formData, isOnboarded: true }));
    router.push(`/dashboard/${formData.role}`);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
