import { Item } from "react-stately";
import { LocationData } from "../../../api";
import { SearchResults } from "./SearchResults";
import type { Meta, StoryObj } from "@storybook/react";
import { joinObject } from "../../../utils";

const meta: Meta<typeof SearchResults> = {
  component: SearchResults,
  args: {
    "aria-label": "search results",
  },
};
export default meta;

type Story = StoryObj<typeof SearchResults>;

export const Playground: Story = {
  args: {
    items: [
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
    ],
    selectionMode: "single",
  },
  render: (args) => (
    <SearchResults {...args}>
      {(item: LocationData) => (
        <Item key={item.name}>
          {joinObject(item, ["name", "region", "country"])}
        </Item>
      )}
    </SearchResults>
  ),
};

export const IsLoading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
  render: (args) => (
    <SearchResults {...args}>
      {(item: LocationData) => (
        <Item key={item.name}>
          {joinObject(item, ["name", "region", "country"])}
        </Item>
      )}
    </SearchResults>
  ),
};

export const IsEmpty: Story = {
  args: {
    items: [],
    isLoading: false,
  },
  render: (args) => (
    <SearchResults {...args}>
      {(item: LocationData) => (
        <Item key={item.name}>
          {joinObject(item, ["name", "region", "country"])}
        </Item>
      )}
    </SearchResults>
  ),
};
