export function ToolTags({ tools }: { tools: string[] }) {
  if (!tools.length) return null;

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-ink-soft mb-3">TOOLS</p>
      <ul className="flex flex-wrap gap-2 text-[11px] tracking-[0.1em]">
        {tools.map((tool) => (
          <li
            key={tool}
            className="border-2 border-ink bg-paper px-2.5 py-1 shadow-[3px_3px_0_var(--ink)]"
          >
            {tool.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
}
