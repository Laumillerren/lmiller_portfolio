import { notFound } from "next/navigation";
import { Cow } from "@/components/Cow";
import { BackToCows } from "@/components/BackToCows";
import { ToolTags } from "@/components/ToolTags";
import { otherThings, getOtherThing } from "@/data/otherThings";

export function generateStaticParams() {
  return otherThings.map((o) => ({ slug: o.slug }));
}

export default async function OtherThingPage(props: PageProps<"/other/[slug]">) {
  const { slug } = await props.params;
  const item = getOtherThing(slug);
  if (!item) notFound();

  return (
    <main className="flex-1 w-full bg-paper">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
        <div className="flex items-start gap-4 mb-10">
          <Cow variant={item.variant} size={16} className="text-ink shrink-0" />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight pt-1">
            {item.title.toUpperCase()}
          </h1>
        </div>

        <p className="text-sm leading-relaxed max-w-xl">{item.description}</p>

        <div className="mt-8">
          <ToolTags tools={item.tools} />
        </div>

        <div className="mt-8">
          <a
            href={item.repoPrivate ? "https://github.com/Laumillerren" : item.repoUrl}
            className="text-sm hover:text-accent transition-colors underline underline-offset-4 decoration-rule"
          >
            {item.repoPrivate ? "VIEW GITHUB PROFILE" : "VIEW REPOSITORY"}
          </a>
          {item.repoPrivate ? (
            <p className="mt-2 text-[11px] tracking-[0.06em] text-ink-soft">
              This repository is currently private.
            </p>
          ) : null}
        </div>

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
