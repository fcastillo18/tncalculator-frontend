import type { Meta, StoryObj } from '@storybook/react';
import CreateUser from '../CreateUser';

const meta = {
  title: 'User/CreateUser',
  component: CreateUser,
  argTypes: {},
} satisfies Meta<typeof CreateUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
