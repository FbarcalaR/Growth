import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Atoms/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    onBack: {
      action: 'back clicked',
      description: 'Callback when back button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back button clicked'),
  },
};

export const CustomText: Story = {
  args: {
    children: '← Go Back',
    onBack: () => console.log('Go back clicked'),
  },
};

export const CustomStyling: Story = {
  args: {
    className: 'text-red-600 hover:text-red-500 mb-2 flex items-center font-bold',
    children: '← Cancel',
    onBack: () => console.log('Cancel clicked'),
  },
}; 