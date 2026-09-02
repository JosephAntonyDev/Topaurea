import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent' | 'glow';
  size?: 'xs' | 'sm' | 'md';
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  color,
  className = ''
}) => {
  // Enforce minimum 12px font size (text-xs) to meet WCAG readability standards
  const sizeClasses = {
    xs: 'px-2.5 py-1 text-xs tracking-wide uppercase',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm'
  }[size];

  let variantClasses = 'bg-white/10 text-zinc-200 border border-white/15 backdrop-blur-md';

  if (variant === 'accent') {
    variantClasses = 'bg-indigo-500/15 text-indigo-200 border border-indigo-500/30';
  } else if (variant === 'glow') {
    variantClasses = 'bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent text-zinc-300 border border-zinc-600/70';
  }

  const customStyle = color
    ? {
        backgroundColor: `${color}20`,
        borderColor: `${color}40`,
        color: color
      }
    : {};

  return (
    <span
      style={customStyle}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
