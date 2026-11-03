import { CowUnit } from "@/components/CowUnit";
import { WalkingField } from "@/components/WalkingField";
import { Hero, SideProjectsLabel } from "@/components/Hero";
import { WorkCow } from "@/components/WorkCow";
import { FenceSign } from "@/components/FenceSign";
import { seededRange } from "@/lib/cowMotion";
import { otherThings } from "@/data/otherThings";

// Speech bubbles stay on one line, so only the first few tools fit; the
// project page lists them all.
function bubbleTools(tools: string[]) {
  return tools.slice(0, 4).join(" · ");
}

const GROUPS = [
  { id: "built", title: "WEBSITES I'VE BUILT", note: "Tools real people use" },
  {
    id: "data-science",
    title: "DATA SCIENCE PROJECTS",
    note: "Mostly from my MS at Drexel",
  },
] as const;

// Side projects only (work lives behind the big hero cow), split into
// groups. Within a group: finished projects first, then Drexel coursework,
// then work-in-progress, otherwise data-file order.
const groups = GROUPS.map((g) => ({
  ...g,
  items: otherThings
    .filter((o) => o.group === g.id)
    .map((o) => ({
      key: o.slug,
      href: `/other/${o.slug}`,
      label: o.title.toUpperCase(),
      meta: bubbleTools(o.tools),
      variant: o.variant,
      wip: o.wip ?? false,
      drexel: o.drexel ?? false,
      liveUrl: o.liveUrl,
      speed: seededRange(o.slug, 0.82, 1.18),
      depth: seededRange(o.slug + ":depth", 0, 1),
    }))
    .sort(
      (a, b) =>
        Number(a.wip) - Number(b.wip) || Number(b.drexel) - Number(a.drexel),
    ),
}));

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <WalkingField
        top={<Hero feature={<WorkCow />} />}
        label={<SideProjectsLabel />}
      >
        {groups.flatMap((g, gi) => [
          <FenceSign key={g.id} title={g.title} note={g.note} />,
          ...g.items.map((item, i) => {
            const enterIndex =
              groups.slice(0, gi).reduce((n, x) => n + x.items.length, 0) + i;
            return (
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
                enterIndex={enterIndex}
                enterAngle={seededRange(item.key + ":angle", 0, 360)}
              />
            );
          }),
        ])}
      </WalkingField>
    </main>
  );
}
