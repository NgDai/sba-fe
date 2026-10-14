import React from 'react';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'neutral'
  | 'maintenance'
  | 'teal'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  count?: number | string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dotColor?: string; border?: string }> = {
  success: {
    bg: 'bg-[#DCFCE7]',
    text: 'text-[#15803D]',
    dotColor: 'bg-[#15803D]',
    border: 'border-[#15803D]/20',
  },
  warning: {
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#B45309]',
    dotColor: 'bg-[#B45309]',
    border: 'border-[#B45309]/20',
  },
  info: {
    bg: 'bg-[#DBEAFE]',
    text: 'text-[#1D4ED8]',
    dotColor: 'bg-[#1D4ED8]',
    border: 'border-[#1D4ED8]/20',
  },
  danger: {
    bg: 'bg-[#FEE2E2]',
    text: 'text-[#B91C1C]',
    dotColor: 'bg-[#B91C1C]',
    border: 'border-[#FCA5A5]',
  },
  neutral: {
    bg: 'bg-[#F1F5F9]',
    text: 'text-[#475569]',
    dotColor: 'bg-[#475569]',
    border: 'border-[#E2E8F0]',
  },
  maintenance: {
    bg: 'bg-[#EDE9FE]',
    text: 'text-[#6D28D9]',
    dotColor: 'bg-[#6D28D9]',
    border: 'border-[#6D28D9]/20',
  },
  teal: {
    bg: 'bg-[#CCFBF1]',
    text: 'text-[#0F766E]',
    dotColor: 'bg-[#0D9488]',
    border: 'border-[#99F6E4]',
  },
  outline: {
    bg: 'bg-white',
    text: 'text-[#4B5563]',
    border: 'border-[#D1D5DB]',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
  count,
}) => {
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] font-semibold text-[11px] leading-none ${styles.bg} ${styles.text} ${
        styles.border ? `border ${styles.border}` : ''
      } ${className}`}
    >
      {dot && styles.dotColor && (
        <span className={`w-1.5 h-1.5 rounded-none flex-shrink-0 ${styles.dotColor}`} />
      )}
      <span>{children}</span>
      {count !== undefined && (
        <span className="font-mono text-[10px] px-1 py-0.5 rounded-[2px] bg-black/5 leading-none">
          {count}
        </span>
      )}
    </span>
  );
};
