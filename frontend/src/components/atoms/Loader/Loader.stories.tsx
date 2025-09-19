import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Loading message to display',
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

export const WithMessage: Story = {
  args: {
    message: 'Loading...',
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Loading routine...',
  },
};

export const CustomStyling: Story = {
  args: {
    message: 'Please wait...',
    className: 'flex justify-center items-center text-blue-600 font-semibold',
  },
}; 