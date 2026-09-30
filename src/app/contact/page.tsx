import { Cow } from "@/components/Cow";
import { BackToCows } from "@/components/BackToCows";

const links = [
  {
    label: "EMAIL",
    href: "mailto:laurenthemiller@gmail.com",
    display: "laurenthemiller@gmail.com",
  },
  { label: "GITHUB", href: "https://github.com/Laumillerren", display: "github.com/Laumillerren" },
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/lauren-miller-999263171/",
    display: "linkedin.com/in/lauren-miller-999263171",
  },
  {
    label: "RESUME",
    // Drop the file at public/resume.pdf and this link starts working —
    // no code changes needed.
    href: "/resume.pdf",
    display: "Download PDF",
    newTab: true,
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1 w-full bg-paper">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-20 md:py-28">
        <div className="flex items-start gap-4 mb-12">
          <Cow size={16} className="text-ink shrink-0" />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight pt-1">
            CONTACT
          </h1>
        </div>

        <ul className="space-y-6">
          {links.map((l) => (
            <li key={l.label}>
              <p className="text-[11px] tracking-[0.2em] text-ink-soft mb-1">
                {l.label}
              </p>
              <a
                href={l.href}
                target={l.newTab ? "_blank" : undefined}
                rel={l.newTab ? "noopener noreferrer" : undefined}
                className="text-sm hover:text-accent transition-colors underline underline-offset-4 decoration-rule"
              >
                {l.display}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <BackToCows />
        </div>
      </div>
    </main>
  );
}
