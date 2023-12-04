import { PageError } from "./PageError";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PageError> = {
  component: PageError,
};
export default meta;

type Story = StoryObj<typeof PageError>;

export const Playground: Story = {
  args: {},
};
