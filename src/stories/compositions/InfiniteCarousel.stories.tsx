
import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteCarousel } from "compositions";
import { placeholder, placeholder1, placeholder2, placeholder3 } from "images";

const meta: Meta<typeof InfiniteCarousel> = {
  component: InfiniteCarousel,
  title: "SDS Compositions/InfiniteCarousel",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InfiniteCarousel>;

const items = [
  {
    image: placeholder1,
    title: "First Slide",
    description: "This is the first slide description.",
    alt: "First slide image",
  },
  {
    image: placeholder2,
    title: "Second Slide",
    description: "This is the second slide description.",
    alt: "Second slide image",
  },
  {
    image: placeholder3,
    title: "Third Slide",
    description: "This is the third slide description.",
    alt: "Third slide image",
  },
  {
    image: placeholder,
    title: "Fourth Slide",
    description: "This is the fourth slide description.",
    alt: "Fourth slide image",
  },
];

export const Default: Story = {
  args: {
    items: items,
  },
};

export const SingleItem: Story = {
  args: {
    items: [items[0]],
  },
};
