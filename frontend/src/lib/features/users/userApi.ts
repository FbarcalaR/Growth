import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types/users'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5016/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'users/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = userApi 