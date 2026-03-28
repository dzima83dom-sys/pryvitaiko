import { create } from 'zustand';

export type ScreenKey = 'start' | 'recipient' | 'profession' | 'occasion' | 'details' | 'emotion' | 'result';
export type Gender = 'male' | 'female' | null;
export type AgeGroup = 'child' | 'teen' | 'adult' | 'elder' | null;

type Status = 'idle' | 'loading' | 'success' | 'error';

export type GreetingState = {
  screen: ScreenKey;
  recipient: string;
  recipientLabel: string;
  recipientCustomValue: string;
  profession: string;
  professionLabel: string;
  professionCustomValue: string;
  occasion: string;
  occasionLabel: string;
  occasionCustomValue: string;
  name: string;
  gender: Gender;
  age: AgeGroup;
  emotion: string;
  emotionLabel: string;
  generatedText: string;
  status: Status;
  copied: boolean;
};

type GreetingActions = {
  setScreen: (screen: ScreenKey) => void;
  nextScreen: () => void;
  previousScreen: () => void;
  resetError: () => void;
  setRecipient: (payload: { value: string; label: string; custom?: boolean }) => void;
  setRecipientCustomValue: (value: string) => void;
  setProfession: (payload: { value: string; label: string; custom?: boolean }) => void;
  setProfessionCustomValue: (value: string) => void;
  setOccasion: (payload: { value: string; label: string; custom?: boolean }) => void;
  setOccasionCustomValue: (value: string) => void;
  setName: (value: string) => void;
  setGender: (value: Gender) => void;
  setAge: (value: AgeGroup) => void;
  setEmotion: (payload: { value: string; label: string }) => void;
  setGeneratedText: (value: string) => void;
  setStatus: (value: Status) => void;
  setCopied: (value: boolean) => void;
};

const screenOrder: ScreenKey[] = ['start', 'recipient', 'profession', 'occasion', 'details', 'emotion', 'result'];

const initialState: GreetingState = {
  screen: 'start',
  recipient: '',
  recipientLabel: '',
  recipientCustomValue: '',
  profession: '',
  professionLabel: '',
  professionCustomValue: '',
  occasion: '',
  occasionLabel: '',
  occasionCustomValue: '',
  name: '',
  gender: null,
  age: null,
  emotion: '',
  emotionLabel: '',
  generatedText: '',
  status: 'idle',
  copied: false,
};

export const useGreetingStore = create<GreetingState & GreetingActions>((set, get) => ({
  ...initialState,
  setScreen: (screen) => set({ screen }),
  nextScreen: () => {
    const index = screenOrder.indexOf(get().screen);
    const next = screenOrder[Math.min(index + 1, screenOrder.length - 1)];
    set({ screen: next });
  },
  previousScreen: () => {
    const index = screenOrder.indexOf(get().screen);
    const prev = screenOrder[Math.max(index - 1, 0)];
    set({ screen: prev, copied: false });
  },
  resetError: () => set({ status: 'idle', screen: 'emotion' }),
  setRecipient: ({ value, label, custom }) =>
    set({ recipient: value, recipientLabel: label, recipientCustomValue: custom ? get().recipientCustomValue : '', copied: false }),
  setRecipientCustomValue: (value) => set({ recipientCustomValue: value, copied: false }),
  setProfession: ({ value, label, custom }) =>
    set({ profession: value, professionLabel: label, professionCustomValue: custom ? get().professionCustomValue : '', copied: false }),
  setProfessionCustomValue: (value) => set({ professionCustomValue: value, copied: false }),
  setOccasion: ({ value, label, custom }) =>
    set({ occasion: value, occasionLabel: label, occasionCustomValue: custom ? get().occasionCustomValue : '', copied: false }),
  setOccasionCustomValue: (value) => set({ occasionCustomValue: value, copied: false }),
  setName: (value) => set({ name: value, copied: false }),
  setGender: (value) => set({ gender: value, copied: false }),
  setAge: (value) => set({ age: value, copied: false }),
  setEmotion: ({ value, label }) => set({ emotion: value, emotionLabel: label, copied: false }),
  setGeneratedText: (value) => set({ generatedText: value }),
  setStatus: (value) => set({ status: value }),
  setCopied: (value) => set({ copied: value }),
}));
