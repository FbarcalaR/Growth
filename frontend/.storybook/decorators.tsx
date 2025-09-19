import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/lib/features/users/userSlice';
import { userApi } from '../src/lib/features/users/userApi';
import { routinesApi } from '../src/lib/features/routines/routinesApi';
import { routineTasksApi } from '../src/lib/features/routineTasks/routineTasksApi';

// Create a mock store for Storybook
export const createMockStore = (userState?: any) => {
  return configureStore({
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
    preloadedState: {
      user: userState || {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      },
    },
  });
};

// Redux decorator for stories
export const withRedux = (userState?: any) => (Story: any) => {
  const store = createMockStore(userState);
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
}; 