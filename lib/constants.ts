import type { ScreenKey } from '@/store/useGreetingStore';

export type Option = {
  id: string;
  label: string;
  emoji: string;
  isOther?: boolean;
};

export const TOTAL_STEPS = 5;

export const SCREEN_ORDER: ScreenKey[] = [
  'start',
  'recipient',
  'profession',
  'occasion',
  'details',
  'emotion',
  'result',
];

export const RECIPIENT_OPTIONS: Option[] = [
  { id: 'parents', label: 'Маму / Тата', emoji: '👨‍👩‍👦' },
  { id: 'spouse', label: 'Чоловіка / Дружину', emoji: '💍' },
  { id: 'beloved', label: 'Кохану людину', emoji: '💗' },
  { id: 'friend', label: 'Друга / Подругу', emoji: '🤝' },
  { id: 'sibling', label: 'Брата / Сестру', emoji: '👫' },
  { id: 'child', label: 'Сина / Доньку', emoji: '🧒' },
  { id: 'grandparent', label: 'Бабусю / Дідуся', emoji: '👵' },
  { id: 'colleague', label: 'Колегу', emoji: '💼' },
  { id: 'manager', label: 'Керівника', emoji: '👔' },
  { id: 'family-friend', label: "Друга сім'ї", emoji: '🏡' },
  { id: 'godparent', label: 'Хрещеного / Хрещену', emoji: '✨' },
  { id: 'other', label: 'Інше', emoji: '✍️', isOther: true },
];

export const PROFESSION_OPTIONS: Option[] = [
  { id: 'office', label: 'Офіс / Бізнес', emoji: '📊' },
  { id: 'sales', label: 'Продажі / Торгівля', emoji: '🛍️' },
  { id: 'it', label: 'IT / Технології', emoji: '💻' },
  { id: 'education', label: 'Освіта', emoji: '🎓' },
  { id: 'medicine', label: 'Медицина', emoji: '🩺' },
  { id: 'beauty', label: "Краса / Б'юті", emoji: '💄' },
  { id: 'creative', label: 'Творчість / Креатив', emoji: '🎨' },
  { id: 'sport', label: 'Спорт / Фітнес', emoji: '🏋️' },
  { id: 'service', label: 'Сервіс / Обслуговування', emoji: '🤝' },
  { id: 'build', label: 'Будівництво / Ремонт', emoji: '🛠️' },
  { id: 'business-owner', label: 'Власна справа / Підприємець', emoji: '🚀' },
  { id: 'other', label: 'Інше', emoji: '✍️', isOther: true },
];

export const OCCASION_OPTIONS: Option[] = [
  { id: 'birthday', label: 'День народження', emoji: '🎂' },
  { id: 'anniversary', label: 'Ювілей', emoji: '🎉' },
  { id: 'wedding', label: 'Весілля / Річниця', emoji: '💍' },
  { id: 'new-year', label: 'Новий рік', emoji: '🎄' },
  { id: 'christmas', label: 'Різдво', emoji: '✨' },
  { id: 'easter', label: 'Великдень', emoji: '🐣' },
  { id: 'angel-day', label: 'День ангела', emoji: '😇' },
  { id: 'promotion', label: 'Підвищення / Нова робота', emoji: '📈' },
  { id: 'achievement', label: 'Досягнення / Успіх', emoji: '🏆' },
  { id: 'gratitude', label: 'Подяка', emoji: '🙏' },
  { id: 'just-because', label: 'Просто так', emoji: '🎁' },
  { id: 'other', label: 'Інше', emoji: '✍️', isOther: true },
];

export const GENDER_OPTIONS: Option[] = [
  { id: 'male', label: 'Чоловік', emoji: '👨' },
  { id: 'female', label: 'Жінка', emoji: '👩' },
];

export const AGE_OPTIONS: Option[] = [
  { id: 'child', label: 'Дитина', emoji: '🧒' },
  { id: 'teen', label: 'Підліток', emoji: '🧑' },
  { id: 'adult', label: 'Середній вік', emoji: '🧔' },
  { id: 'elder', label: 'Літній вік', emoji: '👵' },
];

export const EMOTION_OPTIONS: Option[] = [
  { id: 'warm', label: 'Тепле', emoji: '💗' },
  { id: 'fun', label: 'Веселе', emoji: '😄' },
  { id: 'romantic', label: 'Романтичне', emoji: '💕' },
  { id: 'formal', label: 'Офіційне', emoji: '🤝' },
  { id: 'motivating', label: 'Мотивуюче', emoji: '🚀' },
  { id: 'touching', label: 'Зворушливе', emoji: '🥹' },
  { id: 'creative', label: 'Креативне', emoji: '🎨' },
  { id: 'funny', label: 'Жартівливе', emoji: '😜' },
  { id: 'universal', label: 'Універсальне', emoji: '✨' },
];
