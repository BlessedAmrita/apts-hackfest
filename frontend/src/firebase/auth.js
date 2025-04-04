import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setUser, logoutUser } from '@/config/slices/userSlice';
import { store } from '@/config/store';

export const signInWithGoogle = async (dispatch, router) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      dispatch(setUser({ ...userData, isAuthenticated: true }));

      if (userData.isOnboarded && userData.role) {
        router.push(`/dashboard/${userData.role}`);
      } else {
        // 🟡 If not onboarded, pull role from Redux
        const state = store.getState();
        const selectedRole = state.user.role;
        router.push(`/onBoarding/${selectedRole}`);
      }
    } else {
      const state = store.getState();
      const selectedRole = state.user.role;

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isOnboarded: false,
        isAuthenticated: true,
        // ❌ No role stored yet
      };

      await setDoc(userRef, newUser);
      dispatch(setUser(newUser));
      router.push(`/onBoarding/${selectedRole}`);
    }
  } catch (error) {
    console.error('🔥 Error signing in with Google:', error);
  }
};
