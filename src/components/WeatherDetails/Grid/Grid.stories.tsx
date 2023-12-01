import { Grid } from "./Grid";
import type { Meta, StoryObj } from "@storybook/react";
import * as CardStories from "../Card/Card.stories";
import { Card, CardProps } from "../Card";

const meta: Meta<typeof Grid> = {
  component: Grid,
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Playground: Story = {
  args: {
    children: Array.from({ length: 8 }, (_, i) => ({
      ...(CardStories.Playground.args as CardProps),
      key: i,
    })).map((card) => (
      <Card
        key={card.key}
        title={card.title}
        value={card.value}
        icon={card.icon}
      />
    )),
  },
};
