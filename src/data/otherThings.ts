import type { CowVariant } from "@/components/Cow";

export type OtherThing = {
  slug: string;
  title: string;
  description: string;
  variant: CowVariant;
};

export const otherThings: OtherThing[] = [
  {
    slug: "book-club-tracker",
    title: "Book Club Tracker",
    description:
      "A website for managing a book club — meetings, recommendations, voting, reviews, and ratings.",
    variant: "book",
  },
  {
    slug: "yoga-tracker",
    title: "Yoga Tracker",
    description: "A personal yoga hours-tracking website.",
    variant: "yoga",
  },
  {
    slug: "quilt-portfolio",
    title: "Quilt Portfolio",
    description: "An interactive portfolio and archive for quilts.",
    variant: "quilt",
  },
  {
    slug: "basketball-stats",
    title: "Basketball Stats",
    description: "A basketball statistics website.",
    variant: "basketball",
  },
  {
    slug: "experiments",
    title: "Experiments",
    description:
      "Miscellaneous websites, design experiments, and things I'm exploring.",
    variant: "spark",
  },
];

export function getOtherThing(slug: string) {
  return otherThings.find((o) => o.slug === slug);
}
