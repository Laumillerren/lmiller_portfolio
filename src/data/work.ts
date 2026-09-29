import type { CowVariant } from "@/components/Cow";

export type WorkProject = {
  slug: string;
  title: string;
  meta: string;
  variant: CowVariant;
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
    slug: "people-counting",
    title: "People Counting",
    meta: "Computer Vision · Data Engineering",
    variant: "data",
    sections: {
      overview: placeholder("Overview"),
      problem: placeholder("The problem"),
      data: placeholder("The data"),
      approach: placeholder("Approach"),
      architecture: [
        "Camera Data",
        "Raw Data",
        "Normalization",
        "Event Matching",
        "Snowflake",
        "Analytics",
      ],
      role: placeholder("My role"),
      outcome: placeholder("Outcome"),
      learned: placeholder("What I learned"),
    },
  },
  {
    slug: "pos-analytics",
    title: "POS Analytics",
    meta: "Data Engineering · Snowflake · SQL",
    variant: "spark",
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
  {
    slug: "food-waste-analytics",
    title: "Food Waste Analytics",
    meta: "Data Science · Analytics · Research",
    variant: "plain",
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
  {
    slug: "item-harmonization",
    title: "Item Harmonization",
    meta: "Python · NLP · Data Quality",
    variant: "plain",
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
  {
    slug: "data-analytics",
    title: "Data Analytics",
    meta: "SQL · Visualization · Analytics",
    variant: "spark",
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
