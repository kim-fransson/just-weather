import { HourlyForecast } from "./HourlyForecast";
import type { Meta, StoryObj } from "@storybook/react";
import * as CardStories from "./Card";

import { rest } from "msw";
import { HourlyForecast as HourlyForecastData } from "../../api";

const meta: Meta<typeof HourlyForecast> = {
  component: HourlyForecast,
  parameters: {
    msw: {
      handlers: [
        rest.get(
          import.meta.env.VITE_WEATHER_API_FORECAST_URL,
          (_req, res, ctx) => {
            const forecast = Array.from({ length: 24 }, (_, i) => ({
              ...CardStories.Playground.args?.forecast,
              timeEpoch: 1701212400 + 3600 * i,
            })) as HourlyForecastData[];

            return res(
              ctx.json({
                days: [
                  {
                    hours: forecast,
                  },
                ],
              }),
            );
          },
        ),
      ],
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
