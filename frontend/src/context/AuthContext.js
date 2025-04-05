'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useDispatch } from 'react-redux';
import { fetchUserData, logoutUser } from '@/config/slices/userSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        dispatch(fetchUserData(firebaseUser.uid)); // ✅ Sync with Firestore + Redux
      } else {
        setUser(null);
        dispatch(logoutUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const logout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
