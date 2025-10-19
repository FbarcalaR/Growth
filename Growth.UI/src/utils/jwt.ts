import { User } from "@/contexts/UserContext";

export interface JWTPayload {
  sub?: string; // Subject (usually userId)
  email?: string;
  given_name?: string;
  family_name?: string;
  exp?: number; // Expiration time
  iat?: number; // Issued at
  [key: string]: any; // Allow other custom claims
}
export function decodeUserFromJWT(token: string): User {
      const jwtPayload = decodeJWT(token);

      const userData = {
        userId: jwtPayload.sub || '',
        email: jwtPayload.email || '',
        firstName: jwtPayload.given_name || '',
        lastName: jwtPayload.family_name || '',
        token: token,
      };

  return userData;
}

export function decodeJWT(token: string): JWTPayload {
  try {
    // JWT structure: header.payload.signature
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    throw new Error('Failed to decode JWT token');
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJWT(token);

    if (!payload.exp) {
      return false;
    }

    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= payload.exp * 1000;
  } catch (error) {
    return true;
  }
}
