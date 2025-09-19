import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Routine, CreateRoutineRequest, CreateRoutineResponse, UpdateRoutineRequest, RoutinesResponse } from './types/routines'

export const routinesApi = createApi({
  reducerPath: 'routinesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5016/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.token ?? state.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Routine'],
  endpoints: (builder) => ({
    getRoutines: builder.query<RoutinesResponse, void>({
      query: () => 'routines/',
      providesTags: ['Routine'],
    }),
    getRoutineById: builder.query<Routine, number>({
      query: (id) => `routines/${id}`,
      providesTags: (result, error, id) => [{ type: 'Routine', id }],
    }),
    createRoutine: builder.mutation<CreateRoutineResponse, CreateRoutineRequest>({
      query: (routine) => ({
        url: 'routines',
        method: 'POST',
        body: routine,
      }),
      invalidatesTags: ['Routine'],
    }),
    updateRoutine: builder.mutation<void, { id: number; data: UpdateRoutineRequest }>({
      query: ({ id, data }) => ({
        url: `routines/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Routine', id }],
    }),
    deleteRoutine: builder.mutation<void, number>({
      query: (id) => ({
        url: `routines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routine'],
    }),
  }),
})

export const {
  useGetRoutinesQuery,
  useGetRoutineByIdQuery,
  useCreateRoutineMutation,
  useUpdateRoutineMutation,
  useDeleteRoutineMutation,
} = routinesApi 