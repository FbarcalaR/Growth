import UserForm from './UserForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserForm> = {
  title: 'Molecules/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['login', 'register'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    type: 'login',
    onSubmit: (data) => console.log('Login:', data),
  },
};

export const Register: Story = {
  args: {
    type: 'register',
    onSubmit: (data) => console.log('Register:', data),
  },
};

export const WithError: Story = {
  args: {
    type: 'login',
    error: 'Invalid email or password',
    onSubmit: (data) => console.log('Login:', data),
  },
};

export const Loading: Story = {
  args: {
    type: 'login',
    loading: true,
    onSubmit: (data) => console.log('Login:', data),
  },
}; 