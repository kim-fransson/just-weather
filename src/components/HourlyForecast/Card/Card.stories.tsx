import { Card } from "./Card";
import type { Meta, StoryObj } from "@storybook/react";

import exampleIcon from "../../../assets/weather-api/cloud_64x64.webp";

const meta: Meta<typeof Card> = {
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    forecast: {
      tempC: -2.4,
      condition: {
        text: "Light snow showers",
        icon: exampleIcon,
        code: 1255,
      },
      timeEpoch: 1701212400,
    },
  },
};
