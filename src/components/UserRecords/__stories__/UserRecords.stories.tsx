import type { Meta, StoryObj } from '@storybook/react';
import UserRecords from '../UserRecords';

const meta = {
  title: 'User/UserRecords',
  component: UserRecords,
  argTypes: {},
} satisfies Meta<typeof UserRecords>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
