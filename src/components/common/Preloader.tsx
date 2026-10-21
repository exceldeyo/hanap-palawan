import React, { useState, useEffect } from 'react';
import { Palmtree } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, minDuration = 800 }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400); // match duration of fade out
      return () => clearTimeout(completeTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md text-white transition-opacity duration-400 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Palawan Island Wave & Palm Ring Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Animated Gradient Outer Ring Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 border-r-cyan-400 animate-spin" style={{ animationDuration: '0.9s' }} />
          
          {/* Secondary Counter-rotating subtle ring */}
          <div className="absolute inset-1 rounded-full border-2 border-teal-500/10 border-b-teal-300 animate-spin" style={{ animationDuration: '1.4s', animationDirection: 'reverse' }} />

          {/* Center Palmtree Icon */}
          <div className="relative z-10 p-2 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 shadow-lg">
            <Palmtree className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Minimal Label */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-slate-200">
            Hanap Palawan
          </p>
          <p className="text-xs text-emerald-400/80 font-medium tracking-wider animate-pulse">
            Naglo-load...
          </p>
        </div>
      </div>
    </div>
  );
};
