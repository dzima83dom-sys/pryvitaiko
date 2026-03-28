export function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <span className="h-3 w-3 animate-dotPulse rounded-full bg-white/90 shadow-glow" />
      <span className="h-3 w-3 animate-dotPulse rounded-full bg-white/90 shadow-glow [animation-delay:0.18s]" />
      <span className="h-3 w-3 animate-dotPulse rounded-full bg-white/90 shadow-glow [animation-delay:0.36s]" />
    </div>
  );
}
