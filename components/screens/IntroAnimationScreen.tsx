'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const greetingBursts = [
  {
    text: 'З днем народження',
    className:
      'left-[178px] top-[118px] bg-white/88 text-[#7a2f72] border border-white/70 shadow-[0_10px_35px_rgba(122,47,114,0.18)]',
    animate: {
      x: [0, 60, 120],
      y: [0, -80, -180],
      opacity: [0, 1, 1, 0],
      scale: [0.86, 1.04, 1],
      rotate: [6, 2, -2],
    },
    transition: {
      duration: 2.6,
      delay: 0.15,
      repeat: Infinity,
      repeatDelay: 0.25,
      ease: 'easeOut' as const,
    },
  },
  {
    text: 'Щастя і тепла',
    className:
      'left-[168px] top-[146px] bg-[#fff6fb]/90 text-[#9b2c6b] border border-white/75 shadow-[0_10px_32px_rgba(155,44,107,0.16)]',
    animate: {
      x: [0, 76, 106],
      y: [0, -70, -140],
      opacity: [0, 1, 1, 0],
      scale: [0.84, 1.02, 0.98],
      rotate: [10, 4, 0],
    },
    transition: {
      duration: 2.8,
      delay: 0.55,
      repeat: Infinity,
      repeatDelay: 0.15,
      ease: 'easeOut' as const,
    },
  },
  {
    text: 'Зі святом',
    className:
      'left-[150px] top-[132px] bg-[#fffdfd]/88 text-[#6e2e82] border border-white/70 shadow-[0_10px_30px_rgba(110,46,130,0.16)]',
    animate: {
      x: [0, -46, -88],
      y: [0, -78, -122],
      opacity: [0, 1, 1, 0],
      scale: [0.82, 1.03, 1],
      rotate: [-8, -4, 2],
    },
    transition: {
      duration: 2.5,
      delay: 0.95,
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: 'easeOut' as const,
    },
  },
  {
    text: 'Миру й радості',
    className:
      'left-[160px] top-[168px] bg-white/90 text-[#b03b67] border border-white/80 shadow-[0_10px_30px_rgba(176,59,103,0.15)]',
    animate: {
      x: [0, 78, 102],
      y: [0, -60, -140],
      opacity: [0, 1, 1, 0],
      scale: [0.85, 1.03, 0.98],
      rotate: [4, 1, -3],
    },
    transition: {
      duration: 2.7,
      delay: 1.25,
      repeat: Infinity,
      repeatDelay: 0.15,
      ease: 'easeOut' as const,
    },
  },
  {
    text: 'Успіхів',
    className:
      'left-[186px] top-[176px] bg-[#fff7ef]/92 text-[#8c3d5b] border border-white/70 shadow-[0_10px_30px_rgba(140,61,91,0.14)]',
    animate: {
      x: [0, 60, 80],
      y: [0, -30, -78],
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1.02, 0.98],
      rotate: [9, 5, 1],
    },
    transition: {
      duration: 2.45,
      delay: 1.55,
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: 'easeOut' as const,
    },
  },
];

const sparkles = [
  { left: '65%', top: '34%', delay: 0.2, size: 10 },
  { left: '71%', top: '29%', delay: 0.8, size: 7 },
  { left: '59%', top: '27%', delay: 1.2, size: 8 },
  { left: '76%', top: '39%', delay: 1.6, size: 6 },
  { left: '68%', top: '22%', delay: 2.0, size: 9 },
];

export function IntroAnimationScreen() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="/bg_intro.png"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <motion.div
        className="absolute left-[8%] top-[10%] h-[180px] w-[180px] rounded-full bg-[#ffd7e8]/40 blur-3xl"
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute right-[6%] top-[14%] h-[220px] w-[220px] rounded-full bg-[#f0d8ff]/35 blur-3xl"
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.28, 0.5, 0.28],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[50%] h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.28, 0.12],
        }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.6, ease: 'easeOut' },
            y: {
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            scale: { duration: 0.6, ease: 'easeOut' },
          }}
          className="relative z-10 h-[420px] w-[320px] shrink-0"
        >
          <motion.div
            className="absolute left-[206px] top-[116px] h-[120px] w-[120px] rounded-full bg-[#ffd7ef]/55 blur-3xl"
            animate={{
              scale: [1, 1.28, 1],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute left-[194px] top-[106px] h-[146px] w-[146px] rounded-full bg-white/30 blur-3xl"
            animate={{
              scale: [0.96, 1.16, 0.96],
              opacity: [0.12, 0.3, 0.12],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {sparkles.map((item, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.75)]"
              style={{
                left: item.left,
                top: item.top,
                width: item.size,
                height: item.size,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.4, 1.2, 0.6],
                y: [0, -10, -18],
              }}
              transition={{
                duration: 1.8,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'easeOut',
              }}
            />
          ))}

          {greetingBursts.map((item) => (
            <motion.div
              key={item.text}
              className={`absolute z-30 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.01em] backdrop-blur-md ${item.className}`}
              initial={{ opacity: 0 }}
              animate={item.animate}
              transition={item.transition}
            >
              <motion.span
                className="block whitespace-nowrap"
                animate={{
                  letterSpacing: ['0em', '0.02em', '0em'],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {item.text}
              </motion.span>
            </motion.div>
          ))}

          <Image
            src="/hero-phone.png"
            alt="hero"
            width={320}
            height={420}
            priority
            className="relative z-20 h-auto w-full object-contain drop-shadow-[0_22px_45px_rgba(94,33,97,0.22)]"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[6.5vh] z-40 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.75,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white/12 blur-2xl"
            animate={{
              opacity: [0.25, 0.5, 0.25],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <h1
            className="relative text-[42px] font-black uppercase leading-none tracking-[0.03em] text-white drop-shadow-[0_6px_16px_rgba(73,41,90,0.45)] sm:text-[48px]"
            style={{
              WebkitTextStroke: '1.6px rgba(95, 35, 107, 0.55)',
              textShadow:
                '0 3px 0 rgba(118,54,140,0.35), 0 10px 28px rgba(73,41,90,0.38)',
            }}
          >
            Привітайко
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 1.05,
            ease: 'easeOut',
          }}
          className="mt-2 max-w-[320px] text-[15px] font-extrabold leading-snug tracking-[0.01em] text-[#fff6ff] drop-shadow-[0_4px_14px_rgba(73,41,90,0.34)] sm:text-base"
          style={{
            textShadow: '0 3px 14px rgba(73,41,90,0.28)',
          }}
        >
          Крутезні привітання на кожен день
        </motion.p>
      </div>
    </div>
  );
}