import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (uid, { rejectWithValue }) => {
    try {
      if (!uid) throw new Error('No UID provided');

      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { uid, ...userSnap.data() };
      } else {
        return rejectWithValue('User data not found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  uid: null,
  name: null,
  email: null,
  photoURL: null,
  isAuthenticated: false,
  isOnboarded: false,
  role: '', // ✅ Temporarily store role before finalizing
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    setRole: (state, action) => {
      state.role = action.payload; // ✅ Temporarily store role
    },
    resetRole: (state) => {
      state.role = ''; // ❌ Reset role if onboarding is not completed
    },
    logoutUser: () => ({
      uid: null,
      name: null,
      email: null,
      photoURL: null,
      isAuthenticated: false,
      isOnboarded: false,
      role: '',
    }),
  },
});

export const { setUser, logoutUser, setRole, resetRole } = userSlice.actions;
export default userSlice.reducer;
