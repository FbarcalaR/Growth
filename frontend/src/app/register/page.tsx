'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../lib/hooks';
import { Header } from '../../components/organisms';
import Card from '../../components/atoms/Card/Card';
import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      await register(formData.firstName, formData.lastName, formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-800">Join us and start your growth journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

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
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-800">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-500">
                  Sign in
                </a>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 