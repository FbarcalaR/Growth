import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  RoutineTask,
  CreateRoutineTaskRequest,
  CreateRoutineTaskResponse,
  UpdateRoutineTaskRequest,
  CompleteTaskRequest
} from './types/routineTasks'

export const routineTasksApi = createApi({
  reducerPath: 'routineTasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5016/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['RoutineTask'],
  endpoints: (builder) => ({
    // Mock endpoint - will be implemented in backend
    getRoutineTasks: builder.query<RoutineTask[], number>({
      providesTags: ['RoutineTask'],
      // Mock implementation for now
      async queryFn(routineId) {
        // Return mock data until backend implements this endpoint
        const mockTasks: RoutineTask[] = [
          {
            id: 1,
            name: 'Morning Exercise',
            routineId: routineId,
            notes: '30 minutes of cardio',
            goals: [],
          },
          {
            id: 2,
            name: 'Read 20 pages',
            routineId: routineId,
            notes: 'Personal development book',
            goals: [],
          },
        ];
        return { data: mockTasks };
      },
    }),
    getRoutineTaskById: builder.query<RoutineTask, number>({
      query: (id) => `routine-tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'RoutineTask', id }],
    }),
    createRoutineTask: builder.mutation<CreateRoutineTaskResponse, CreateRoutineTaskRequest>({
      query: (task) => ({
        url: 'routine-tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['RoutineTask'],
    }),
    // Mock endpoint - will be implemented in backend
    updateRoutineTask: builder.mutation<void, { id: number; data: UpdateRoutineTaskRequest }>({
      invalidatesTags: (result, error, { id }) => [{ type: 'RoutineTask', id }],
      // Mock implementation for now
      async queryFn() {
        // Simulate successful update
        return { data: undefined };
      },
    }),
    // Mock endpoint - will be implemented in backend
    deleteRoutineTask: builder.mutation<void, number>({
      invalidatesTags: ['RoutineTask'],
      // Mock implementation for now
      async queryFn() {
        // Simulate successful deletion
        return { data: undefined };
      },
    }),
    // Mock endpoint - will be implemented in backend
    completeTask: builder.mutation<void, { id: number; data: CompleteTaskRequest }>({
      invalidatesTags: (result, error, { id }) => [{ type: 'RoutineTask', id }],
      // Mock implementation for now
      async queryFn() {
        // Simulate successful completion
        return { data: undefined };
      },
    }),
  }),
})

export const {
  useGetRoutineTasksQuery,
  useGetRoutineTaskByIdQuery,
  useCreateRoutineTaskMutation,
  useUpdateRoutineTaskMutation,
  useDeleteRoutineTaskMutation,
  useCompleteTaskMutation,
} = routineTasksApi 