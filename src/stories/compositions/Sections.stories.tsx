import type { Meta, StoryObj } from "@storybook/react";
import { Hero, HeroImageWithReviews } from "compositions";
import { placeholder } from "images";

const meta: Meta<typeof HeroImageWithReviews> = {
  component: HeroImageWithReviews,
  title: "SDS Compositions/Sections",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const StoryHeroImageWithReviews: StoryObj<typeof HeroImageWithReviews> =
  {
    name: "Hero Image with Reviews",
    args: {
      backgroundImage: placeholder,
      title: "Transform Your Business",
      subtitle: "Join thousands of satisfied customers",
      buttonText: "Get Started",
      buttonHref: "#",
      reviews: [
        {
          stars: 5,
          title: "Amazing Experience",
          body: "This product exceeded all my expectations. Highly recommended!",
          name: "Sarah Johnson",
          date: "January 2026",
          src: placeholder,
        },
        {
          stars: 5,
          title: "Game Changer",
          body: "Transformed how we work. Cannot imagine going back.",
          name: "Michael Chen",
          date: "December 2025",
          src: placeholder,
        },
        {
          stars: 4,
          title: "Excellent Service",
          body: "Great product with outstanding customer support.",
          name: "Emily Davis",
          date: "November 2025",
          src: placeholder,
        },
      ],
    },
  };

export const StoryHero: StoryObj<typeof Hero> = {
  name: "Hero (Simple)",
  render: () => (
    <Hero>
      <h1>Simple Hero</h1>
      <p>Basic hero section example</p>
    </Hero>
  ),
};
