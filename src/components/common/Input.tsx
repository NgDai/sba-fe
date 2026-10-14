import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      wrapperClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#374151] mb-1.5"
          >
            {label} {required && <span className="text-[#B91C1C]">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#6B7280] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full h-10 px-3 bg-white text-sm text-[#1F2937] rounded-[4px] border transition-colors placeholder:text-[#9CA3AF] focus:outline-none ${
              error
                ? 'border-[#B91C1C] text-[#B91C1C] focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                : 'border-[#D1D5DB] focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]'
            } ${leftIcon ? 'pl-9' : ''} ${rightIcon ? 'pr-9' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[#6B7280] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-[11px] text-[#B91C1C] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            <span>{error}</span>
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-[11px] text-[#6B7280]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
