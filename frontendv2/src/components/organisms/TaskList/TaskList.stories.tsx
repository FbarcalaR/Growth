import TaskList from './TaskList';
import type { Meta, StoryObj } from '@storybook/react';
import { withRedux } from '../../../../.storybook/decorators';

const meta: Meta<typeof TaskList> = {
  title: 'Organisms/TaskList',
  component: TaskList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withRedux()],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTasks = [
  {
    id: 1,
    name: 'Morning Exercise',
    routineId: 1,
    notes: '30 minutes of cardio and strength training',
    repetition: { type: 'daily', lastDueDateTime: '2024-01-01T07:00:00Z', nextDueDate: '2024-01-02T07:00:00Z' },
    goals: [
      {
        target: { name: 'Duration', value: 30 },
        progress: { name: 'Duration', value: 25 }
      }
    ],
    taskStreak: {
      maxStreakDays: 7,
      currentStreakDays: 3
    },
    taskSchedule: {
      fromTime: '2024-01-01T07:00:00Z',
      toTime: '2024-01-01T07:30:00Z',
      duration: '00:30:00'
    }
  },
  {
    id: 2,
    name: 'Read 20 pages',
    routineId: 1,
    notes: 'Personal development book',
    repetition: { type: 'daily', lastDueDateTime: '2024-01-01T20:00:00Z', nextDueDate: '2024-01-02T20:00:00Z' },
    goals: [
      {
        target: { name: 'Pages', value: 20 },
        progress: { name: 'Pages', value: 15 }
      }
    ],
    taskStreak: {
      maxStreakDays: 5,
      currentStreakDays: 1
    },
    taskSchedule: {
      fromTime: '2024-01-01T20:00:00Z',
      toTime: '2024-01-01T20:30:00Z',
      duration: '00:30:00'
    }
  },
  {
    id: 3,
    name: 'Meditation',
    routineId: 1,
    notes: 'Mindfulness practice',
    repetition: { type: 'daily', lastDueDateTime: '2024-01-01T07:00:00Z', nextDueDate: '2024-01-02T07:00:00Z' },
    goals: [],
    taskStreak: {
      maxStreakDays: 10,
      currentStreakDays: 7
    },
    taskSchedule: {
      fromTime: '2024-01-01T07:00:00Z',
      toTime: '2024-01-01T07:15:00Z',
      duration: '00:15:00'
    }
  }
];

export const Default: Story = {
  args: {
    tasks: mockTasks,
  },
};

export const Empty: Story = {
  args: {
    tasks: [],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    tasks: [],
    error: 'Failed to load tasks',
  },
};

export const WithActions: Story = {
  args: {
    tasks: mockTasks,
    onEditTask: (task) => console.log('Edit task:', task),
    onDeleteTask: (taskId) => console.log('Delete task:', taskId),
    onCompleteTask: (taskId) => console.log('Complete task:', taskId),
  },
}; 