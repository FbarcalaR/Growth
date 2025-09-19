import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RoutineCard from './RoutineCard';

const meta: Meta<typeof RoutineCard> = {
  title: 'Molecules/RoutineCard',
  component: RoutineCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Morning Routine',
    description: 'Start your day with energy and focus',
    onClick: () => console.log('Card clicked'),
  },
};

export const WithoutDescription: Story = {
  args: {
    name: 'Simple Routine',
    onClick: () => console.log('Card clicked'),
  },
};

export const LongDescription: Story = {
  args: {
    name: 'Comprehensive Workout',
    description: 'A complete workout routine that includes cardio, strength training, and flexibility exercises designed to improve overall fitness and health.',
    onClick: () => console.log('Card clicked'),
  },
};

export const LongTitle: Story = {
  args: {
    name: 'Very Long Routine Name That Might Wrap to Multiple Lines',
    description: 'This routine has a very long title to test text wrapping',
    onClick: () => console.log('Card clicked'),
  },
};

export const NoClickHandler: Story = {
  args: {
    name: 'Non-clickable Card',
    description: 'This card has no click handler',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <RoutineCard
        name="Morning Routine"
        description="Start your day with energy and focus"
        onClick={() => console.log('Morning routine clicked')}
      />
      <RoutineCard
        name="Evening Routine"
        description="Wind down and prepare for rest"
        onClick={() => console.log('Evening routine clicked')}
      />
      <RoutineCard
        name="Workout Routine"
        description="Build strength and endurance"
        onClick={() => console.log('Workout routine clicked')}
      />
      <RoutineCard
        name="Study Routine"
        description="Maximize learning and retention"
        onClick={() => console.log('Study routine clicked')}
      />
    </div>
  ),
}; 