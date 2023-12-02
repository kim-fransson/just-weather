import { rest } from "msw";

import exampleIcon from "../../assets/weather-api/cloud_64x64.webp";

export const forecastHandler = rest.get(
  import.meta.env.VITE_WEATHER_API_FORECAST_URL,
  (_req, res, ctx) => {
    const forecast = Array.from({ length: 24 }, (_, i) => ({
      tempC: -2.4,
      tempF: 27.7,
      condition: {
        text: "Light snow showers",
        icon: exampleIcon,
        code: 1255,
      },
      timeEpoch: 1701212400 + 3600 * i,
    }));

    return res(
      ctx.json({
        days: [
          {
            chanceOfRain: 81,
            astro: {
              sunrise: "08:12 AM",
              sunset: "03:42 PM",
            },
            hours: forecast,
          },
        ],
      }),
    );
  },
);
