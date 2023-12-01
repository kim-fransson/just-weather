import { currentWeatherHandler, forecastHandler } from "../../mocks/handlers";
import { WeatherDetails } from "./WeatherDetails";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof WeatherDetails> = {
  component: WeatherDetails,
  parameters: {
    msw: {
      handlers: [forecastHandler, currentWeatherHandler],
    },
  },
};
export default meta;

type Story = StoryObj<typeof WeatherDetails>;

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
