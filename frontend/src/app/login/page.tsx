'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../lib/hooks';
import { Header } from '../../components/organisms';
import Card from '../../components/atoms/Card/Card';
import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-800">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-800">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 