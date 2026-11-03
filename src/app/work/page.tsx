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

const tools = ["Snowflake", "dbt", "Python", "AWS", "Google Cloud", "Azure"];

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
          <ToolTags tools={tools} />
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
