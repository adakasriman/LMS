import { baseApi } from '@api/baseApi';

// Define TypeScript interfaces for requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
}

// Extend baseApi with auth endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Get user profile query
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for components
export const { useLoginMutation, useGetProfileQuery } = userApi;
