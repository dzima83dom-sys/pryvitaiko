# Привітайко

PWA-застосунок на Next.js для генерації персоналізованих привітань.

## Швидкий старт

1. Встанови залежності:
   npm install
2. Створи файл `.env.local` на основі `.env.example`
3. Додай ключ:
   OPENAI_API_KEY=твій_ключ
4. Запусти проєкт:
   npm run dev

## Структура

- `app/page.tsx` — головний сценарій застосунку
- `app/api/generate/route.ts` — серверний виклик OpenAI
- `components/screens/*` — екрани застосунку
- `components/ui/*` — перевикористовувані UI-компоненти
- `store/useGreetingStore.ts` — глобальний стан через Zustand
- `lib/prompt.ts` — побудова prompt для OpenAI
- `public/*` — фони, аватар і service worker

## Що вже закладено

- single-page flow під PWA
- анімації через Framer Motion
- glassmorphism UI
- Telegram / Viber / copy share
- підготовка під майбутній Capacitor wrapper
