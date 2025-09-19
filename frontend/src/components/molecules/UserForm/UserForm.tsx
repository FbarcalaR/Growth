import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

interface UserFormProps {
  onSubmit: (data: { email: string; password: string; firstName?: string; lastName?: string }) => void;
  loading?: boolean;
  error?: string;
  type?: 'login' | 'register';
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, loading, error, type = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({ email, password, firstName, lastName });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {type === 'register' && (
        <>
          <Input
            label="First Name"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            required
          />
        </>
      )}
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default UserForm; 