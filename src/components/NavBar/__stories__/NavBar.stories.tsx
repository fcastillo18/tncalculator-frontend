import type { Meta, StoryObj } from '@storybook/react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Others/NavBar',
  component: NavBar,
  argTypes: {},
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  ),
};
