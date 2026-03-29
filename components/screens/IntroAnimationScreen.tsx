'use client';

import Image from 'next/image';

export function IntroAnimationScreen() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fdf4ee] flex items-center justify-center">
      
      {/* Фон */}
      <Image
        src="/bg-main.png"
        alt="background"
        fill
        className="object-cover opacity-70"
      />

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