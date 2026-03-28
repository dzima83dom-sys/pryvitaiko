import { cn } from '@/lib/utils';

export function TextField({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={cn(
        'glass-card h-[54px] w-full rounded-[18px] border border-white/20 px-4 text-[16px] text-cream outline-none placeholder:text-cream/70',
        className,
      )}
      maxLength={20}
    />
  );
}
