import { Item } from "react-stately";
import { LocationData } from "../../api";
import { Autocomplete, AutocompleteProps } from "./Autocomplete";
import type { Meta, StoryObj } from "@storybook/react";
import { joinObject } from "../../utils";
import { useState } from "react";
import { within, userEvent } from "@storybook/testing-library";

const AutocompleteWithState = (args: AutocompleteProps) => {
  const [searchTerm, setSearchTerm] = useState(args.defaultInputValue || "");

  return (
    <Autocomplete
      {...args}
      inputValue={searchTerm}
      onInputChange={setSearchTerm}
    >
      {(item) => <Item key={item.name}>{joinObject(item)}</Item>}
    </Autocomplete>
  );
};

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  args: {
    "aria-label": "Search location for weather forecast",
    placeholder: "Search for cities",
  },
  argTypes: {},
  render: (args) => <AutocompleteWithState {...args} />,
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

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
  },
};

export const IsLoading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputField = await canvas.findByPlaceholderText("Search for cities");
    await userEvent.click(inputField);
    await userEvent.type(inputField, "Hels", { delay: 200 });
    console.log(inputField);
  },
};

export const NoResults: Story = {
  args: {
    items: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputField = await canvas.findByPlaceholderText("Search for cities");
    await userEvent.click(inputField);
    await userEvent.type(inputField, "blabla", { delay: 100 });
    console.log(inputField);
  },
};
