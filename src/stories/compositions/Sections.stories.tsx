import type { Meta, StoryObj } from "@storybook/react";
import { HeroImageWithReviews } from "compositions";
import { placeholder } from "images";

const meta: Meta<typeof HeroImageWithReviews> = {
  component: HeroImageWithReviews,
  title: "SDS Compositions/Sections",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const StoryHeroImageWithReviews: StoryObj<
  typeof HeroImageWithReviews
> = {
  name: "Hero Image With Reviews",
  args: {
    title: "Title",
    subtitle: "Subtitle",
    buttonText: "Button",
    onButtonClick: () => console.log("Button clicked"),
    backgroundImageSrc: placeholder,
    padding: "4000",
    gap: "1200",
    reviews: [
      {
        stars: 5,
        title: "Review title",
        body: "Review body",
        name: "Reviewer name",
        date: "Date",
      },
      {
        stars: 5,
        title: "Review title",
        body: "Review body",
        name: "Reviewer name",
        date: "Date",
      },
      {
        stars: 5,
        title: "Review title",
        body: "Review body",
        name: "Reviewer name",
        date: "Date",
      },
    ],
  },
};
