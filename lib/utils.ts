export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function clampText(value: string, max = 20): string {
  return value.slice(0, max);
}
