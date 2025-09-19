'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../lib/hooks';
import { useCreateRoutineMutation } from '../../../lib/features/routines/routinesApi';
import { Header } from '../../../components/organisms';
import { RoutineForm } from '../../../components/molecules';
import Card from '../../../components/atoms/Card/Card';

export default function NewRoutinePage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const [createRoutine, { isLoading, error }] = useCreateRoutineMutation();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleCreateRoutine = async (data: { name: string; startDate: string }) => {
    try {
      const result = await createRoutine(data).unwrap();
      // Redirect to the new routine's detail page
      router.push(`/routines/${result.newRoutineId}`);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to create routine:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-500 mb-4 flex items-center"
          >
            ← Back
          </button>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md p-8">
            <RoutineForm
              mode="create"
              onSubmit={handleCreateRoutine}
              loading={isLoading}
              error={error ? 'Failed to create routine. Please try again.' : undefined}
            />
          </Card>
        </div>
      </main>
    </div>
  );
} 