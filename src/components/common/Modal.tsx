import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card (Strict max 6px radius) */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidth} bg-white rounded-[6px] border border-[#E5E7EB] shadow-xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150`}
      >
        {(title || description) && (
          <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-base font-bold text-[#1F2937] leading-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-[#6B7280] mt-1">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[#9CA3AF] hover:text-[#374151] p-1 rounded-[4px] hover:bg-[#F3F4F6] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}

        <div className="p-5">{children}</div>

        {footer && (
          <div className="px-5 py-3.5 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
