import { CowUnit } from "./CowUnit";
import { GrassRow } from "./GrassRow";

export function Footer() {
  return (
    <footer className="min-h-screen flex flex-col border-t border-rule">
      <div className="flex-1 flex flex-col items-center justify-center gap-16 px-6 sm:px-10 lg:px-14 text-center">
        <div>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
            LAUREN MILLER
          </p>
          <p className="mt-2 text-xs sm:text-sm tracking-[0.18em] text-ink-soft uppercase">
            Data Engineer · Analytics · Data Science
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-14">
          <CowUnit href="/about" label="ABOUT" />
          <CowUnit href="/contact" label="CONTACT" />
        </div>
      </div>
      <div className="pb-4 text-center text-[11px] tracking-[0.08em] text-ink-soft">
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
