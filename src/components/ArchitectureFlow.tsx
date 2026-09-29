export function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-start">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-start">
          <div className="border border-rule px-3 py-1.5 text-xs tracking-[0.08em]">
            {step}
          </div>
          {i < steps.length - 1 ? (
            <div className="pl-4 py-1 text-ink-soft text-xs leading-none">↓</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
