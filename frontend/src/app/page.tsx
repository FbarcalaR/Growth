'use client';

import React from 'react';
import { useUser } from '../lib/hooks';
import { Header } from '../components/organisms';
import Button from '../components/atoms/Button/Button';
import Card from '../components/atoms/Card/Card';

export default function Home() {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="p-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Growth
            </h1>
            <p className="text-xl text-gray-700">
              Track your routines and build better habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Create Routines</h3>
              <p className="text-gray-700 mb-4">
                Build structured routines to achieve your goals
              </p>
              {isAuthenticated ? (
                <a href="/dashboard">
                  <Button variant="primary">Go to Dashboard</Button>
                </a>
              ) : (
                <a href="/register">
                  <Button variant="primary">Get Started</Button>
                </a>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-700 mb-4">
                Monitor your daily progress and stay motivated
              </p>
              {isAuthenticated ? (
                <a href="/dashboard">
                  <Button variant="secondary">View Dashboard</Button>
                </a>
              ) : (
                <a href="/login">
                  <Button variant="secondary">Sign In</Button>
                </a>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Stay Consistent</h3>
              <p className="text-gray-700 mb-4">
                Build lasting habits through consistent practice
              </p>
              <Button variant="secondary">Learn More</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
