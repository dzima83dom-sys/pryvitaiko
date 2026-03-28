import { TOTAL_STEPS } from '@/lib/constants';

export function ProgressHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div
      style={{
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="glass-card"
        style={{
          height: '46px',
          minWidth: '98px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.20)',
          padding: '0 16px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#fff8f0',
        }}
      >
        ← Назад
      </button>

      <div
        style={{
          minWidth: '190px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          paddingTop: '4px',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff8f0' }}>
          Крок {step}
        </span>

        <div
          style={{
            display: 'flex',
            height: '10px',
            width: '190px',
            gap: '8px',
          }}
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <span
              key={index}
              style={{
                flex: 1,
                borderRadius: '999px',
                border:
                  index < step
                    ? '1px solid rgba(196,181,253,0.45)'
                    : '1px solid rgba(255,255,255,0.12)',
                background:
                  index < step
                    ? 'rgba(139,92,246,0.95)'
                    : 'rgba(255,255,255,0.25)',
                boxShadow:
                  index < step
                    ? '0 0 10px rgba(139,92,246,0.45)'
                    : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}