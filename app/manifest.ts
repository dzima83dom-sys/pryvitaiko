import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Привітайко',
    short_name: 'Привітайко',
    description: 'PWA-застосунок для створення персоналізованих привітань.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0b16',
    theme_color: '#8b5cf6',
    lang: 'uk',
    orientation: 'portrait',
    icons: [
      {
        src: '/avatar.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/avatar.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
