import type { Meta, StoryObj } from '@storybook/react';
import RoutineStats from './RoutineStats';

const meta: Meta<typeof RoutineStats> = {
  title: 'Molecules/RoutineStats',
  component: RoutineStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalTasks: {
      control: 'number',
      description: 'Total number of tasks in the routine',
    },
    completedToday: {
      control: 'number',
      description: 'Number of tasks completed today',
    },
    daysActive: {
      control: 'number',
      description: 'Number of days the routine has been active',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalTasks: 5,
    completedToday: 2,
    daysActive: 7,
  },
};

export const EmptyRoutine: Story = {
  args: {
    totalTasks: 0,
    completedToday: 0,
    daysActive: 1,
  },
};

export const HighActivity: Story = {
  args: {
    totalTasks: 12,
    completedToday: 8,
    daysActive: 30,
  },
}; 