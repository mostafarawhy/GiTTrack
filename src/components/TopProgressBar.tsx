"use client";

import { useEffect, useRef, useState } from "react";

interface TopProgressBarProps {
  isLoading: boolean;
}

export function TopProgressBar({ isLoading }: TopProgressBarProps) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setWidth(0);


      intervalRef.current = setInterval(() => {
        setWidth((prev) => {
          if (prev >= 85) {
            clearInterval(intervalRef.current!);
            return 85;
          }

          const increment = (85 - prev) * 0.08;
          return prev + Math.max(increment, 0.5);
        });
      }, 100);
    } else {

      clearInterval(intervalRef.current!);
      setWidth(100);


      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 400);
    }

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <div
        className="h-full bg-primary transition-all ease-out"
        style={{
          width: `${width}%`,
          transitionDuration: width === 100 ? "200ms" : "300ms",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
        }}
      />
    </div>
  );
}
