import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './features/users/userApi'
import { routinesApi } from './features/routines/routinesApi'
import { routineTasksApi } from './features/routineTasks/routineTasksApi'
import userReducer from './features/users/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [routinesApi.reducerPath]: routinesApi.reducer,
    [routineTasksApi.reducerPath]: routineTasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      routinesApi.middleware,
      routineTasksApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 