import React from 'react';

interface StatBarProps {
  label: string;
  value: number; // 0 to 100
  color?: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, color = '#6366f1' }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-300 font-medium tracking-wide uppercase">{label}</span>
        <span className="font-mono font-semibold text-zinc-100">{value}%</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden p-[1px]">
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
