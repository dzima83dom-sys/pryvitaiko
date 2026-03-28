export function telegramShareLink(text: string): string {
  return `https://t.me/share/url?text=${encodeURIComponent(text)}`;
}

export function viberShareLink(text: string): string {
  return `viber://forward?text=${encodeURIComponent(text)}`;
}
