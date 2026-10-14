import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import { Booking, BookingStatus } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

interface BookingsListPageProps {
  onNavigate: (key: NavItemKey) => void;
  onSelectBooking: (bookingCode: string) => void;
}

export const BookingsListPage: React.FC<BookingsListPageProps> = ({
  onNavigate,
  onSelectBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'viewings' | 'bookings'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('cau-giay-all');
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === 'all' || b.bookingStatus === statusFilter;
    const matchSearch =
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.includes(searchTerm) ||
      b.roomCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const renderStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] bg-[#FEF3C7] text-[#B45309] text-[11px] font-semibold border border-[#FCD34D]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#B45309]" />
            <span>Chờ duyệt</span>
          </span>
        );
      case 'deposit_pending':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] bg-[#FEF3C7] text-[#B45309] text-[11px] font-semibold border border-[#FCD34D]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#B45309]" />
            <span>Chờ TT cọc</span>
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold border border-[#86EFAC]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#15803D]" />
            <span>Đã giữ chỗ</span>
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] bg-[#DBEAFE] text-[#1D4ED8] text-[11px] font-semibold border border-[#93C5FD]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#1D4ED8]" />
            <span>Đã chuyển HĐ</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-1.5 rounded-[2px] bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold border border-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#475569]" />
            <span>Đã hủy / Hết hạn</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 lg:p-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#0F766E] text-white px-4 py-2.5 rounded-[4px] shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Lịch xem & Giữ phòng
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Duyệt lịch hẹn xem và các khoản cọc giữ chỗ trực tuyến
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<span className="material-symbols-outlined text-base">download</span>}
            onClick={() => showToast('Đang trích xuất danh sách booking ra tệp Excel...')}
          >
            Xuất file
          </Button>
          <Button
            size="sm"
            icon={<span className="material-symbols-outlined text-base">add</span>}
            onClick={() => onNavigate('contract-create')}
          >
            Tạo booking
          </Button>
        </div>
      </div>

      {/* Segment Tabs */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('viewings')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'viewings'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Lịch xem phòng</span>
          <span className="h-4 px-1.5 bg-slate-100 text-slate-600 font-mono text-[11px] rounded flex items-center justify-center">
            2
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-1 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'bookings'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Yêu cầu giữ phòng</span>
          <span className="h-4 px-1.5 bg-amber-100 text-amber-800 font-mono text-[11px] rounded flex items-center justify-center font-bold">
            3
          </span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col gap-3 shadow-xs">
        {/* Status Chips Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Trạng thái:
          </span>

          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-semibold border transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'border-[#0F766E] bg-[#0F766E] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả <span className="ml-1 font-mono text-[11px] opacity-80">12</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'pending'
                ? 'border-[#0F766E] bg-teal-50 text-[#0F766E]'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-none bg-[#0F766E]" />
            <span>Chờ duyệt</span>
            <span className="font-mono text-[11px] px-1 rounded bg-teal-100 text-[#0F766E]">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('deposit_pending')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'deposit_pending'
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Chờ TT cọc <span className="ml-1 font-mono text-[11px] text-slate-500">2</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('reserved')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'reserved'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã giữ chỗ <span className="ml-1 font-mono text-[11px] text-slate-500">5</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('converted')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'converted'
                ? 'border-slate-300 bg-slate-100 text-slate-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã chuyển HĐ <span className="ml-1 font-mono text-[11px] text-slate-500">1</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('cancelled')}
            className={`h-7 px-2.5 rounded-[2px] text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'cancelled'
                ? 'border-slate-300 bg-slate-100 text-slate-600'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã hủy / Hết hạn <span className="ml-1 font-mono text-[11px] text-slate-500">1</span>
          </button>
        </div>

        {/* Inputs & Scope Selectors */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-slate-400 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã booking, người đặt, SĐT, phòng..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0F766E] text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="relative w-full sm:w-64">
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="w-full h-9 bg-white text-slate-700 text-xs rounded-[4px] border border-slate-200 pl-3 pr-8 appearance-none focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="cau-giay-all">CS Cầu Giấy (Tất cả phòng)</option>
              <option value="thanh-xuan-all">CS Thanh Xuân (Tất cả phòng)</option>
              <option value="all">Tất cả chi nhánh</option>
            </select>
            <span className="material-symbols-outlined text-slate-500 text-[18px] absolute right-2.5 top-2.5 pointer-events-none">
              unfold_more
            </span>
          </div>

          <button
            type="button"
            className="h-9 px-3 bg-white border border-slate-200 rounded-[4px] text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Tháng 10/2026</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="py-2 px-3.5 w-[130px]">
                  Mã booking
                </th>
                <th className="py-2 px-3.5">
                  Người đặt & SĐT
                </th>
                <th className="py-2 px-3.5">
                  Phòng / Chỗ yêu cầu
                </th>
                <th className="py-2 px-3.5">
                  Ngày nhận
                </th>
                <th className="py-2 px-3.5 text-right">
                  Tiền cọc giữ
                </th>
                <th className="py-2 px-3.5">
                  Trạng thái
                </th>
                <th className="py-2 px-3.5 text-right w-[120px]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => {
                const isSelected = b.code === 'BK-2610-007';
                return (
                  <tr
                    key={b.id}
                    onClick={() => {
                      onSelectBooking(b.code);
                      onNavigate('booking-detail');
                    }}
                    className={`hover:bg-[#F0FDFA] transition-colors cursor-pointer group ${
                      isSelected ? 'bg-[#F0FDFA]/80 border-l-4 border-l-[#0F766E]' : ''
                    }`}
                  >
                    <td className="py-3 px-3.5">
                      <div className="font-mono text-xs font-bold text-[#0F766E] flex items-center gap-1.5 group-hover:underline">
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                            arrow_right_alt
                          </span>
                        )}
                        <span>{b.code}</span>
                      </div>
                      <div className="font-mono text-[10px] text-[#6B7280] mt-0.5">
                        {b.timeStr}
                      </div>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="text-xs font-bold text-[#1F2937]">
                        {b.customerName}
                      </div>
                      <div className="font-mono text-[11px] text-[#6B7280]">
                        {b.customerPhone}
                      </div>
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="text-xs font-semibold text-[#1F2937]">
                        {b.roomCode} {b.slotCode ? `· ${b.slotCode}` : ''}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{b.roomDesc}</div>
                    </td>

                    <td className="py-3 px-3.5 text-xs text-[#1F2937]">
                      <span className="font-mono font-medium">{b.checkInDate}</span>
                      {b.daysUntilCheckIn && (
                        <div className="text-[11px] text-[#B45309] font-medium">
                          Còn {b.daysUntilCheckIn} ngày
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3.5 text-right font-mono text-xs font-bold text-[#1F2937]">
                      {formatCurrency(b.depositAmount)}
                      <div className="text-[10px] font-sans font-normal text-[#6B7280]">
                        {b.depositStatus === 'unpaid'
                          ? 'Chưa TT'
                          : b.depositStatus === 'paid'
                          ? 'Đã thu'
                          : b.depositStatus === 'vietqr'
                          ? 'QR VietQR'
                          : 'Đã chuyển HĐ'}
                      </div>
                    </td>

                    <td className="py-3 px-3.5">{renderStatusBadge(b.bookingStatus)}</td>

                    <td className="py-3 px-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {b.bookingStatus === 'pending' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBooking(b.code);
                              onNavigate('booking-detail');
                            }}
                            className="h-7 px-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-[11px] rounded-[2px] transition-colors cursor-pointer"
                          >
                            Duyệt
                          </button>
                        )}
                        {b.bookingStatus === 'deposit_pending' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBooking(b.code);
                              onNavigate('booking-detail');
                            }}
                            className="h-7 px-2.5 border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#0F766E] font-semibold text-[11px] rounded-[2px] transition-colors cursor-pointer"
                          >
                            Xem
                          </button>
                        )}
                        {b.bookingStatus === 'reserved' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('contract-create');
                            }}
                            className="h-7 px-2.5 border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#0F766E] font-semibold text-[11px] rounded-[2px] transition-colors cursor-pointer"
                          >
                            Tạo HĐ
                          </button>
                        )}
                        {b.bookingStatus === 'converted' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('contracts');
                            }}
                            className="h-7 px-2.5 border border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#4B5563] font-semibold text-[11px] rounded-[2px] transition-colors cursor-pointer"
                          >
                            Xem HĐ
                          </button>
                        )}
                        <button
                          type="button"
                          className="w-7 h-7 flex items-center justify-center rounded-[2px] text-[#6B7280] hover:bg-[#F1F5F9] text-sm"
                        >
                          ⋯
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="py-3 px-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
          <div>
            Hiển thị{' '}
            <span className="font-mono font-semibold text-[#1F2937]">
              1–{filteredBookings.length}
            </span>{' '}
            trong số <span className="font-mono font-semibold text-[#1F2937]">12</span>{' '}
            booking
          </div>
          <div className="flex items-center gap-1 select-none">
            <button className="w-8 h-8 rounded-[4px] bg-[#0F766E] text-white font-mono text-xs font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] hover:bg-[#F0FDFA] font-mono text-xs flex items-center justify-center">
              2
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] hover:bg-[#F0FDFA] font-mono text-xs flex items-center justify-center">
              3
            </button>
          </div>
        </div>
      </div>

      {/* Operational Policy Note */}
      <div className="p-3 bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] flex items-center justify-between text-xs text-[#0F766E] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0D9488] text-[20px]">info</span>
          <span>
            Chính sách giữ phòng: Khách có <strong>24 giờ</strong> để chuyển khoản cọc VietQR sau khi phê duyệt. Sau thời gian này hệ thống tự mở lại slot cho khách khác.
          </span>
        </div>
        <button
          onClick={() => alert('Cấu hình thời hạn giữ phòng trực tuyến')}
          className="text-xs text-[#0F766E] underline font-semibold hover:text-[#115E59] cursor-pointer"
        >
          Cấu hình thời gian
        </button>
      </div>
    </div>
  );
};
