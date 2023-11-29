import { LocationAndTemperature } from "./LocationAndTemperature";
import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import exampleIcon from "../../assets/weather-api/cloud_64x64.webp";

const meta: Meta<typeof LocationAndTemperature> = {
  component: LocationAndTemperature,
  parameters: {
    msw: {
      handlers: [
        rest.get(
          import.meta.env.VITE_WEATHER_API_CURRENT_WEATHER_URL,
          (_req, res, ctx) => {
            return res(
              ctx.json({
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
              }),
            );
          },
        ),
      ],
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
