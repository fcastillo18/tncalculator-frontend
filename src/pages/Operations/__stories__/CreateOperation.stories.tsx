import type { Meta, StoryObj } from '@storybook/react';
import OperationsRecords from '../OperationRecords';

const meta = {
  title: 'Operations/OperationsRecords',
  component: OperationsRecords,
  argTypes: {},
} satisfies Meta<typeof OperationsRecords>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
