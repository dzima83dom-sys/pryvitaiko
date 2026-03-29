import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Привітайко',
    short_name: 'Привітайко',
    description: 'PWA-застосунок для створення персоналізованих привітань.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf4ee',
    theme_color: '#fdf4ee',
    lang: 'uk',
    orientation: 'portrait',
    icons: [
      {
        src: '/splash-hero.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/splash-hero.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
