import React, { useState, useEffect, useRef } from 'react';

interface OtpVerificationProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
  phone?: string;
  onBackToApp?: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  onSuccess,
  onNavigateToLogin,
  phone = '0912 *** 678',
  onBackToApp,
}) => {
  const [otp, setOtp] = useState<string[]>(['5', '8', '2', '0', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
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
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 shadow-xs text-center">
          <div className="w-12 h-12 bg-[#CCFBF1] text-[#0F766E] rounded-[4px] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[26px]">lock</span>
          </div>

          <h1 className="text-xl font-bold text-[#1F2937] mb-1">Nhập mã xác minh</h1>
          <p className="text-xs text-[#4B5563] mb-5 leading-relaxed">
            Mã số 6 chữ số vừa được gửi qua SMS tới số điện thoại <br />
            <strong className="font-mono text-sm text-[#1F2937]">{phone}</strong>
          </p>

          {/* 6 OTP Boxes */}
          <div className="flex justify-center gap-2 mb-4">
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
                className={`w-12 h-12 text-center text-lg font-bold font-mono rounded-[4px] focus:outline-none transition-colors ${
                  digit
                    ? 'border border-[#0D9488] bg-[#F0FDFA] text-[#1F2937]'
                    : 'border border-[#D1D5DB] bg-white text-[#1F2937] focus:border-[#0D9488]'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#6B7280] mb-5">
            {secondsLeft > 0 ? (
              <>
                Gửi lại mã sau{' '}
                <span className="font-mono font-semibold text-[#0F766E]">
                  00:{String(secondsLeft).padStart(2, '0')}
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSecondsLeft(60)}
                className="font-semibold text-[#0F766E] hover:underline cursor-pointer"
              >
                Gửi lại mã ngay
              </button>
            )}
          </p>

          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full h-10 bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-sm rounded-[4px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isVerifying && (
              <span className="material-symbols-outlined text-[18px] animate-spin">
                refresh
              </span>
            )}
            <span>Xác minh tài khoản</span>
          </button>

          <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-xs text-[#4B5563]">
            Nhập sai số điện thoại?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-semibold text-[#0F766E] hover:underline cursor-pointer"
            >
              Quay lại đổi số
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
