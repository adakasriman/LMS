import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API for all endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // from .env
  }),
  tagTypes: ['User'],
  endpoints: () => ({}), // will inject endpoints later
});
