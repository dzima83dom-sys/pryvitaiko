import { getAgeLabel, getGenderLabel, getResolvedOccasion, getResolvedProfession, getResolvedRecipient } from '@/lib/mappings';
import type { GreetingState } from '@/store/useGreetingStore';

export function buildGreetingPrompt(state: GreetingState): string {
  const recipient = getResolvedRecipient(state);
  const profession = getResolvedProfession(state);
  const occasion = getResolvedOccasion(state);
  const gender = getGenderLabel(state.gender);
  const age = getAgeLabel(state.age);
  const maybeName = state.name.trim();

  return [
    'Ти пишеш українською мовою тепле людяне привітання, ніби його написала жива людина.',
    'Створи ОДНЕ готове привітання.',
    '',
    'Дані:',
    `- Кому адресоване привітання: ${recipient}`,
    `- Сфера діяльності людини: ${profession}`,
    `- Нагода: ${occasion}`,
    `- Стать: ${gender}`,
    `- Вікова категорія: ${age}`,
    `- Емоція: ${state.emotionLabel}`,
    `- Імʼя: ${maybeName || 'не вказано'}`,
    '',
    'Вимоги до тексту:',
    '- тільки українська мова',
    '- 2 абзаци середньої довжини',
    '- звучить природно, тепло, без канцеляриту',
    '- мінімізуй банальні фрази та надмірний пафос',
    '- можна додати 1–2 емодзі тільки якщо вони реально доречні',
    '- якщо імʼя не вказано, не вигадуй його і не починай з імені',
    '- якщо імʼя вказано, використовуй його на початку тільки якщо це звучить природно',
    '- не використовуй лапки навколо всього тексту',
    '- не додавай заголовків, варіантів, пояснень чи службового тексту',
    '- одразу дай фінальний текст для відправки в месенджер',
  ].join('\n');
}
