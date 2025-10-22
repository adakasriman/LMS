import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthState['user'] }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;


