import { notFound } from "next/navigation";
import { BackToCows } from "@/components/BackToCows";
import { ToolTags } from "@/components/ToolTags";
import { WipBanner } from "@/components/WipSign";
import { ProjectSection, toneFor } from "@/components/ProjectSection";
import { ProjectHero, ActionLink } from "@/components/ProjectHero";
import { otherThings, getOtherThing } from "@/data/otherThings";

// First and last blocks span the grid; the middle ones pair up side by side
// only when there's an even number of them, so none is left alone.
function fullWidth(i: number, count: number) {
  return i === 0 || i === count - 1 || (count - 2) % 2 === 1;
}

export function generateStaticParams() {
  return otherThings.map((o) => ({ slug: o.slug }));
}

export default async function OtherThingPage(props: PageProps<"/other/[slug]">) {
  const { slug } = await props.params;
  const item = getOtherThing(slug);
  if (!item) notFound();

  const sections = item.post
    ? (
        [
          ["KEY OBJECTIVES", item.post.objectives],
          ["DATA ENGINEERING", item.post.engineering],
          ["DATA SCIENCE", item.post.science],
          ["TAKEAWAYS", item.post.takeaways],
        ] as const
      ).filter(([, paragraphs]) => paragraphs?.length)
    : [];

  return (
    <main className="flex-1 w-full bg-paper">
      {item.wip ? <WipBanner /> : null}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <ProjectHero title={item.title} variant={item.variant}>
          <p>{item.description}</p>
        </ProjectHero>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {item.mediumUrl ? (
            <ActionLink href={item.mediumUrl} primary>
              READ ON MEDIUM →
            </ActionLink>
          ) : null}
          <ActionLink
            href={item.repoPrivate ? "https://github.com/Laumillerren" : item.repoUrl}
          >
            {item.repoPrivate ? "VIEW GITHUB PROFILE →" : "VIEW REPOSITORY →"}
          </ActionLink>
          {item.repoPrivate ? (
            <p className="text-[11px] tracking-[0.06em] text-ink-soft">
              This repository is currently private.
            </p>
          ) : null}
        </div>

        <div className="mt-10">
          <ToolTags tools={item.tools} />
        </div>

        {sections.length ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {sections.map(([heading, paragraphs], i) => (
              <ProjectSection
                key={heading}
                heading={heading}
                index={i + 1}
                tone={toneFor(i)}
                className={fullWidth(i, sections.length) ? "md:col-span-2" : ""}
              >
                {paragraphs!.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </ProjectSection>
            ))}
          </div>
        ) : null}

        {item.experiments?.length ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {item.experiments.map((exp, i, all) => (
              <ProjectSection
                key={exp.title}
                heading={exp.title.toUpperCase()}
                meta={exp.tools.join(" · ")}
                index={i + 1}
                tone={toneFor(i)}
                className={
                  i === all.length - 1 && all.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }
              >
                {exp.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
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
