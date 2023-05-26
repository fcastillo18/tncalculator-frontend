import type { Meta, StoryObj } from '@storybook/react';
import CreateOperation from '../CreateOperation';

const meta = {
  title: 'Operations/CreateOperation',
  component: CreateOperation,
  argTypes: {},
} satisfies Meta<typeof CreateOperation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
