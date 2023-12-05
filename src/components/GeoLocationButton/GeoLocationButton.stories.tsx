import { GeoLocationButton } from "./GeoLocationButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GeoLocationButton> = {
  component: GeoLocationButton,
};
export default meta;

type Story = StoryObj<typeof GeoLocationButton>;

export const Playground: Story = {
  args: {},
  decorators: [
    (Story) => {
      return (
        <div className="flex h-screen items-center justify-center">
          <Story />
        </div>
      );
    },
  ],
};
