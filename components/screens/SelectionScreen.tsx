'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AppShell } from '@/components/ui/AppShell';
import { OptionCard } from '@/components/ui/OptionCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProgressHeader } from '@/components/ui/ProgressHeader';
import { TextField } from '@/components/ui/TextField';
import type { Option } from '@/lib/constants';

export function SelectionScreen({
  step,
  title,
  options,
  selected,
  customValue,
  customPlaceholder,
  onBack,
  onSelect,
  onCustomValueChange,
  onSubmitCustom,
}: {
  step: number;
  title: string;
  options: Option[];
  selected: string;
  customValue: string;
  customPlaceholder: string;
  onBack: () => void;
  onSelect: (option: Option) => void;
  onCustomValueChange: (value: string) => void;
  onSubmitCustom: () => void;
}) {
  const otherSelected =
    options.find((option) => option.id === selected)?.isOther === true;
  const canContinue = customValue.trim().length > 0;

  return (
    <AppShell>
      <ProgressHeader step={step} onBack={onBack} />

      <div className="mb-5 mt-2">
        <div className="glass-card rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]">
          <p className="text-[18px] font-semibold leading-[1.35] text-cream sm:text-[20px]">
            {title}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={selected === option.id}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {otherSelected ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-auto flex flex-col gap-3 pt-4"
          >
            <TextField
              value={customValue}
              onChange={onCustomValueChange}
              placeholder={customPlaceholder}
            />
            <PrimaryButton disabled={!canContinue} onClick={onSubmitCustom}>
              Рухаємося далі
            </PrimaryButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AppShell>
  );
}