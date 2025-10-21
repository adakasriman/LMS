import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@api/baseApi';
import authReducer from '@features/auth/authSlice';

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,                  // Auth feature slice
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.DEV, // Enable Redux DevTools in development
});

// TypeScript types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
