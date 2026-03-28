'use client';

import { motion } from 'framer-motion';
import { AppShell } from '@/components/ui/AppShell';
import { OptionCard } from '@/components/ui/OptionCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProgressHeader } from '@/components/ui/ProgressHeader';
import { TextField } from '@/components/ui/TextField';

export function DetailsScreen({
  name,
  gender,
  age,
  onBack,
  onNameChange,
  onGenderChange,
  onAgeChange,
  onNext,
}: {
  name: string;
  gender: string;
  age: string;
  onBack: () => void;
  onNameChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onNext: () => void;
}) {
  const canContinue = !!gender && !!age;

  return (
    <AppShell>
      <ProgressHeader step={4} onBack={onBack} />

      <div className="mb-5 mt-2">
        <div className="glass-card rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]">
          <p className="text-[18px] font-semibold leading-[1.35] text-cream sm:text-[20px]">
            Ще трохи деталей — і все буде готово 😉 Вкажи ім’я, стать і вік людини
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-4"
      >
        <TextField
          value={name}
          onChange={onNameChange}
          placeholder="Введіть ім’я"
        />

        <div className="flex flex-col gap-2">
          <p className="pl-1 text-[15px] font-bold text-cream">Стать</p>
          <div className="grid grid-cols-2 gap-2.5">
            <OptionCard
              emoji="👨"
              label="Чоловік"
              selected={gender === 'male'}
              onClick={() => onGenderChange('male')}
            />
            <OptionCard
              emoji="👩"
              label="Жінка"
              selected={gender === 'female'}
              onClick={() => onGenderChange('female')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="pl-1 text-[15px] font-bold text-cream">Вік</p>
          <div className="mt-3 grid grid-cols-3 gap-6 px-1">
            <OptionCard
              emoji="🧒"
              label="Дитина"
              selected={age === 'child'}
              onClick={() => onAgeChange('child')}
            />
            <OptionCard
              emoji="🧑"
              label="Підліток"
              selected={age === 'teen'}
              onClick={() => onAgeChange('teen')}
            />
            <OptionCard
              emoji="👨‍💼"
              label="Середній вік"
              selected={age === 'adult'}
              onClick={() => onAgeChange('adult')}
            />
            <OptionCard
              emoji="👵"
              label="Літній вік"
              selected={age === 'elder'}
              onClick={() => onAgeChange('elder')}
            />
          </div>
        </div>

        <div className="pt-2">
          <PrimaryButton disabled={!canContinue} onClick={onNext}>
            Рухаємося далі
          </PrimaryButton>
        </div>
      </motion.div>
    </AppShell>
  );
}