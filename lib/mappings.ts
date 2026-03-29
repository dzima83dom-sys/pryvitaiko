import type { GreetingState } from '@/store/useGreetingStore';

const pairMap = {
  parents: { male: 'тато', female: 'мама' },
  spouse: { male: 'чоловік', female: 'дружина' },
  friend: { male: 'друг', female: 'подруга' },
  sibling: { male: 'брат', female: 'сестра' },
  child: { male: 'син', female: 'донька' },
  grandparent: { male: 'дідусь', female: 'бабуся' },
  godparent: { male: 'хрещений', female: 'хрещена' },
} as const;

const genericRecipientByGender = {
  beloved: { male: 'кохана людина', female: 'кохана людина' },
  colleague: { male: 'колега', female: 'колега' },
  manager: { male: 'керівник', female: 'керівниця' },
  'family-friend': { male: "друг сім'ї", female: "подруга сім'ї" },
} as const;

export function getResolvedRecipient(state: GreetingState): string {
  const customValue = state.recipientCustomValue.trim();
  if (customValue) {
    return customValue;
  }

  if (!state.recipient) {
    return '';
  }

  if (state.recipient in pairMap) {
    const mapped = pairMap[state.recipient as keyof typeof pairMap];

    if (state.gender === 'male' || state.gender === 'female') {
      return mapped[state.gender];
    }

    return state.recipientLabel;
  }

  if (state.recipient in genericRecipientByGender) {
    const mapped =
      genericRecipientByGender[state.recipient as keyof typeof genericRecipientByGender];

    if (state.gender === 'male' || state.gender === 'female') {
      return mapped[state.gender];
    }

    return state.recipientLabel;
  }

  return state.recipientLabel;
}

export function getResolvedProfession(state: GreetingState): string {
  return state.professionCustomValue.trim() || state.professionLabel;
}

export function getResolvedOccasion(state: GreetingState): string {
  return state.occasionCustomValue.trim() || state.occasionLabel;
}

export function getGenderLabel(gender: GreetingState['gender']): string {
  if (gender === 'male') return 'чоловік';
  if (gender === 'female') return 'жінка';
  return '';
}

export function getAgeLabel(age: GreetingState['age']): string {
  switch (age) {
    case 'child':
      return 'дитина';
    case 'teen':
      return 'підліток';
    case 'adult':
      return 'середній вік';
    case 'elder':
      return 'літній вік';
    default:
      return '';
  }
}