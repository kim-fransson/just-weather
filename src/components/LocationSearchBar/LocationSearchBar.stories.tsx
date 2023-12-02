import { searchHandler } from "../../mocks/handlers";
import { LocationSearchBar } from "./LocationSearchBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LocationSearchBar> = {
  component: LocationSearchBar,
  parameters: {
    msw: {
      handlers: [searchHandler],
    },
  },
  argTypes: {
    onLocationSelected: {
      actions: "location selected",
    },
  },
};
export default meta;

type Story = StoryObj<typeof LocationSearchBar>;

export const Playground: Story = {
  args: {},
};
