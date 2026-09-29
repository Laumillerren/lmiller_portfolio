export type Skill = {
  id: string;
  label: string;
  blurb: string;
};

export const skills: Skill[] = [
  {
    id: "sql",
    label: "SQL",
    blurb: "Snowflake · relational databases · data modeling · analytics · complex querying",
  },
  {
    id: "python",
    label: "Python",
    blurb: "Data pipelines · scripting · automation · analysis",
  },
  {
    id: "snowflake",
    label: "Snowflake",
    blurb: "Warehousing · performance tuning · data modeling",
  },
  {
    id: "aws",
    label: "AWS",
    blurb: "Cloud infrastructure · storage · compute · data pipelines",
  },
  {
    id: "data-visualization",
    label: "Data Visualization",
    blurb: "Dashboards · charts · communicating data clearly",
  },
  {
    id: "data-science",
    label: "Data Science",
    blurb: "Statistical analysis · modeling · experimentation",
  },
];
