import { Item } from "react-stately";
import { RecentResult, RecentResults } from "./RecentResults";
import type { Meta, StoryObj } from "@storybook/react";

import exampleIcon from "../../../assets/weather-api/cloud_64x64.webp";

const meta: Meta<typeof RecentResults> = {
  component: RecentResults,
  args: {
    "aria-label": "recent search results",
  },
};
export default meta;

type Story = StoryObj<typeof RecentResults>;

export const Playground: Story = {
  args: {
    items: [
      {
        location: {
          country: "Finland",
          name: "Helsinki",
          region: "Southern Finland",
          lat: 60.18,
          lon: 24.93,
          id: 742591,
        },
        icon: exampleIcon,
        temp: "2°C",
      },
      {
        location: {
          country: "Sweden",
          name: "Helsingborg",
          region: "Skane Lan",
          lat: 56.05,
          lon: 12.7,
          id: 2266156,
        },
        icon: exampleIcon,
        temp: "2°C",
      },
    ],
    selectionMode: "single",
  },
  render: (args) => (
    <RecentResults {...args}>
      {(item: RecentResult) => (
        <Item
          key={item.location.id}
          textValue={`recent result for ${item.location.name}`}
        >
          {<RecentResult recent={item} />}
        </Item>
      )}
    </RecentResults>
  ),
};
