import type { CowVariant } from "@/components/Cow";

export type WorkProject = {
  slug: string;
  title: string;
  meta: string;
  variant: CowVariant;
  tools: string[];
  wip?: boolean;
  // Proprietary work projects don't get a repo link. Once a write-up is
  // published, set this to the article's URL.
  mediumUrl?: string;
  // Optional on-page write-up. Leave it out when the story lives elsewhere
  // (e.g. a Medium article).
  sections?: {
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

export const work: WorkProject[] = [
  {
    slug: "item-harmonization",
    title: "Item Harmonization",
    meta: "Python · NLP · Data Quality",
    variant: "plain",
    tools: ["Python"],
    wip: true,
  },
];

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
