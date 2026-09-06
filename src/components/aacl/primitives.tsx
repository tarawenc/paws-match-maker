import { cn } from "@/lib/utils";

export function PlaceholderImage({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={cn(
        "grid place-items-center bg-placeholder text-[11px] font-medium uppercase tracking-widest text-slate-body/60",
        className,
      )}
    >
      {label}
    </div>
  );
}

export function TraitChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-brand-dark">
      {children}
    </span>
  );
}

export function StepIndicator({ current, total = 3 }: { current: number; total?: number }) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            i < current ? "bg-brand" : "bg-hairline",
          )}
        />
      ))}
    </div>
  );
}