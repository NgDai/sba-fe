import React from 'react';
import { CURRENT_USER } from '../../constants/mockData';

export type NavItemKey =
  | 'overview'
  | 'rooms'
  | 'room-detail'
  | 'tenants'
  | 'tenant-detail'
  | 'bookings'
  | 'booking-detail'
  | 'contracts'
  | 'contract-create'
  | 'utilities'
  | 'invoices'
  | 'transactions'
  | 'services'
  | 'facilities'
  | 'repairs'
  | 'branches-setting'
  | 'room-types'
  | 'managers'
  | 'bank-accounts';

interface SidebarProps {
  currentKey: NavItemKey;
  onSelect: (key: NavItemKey) => void;
  selectedBranch: string;
  onSelectBranch: (branch: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentKey,
  onSelect,
  selectedBranch,
  onSelectBranch,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const isNavActive = (key: NavItemKey) => {
    if (currentKey === key) return true;
    if (key === 'rooms' && currentKey === 'room-detail') return true;
    if (key === 'tenants' && currentKey === 'tenant-detail') return true;
    if (key === 'bookings' && currentKey === 'booking-detail') return true;
    if (key === 'contracts' && currentKey === 'contract-create') return true;
    return false;
  };

  const navItemClass = (active: boolean) =>
    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] font-sans text-[13px] font-medium transition-colors select-none ${
      active
        ? 'bg-[#115E59] text-white shadow-xs'
        : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
    }`;

  const content = (
    <div className="flex flex-col h-full bg-[#134E4A] text-white justify-between select-none">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[4px] bg-[#0D9488] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              TroPro
            </span>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden text-white/70 hover:text-white p-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Branch Selector */}
        <div className="px-3 pt-3 pb-2 flex-shrink-0">
          <div className="relative">
            <select
              aria-label="Bộ chọn cơ sở"
              value={selectedBranch}
              onChange={(e) => onSelectBranch(e.target.value)}
              className="w-full bg-white/[0.08] text-white text-[13px] font-medium rounded-[4px] border border-white/15 px-2.5 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#14B8A6] cursor-pointer"
            >
              <option className="bg-[#134E4A] text-white" value="all">
                Tất cả cơ sở
              </option>
              <option className="bg-[#134E4A] text-white" value="cau-giay">
                CS Cầu Giấy
              </option>
              <option className="bg-[#134E4A] text-white" value="thanh-xuan">
                CS Thanh Xuân
              </option>
            </select>
            <span className="material-symbols-outlined text-white/70 text-[18px] absolute right-2.5 top-2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="px-2.5 py-1 space-y-3.5 flex-1">
          {/* Group 1: General */}
          <div className="space-y-0.5">
            <button
              onClick={() => onSelect('overview')}
              className={`w-full text-left ${navItemClass(isNavActive('overview'))}`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Tổng quan</span>
            </button>
          </div>

          {/* Group 2: VẬN HÀNH */}
          <div className="space-y-1">
            <div className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#7FB8AF]">
              VẬN HÀNH
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => onSelect('rooms')}
                className={`w-full text-left ${navItemClass(isNavActive('rooms'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                <span>Phòng & slot</span>
              </button>
              <button
                onClick={() => onSelect('tenants')}
                className={`w-full text-left ${navItemClass(isNavActive('tenants'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span>Người thuê</span>
              </button>
              <button
                onClick={() => onSelect('bookings')}
                className={`w-full text-left ${navItemClass(isNavActive('bookings'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                <span>Lịch xem & Booking</span>
              </button>
              <button
                onClick={() => onSelect('contracts')}
                className={`w-full text-left ${navItemClass(isNavActive('contracts'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Hợp đồng</span>
              </button>
            </div>
          </div>

          {/* Group 3: TÀI CHÍNH */}
          <div className="space-y-1">
            <div className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#7FB8AF]">
              TÀI CHÍNH
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => onSelect('utilities')}
                className={`w-full text-left ${navItemClass(isNavActive('utilities'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">electric_meter</span>
                <span>Chỉ số điện nước</span>
              </button>
              <button
                onClick={() => onSelect('invoices')}
                className={`w-full text-left ${navItemClass(isNavActive('invoices'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span>Hóa đơn</span>
              </button>
              <button
                onClick={() => onSelect('transactions')}
                className={`w-full text-left ${navItemClass(isNavActive('transactions'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                <span>Giao dịch & đối soát</span>
              </button>
              <button
                onClick={() => onSelect('services')}
                className={`w-full text-left ${navItemClass(isNavActive('services'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">room_service</span>
                <span>Dịch vụ</span>
              </button>
            </div>
          </div>

          {/* Group 4: CSVC */}
          <div className="space-y-1">
            <div className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#7FB8AF]">
              CSVC
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => onSelect('facilities')}
                className={`w-full text-left ${navItemClass(isNavActive('facilities'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Cơ sở vật chất</span>
              </button>
              <button
                onClick={() => onSelect('repairs')}
                className={`w-full text-left ${navItemClass(isNavActive('repairs'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">build</span>
                <span>Yêu cầu sửa chữa</span>
              </button>
            </div>
          </div>

          {/* Group 5: THIẾT LẬP */}
          <div className="space-y-1">
            <div className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#7FB8AF]">
              THIẾT LẬP
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => onSelect('branches-setting')}
                className={`w-full text-left ${navItemClass(isNavActive('branches-setting'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">domain</span>
                <span>Cơ sở</span>
              </button>
              <button
                onClick={() => onSelect('room-types')}
                className={`w-full text-left ${navItemClass(isNavActive('room-types'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">category</span>
                <span>Loại phòng</span>
              </button>
              <button
                onClick={() => onSelect('managers')}
                className={`w-full text-left ${navItemClass(isNavActive('managers'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span>Quản lý viên</span>
              </button>
              <button
                onClick={() => onSelect('bank-accounts')}
                className={`w-full text-left ${navItemClass(isNavActive('bank-accounts'))}`}
              >
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
                <span>Tài khoản nhận tiền</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2.5 p-1.5 rounded-[4px] hover:bg-white/[0.06] transition-colors cursor-pointer">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-[4px] object-cover flex-shrink-0 border border-white/20"
            src={CURRENT_USER.avatarUrl}
          />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium text-white truncate leading-tight">
              {CURRENT_USER.name}
            </div>
            <div className="text-[11px] text-[#A7D8D0] truncate leading-tight">
              {CURRENT_USER.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[240px] z-30">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-[260px] h-full z-10">{content}</aside>
        </div>
      )}
    </>
  );
};
