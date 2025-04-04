import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setUser, logoutUser } from '@/config/slices/userSlice';
import { store } from '@/config/store';
import { useRouter } from 'next/navigation';

export const signInWithGoogle = async (dispatch, router, role) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      dispatch(setUser({ ...userData, isAuthenticated: true }));

      if (userData.isOnboarded) {
        router.push(`/dashboard/${userData.role}`);
      } else {
        router.push(`/onBoarding/${userData.role || role}`);
      }
    } else {
      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: role, 
        isOnboarded: false,
      };

      await setDoc(userRef, newUser);
      dispatch(setUser(newUser));
      router.push(`/onBoarding/${role}`);
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const logout = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logoutUser());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const monitorAuthState = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        store.dispatch(setUser({ ...userData, isAuthenticated: !!userData.role }));
      } else {
        store.dispatch(logoutUser());
      }
    } else {
      store.dispatch(logoutUser());
    }
  });
};
