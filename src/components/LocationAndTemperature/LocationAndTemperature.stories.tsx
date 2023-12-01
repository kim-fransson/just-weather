import { LocationAndTemperature } from "./LocationAndTemperature";
import type { Meta, StoryObj } from "@storybook/react";

import { currentWeatherHandler } from "../../mocks/handlers";

const meta: Meta<typeof LocationAndTemperature> = {
  component: LocationAndTemperature,
  parameters: {
    msw: {
      handlers: [currentWeatherHandler],
    },
  },
};
export default meta;

type Story = StoryObj<typeof LocationAndTemperature>;

export const Playground: Story = {
  args: {
    location: {
      id: 1,
      name: "Helsingborg",
      region: "Skåne",
      country: "Sweden",
      lat: 56.04673,
      lon: 12.69437,
    },
  },
};
