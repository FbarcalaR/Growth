import type { Meta, StoryObj } from '@storybook/react';
import ErrorState from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Atoms/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message to display',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: 'Failed to load routine',
  },
};

export const CustomStyling: Story = {
  args: {
    message: 'Something went wrong',
    className: 'text-center text-orange-600 font-semibold',
  },
}; 