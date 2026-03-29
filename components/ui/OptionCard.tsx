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
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: selected ? 1.06 : 1,
      }}
      className="flex flex-col items-center justify-center text-center text-cream"
      style={{
        minHeight: tall ? '90px' : '82px',
        borderRadius: '22px',
        padding: '10px 8px',
        gap: '6px',
        margin: '3px',
        border: selected
          ? '1px solid rgba(255,255,255,0.5)'
          : '1px solid rgba(255,255,255,0.18)',
        background: selected
          ? 'linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.18) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: selected
          ? `
      0 0 18px rgba(255, 120, 255, 0.45),
      inset 0 1px 0 rgba(255,255,255,0.4),
      inset 0 -6px 12px rgba(88,28,135,0.18),
      0 8px 16px rgba(0,0,0,0.22)
    `
          : `
      inset 0 1px 0 rgba(255,255,255,0.26),
      inset 0 -6px 12px rgba(88,28,135,0.10),
      0 5px 10px rgba(0,0,0,0.16)
    `,
        transition: 'all 0.18s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* glow ефект */}
      {selected && (
        <motion.div
          layoutId="activeGlow"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '22px',
            background:
              'radial-gradient(circle at center, rgba(255,120,255,0.25), transparent 70%)',
            zIndex: 0,
          }}
        />
      )}

      <span
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '38%',
          borderRadius: '999px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />

      <span
        style={{
          fontSize: '25px',
          lineHeight: 1,
          filter: selected
            ? 'drop-shadow(0 0 6px rgba(255,255,255,0.6))'
            : 'drop-shadow(0 1px 3px rgba(0,0,0,0.14))',
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
          color: selected ? '#fff' : undefined,
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}