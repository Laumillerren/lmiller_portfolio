export type Skill = {
  id: string;
  label: string;
  blurb: string;
};

export const skills: Skill[] = [
  {
    id: "sql",
    label: "SQL",
    blurb: "Snowflake · data modeling · complex querying · performance tuning",
  },
  {
    id: "python",
    label: "Python",
    blurb: "Data pipelines · scripting · automation · analysis",
  },
  {
    id: "snowflake",
    label: "Snowflake",
    blurb: "Warehousing · Snowpipe · Tasks & Streams · performance tuning · cost optimization",
  },
  {
    id: "dbt",
    label: "dbt",
    blurb: "Transformations · incremental models · data quality tests · dbt Cloud jobs",
  },
  {
    id: "data-modeling",
    label: "Data Modeling",
    blurb: "Dimensional modeling · incremental models · change data capture",
  },
  {
    id: "aws",
    label: "AWS",
    blurb: "S3 · Lambda · data pipelines",
  },
  {
    id: "google-cloud",
    label: "Google Cloud",
    blurb: "Cloud data services · APIs",
  },
  {
    id: "azure",
    label: "Azure",
    blurb: "Blob Storage · data pipelines",
  },
  {
    id: "data-visualization",
    label: "Data Visualization",
    blurb: "Power BI · Tableau · Sigma · communicating data clearly",
  },
  {
    id: "data-science",
    label: "Data Science",
    blurb: "Statistical analysis · modeling · experimentation · Python · R",
  },
];
