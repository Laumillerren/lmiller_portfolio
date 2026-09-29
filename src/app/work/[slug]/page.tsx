import { notFound } from "next/navigation";
import { Cow } from "@/components/Cow";
import { BackToCows } from "@/components/BackToCows";
import { ProjectSection } from "@/components/ProjectSection";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { work, getWork } from "@/data/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getWork(slug);
  if (!project) notFound();

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-10 py-20 md:py-28">
      <div className="flex items-start gap-4 mb-8">
        <Cow variant={project.variant} size={16} className="text-ink shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {project.title.toUpperCase()}
          </h1>
          <p className="mt-2 text-xs tracking-[0.14em] text-ink-soft uppercase">
            {project.meta}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <ProjectSection heading="OVERVIEW">
          <p>{project.sections.overview}</p>
        </ProjectSection>
        <ProjectSection heading="THE PROBLEM">
          <p>{project.sections.problem}</p>
        </ProjectSection>
        <ProjectSection heading="THE DATA">
          <p>{project.sections.data}</p>
        </ProjectSection>
        <ProjectSection heading="APPROACH">
          <p>{project.sections.approach}</p>
        </ProjectSection>
        {project.sections.architecture ? (
          <ProjectSection heading="ARCHITECTURE">
            <ArchitectureFlow steps={project.sections.architecture} />
          </ProjectSection>
        ) : null}
        <ProjectSection heading="MY ROLE">
          <p>{project.sections.role}</p>
        </ProjectSection>
        <ProjectSection heading="OUTCOME">
          <p>{project.sections.outcome}</p>
        </ProjectSection>
        <ProjectSection heading="WHAT I LEARNED">
          <p>{project.sections.learned}</p>
        </ProjectSection>
      </div>

      <div className="mt-16">
        <BackToCows />
      </div>
    </main>
  );
}
