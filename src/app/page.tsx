import { CowUnit } from "@/components/CowUnit";
import { WalkingField } from "@/components/WalkingField";
import { Hero } from "@/components/Hero";
import { seededRange } from "@/lib/cowMotion";
import { work } from "@/data/work";
import { otherThings } from "@/data/otherThings";

const allItems = [
  ...work.map((w) => ({
    key: w.slug,
    href: `/work/${w.slug}`,
    label: w.title.toUpperCase(),
    meta: w.tools.join(" · "),
    variant: w.variant,
    speed: seededRange(w.slug, 0.82, 1.18),
    depth: seededRange(w.slug + ":depth", 0, 1),
  })),
  ...otherThings.map((o) => ({
    key: o.slug,
    href: `/other/${o.slug}`,
    label: o.title.toUpperCase(),
    meta: o.tools.join(" · "),
    variant: o.variant,
    speed: seededRange(o.slug, 0.82, 1.18),
    depth: seededRange(o.slug + ":depth", 0, 1),
  })),
];

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
