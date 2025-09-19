import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-700">This is a basic card component with some content.</p>
        <button className="mt-4 px-3 py-1 bg-blue-600 text-white rounded text-sm">Action</button>
      </div>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-700">This card has a title and some content.</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <img 
          src="https://via.placeholder.com/300x200" 
          alt="Placeholder" 
          className="w-full h-48 object-cover rounded-t mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card with Image</h3>
        <p className="text-gray-700 mb-4">This card includes an image at the top.</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Action 1</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">Action 2</button>
        </div>
      </div>
    ),
  },
};

export const CustomStyled: Story = {
  args: {
    className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Custom Styled Card</h3>
        <p className="text-blue-100 mb-4">This card has custom styling with a gradient background.</p>
        <button className="px-3 py-1 bg-white text-blue-600 rounded text-sm font-semibold">Action</button>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    children: (
      <>
        <h3 className="text-xl font-bold mb-3">Large Card</h3>
        <p className="text-lg">This is a larger card with bigger text and more padding.</p>
      </>
    ),
    className: 'p-6',
  },
};

export const Small: Story = {
  args: {
    children: (
      <>
        <h3 className="text-sm font-bold mb-1">Small Card</h3>
        <p className="text-sm">This is a smaller card with compact spacing.</p>
      </>
    ),
    className: 'p-2',
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <h3 className="text-lg font-bold mb-2">Card with Actions</h3>
        <p className="mb-4">This card has action buttons at the bottom.</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Action 1</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">Action 2</button>
        </div>
      </>
    ),
  },
};

export const Colored: Story = {
  args: {
    children: (
      <>
        <h3 className="text-lg font-bold mb-2">Colored Card</h3>
        <p>This card has a custom background color.</p>
      </>
    ),
    className: 'bg-blue-50 border border-blue-200',
  },
}; 