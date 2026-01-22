import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PanelImageContent } from "compositions";
import { placeholder, placeholder1, placeholder2, placeholder3 } from "images";

const meta: Meta<typeof PanelImageContent> = {
  component: PanelImageContent,
  title: "SDS Compositions/Sections",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PanelImageContent>;

export const StoryPanelImageContent: Story = {
  name: "Panel Image Content",
  render: (args) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cards = args.cards || [];

    const handlePrevious = () => {
      setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
    };

    const handleNext = () => {
      setCurrentCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
    };

    return (
      <PanelImageContent
        {...args}
        currentCardIndex={currentCardIndex}
        onPreviousPress={handlePrevious}
        onNextPress={handleNext}
      />
    );
  },
  args: {
    imageSrc: placeholder,
    imageAlt: "Product image",
    tagText: "Featured",
    tagScheme: "brand",
    tagVariant: "primary",
    priceAmount: "299",
    priceCurrency: "$",
    priceLabel: "/ month",
    heading: "Premium Business Plan",
    subheading: "Everything you need to grow your business",
    listItems: [
      "Unlimited projects and team members",
      "Advanced analytics and reporting",
      "Priority support and dedicated account manager",
      "Custom integrations and API access",
      "Enterprise-grade security and compliance",
    ],
    cards: [
      {
        heading: "Trusted by Industry Leaders",
        body: "Join over 10,000 companies that rely on our platform to streamline their workflows and boost productivity.",
        imageSrc: placeholder1,
      },
      {
        heading: "Award-Winning Support",
        body: "Our customer success team has been recognized for excellence, maintaining a 98% satisfaction rating across all clients.",
        imageSrc: placeholder2,
      },
      {
        heading: "Proven Track Record",
        body: "With 5+ years in the industry, we've helped businesses increase efficiency by an average of 40% in the first quarter.",
        imageSrc: placeholder3,
      },
    ],
  },
};

export const StoryPanelImageContentMinimal: Story = {
  name: "Panel Image Content (Minimal)",
  args: {
    imageSrc: placeholder,
    imageAlt: "Product image",
    priceAmount: "99",
    priceCurrency: "$",
    priceLabel: "/ year",
    heading: "Starter Plan",
    subheading: "Perfect for individuals and small teams",
  },
};

export const StoryPanelImageContentWithList: Story = {
  name: "Panel Image Content (With List)",
  args: {
    imageSrc: placeholder,
    imageAlt: "Product image",
    tagText: "Popular",
    tagScheme: "positive",
    tagVariant: "primary",
    priceAmount: "199",
    priceCurrency: "$",
    priceLabel: "/ month",
    heading: "Professional Plan",
    subheading: "For growing teams and businesses",
    listItems: [
      "Up to 50 team members",
      "Advanced collaboration tools",
      "Priority email support",
      "Custom branding options",
    ],
    backgroundColor: "subtle",
  },
};
