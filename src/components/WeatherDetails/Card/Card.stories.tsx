import { Card } from "./Card";
import type { Meta, StoryObj } from "@storybook/react";

import PressureIcon from "../../../assets/icons/pressure-icon.svg?react";

const meta: Meta<typeof Card> = {
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    title: "Pressure",
    value: "1023 mb",
    icon: <PressureIcon />,
  },
};
