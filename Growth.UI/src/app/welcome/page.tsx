'use client';

import { useUser } from '@/contexts/UserContext';
import { logoutUser } from '@/api/users/logout';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    logout();
    router.push('/login');
  };

  return (
    <div className="bg-main-back-color text-main-text p-8">
      <h1 className="font-title text-3xl mb-4">Welcome to Growth!</h1>
      {user && (
        <div className="space-y-2">
          <p>Hello, {user.firstName} {user.lastName}!</p>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
