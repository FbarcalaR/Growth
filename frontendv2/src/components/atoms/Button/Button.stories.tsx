import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    className: 'px-6 py-3 text-lg',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    className: 'px-2 py-1 text-sm',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>🔍</span>
        Search
      </>
    ),
    className: 'flex items-center gap-2',
  },
}; 