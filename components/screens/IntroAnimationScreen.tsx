'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function IntroAnimationScreen() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#fdf4ee] via-[#f7d6e6] to-[#eff4ee]">
      
      {/* Дублирующий слой как на сплеше (даёт глубину) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf4ee] via-[#f7d6e6] to-[#eff4ee]" />

      {/* Герой */}
      <motion.div
  initial={{ opacity: 0, y: 24, scale: 0.94 }}
  animate={{
    opacity: 1,
    y: [0, -8, 0],
    scale: 1,
  }}
  transition={{
    opacity: { duration: 0.55, ease: 'easeOut' },
    y: {
      duration: 2.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
    scale: { duration: 0.55, ease: 'easeOut' },
  }}
  className="relative z-10 flex items-center justify-center"
>
  <Image
    src="/hero-phone.png"
    alt="hero"
    width={320}
    height={400}
    className="object-contain"
  />
</motion.div>

    </div>
  );
}