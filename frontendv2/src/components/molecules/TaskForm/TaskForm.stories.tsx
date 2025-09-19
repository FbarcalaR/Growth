import TaskForm from './TaskForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskForm> = {
  title: 'Molecules/TaskForm',
  component: TaskForm,
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
    routineId: 1,
    mode: 'create',
    onSubmit: (data) => console.log('Create task:', data),
  },
};

export const Edit: Story = {
  args: {
    routineId: 1,
    mode: 'edit',
    initialData: {
      name: 'Morning Exercise',
      notes: '30 minutes of cardio and strength training',
    },
    onSubmit: (data) => console.log('Update task:', data),
  },
};

export const WithError: Story = {
  args: {
    routineId: 1,
    mode: 'create',
    error: 'Task name is required',
    onSubmit: (data) => console.log('Create task:', data),
  },
};

export const Loading: Story = {
  args: {
    routineId: 1,
    mode: 'create',
    loading: true,
    onSubmit: (data) => console.log('Create task:', data),
  },
}; 