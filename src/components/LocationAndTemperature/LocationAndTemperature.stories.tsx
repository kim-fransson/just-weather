import { LocationAndTemperature } from "./LocationAndTemperature";
import type { Meta, StoryObj } from "@storybook/react";

import exampleIcon from "../../assets/weather-api/cloud_64x64.webp";

const meta: Meta<typeof LocationAndTemperature> = {
  component: LocationAndTemperature,
  args: {
    currentWeather: {
      tempC: -3.0,
      feelslikeC: -9.4,
      condition: {
        text: "Overcast",
        icon: exampleIcon,
        code: 1009,
      },
      location: {
        name: "Helsingborg",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LocationAndTemperature>;

export const Playground: Story = {
  args: {},
};
