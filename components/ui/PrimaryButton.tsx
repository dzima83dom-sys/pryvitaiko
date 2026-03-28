'use client';

import { motion } from 'framer-motion';

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      animate={
        disabled
          ? { scale: 1 }
          : { scale: [1, 1.03, 1] }
      }
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative w-full overflow-hidden rounded-[22px] border border-white/35 text-center text-white shadow-[0_10px_26px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-[14px]"
      style={{
        height: '64px',
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '0.2px',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.16) 100%)',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0))',
        }}
      />
      <span
        className="pointer-events-none absolute top-0 h-full w-[55%]"
        style={{
          left: '-120%',
          transform: 'skewX(-20deg)',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
          animation: disabled ? 'none' : 'buttonShimmer 3.8s ease-in-out infinite',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}