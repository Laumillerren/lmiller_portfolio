import { CowUnit } from "@/components/CowUnit";
import { WalkingField } from "@/components/WalkingField";
import { SkillCow } from "@/components/SkillCow";
import { Cloud } from "@/components/Cloud";
import { work } from "@/data/work";
import { skills } from "@/data/skills";
import { otherThings } from "@/data/otherThings";

const hero = (
  <div className="relative shrink-0 pt-14 pb-8 md:pt-16 md:pb-8">
    <Cloud
      size={13}
      duration={18}
      className="absolute left-[6%] top-0 hidden sm:block"
    />
    <Cloud
      size={10}
      duration={14}
      delay={2}
      className="absolute right-[12%] top-10 hidden sm:block"
    />
    <Cloud
      size={16}
      duration={20}
      delay={1}
      className="absolute left-[24%] top-16 hidden md:block"
    />
    <Cloud
      size={11}
      duration={15}
      delay={3}
      className="absolute right-[26%] top-1 hidden lg:block"
    />

    <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
        LAUREN MILLER
      </h1>
      <p className="mt-3 text-xs sm:text-sm tracking-[0.18em] text-ink-soft uppercase">
        Data Engineer · Analytics · Data Science
      </p>
      <p className="mt-4 max-w-md text-sm sm:text-base text-ink-soft italic">
        I build data systems, analyze messy problems, and make things on the
        internet.
      </p>

      <div className="mt-8 text-[11px] sm:text-xs tracking-[0.22em] text-ink-soft">
        SELECT A COW TO EXPLORE
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <WalkingField top={hero}>
        {work.map((w) => (
          <CowUnit
            key={w.slug}
            href={`/work/${w.slug}`}
            label={w.title.toUpperCase()}
            meta={w.meta}
            variant={w.variant}
          />
        ))}
        {skills.map((s) => (
          <SkillCow key={s.id} label={s.label.toUpperCase()} blurb={s.blurb} />
        ))}
        {otherThings.map((o) => (
          <CowUnit
            key={o.slug}
            href={`/other/${o.slug}`}
            label={o.title.toUpperCase()}
            variant={o.variant}
          />
        ))}
      </WalkingField>
    </main>
  );
}
