import { rest } from "msw";

export const searchHandler = rest.get(
  import.meta.env.VITE_WEATHER_API_SEARCH_URL,
  (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          country: "Finland",
          name: "Helsinki",
          region: "Southern Finland",
          lat: 60.18,
          lon: 24.93,
          id: 742591,
        },
        {
          country: "Sweden",
          name: "Helsingborg",
          region: "Skane Lan",
          lat: 56.05,
          lon: 12.7,
          id: 2266156,
        },
        {
          country: "Denmark",
          name: "Helsingor",
          region: "Hovedstaden",
          lat: 56.03,
          lon: 12.62,
          id: 636706,
        },
        {
          country: "Denmark",
          name: "Helsinge",
          region: "Hovedstaden",
          lat: 56.02,
          lon: 12.2,
          id: 636703,
        },
        {
          country: "Germany",
          name: "Helse",
          region: "Schleswig-Holstein",
          lat: 53.97,
          lon: 9.02,
          id: 587701,
        },
      ]),
    );
  },
);
