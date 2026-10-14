import React, { useState } from 'react';

interface LoginProps {
  onSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onBackToApp?: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onBackToApp,
}) => {
  const [identifier, setIdentifier] = useState('0912345678');
  const [password, setPassword] = useState('Matkhau@123');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 600);
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
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-[4px] bg-[#0D9488] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[20px]">home</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#134E4A]">TroPro</span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 shadow-xs">
          <h1 className="text-xl font-bold text-[#1F2937] mb-1.5">Đăng nhập</h1>
          <p className="text-sm text-[#4B5563] mb-5">Hệ thống quản lý và vận hành phòng trọ TroPro</p>

          {/* Alert Danger */}
          {showErrorAlert && (
            <div className="mb-5 bg-[#FEE2E2] border border-[#FCA5A5] rounded-[4px] p-3 flex items-start gap-2.5 text-xs text-[#B91C1C]">
              <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
                error
              </span>
              <div className="flex-1">
                Số điện thoại hoặc mật khẩu không chính xác. Bạn còn <strong>2</strong> lần thử trước khi bị khóa tạm 15 phút.
              </div>
              <button
                type="button"
                onClick={() => setShowErrorAlert(false)}
                className="text-[#B91C1C] hover:opacity-75"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Email hoặc số điện thoại <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Nhập email hoặc SĐT..."
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#374151]">
                  Mật khẩu <span className="text-[#B91C1C]">*</span>
                </label>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-xs font-medium text-[#0F766E] hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-10 pl-3 pr-10 bg-white border border-[#B91C1C] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#6B7280] hover:text-[#1F2937]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-sm rounded-[4px] transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading && (
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  refresh
                </span>
              )}
              <span>Đăng nhập</span>
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[#E5E7EB] text-center text-xs text-[#4B5563]">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-semibold text-[#0F766E] hover:underline cursor-pointer"
            >
              Đăng ký tài khoản
            </button>
          </div>
        </div>

        {/* Security footnote */}
        <div className="mt-4 text-center text-xs text-[#6B7280]">
          Bảo mật bởi hệ thống TroPro · Hỗ trợ 1900 8888
        </div>
      </div>
    </div>
  );
};
