'use client';

import { motion } from 'framer-motion';
import { AppShell } from '@/components/ui/AppShell';
import { OptionCard } from '@/components/ui/OptionCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProgressHeader } from '@/components/ui/ProgressHeader';
import { EMOTION_OPTIONS } from '@/lib/constants';

export function EmotionScreen({
  selected,
  onBack,
  onSelect,
  onSubmit,
}: {
  selected: string;
  onBack: () => void;
  onSelect: (value: string) => void;
  onSubmit: () => void;
}) {
  const canContinue = !!selected;

  return (
    <AppShell>
      <ProgressHeader step={5} onBack={onBack} />

      <div className="mb-5 mt-2">
        <div className="glass-card rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]">
          <p className="text-[18px] font-semibold leading-[1.35] text-cream sm:text-[20px]">
            Яким зробимо привітання? 😉
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3.5">
        {EMOTION_OPTIONS.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={selected === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>

      <div className="mt-auto pt-4">
        <PrimaryButton disabled={!canContinue} onClick={onSubmit}>
          Створити привітання
        </PrimaryButton>
      </div>
    </AppShell>
  );
}