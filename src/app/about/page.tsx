import { Cow } from "@/components/Cow";
import { BackToCows } from "@/components/BackToCows";
import { SpeechBubble } from "@/components/SpeechBubble";
import { BASE_PATH } from "@/lib/site";

function Sticker({
  src,
  alt,
  says,
  note,
  className,
}: {
  src: string;
  alt: string;
  says: string;
  // Shown under the sticker on hover, keyboard focus, or tap.
  note?: string;
  className: string;
}) {
  return (
    <figure
      tabIndex={note ? 0 : undefined}
      className="group relative flex flex-col items-center gap-4 outline-none"
    >
      <SpeechBubble text={says} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      <img
        src={`${BASE_PATH}${src}`}
        alt={alt}
        className={`sticker h-auto motion-safe:transition-transform motion-safe:duration-300 group-hover:rotate-0 group-hover:scale-105 ${className}`}
      />
      {note ? (
        <figcaption
          aria-hidden="true"
          className="pointer-events-none absolute top-full left-1/2 z-10 mt-4 w-52 -translate-x-1/2 translate-y-1 border-2 border-ink bg-cream px-3 py-2 text-center text-[11px] leading-snug text-ink opacity-0 shadow-[4px_4px_0_var(--ink)] motion-safe:transition-all motion-safe:duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
        >
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-paper">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
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

        <div className="flex justify-center items-end gap-8 sm:gap-14 mb-14">
          <Sticker
            src="/about/lauren.png"
            alt="Lauren Miller"
            says="HI!"
            className="w-36 sm:w-52 -rotate-3"
          />
          <Sticker
            src="/about/cow.png"
            alt="Cherry, my favorite cow from the farm I worked at in high school"
            says="MOO"
            note="This is Cherry, my favorite cow from the farm I worked at in high school."
            className="w-40 sm:w-56 rotate-3"
          />
        </div>

        <div className="space-y-5 text-sm leading-relaxed max-w-xl">
          <p>
            I&apos;m a data engineer based in Philadelphia, currently working
            at Aramark, where I spend my days moving, cleaning, and making
            sense of data so other people can trust it.
          </p>
          <p>
            Outside of work I like to do small projects for myself and the
            people around me, like a tracker for my book club, a teaching-hours
            log for yoga teachers, and a stats site for a basketball club.
          </p>
          <p>
            I like having a reason to learn something new, and seeing a
            project through from messy data to something people actually use.
          </p>
        </div>

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
