import type { Meta, StoryObj } from '@storybook/react';
import SignIn from '../SignIn';

const meta = {
  title: 'User/SignIn',
  component: SignIn,
  argTypes: {},
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
