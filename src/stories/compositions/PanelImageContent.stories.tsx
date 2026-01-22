import type { Meta, StoryObj } from "@storybook/react";
import { PanelImageContent } from "compositions";
import { placeholder } from "images";

const meta: Meta<typeof PanelImageContent> = {
  component: PanelImageContent,
  title: "SDS Compositions/Sections",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const StoryPanelImageContent: StoryObj<typeof PanelImageContent> = {
  name: "Panel Image Content",
  args: {
    variant: "brand",
    imageSrc: placeholder,
    imageAlt: "Product image",
    tagText: "Popular",
    tagScheme: "positive",
    tagVariant: "secondary",
    priceAmount: "29.99",
    priceCurrency: "$",
    priceLabel: "/ mo",
    heading: "Professional Plan",
    subheading: "Perfect for growing teams",
    listItems: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    cardHeading: "30-Day Money Back",
    cardBody: "Try risk-free with our satisfaction guarantee",
    onPreviousPress: () => console.log("Previous"),
    onNextPress: () => console.log("Next"),
  },
};
