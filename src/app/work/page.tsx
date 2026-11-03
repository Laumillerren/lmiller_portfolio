import { BackToCows } from "@/components/BackToCows";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectSection, toneFor } from "@/components/ProjectSection";
import { ToolTags } from "@/components/ToolTags";

// Overview of day-job work, reached from the big "at work" cow on the home
// page. Kept high level because most of the work is proprietary.
const sections: { heading: string; paragraphs: string[]; wide?: boolean }[] = [
  {
    heading: "WHAT I DO",
    paragraphs: [
      "I build, optimize, and maintain the data pipelines behind our reporting, and help decide how they're architected. The people relying on that data range from internal teams to clients running stadiums and venues across the US, the UK, and Canada.",
    ],
    wide: true,
  },
  {
    heading: "THE DATA",
    paragraphs: [
      "We ingest every kind of operational data a venue produces: point-of-sale transactions, camera data, inventory, labor, and more. Each source arrives with its own formats, timing, and quirks, and the real work is modeling the relationships between them so they can be analyzed together.",
    ],
  },
  {
    heading: "SCALE",
    paragraphs: [
      "Many clients, many kinds of data, and tables that reach about half a billion rows. Clients depend on that data being fresh: some of it in real time, and none of it more than a day old.",
    ],
  },
  {
    heading: "IMPACT",
    paragraphs: [
      "Most of my work comes down to four things: getting data to people faster, making pipelines more reliable so the numbers can be trusted, lowering compute costs as the data grows, and automating the manual work that used to sit between raw data and a finished report.",
    ],
    wide: true,
  },
];

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
  {
    label: "ENGINEERING PRACTICES",
    tools: ["Git & GitHub", "CI/CD", "Data quality testing"],
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
        >
          <p>
            I&apos;m a data engineer at Aramark, where I spend my days moving,
            cleaning, and making sense of data so other people can trust it.
            Most of that work is proprietary, so this page sticks to the shape
            of it: the problems, the scale, and the tools.
          </p>
        </ProjectHero>

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

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {sections.map((s, i) => (
            <ProjectSection
              key={s.heading}
              heading={s.heading}
              index={i + 1}
              tone={toneFor(i)}
              className={s.wide ? "md:col-span-2" : ""}
            >
              {s.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </ProjectSection>
          ))}
        </div>

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
