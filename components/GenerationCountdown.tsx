"use client";

import { useEffect, useRef, useState } from "react";

export default function GenerationCountdown({ isVisible }: { isVisible: boolean }) {
  const [count, setCount] = useState(20);
  const [pulse, setPulse] = useState(false);
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    setCount(20);

    intervalRef.current = setInterval(() => {
      setPulse(true);

      setTimeout(() => {
        setPulse(false);
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 300);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  if (!isVisible) {
  return (
    <div
      style={{
        height: "120px",
        transition: "opacity 0.3s ease",
        opacity: 0,
      }}
    />
  );
}

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div
        style={{
  fontSize: "110px",
  fontWeight: 900,
  background: "linear-gradient(180deg,#ffffff,#f3c6ff,#d18dff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 25px rgba(200,100,255,0.7), 0 0 40px rgba(255,255,255,0.4)",
  transform: pulse ? "scale(1.25)" : "scale(1)",
  transition: "transform 0.35s ease, text-shadow 0.35s ease",
}}
      >
        {count}
      </div>
    </div>
  );
}