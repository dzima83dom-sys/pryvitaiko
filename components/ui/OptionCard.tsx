import { motion } from 'framer-motion';

export function OptionCard({
  emoji,
  label,
  selected,
  onClick,
  tall = false,
}: {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center text-center text-cream"
      style={{
        minHeight: tall ? '90px' : '82px',
        borderRadius: '22px',
        padding: '10px 8px',
        gap: '6px',
        margin: '3px',
        border: selected
          ? '1px solid rgba(255,255,255,0.34)'
          : '1px solid rgba(255,255,255,0.18)',
        background: selected
          ? 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: selected
          ? `
      inset 0 1px 0 rgba(255,255,255,0.34),
      inset 0 -6px 12px rgba(88,28,135,0.14),
      0 6px 12px rgba(0,0,0,0.18),
      0 1px 3px rgba(255,255,255,0.08)
    `
          : `
      inset 0 1px 0 rgba(255,255,255,0.26),
      inset 0 -6px 12px rgba(88,28,135,0.10),
      0 5px 10px rgba(0,0,0,0.16),
      0 1px 3px rgba(255,255,255,0.05)
    `,
        transition: 'all 0.18s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '38%',
          borderRadius: '999px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />

      <span
        style={{
          fontSize: '25px',
          lineHeight: 1,
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.14))',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {emoji}
      </span>

      <span
        style={{
          fontFamily: 'var(--font-manrope)',
          fontSize: '14px',
          lineHeight: 1.15,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          textWrap: 'balance',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </span>
    </button>
  );
}