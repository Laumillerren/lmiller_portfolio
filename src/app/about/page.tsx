import { Cow } from "@/components/Cow";
import { BackToCows } from "@/components/BackToCows";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
      <div className="flex items-start gap-4 mb-10">
        <Cow size={16} className="text-ink shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            LAUREN MILLER
          </h1>
          <p className="mt-2 text-xs tracking-[0.14em] text-ink-soft uppercase">
            Data Engineer · Analytics · Data Science
          </p>
        </div>
      </div>

      <div className="space-y-5 text-sm leading-relaxed max-w-xl">
        <p>
          I&apos;m a data engineer based in Philadelphia, currently working at
          Aramark, where I spend my days moving, cleaning, and making sense of
          data so other people can trust it.
        </p>
        <p>
          Outside of work I like building small, complete things: a tracker
          for my book club, a place to log yoga hours, a way to catalog every
          quilt I&apos;ve made, a stats site for basketball. None of it is
          groundbreaking — I just like having a reason to learn something new
          and ship it.
        </p>
        <p>
          This site is one of those things. The cows are the point as much as
          the projects are.
        </p>
      </div>

      <div className="mt-16">
        <BackToCows />
      </div>
    </main>
  );
}
