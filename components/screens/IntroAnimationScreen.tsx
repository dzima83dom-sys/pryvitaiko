'use client';

import Image from 'next/image';

export function IntroAnimationScreen() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#fdf4ee] via-[#f7d6e6] to-[#eff4ee]">
      
      {/* Дублирующий слой как на сплеше (даёт глубину) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf4ee] via-[#f7d6e6] to-[#eff4ee]" />

      {/* Герой */}
      <div className="relative z-10 flex items-center justify-center">
        <Image
          src="/hero-phone.png"
          alt="hero"
          width={320}
          height={400}
          className="object-contain"
        />
      </div>

    </div>
  );
}