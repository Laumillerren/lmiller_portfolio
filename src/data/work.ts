import type { CowVariant } from "@/components/Cow";

export type WorkProject = {
  slug: string;
  title: string;
  meta: string;
  variant: CowVariant;
  tools: string[];
  // Proprietary work projects don't get a repo link. Once a write-up is
  // published, set this to the article's URL.
  mediumUrl?: string;
  sections: {
    overview: string;
    problem: string;
    data: string;
    approach: string;
    architecture?: string[];
    role: string;
    outcome: string;
    learned: string;
  };
};

const placeholder = (label: string) => `${label} — to be written.`;

export const work: WorkProject[] = [
  {
    slug: "item-harmonization",
    title: "Item Harmonization",
    meta: "Python · NLP · Data Quality",
    variant: "plain",
    tools: ["Python"],
    sections: {
      overview: placeholder("Overview"),
      problem: placeholder("The problem"),
      data: placeholder("The data"),
      approach: placeholder("Approach"),
      role: placeholder("My role"),
      outcome: placeholder("Outcome"),
      learned: placeholder("What I learned"),
    },
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
