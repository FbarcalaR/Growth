import type { Meta, StoryObj } from '@storybook/react';
import RoutineHeader from './RoutineHeader';

const meta: Meta<typeof RoutineHeader> = {
  title: 'Molecules/RoutineHeader',
  component: RoutineHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showEditForm: {
      control: 'boolean',
      description: 'Whether the edit form is visible',
    },
    updateLoading: {
      control: 'boolean',
      description: 'Whether the update operation is loading',
    },
    deleteLoading: {
      control: 'boolean',
      description: 'Whether the delete operation is loading',
    },
    onToggleEdit: {
      action: 'toggle edit',
      description: 'Callback when edit button is clicked',
    },
    onDelete: {
      action: 'delete',
      description: 'Callback when delete button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    routine: {
      name: 'Morning Routine',
      startDate: '2024-01-15T00:00:00Z',
    },
    showEditForm: false,
    updateLoading: false,
    deleteLoading: false,
  },
};

export const EditMode: Story = {
  args: {
    routine: {
      name: 'Morning Routine',
      startDate: '2024-01-15T00:00:00Z',
    },
    showEditForm: true,
    updateLoading: false,
    deleteLoading: false,
  },
};

export const Loading: Story = {
  args: {
    routine: {
      name: 'Morning Routine',
      startDate: '2024-01-15T00:00:00Z',
    },
    showEditForm: false,
    updateLoading: true,
    deleteLoading: false,
  },
}; 