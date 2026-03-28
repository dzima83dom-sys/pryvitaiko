export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        width: '100vw',
        height: '100svh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        background: '#0e0b16',
        color: '#fff8f0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100svh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="/bg-main.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.34) 72%, rgba(0,0,0,0.52) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}