export function ToolTags({ tools }: { tools: string[] }) {
  if (!tools.length) return null;

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] text-ink-soft mb-2">TOOLS</p>
      <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
        {tools.map((tool, i) => (
          <li key={tool} className="flex items-center gap-2">
            <span>{tool.toUpperCase()}</span>
            {i < tools.length - 1 ? (
              <span className="text-ink-soft">·</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
