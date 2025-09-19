import Header from './Header';
import type { Meta, StoryObj } from '@storybook/react';
import { withRedux } from '../../../../.storybook/decorators';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withRedux()],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Authenticated: Story = {
  args: {},
  decorators: [
    withRedux({
      user: {
        id: 'user-1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      token: 'mock-jwt-token',
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }),
  ],
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-gray-100',
  },
}; 