import RoutineForm from './RoutineForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RoutineForm> = {
  title: 'Molecules/RoutineForm',
  component: RoutineForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['create', 'edit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    mode: 'create',
    onSubmit: (data) => console.log('Create routine:', data),
  },
};

export const Edit: Story = {
  args: {
    mode: 'edit',
    initialData: {
      name: 'Morning Routine',
      startDate: '2024-01-01',
    },
    onSubmit: (data) => console.log('Update routine:', data),
  },
};

export const WithError: Story = {
  args: {
    mode: 'create',
    error: 'Routine name is already taken',
    onSubmit: (data) => console.log('Create routine:', data),
  },
};

export const Loading: Story = {
  args: {
    mode: 'create',
    loading: true,
    onSubmit: (data) => console.log('Create routine:', data),
  },
}; 