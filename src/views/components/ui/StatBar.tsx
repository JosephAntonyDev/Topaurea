import React from 'react';

interface StatBarProps {
  label: string;
  value: number; // 0 to 100
  color?: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, color = '#6366f1' }) => {
  return (
    <div className="space-y-1.5 p-2.5 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
      <div className="flex items-center justify-between text-xs gap-2">
        <span className="text-zinc-300 font-medium tracking-wide uppercase truncate">{label}</span>
        <span className="font-mono font-bold text-zinc-100 shrink-0">{value}%</span>
      </div>
      <div className="h-2 w-full bg-zinc-800/90 rounded-full overflow-hidden p-[1px]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
