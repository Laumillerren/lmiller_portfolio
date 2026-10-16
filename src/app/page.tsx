import { CowUnit } from "@/components/CowUnit";
import { WalkingField } from "@/components/WalkingField";
import { Hero } from "@/components/Hero";
import { seededRange } from "@/lib/cowMotion";
import { work } from "@/data/work";
import { otherThings } from "@/data/otherThings";

// Speech bubbles stay on one line, so only the first few tools fit; the
// project page lists them all.
function bubbleTools(tools: string[]) {
  return tools.slice(0, 4).join(" · ");
}

// Work-in-progress projects go to the end of the row; the rest keep their
// order from the data files.
const allItems = [
  ...work.map((w) => ({
    key: w.slug,
    href: `/work/${w.slug}`,
    label: w.title.toUpperCase(),
    meta: bubbleTools(w.tools),
    variant: w.variant,
    wip: w.wip ?? false,
    liveUrl: undefined as string | undefined,
    speed: seededRange(w.slug, 0.82, 1.18),
    depth: seededRange(w.slug + ":depth", 0, 1),
  })),
  ...otherThings.map((o) => ({
    key: o.slug,
    href: `/other/${o.slug}`,
    label: o.title.toUpperCase(),
    meta: bubbleTools(o.tools),
    variant: o.variant,
    wip: o.wip ?? false,
    liveUrl: o.liveUrl,
    speed: seededRange(o.slug, 0.82, 1.18),
    depth: seededRange(o.slug + ":depth", 0, 1),
  })),
].sort((a, b) => Number(a.wip) - Number(b.wip));

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <WalkingField top={<Hero />}>
        {allItems.map((item, i) => (
          <CowUnit
            key={item.key}
            href={item.href}
            label={item.label}
            meta={item.meta}
            variant={item.variant}
            wip={item.wip}
            liveUrl={item.liveUrl}
            speed={item.speed}
            depth={item.depth}
            enterIndex={i}
            enterAngle={seededRange(item.key + ":angle", 0, 360)}
          />
        ))}
      </WalkingField>
    </main>
  );
}
