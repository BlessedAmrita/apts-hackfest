import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 🔹 Async Thunk to Fetch User Data from Firestore
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (uid, { rejectWithValue }) => {
    try {
      if (!uid) throw new Error('No UID provided');

      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return { uid, ...userSnap.data() }; // Return full user object
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
  role: '',
  additionalData: {}, // ✅ For eventId, preferences, etc
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, name, email, photoURL, isOnboarded, role, ...rest } = action.payload;
      state.uid = uid ?? null;
      state.name = name ?? null;
      state.email = email ?? null;
      state.photoURL = photoURL ?? null;
      state.isOnboarded = isOnboarded ?? false;
      state.role = role ?? 'guest';
      state.isAuthenticated = true;
      state.additionalData = rest; // Store any extra info like eventId here
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logoutUser: () => ({
      ...initialState, // reset everything
    }),
    setEventId: (state, action) => {
      state.additionalData.eventId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { uid, name, email, photoURL, isOnboarded, role, ...rest } = action.payload;
        state.uid = uid;
        state.name = name || '';
        state.email = email || '';
        state.photoURL = photoURL || '';
        state.isOnboarded = isOnboarded ?? false;
        state.role = role || 'guest';
        state.isAuthenticated = true;
        state.additionalData = rest; // 🔥 full flexibility
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.error('Error fetching user data:', action.payload);
      });
  },
});

export const { setUser, setRole, logoutUser,setEventId } = userSlice.actions;
export default userSlice.reducer;
