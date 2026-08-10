type TechBadgeProps = {
  label: string;
};

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-pink-200 bg-pink-100 px-2.5 py-0.5 font-mono text-xs text-pink-800">
      {label}
    </span>
  );
}
