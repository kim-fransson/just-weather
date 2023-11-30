import { List } from "./List";
import type { Meta, StoryObj } from "@storybook/react";
import * as CardStories from "../Card/Card.stories";
import { HourlyForecast } from "../../../api";

const meta: Meta<typeof List> = {
  component: List,
  args: {
    forecast: Array.from({ length: 24 }, (_, i) => ({
      ...CardStories.Playground.args?.forecast,
      timeEpoch: 1701212400 + 3600 * i,
    })) as HourlyForecast[],
  },
};
export default meta;

type Story = StoryObj<typeof List>;

export const Playground: Story = {};
