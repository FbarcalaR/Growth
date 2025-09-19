import { useLoginMutation, useRegisterMutation } from './userApi'
import { setCredentials, logout, setLoading, setError, clearError } from './userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { User } from './types/users'

// Simple JWT decoder function
export function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

// Extract user info from JWT token
const getUserFromToken = (token: string, email: string): User => {
  const decoded = decodeJWT(token)

  if (decoded) {
    return {
      id: decoded.sub || decoded.userId || decoded.id || 'unknown',
      email: decoded.email || email,
      firstName: decoded.firstName || decoded.given_name,
      lastName: decoded.lastName || decoded.family_name,
    }
  }

  // Fallback if token decoding fails
  return {
    id: 'unknown',
    email: email,
    firstName: undefined,
    lastName: undefined,
  }
}

export const useUser = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, isLoading, error } = useSelector((state: any) => state.user)
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation()

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())
      
      const token = await loginMutation({ email, password }).unwrap()
      // Extract user info from JWT token
      const user = getUserFromToken(token, email)

      dispatch(setCredentials({ user, token }))
      return token
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Login failed'
      dispatch(setError(errorMessage))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (email: string, firstName: string, lastName: string, password: string) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())
      
      const result = await registerMutation({ email, firstName, lastName, password }).unwrap()
      
      // Note: Registration doesn't automatically log in the user in most cases
      // You might want to call login after successful registration
      return result
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Registration failed'
      dispatch(setError(errorMessage))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return {
    user,
    token,
    isLoading: isLoading || isLoginLoading || isRegisterLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout: logoutUser,
  }
} 