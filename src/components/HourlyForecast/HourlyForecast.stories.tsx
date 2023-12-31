import { HourlyForecast } from "./HourlyForecast";
import type { Meta, StoryObj } from "@storybook/react";
import { forecastHandler } from "../../mocks/handlers";

const meta: Meta<typeof HourlyForecast> = {
  component: HourlyForecast,
  parameters: {
    msw: {
      handlers: [forecastHandler],
    },
  },
  args: {},
};
export default meta;

type Story = StoryObj<typeof HourlyForecast>;

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
