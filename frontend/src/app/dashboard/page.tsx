'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../lib/hooks';
import { useGetRoutinesQuery } from '../../lib/features/routines/routinesApi';
import { Header } from '../../components/organisms';
import Card from '../../components/atoms/Card/Card';
import Button from '../../components/atoms/Button/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const { data: routinesResponse, isLoading, error } = useGetRoutinesQuery();

  // Extract routines from the response
  const routines = routinesResponse?.routines || [];

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-800">
            Track your routines and build better habits
          </p>
        </div>

        {/* Debug Information */}
        <Card className="mb-8 p-6 bg-yellow-50 border-yellow-200">
          <h2 className="text-lg font-semibold mb-4 text-yellow-800">API Debug Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error ? JSON.stringify(error) : 'None'}</p>
            <p><strong>Response:</strong> {routinesResponse ? JSON.stringify(routinesResponse, null, 2) : 'None'}</p>
            <p><strong>Routines Count:</strong> {routines.length}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-800">Total Routines</span>
                  <span className="font-semibold text-gray-900">{routines.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Active Today</span>
                  <span className="font-semibold text-yellow-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Completed Today</span>
                  <span className="font-semibold text-blue-600">0</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Routines List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Your Routines</h2>
                <Button 
                  variant="primary" 
                  onClick={() => router.push('/routines/new')}
                >
                  Create Routine
                </Button>
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-800">Loading routines...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">Error loading routines</p>
                  <p className="text-sm text-gray-700 mt-2">{JSON.stringify(error)}</p>
                </div>
              )}

              {!isLoading && !error && routines.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-800 mb-4">You don't have any routines yet</p>
                  <Button 
                    variant="primary" 
                    onClick={() => router.push('/routines/new')}
                  >
                    Create Your First Routine
                  </Button>
                </div>
              )}

              {!isLoading && !error && routines.length > 0 && (
                <div className="space-y-4">
                  {routines.map((routine) => (
                    <div 
                      key={routine.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/routines/${routine.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{routine.name}</h3>
                          <p className="text-sm text-gray-800">
                            Started {new Date(routine.startDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-800">
                            {routine.tasks?.length || 0} tasks • {routine.totalDays} days
                          </p>
                        </div>
                        <Button variant="secondary" className="text-sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 