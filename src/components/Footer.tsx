import { CowUnit } from "./CowUnit";
import { GrassRow } from "./GrassRow";
import { skills } from "@/data/skills";

export function Footer() {
  return (
    <footer className="bg-ink min-h-screen flex flex-col border-t border-white/15">
      <div className="flex-1 flex flex-col items-center justify-center gap-16 px-6 sm:px-10 lg:px-14 text-center">
        <div>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            LAUREN MILLER
          </p>
          <p className="mt-2 text-xs sm:text-sm tracking-[0.18em] text-cream uppercase">
            Data Engineer · Analytics · Data Science
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-14">
          <CowUnit href="/about" label="ABOUT" />
          <CowUnit href="/contact" label="CONTACT" />
        </div>
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] text-cream mb-3">
            SKILLS
          </p>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-xs">
            {skills.map((s, i) => (
              <li key={s.id} className="flex items-center gap-2">
                <span title={s.blurb} className="text-white cursor-default">
                  {s.label.toUpperCase()}
                </span>
                {i < skills.length - 1 ? (
                  <span className="text-cream">·</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pb-4 text-center text-[11px] tracking-[0.08em] text-cream">
        <a
          href="https://github.com/Laumillerren"
          className="hover:text-accent transition-colors"
        >
          GITHUB
        </a>
        <span className="mx-2">·</span>
        <span>2026</span>
      </div>
      <GrassRow />
    </footer>
  );
}
