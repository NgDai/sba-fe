import React, { useState, useRef } from 'react';

interface ForgotPasswordProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
  onBackToApp?: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  onNavigateToLogin,
  onBackToApp,
}) => {
  const [otp, setOtp] = useState<string[]>(['6', '2', '9', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA] flex flex-col justify-center items-center p-4 font-sans">
      {onBackToApp && (
        <button
          onClick={onBackToApp}
          className="absolute top-4 left-4 text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-[4px] border border-[#E5E7EB] shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Về trang quản trị</span>
        </button>
      )}

      <div className="w-full max-w-[400px]">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-[4px] bg-[#0D9488] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[20px]">home</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#134E4A]">TroPro</span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 shadow-xs">
          <h1 className="text-xl font-bold text-[#1F2937] mb-1">Quên mật khẩu</h1>
          <p className="text-xs text-[#4B5563] mb-5">
            Khôi phục mật khẩu tài khoản trong 2 bước nhanh chóng
          </p>

          {/* Stepper info banner */}
          <div className="mb-5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-3 text-xs">
            <div className="flex items-center justify-between text-[#6B7280] mb-2 font-medium">
              <span className="flex items-center gap-1.5 text-[#0F766E] font-semibold">
                <span className="w-4 h-4 rounded-[2px] bg-[#0F766E] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                Đã gửi mã tới:
              </span>
              <span className="font-mono text-[#1F2937] font-semibold">0912 *** 678</span>
            </div>
            <div className="text-[11px] text-[#4B5563]">
              Mã OTP hợp lệ trong{' '}
              <span className="font-mono font-medium text-[#0F766E]">04:45</span>. Hãy nhập mã và mật khẩu mới.
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Mã xác minh (6 số) <span className="text-[#B91C1C]">*</span>
              </label>
              <div className="flex justify-between gap-1.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-11 h-11 text-center text-base font-bold font-mono rounded-[4px] focus:outline-none transition-colors ${
                      digit
                        ? 'border border-[#0D9488] bg-[#F0FDFA] text-[#1F2937]'
                        : 'border border-[#D1D5DB] bg-white text-[#1F2937] focus:border-[#0D9488]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Mật khẩu mới <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự, gồm chữ và số"
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Nhập lại mật khẩu mới <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận lại mật khẩu mới"
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-sm rounded-[4px] transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting && (
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  refresh
                </span>
              )}
              <span>Đặt lại mật khẩu</span>
            </button>
          </form>

          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] text-center text-xs text-[#4B5563]">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-medium text-[#0F766E] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span>← Quay lại đăng nhập</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
