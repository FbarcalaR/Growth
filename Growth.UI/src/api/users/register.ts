import { API_BASE_URL } from '@/api/config/api';

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
}

export async function registerUser(request: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
  }

  const userId = await response.text();

  return { userId };
}
