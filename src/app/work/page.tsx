import { BackToCows } from "@/components/BackToCows";
import { ProjectHero } from "@/components/ProjectHero";
import { ToolTags } from "@/components/ToolTags";

// Day-job overview, reached from the big "at work" cow on the home page.
// The work itself is proprietary, so the page lists tools and skills only.

// Grouped so a long tool list stays scannable.
const toolGroups: { label: string; tools: string[] }[] = [
  { label: "LANGUAGES", tools: ["SQL", "Python", "Bash", "R"] },
  { label: "WAREHOUSE & MODELING", tools: ["Snowflake", "dbt"] },
  { label: "INGESTION", tools: ["Snowpipe", "Fivetran"] },
  {
    label: "ORCHESTRATION",
    tools: ["Snowflake Tasks & Streams", "dbt Cloud jobs"],
  },
  {
    label: "CLOUD",
    tools: ["AWS S3", "AWS Lambda", "Google Cloud", "Azure Blob Storage"],
  },
  { label: "BI & REPORTING", tools: ["Power BI", "Tableau", "Sigma"] },
  { label: "WEB DEVELOPMENT", tools: ["Next.js"] },
  {
    label: "ENGINEERING PRACTICES",
    tools: ["Git & GitHub", "CI/CD", "Docker", "Data quality testing"],
  },
  {
    label: "CONCEPTS",
    tools: [
      "Dimensional modeling",
      "Incremental models",
      "Change data capture",
      "Performance tuning",
      "Cost optimization",
    ],
  },
];

export default function WorkOverviewPage() {
  return (
    <main className="flex-1 w-full bg-paper">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <ProjectHero
          title="At work"
          variant="plain"
          meta="Data Engineer · Aramark"
        />

        <div className="mt-10">
          <h2 className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-ink-soft">
            TOOLS & SKILLS
          </h2>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {toolGroups.map((g) => (
              <ToolTags key={g.label} label={g.label} tools={g.tools} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
