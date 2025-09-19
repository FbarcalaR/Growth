import type { Meta, StoryObj } from '@storybook/react';
import TasksSection from './TasksSection';
import { RoutineTask } from '../../../lib/features/routines/types/routines';

const meta: Meta<typeof TasksSection> = {
  title: 'Organisms/TasksSection',
  component: TasksSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether tasks are loading',
    },
    error: {
      control: 'text',
      description: 'Error message if tasks failed to load',
    },
    createTaskLoading: {
      control: 'boolean',
      description: 'Whether task creation is loading',
    },
    onEditTask: {
      action: 'edit task',
      description: 'Callback when edit task is clicked',
    },
    onDeleteTask: {
      action: 'delete task',
      description: 'Callback when delete task is clicked',
    },
    onCompleteTask: {
      action: 'complete task',
      description: 'Callback when complete task is clicked',
    },
    onCreateTask: {
      action: 'create task',
      description: 'Callback when create task is submitted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: [
      {
        id: 1,
        name: 'Morning Exercise',
        notes: '30 minutes cardio',
        repetition: { type: 'daily', lastDueDateTime: '2024-01-01T07:00:00Z', nextDueDate: '2024-01-02T07:00:00Z' },
        goals: [],
        taskStreak: { maxStreakDays: 7, currentStreakDays: 3 },
        taskSchedule: {
          fromTime: '2024-01-01T07:00:00Z',
          toTime: '2024-01-01T07:30:00Z',
          duration: '00:30:00'
        }
      },
      {
        id: 2,
        name: 'Read Book',
        notes: 'Chapter 5',
        repetition: { type: 'daily', lastDueDateTime: '2024-01-01T20:00:00Z', nextDueDate: '2024-01-02T20:00:00Z' },
        goals: [],
        taskStreak: { maxStreakDays: 5, currentStreakDays: 1 },
        taskSchedule: {
          fromTime: '2024-01-01T20:00:00Z',
          toTime: '2024-01-01T20:30:00Z',
          duration: '00:30:00'
        }
      },
    ] as RoutineTask[],
    isLoading: false,
    routineId: 1,
    createTaskLoading: false,
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    isLoading: true,
    routineId: 1,
    createTaskLoading: false,
  },
};

export const Empty: Story = {
  args: {
    tasks: [],
    isLoading: false,
    routineId: 1,
    createTaskLoading: false,
  },
};

export const WithError: Story = {
  args: {
    tasks: [],
    isLoading: false,
    error: 'Failed to load tasks',
    routineId: 1,
    createTaskLoading: false,
  },
}; 