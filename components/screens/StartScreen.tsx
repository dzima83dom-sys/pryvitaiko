'use client';

import { AppShell } from '@/components/ui/AppShell';

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <AppShell>
      <div
        style={{
          position: 'absolute',
          left: '16px',
          right: '16px',
          bottom: '24px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.10)',
            padding: '18px 18px 20px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow:
              '0 10px 28px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.08)',
            color: '#f7f1e8',
            fontSize: '20px',
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          Привіт, я — Привітайко. Зараз зробимо для тебе круте привітання
        </div>

        <button
          type="button"
          onClick={onStart}
          style={{
            width: '100%',
            height: '64px',
            borderRadius: '22px',
            border: '1px solid rgba(255,255,255,0.35)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.16) 100%)',
            color: '#fffdf8',
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            pointerEvents: 'auto',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            position: 'relative',
            zIndex: 100,
          }}
        >
          Поїхали
        </button>
      </div>
    </AppShell>
  );
}