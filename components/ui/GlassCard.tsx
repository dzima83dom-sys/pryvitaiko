import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function GlassCard({
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn('glass-card rounded-[22px]', className)}
      {...props}
    >
      {children}
    </div>
  );
}