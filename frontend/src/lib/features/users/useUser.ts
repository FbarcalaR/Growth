import { useLoginMutation, useRegisterMutation } from './userApi'
import { setCredentials, logout, setLoading, setError, clearError } from './userSlice'
import { useDispatch, useSelector } from 'react-redux'

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
      
      // For now, we'll create a mock user object since the backend doesn't return user data
      const mockUser = {
        id: 'user-1',
        email: email,
        firstName: 'User',
        lastName: 'Name'
      }
      
      dispatch(setCredentials({ user: mockUser, token }))
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
      
      // For now, we'll create a mock user object since the backend doesn't return user data
      const mockUser = {
        id: result.userId,
        email: email,
        firstName: firstName,
        lastName: lastName
      }
      
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