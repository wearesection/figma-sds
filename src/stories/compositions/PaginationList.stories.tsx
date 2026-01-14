import type { Meta, StoryObj } from "@storybook/react";
import { PaginationList } from "compositions";
import { useState } from "react";

const meta: Meta<typeof PaginationList> = {
  component: PaginationList,
  title: "SDS Compositions/PaginationList",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PaginationList>;

// Wrapper component to handle state in stories
const PaginationListWrapper = (args: React.ComponentProps<typeof PaginationList>) => {
  const [page, setPage] = useState(args.currentPage || 1);
  return (
    <PaginationList
      {...args}
      currentPage={page}
      onPageChange={(p) => setPage(p)}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 20,
  },
};

export const Start: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 3,
    totalPages: 20,
  },
};

export const Middle: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 10,
    totalPages: 20,
  },
};

export const End: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 18,
    totalPages: 20,
  },
};

export const Short: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const VeryShort: Story = {
  render: (args) => <PaginationListWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 3,
  },
};
