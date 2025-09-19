export interface User {
  id: string; // Guid as string
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Backend returns just the token string directly
export type LoginResponse = string;

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
} 