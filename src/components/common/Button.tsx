import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'danger-outline'
  | 'teal-light';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white shadow-sm focus:ring-2 focus:ring-[#0D9488]/30',
  secondary: 'bg-[#0D9488] hover:bg-[#0F766E] text-white focus:ring-2 focus:ring-[#0D9488]/30',
  outline: 'bg-white border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] focus:ring-2 focus:ring-gray-200',
  ghost: 'bg-transparent hover:bg-black/5 text-[#374151]',
  danger: 'bg-[#B91C1C] hover:bg-[#991B1B] text-white focus:ring-2 focus:ring-red-200',
  'danger-outline': 'bg-white border border-[#FCA5A5] text-[#B91C1C] hover:bg-[#FEE2E2] focus:ring-2 focus:ring-red-100',
  'teal-light': 'bg-[#F0FDFA] border border-[#0D9488] text-[#0F766E] hover:bg-[#CCFBF1]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-2.5 text-xs font-semibold gap-1.5',
  md: 'h-10 px-4 text-sm font-semibold gap-2',
  lg: 'h-11 px-5 text-base font-semibold gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-[4px] transition-colors font-sans select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined text-[18px] animate-spin">
          refresh
        </span>
      ) : (
        icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};
