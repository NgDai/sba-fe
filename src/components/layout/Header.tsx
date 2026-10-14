import React, { useState } from 'react';
import { NavItemKey } from './Sidebar';
import { CURRENT_USER } from '../../constants/mockData';

interface HeaderProps {
  currentKey: NavItemKey;
  onOpenMobileSidebar: () => void;
  onOpenAuthPreview: (authScreen: 'login' | 'register' | 'otp' | 'forgot-password') => void;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentKey,
  onOpenMobileSidebar,
  onOpenAuthPreview,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  // Render breadcrumbs based on active screen
  const renderBreadcrumb = () => {
    switch (currentKey) {
      case 'overview':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Quản lý vận hành</span>
          </>
        );
      case 'rooms':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-medium">Quản lý buồng phòng</span>
          </>
        );
      case 'room-detail':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Quản lý buồng phòng</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">P.305</span>
          </>
        );
      case 'tenants':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Vận hành</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Hồ sơ khách thuê</span>
          </>
        );
      case 'tenant-detail':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Người thuê</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Lê Thị Mai</span>
          </>
        );
      case 'bookings':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Vận hành</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Lịch xem & Booking</span>
          </>
        );
      case 'booking-detail':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Lịch xem & Booking</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="font-mono text-[#0F766E] font-semibold">BK-2610-007</span>
          </>
        );
      case 'contracts':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Vận hành</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Hợp đồng</span>
          </>
        );
      case 'contract-create':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Hợp đồng</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Tạo mới</span>
          </>
        );
      case 'utilities':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Tài chính</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Chỉ số điện nước</span>
          </>
        );
      case 'invoices':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Tài chính</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Hóa đơn & Phiếu thu</span>
          </>
        );
      case 'transactions':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Tài chính</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Giao dịch & Đối soát VietQR</span>
          </>
        );
      case 'services':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Vận hành</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Dịch vụ & Biểu phí</span>
          </>
        );
      case 'facilities':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">CSVC</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Cơ sở vật chất & Thiết bị</span>
          </>
        );
      case 'repairs':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">CSVC</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Yêu cầu sửa chữa</span>
          </>
        );
      case 'branches-setting':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Thiết lập</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Quản lý cơ sở</span>
          </>
        );
      case 'room-types':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Thiết lập</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Danh mục loại phòng</span>
          </>
        );
      case 'managers':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Thiết lập</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Quản lý viên & Phân quyền</span>
          </>
        );
      case 'bank-accounts':
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Thiết lập</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#0F766E] font-semibold">Tài khoản nhận tiền VietQR</span>
          </>
        );
      default:
        return (
          <>
            <span className="text-[#1F2937] font-medium">Hệ thống TroPro</span>
            <span className="text-[#9CA3AF]">/</span>
            <span className="text-[#6B7280]">Quản lý vận hành</span>
          </>
        );
    }
  };

  return (
    <header className="fixed top-0 left-0 md:left-[240px] right-0 h-14 bg-white border-b border-[#E5E7EB] z-20 px-4 md:px-6 flex items-center justify-between">
      {/* Left side: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden text-[#4B5563] hover:text-[#1F2937] p-1.5 rounded-[4px] border border-[#E5E7EB]"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
        <div className="flex items-center gap-2 text-xs md:text-[13px] text-[#4B5563] truncate">
          {renderBreadcrumb()}
        </div>
      </div>

      {/* Right side: Search, Demo Auth Switcher, Notifications, Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
        {/* Global Search */}
        <div className="relative hidden lg:block w-[260px]">
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-[#9CA3AF] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Tìm kiếm mã phòng, người thuê..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#0D9488] placeholder:text-[#9CA3AF] text-[#1F2937]"
          />
        </div>

        {/* Demo Switcher Button for Auth screens */}
        <div className="relative">
          <button
            onClick={() => setShowAuthMenu(!showAuthMenu)}
            className="h-8 px-2.5 bg-[#F0FDFA] hover:bg-[#CCFBF1] border border-[#99F6E4] text-[#0F766E] font-medium text-xs rounded-[4px] flex items-center gap-1 transition-colors"
            title="Xem giao diện Đăng nhập / Đăng ký / OTP / Quên MK"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="hidden sm:inline">Màn hình Auth</span>
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {showAuthMenu && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#9CA3AF] uppercase border-b border-[#E5E7EB]">
                Xem màn hình xác thực
              </div>
              <button
                onClick={() => {
                  setShowAuthMenu(false);
                  onOpenAuthPreview('login');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F0FDFA] hover:text-[#0F766E] flex items-center justify-between"
              >
                <span>A1. Đăng nhập</span>
                <span className="text-[10px] text-[#9CA3AF]">Login</span>
              </button>
              <button
                onClick={() => {
                  setShowAuthMenu(false);
                  onOpenAuthPreview('register');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F0FDFA] hover:text-[#0F766E] flex items-center justify-between"
              >
                <span>A2. Đăng ký tài khoản</span>
                <span className="text-[10px] text-[#9CA3AF]">Register</span>
              </button>
              <button
                onClick={() => {
                  setShowAuthMenu(false);
                  onOpenAuthPreview('otp');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F0FDFA] hover:text-[#0F766E] flex items-center justify-between"
              >
                <span>A3. Xác minh OTP</span>
                <span className="text-[10px] text-[#9CA3AF]">OTP</span>
              </button>
              <button
                onClick={() => {
                  setShowAuthMenu(false);
                  onOpenAuthPreview('forgot-password');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-[#374151] hover:bg-[#F0FDFA] hover:text-[#0F766E] flex items-center justify-between"
              >
                <span>A4. Quên mật khẩu</span>
                <span className="text-[10px] text-[#9CA3AF]">Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Thông báo"
            className="relative w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-[4px] text-[#4B5563] hover:bg-[#F0FDFA] hover:text-[#0F766E] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B4A] rounded-none ring-1 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1 w-80 bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg py-1 z-30">
              <div className="px-4 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1F2937]">Thông báo hệ thống</span>
                <span className="text-[10px] font-semibold text-[#0F766E] hover:underline cursor-pointer">
                  Đánh dấu đã đọc
                </span>
              </div>
              <div className="divide-y divide-[#F3F4F6] max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <div className="text-xs font-semibold text-[#1F2937] flex items-center justify-between">
                    <span>Yêu cầu giữ phòng mới</span>
                    <span className="text-[10px] text-[#9CA3AF]">10:15</span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] mt-0.5">
                    Khách hàng Lê Thị Mai vừa đăng ký giữ slot G-01 tại phòng P.305.
                  </p>
                </div>
                <div className="p-3 hover:bg-[#F9FAFB] cursor-pointer">
                  <div className="text-xs font-semibold text-[#1F2937] flex items-center justify-between">
                    <span>Hạn nộp tiền điện nước</span>
                    <span className="text-[10px] text-[#9CA3AF]">Hôm qua</span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] mt-0.5">
                    Còn 10 phòng chưa cập nhật chỉ số chốt tháng Kỳ 10/2026.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E5E7EB]">
          <img
            alt={CURRENT_USER.name}
            className="w-8 h-8 rounded-[4px] object-cover border border-[#E5E7EB]"
            src={CURRENT_USER.avatarUrl}
          />
        </div>
      </div>
    </header>
  );
};
