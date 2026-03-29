'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StartScreen } from '@/components/screens/StartScreen';
import { SelectionScreen } from '@/components/screens/SelectionScreen';
import { DetailsScreen } from '@/components/screens/DetailsScreen';
import { EmotionScreen } from '@/components/screens/EmotionScreen';
import { ResultScreen } from '@/components/screens/ResultScreen';
import {
  OCCASION_OPTIONS,
  PROFESSION_OPTIONS,
  RECIPIENT_OPTIONS,
  EMOTION_OPTIONS,
} from '@/lib/constants';
import { clampText } from '@/lib/utils';
import { useGreetingStore } from '@/store/useGreetingStore';

export default function HomePage() {
  const store = useGreetingStore();

  useEffect(() => {
    if (!store.copied) return;
    const timer = setTimeout(() => store.setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [store.copied, store]);

  const generateGreeting = async () => {
    store.setScreen('result');
    store.setStatus('loading');
    store.setGeneratedText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...store,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.text) {
        throw new Error(data?.error || 'Помилка генерації');
      }

      store.setGeneratedText(data.text);
      store.setStatus('success');
    } catch {
      store.setStatus('error');
    }
  };

  const copyGreeting = async () => {
    const value = (store.generatedText || '').trim();
    if (!value) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      store.setCopied(true);
    } catch {
      store.setCopied(false);
    }
  };

  const currentScreen = !store.screen ? 'start' : store.screen;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{ height: '100%' }}
      >
        {currentScreen === 'start' && (
          <StartScreen onStart={() => store.setScreen('recipient')} />
        )}

        {currentScreen === 'recipient' && (
          <SelectionScreen
            step={1}
            title="Підкажи, кого будемо вітати"
            options={RECIPIENT_OPTIONS}
            selected={store.recipient || ''}
            customValue={store.recipientCustomValue || ''}
            customPlaceholder="Введіть, кого потрібно привітати"
            onBack={() => store.setScreen('start')}
            onSelect={(option) => {
              store.setRecipient({
                value: option.id,
                label: option.label,
                custom: option.isOther,
              });

              if (!option.isOther) {
                store.setScreen('profession');
              }
            }}
            onCustomValueChange={(value) =>
              store.setRecipientCustomValue(clampText(value))
            }
            onSubmitCustom={() => store.setScreen('profession')}
          />
        )}

        {currentScreen === 'profession' && (
          <SelectionScreen
            step={2}
            title="Давай зробимо ще крутіше 😉 В якій сфері працює ця людина?"
            options={PROFESSION_OPTIONS}
            selected={store.profession || ''}
            customValue={store.professionCustomValue || ''}
            customPlaceholder="Введіть сферу діяльності"
            onBack={() => store.setScreen('recipient')}
            onSelect={(option) => {
              store.setProfession({
                value: option.id,
                label: option.label,
                custom: option.isOther,
              });

              if (!option.isOther) {
                store.setScreen('occasion');
              }
            }}
            onCustomValueChange={(value) =>
              store.setProfessionCustomValue(clampText(value))
            }
            onSubmitCustom={() => store.setScreen('occasion')}
          />
        )}

        {currentScreen === 'occasion' && (
          <SelectionScreen
            step={3}
            title="З якої нагоди будемо вітати?"
            options={OCCASION_OPTIONS}
            selected={store.occasion || ''}
            customValue={store.occasionCustomValue || ''}
            customPlaceholder="Введіть нагоду"
            onBack={() => store.setScreen('profession')}
            onSelect={(option) => {
              store.setOccasion({
                value: option.id,
                label: option.label,
              });

              if (!option.isOther) {
                store.setScreen('details');
              }
            }}
            onCustomValueChange={(value) =>
              store.setOccasionCustomValue(clampText(value))
            }
            onSubmitCustom={() => store.setScreen('details')}
          />
        )}

        {currentScreen === 'details' && (
          <DetailsScreen
            name={store.name || ''}
            gender={store.gender || ''}
            age={store.age || ''}
            onBack={() => store.setScreen('occasion')}
            onNameChange={(value) => store.setName(clampText(value))}
            onGenderChange={(value) => store.setGender(value as any)}
            onAgeChange={(value) => store.setAge(value as any)}
            onNext={() => store.setScreen('emotion')}
          />
        )}

        {currentScreen === 'emotion' && (
          <EmotionScreen
            selected={store.emotion || ''}
            onBack={() => store.setScreen('details')}
            onSelect={(value) => {
              const option = EMOTION_OPTIONS.find((item) => item.id === value);
              if (!option) return;

              store.setEmotion({
                value: option.id,
                label: option.label,
              });
            }}
            onSubmit={generateGreeting}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            isLoading={store.status === 'loading'}
            text={store.generatedText || ''}
            onBack={() => {
              store.setStatus('idle');
              store.setScreen('emotion');
            }}
            handleCopy={copyGreeting}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}