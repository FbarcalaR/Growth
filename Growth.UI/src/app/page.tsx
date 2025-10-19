'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/welcome');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="bg-main-back-color text-main-text flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
