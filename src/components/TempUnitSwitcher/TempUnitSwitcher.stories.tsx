import { TempUnitSwitcher } from "./TempUnitSwitcher";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TempUnitSwitcher> = {
  component: TempUnitSwitcher,
};
export default meta;

type Story = StoryObj<typeof TempUnitSwitcher>;

export const Playground: Story = {
  args: {},
};
