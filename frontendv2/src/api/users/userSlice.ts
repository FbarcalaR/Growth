import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types/users'
import { decodeJWT, getUserFromToken } from './useUser'

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Helper functions for localStorage
const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

const setStoredToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token)
  }
}

const removeStoredToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken')
  }
}

const initialState: UserState = {
  user: null,
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken() && !isTokenExpired(getStoredToken()),
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      // Persist token to localStorage
      setStoredToken(action.payload.token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      // Remove token from localStorage
      removeStoredToken()
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setCredentials, logout, setLoading, setError, clearError } = userSlice.actions
export default userSlice.reducer 

function isTokenExpired(token: string | null) {
  if (!token) return;
  const decoded = decodeJWT(token)
  if (!decoded) return;
  const expirationTime = decoded.exp
  if (!expirationTime) return false
  return new Date(Date.now()) > new Date(expirationTime)
}
