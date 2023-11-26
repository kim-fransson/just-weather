import { Item } from "react-stately";
import { LocationData } from "../../api";
import { ListBox } from "./ListBox";
import type { Meta, StoryObj } from "@storybook/react";
import { joinObject } from "../../utils";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  args: {
    "aria-label": "listbox story",
  },
};
export default meta;

type Story = StoryObj<typeof ListBox<LocationData>>;

const locations = [
  {
    name: "Helsinki",
    region: "Uusimaa",
    country: "Finland",
  },
  {
    name: "Heliopolis",
    region: "Cairo",
    country: "Eqypt",
  },
  {
    name: "Helsingborg",
    region: "Skåne",
    country: "Sweden",
  },
  {
    name: "Helmond",
    region: "North Brabant",
    country: "Netherlands",
  },
  {
    name: "Helotes",
    region: "Texas",
    country: "",
  },
] as LocationData[];

export const Playground: Story = {
  args: {
    items: locations,
    selectionMode: "single",
  },
  render: (args) => (
    <ListBox {...args}>
      {(item: LocationData) => <Item key={item.name}>{joinObject(item)}</Item>}
    </ListBox>
  ),
};

export const IsLoading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
  render: (args) => (
    <ListBox {...args}>
      {(item: LocationData) => <Item key={item.name}>{joinObject(item)}</Item>}
    </ListBox>
  ),
};
