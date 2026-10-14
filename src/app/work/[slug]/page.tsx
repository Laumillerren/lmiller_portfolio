import { notFound } from "next/navigation";
import { BackToCows } from "@/components/BackToCows";
import { ProjectSection, toneFor } from "@/components/ProjectSection";
import { ProjectHero, ActionLink } from "@/components/ProjectHero";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { ToolTags } from "@/components/ToolTags";
import { WipBanner } from "@/components/WipSign";
import { work, getWork } from "@/data/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getWork(slug);
  if (!project) notFound();

  const s = project.sections;
  const blocks: {
    heading: string;
    content: React.ReactNode;
    wide?: boolean;
  }[] = s
    ? [
        { heading: "OVERVIEW", content: <p>{s.overview}</p>, wide: true },
        { heading: "THE PROBLEM", content: <p>{s.problem}</p> },
        { heading: "THE DATA", content: <p>{s.data}</p> },
        { heading: "APPROACH", content: <p>{s.approach}</p>, wide: true },
        ...(s.architecture
          ? [
              {
                heading: "ARCHITECTURE",
                content: <ArchitectureFlow steps={s.architecture} />,
                wide: true,
              },
            ]
          : []),
        { heading: "MY ROLE", content: <p>{s.role}</p> },
        { heading: "OUTCOME", content: <p>{s.outcome}</p> },
        { heading: "WHAT I LEARNED", content: <p>{s.learned}</p>, wide: true },
      ]
    : [];

  return (
    <main className="flex-1 w-full bg-paper">
      {project.wip ? <WipBanner /> : null}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <ProjectHero
          title={project.title}
          variant={project.variant}
          meta={project.meta}
        />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {project.mediumUrl ? (
            <ActionLink href={project.mediumUrl} primary>
              READ ON MEDIUM →
            </ActionLink>
          ) : (
            <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
              Medium article — coming soon
            </p>
          )}
        </div>

        <div className="mt-10">
          <ToolTags tools={project.tools} />
        </div>

        {blocks.length ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {blocks.map((b, i) => (
              <ProjectSection
                key={b.heading}
                heading={b.heading}
                index={i + 1}
                tone={toneFor(i)}
                className={b.wide ? "md:col-span-2" : ""}
              >
                {b.content}
              </ProjectSection>
            ))}
          </div>
        ) : null}

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
