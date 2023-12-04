import { Autocomplete, AutocompleteProps } from "./Autocomplete";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { within, userEvent } from "@storybook/testing-library";

const AutocompleteWithState = (args: AutocompleteProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Autocomplete
      {...args}
      searchQuery={searchQuery}
      onSearchQueryChanged={setSearchQuery}
    />
  );
};

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  args: {
    placeholder: "Search for cities",
  },
  argTypes: {},
  render: (args) => <AutocompleteWithState {...args} />,
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Playground: Story = {
  args: {
    searchResults: [
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
  },
};

export const IsLoading: Story = {
  args: {
    searchResults: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputField = await canvas.findByPlaceholderText("Search for cities");
    await userEvent.click(inputField);
    await userEvent.type(inputField, "Hels", { delay: 200 });
  },
};

export const NoResults: Story = {
  args: {
    searchResults: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputField = await canvas.findByPlaceholderText("Search for cities");
    await userEvent.click(inputField);
    await userEvent.type(inputField, "blabla", { delay: 100 });
  },
};
