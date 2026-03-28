import { cn } from '@/lib/utils';

export function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('glass-card rounded-[22px]', className)}>{children}</div>;
}
