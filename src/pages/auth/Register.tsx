import React, { useState } from 'react';

interface RegisterProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
  onBackToApp?: () => void;
}

export const Register: React.FC<RegisterProps> = ({
  onSuccess,
  onNavigateToLogin,
  onBackToApp,
}) => {
  const [role, setRole] = useState<'tenant' | 'landlord'>('tenant');
  const [fullName, setFullName] = useState('Lê Thị Mai');
  const [phone, setPhone] = useState('0912345678');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [showDuplicateError, setShowDuplicateError] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
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

      <div className="w-full max-w-[440px]">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-[4px] bg-[#0D9488] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[20px]">home</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#134E4A]">TroPro</span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 shadow-xs">
          <h1 className="text-xl font-bold text-[#1F2937] mb-1">Tạo tài khoản</h1>
          <p className="text-xs text-[#4B5563] mb-4">
            Chọn vai trò phù hợp với nhu cầu của bạn để bắt đầu
          </p>

          {/* Segmented Control */}
          <div className="grid grid-cols-2 p-1 bg-[#F3F4F6] rounded-[4px] mb-4">
            <button
              type="button"
              onClick={() => setRole('tenant')}
              className={`py-1.5 text-xs font-semibold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'tenant'
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#4B5563] hover:text-[#1F2937]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">person</span>
              <span>Khách thuê</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('landlord')}
              className={`py-1.5 text-xs font-semibold rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'landlord'
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#4B5563] hover:text-[#1F2937]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">domain</span>
              <span>Chủ trọ / Vận hành</span>
            </button>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Họ và tên <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Email hoặc số điện thoại <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (e.target.value !== '0912345678') setShowDuplicateError(false);
                }}
                required
                className={`w-full h-10 px-3 bg-white rounded-[4px] text-sm text-[#1F2937] focus:outline-none ${
                  showDuplicateError
                    ? 'border border-[#B91C1C] focus:border-[#B91C1C]'
                    : 'border border-[#D1D5DB] focus:border-[#0D9488]'
                }`}
              />
              {showDuplicateError && (
                <p className="mt-1 text-[11px] text-[#B91C1C] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">error</span>
                  <span>
                    Số điện thoại đã tồn tại trong hệ thống.{' '}
                    <button
                      type="button"
                      onClick={onNavigateToLogin}
                      className="font-semibold underline cursor-pointer"
                    >
                      Đăng nhập ngay?
                    </button>
                  </span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Mật khẩu <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự, gồm chữ và số"
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Nhập lại mật khẩu <span className="text-[#B91C1C]">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu vừa đặt"
                required
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 rounded-[2px] text-[#0F766E] focus:ring-0 border-[#D1D5DB] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-[#4B5563]">
                  Tôi đồng ý với{' '}
                  <span className="text-[#0F766E] font-medium hover:underline">
                    Điều khoản sử dụng
                  </span>{' '}
                  và{' '}
                  <span className="text-[#0F766E] font-medium hover:underline">
                    Chính sách bảo mật
                  </span>{' '}
                  của TroPro.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-sm rounded-[4px] transition-colors mt-2 cursor-pointer"
            >
              Đăng ký tài khoản
            </button>
          </form>

          <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] text-center text-xs text-[#4B5563]">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-semibold text-[#0F766E] hover:underline cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
