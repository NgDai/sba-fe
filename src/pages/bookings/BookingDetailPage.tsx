import React, { useState, useEffect } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { formatCountdown } from '../../utils/formatters';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface BookingDetailPageProps {
  onNavigate: (key: NavItemKey) => void;
  bookingCode?: string;
}

export const BookingDetailPage: React.FC<BookingDetailPageProps> = ({
  onNavigate,
  bookingCode = 'BK-2610-007',
}) => {
  const [secondsLeft, setSecondsLeft] = useState(16327); // 04:32:07
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('1');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApprove = () => {
    setStatus('approved');
    setIsApproveModalOpen(false);
  };

  const handleReject = () => {
    setStatus('rejected');
    setIsRejectModalOpen(false);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center flex-wrap gap-2.5">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Yêu cầu giữ chỗ
            </h1>
            <span className="font-mono text-[#0F766E] px-2 py-0.5 bg-[#F0FDFA] rounded-[2px] border border-[#CCFBF1] text-sm font-bold">
              {bookingCode}
            </span>

            {status === 'pending' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FEF3C7] text-[#B45309] text-xs font-semibold rounded-[2px]">
                <span className="w-1.5 h-1.5 bg-[#B45309] rounded-none" />
                <span>Chờ duyệt</span>
              </span>
            )}
            {status === 'approved' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-xs font-semibold rounded-[2px]">
                <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
                <span>Đã duyệt giữ chỗ</span>
              </span>
            )}
            {status === 'rejected' && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FEE2E2] text-[#B91C1C] text-xs font-semibold rounded-[2px]">
                <span className="w-1.5 h-1.5 bg-[#B91C1C] rounded-none" />
                <span>Đã từ chối</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Đặt cọc trực tuyến qua VietQR Napas 247 · CS Cầu Giấy
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('bookings')}
            className="px-3 py-1.5 rounded-[4px] border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-slate-500">arrow_back</span>
            <span>Danh sách</span>
          </button>

          {status === 'pending' && (
            <>
              <Button
                variant="danger-outline"
                size="sm"
                icon={<span className="material-symbols-outlined text-base">close</span>}
                onClick={() => setIsRejectModalOpen(true)}
              >
                Từ chối
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<span className="material-symbols-outlined text-base">check_circle</span>}
                onClick={() => setIsApproveModalOpen(true)}
              >
                Duyệt giữ chỗ
              </Button>
            </>
          )}

          {status === 'approved' && (
            <Button
              size="sm"
              icon={<span className="material-symbols-outlined text-base">description</span>}
              onClick={() => onNavigate('contract-create')}
            >
              Tạo hợp đồng
            </Button>
          )}
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Urgent Countdown Banner */}
          {status === 'pending' && (
            <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] bg-[#FDE68A] flex items-center justify-center text-[#B45309] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">alarm</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 bg-[#B45309] text-white text-[10px] uppercase font-bold rounded-[2px] tracking-wider">
                      Khẩn cấp
                    </span>
                    <span className="text-sm font-bold text-[#B45309]">
                      Hạn phê duyệt tự động sắp hết
                    </span>
                  </div>
                  <p className="text-xs text-[#92400E] mt-0.5">
                    Yêu cầu này sẽ tự động chuyển trạng thái quá hạn nếu quản lý không thao tác trước mốc thời gian quy định.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-semibold text-[#92400E] uppercase tracking-wider">
                  Hạn phê duyệt còn
                </div>
                <div className="font-mono text-xl font-bold text-[#B45309] tracking-wider">
                  {formatCountdown(secondsLeft)}
                </div>
              </div>
            </div>
          )}

          {/* Card: 1. Thông tin khách đặt */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] shadow-xs">
            <div className="px-5 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  person
                </span>
                <h2 className="text-base font-bold text-[#1F2937]">
                  1. Thông tin khách đặt
                </h2>
              </div>
              <span className="font-mono text-xs text-[#6B7280]">REF: CUST-0912</span>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Họ và tên */}
                <div>
                  <span className="text-xs text-[#6B7280]">Họ và tên</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-bold text-[#1F2937]">Lê Thị Mai</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-semibold rounded-[2px]">
                      <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-none" />
                      Khách mới
                    </span>
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <span className="text-xs text-[#6B7280]">Số điện thoại</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono font-bold text-sm text-[#1F2937]">
                      0912 345 678
                    </span>
                    <a
                      href="tel:0912345678"
                      className="inline-flex items-center gap-1 px-2 py-0.5 border border-[#D1D5DB] rounded-[2px] text-[#0F766E] hover:bg-[#F0FDFA] text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-[14px]">call</span>
                      <span>Gọi</span>
                    </a>
                    <a
                      href="https://zalo.me/0912345678"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 border border-[#D1D5DB] rounded-[2px] text-[#0068FF] hover:bg-blue-50 text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      <span>Zalo</span>
                    </a>
                  </div>
                </div>

                {/* Số CCCD / Định danh */}
                <div>
                  <span className="text-xs text-[#6B7280]">Số CCCD / ĐD cá nhân</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-semibold text-sm text-[#1F2937]">
                      0012 0100 8921
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-[#15803D]">
                      verified
                    </span>
                    <span className="text-xs text-[#15803D] font-semibold">
                      Đã xác minh
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <span className="text-xs text-[#6B7280]">Email</span>
                  <div className="text-sm text-[#1F2937] font-medium mt-0.5">
                    mai.lethimai@gmail.com
                  </div>
                </div>
              </div>

              {/* Ghi chú của khách */}
              <div className="pt-3 border-t border-[#F1F5F9] space-y-1">
                <span className="text-xs text-[#6B7280]">Ghi chú của khách</span>
                <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] text-xs text-[#374151] italic flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#9CA3AF] not-italic shrink-0">
                    format_quote
                  </span>
                  <span>
                    “Em muốn nhận phòng đầu tháng 3, có thể chuyển đồ vào trước 1 ngày được không ạ?”
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: 2. Phòng & Chỗ đăng ký */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] shadow-xs">
            <div className="px-5 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  meeting_room
                </span>
                <h2 className="text-base font-bold text-[#1F2937]">
                  2. Phòng & Chỗ đăng ký
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('room-detail')}
                className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Xem phòng P.305</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[#6B7280]">Vị trí phòng & Cơ sở</span>
                <div className="text-sm font-bold text-[#1F2937]">
                  Phòng P.305 · Tầng 3 (12A Ngõ 86 Cầu Giấy, Hà Nội — CS Cầu Giấy)
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#6B7280]">Hình thức đăng ký</span>
                  <div className="text-sm text-[#1F2937] font-medium mt-0.5">
                    Thuê theo chỗ:{' '}
                    <span className="font-semibold text-[#0F766E]">
                      Slot G-01 · Giường đơn dưới
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#6B7280]">
                    Ngày nhận phòng & Thời hạn dự kiến
                  </span>
                  <div className="text-sm text-[#1F2937] font-medium mt-0.5">
                    <strong className="font-mono">01/03/2026</strong> (Thời hạn thuê: 12 tháng)
                  </div>
                </div>
              </div>

              {/* Slot availability check badge */}
              <div className="bg-[#DCFCE7]/60 border border-[#86EFAC] rounded-[4px] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-[#15803D] rounded-none shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#15803D] uppercase tracking-wide">
                      SLOT G-01 KHẢ DỤNG
                    </div>
                    <div className="text-xs text-[#1F2937] mt-0.5">
                      Phòng P.305 hiện có 3/4 slot đang có khách ở. Slot G-01 hiện trống và sẵn sàng bàn giao đúng lịch.
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D] bg-white px-2 py-0.5 rounded-[2px] border border-[#86EFAC]">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  <span>Khớp lịch trống</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card: 3. Tiến trình xử lý (Timeline) */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  history
                </span>
                <h2 className="text-base font-bold text-[#1F2937]">
                  3. Tiến trình xử lý (Timeline)
                </h2>
              </div>
              <span className="text-xs uppercase text-[#6B7280] font-semibold tracking-wider">
                Nhật ký hệ thống
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-[2px] bg-[#15803D] border-2 border-white flex items-center justify-center text-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#1F2937]">
                    Yêu cầu giữ chỗ gửi thành công
                  </div>
                  <div className="font-mono text-[11px] text-[#6B7280]">
                    10:15 — 24/10/2026
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  Khách hàng hoàn tất biểu mẫu đăng ký từ TroPro Public Web (IP: 14.162.xxx.xxx).
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-[2px] bg-[#15803D] border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#1F2937]">
                    Đã gửi thông báo Zalo ZNS tới người phụ trách cơ sở
                  </div>
                  <div className="font-mono text-[11px] text-[#6B7280]">
                    10:16 — 24/10/2026
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  ZNS gửi thành công tới Quản lý Nguyễn Văn Hùng (Mã ZNS: #ZNS-89021).
                </p>
              </div>

              {/* Step 3: Current */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-[2px] bg-[#B45309] border-2 border-white animate-pulse" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#B45309]">
                    {status === 'approved'
                      ? 'Quản lý CS Cầu Giấy đã phê duyệt yêu cầu'
                      : 'Đang chờ Quản lý CS Cầu Giấy duyệt'}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-[#B45309]">
                    {status === 'approved' ? 'HOÀN THÀNH' : 'ĐANG XỬ LÝ'}
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  Hồ sơ đã được xác minh CCCD sơ bộ, chờ phê duyệt để phát hành mã thanh toán cọc.
                </p>
              </div>

              {/* Step 4 */}
              <div className={`relative ${status !== 'approved' ? 'opacity-50' : ''}`}>
                <div
                  className={`absolute -left-6 top-1 w-4 h-4 rounded-[2px] border-2 border-white ${
                    status === 'approved' ? 'bg-[#15803D]' : 'bg-[#CBD5E1]'
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#1F2937]">
                    Tạo cổng nộp cọc VietQR & Ký thỏa thuận
                  </div>
                  <div className="font-mono text-[11px] text-[#6B7280]">
                    {status === 'approved' ? 'Đã kích hoạt' : 'Chờ kích hoạt'}
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-0.5">
                  Hệ thống sẽ cấp mã VietQR động 24h và gửi đường link thỏa thuận giữ phòng điện tử.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Tiền cọc & Thanh toán */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] shadow-xs">
            <div className="px-5 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#FF6B4A]">
                  account_balance_wallet
                </span>
                <h2 className="text-base font-bold text-[#1F2937]">
                  Tiền cọc & Thanh toán
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FEF3C7] text-[#B45309] text-[10px] font-semibold rounded-[2px]">
                <span className="w-1.5 h-1.5 bg-[#B45309] rounded-none" />
                Chưa thanh toán
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs text-[#6B7280]">Quy định tiền cọc giữ chỗ</span>
                <div className="text-3xl font-bold font-mono text-[#FF6B4A] tracking-tight mt-0.5">
                  1.000.000 <span className="text-base font-normal text-[#4B5563]">₫</span>
                </div>
              </div>

              <div className="border-t border-[#F1F5F9] pt-3 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Cơ chế phát sinh VietQR</span>
                  <span className="font-medium text-[#1F2937]">Tự động khi duyệt</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Nội dung chuyển khoản</span>
                  <span className="font-mono text-xs bg-[#F1F5F9] px-1.5 py-0.5 rounded-[2px] font-semibold text-[#1F2937]">
                    TRO BK2610007
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Hạn nộp cọc cho khách</span>
                  <span className="font-semibold text-[#B45309]">24 giờ kể từ lúc duyệt</span>
                </div>
              </div>

              <div className="bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] p-3 text-xs text-[#0F766E] flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#0D9488] shrink-0 mt-0.5">
                  info
                </span>
                <p className="leading-relaxed">
                  Khách có 24 giờ để chuyển khoản cọc VietQR sau khi phê duyệt. Sau thời gian này hệ thống tự mở lại slot cho khách khác.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Thông tin phụ trách & Cơ sở */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] shadow-xs">
            <div className="px-5 py-3.5 border-b border-[#E5E7EB] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                domain
              </span>
              <h2 className="text-base font-bold text-[#1F2937]">
                Thông tin phụ trách & Cơ sở
              </h2>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Cơ sở vận hành</span>
                <span className="font-bold text-[#1F2937]">CS Cầu Giấy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Quản lý phụ trách</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-none bg-[#15803D]" />
                  <span className="font-semibold text-[#1F2937]">Nguyễn Văn Hùng</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Hotline hỗ trợ</span>
                <span className="font-mono font-bold text-[#0F766E]">0988 123 456</span>
              </div>
              <div className="border-t border-[#F1F5F9] pt-2 flex items-center justify-between text-[#6B7280]">
                <span>Tài khoản nhận cọc</span>
                <span className="font-mono text-[#1F2937]">BIDV · 21510001239999</span>
              </div>
            </div>
          </div>

          {/* Sticky Actions Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-3 shadow-xs sticky top-20">
            <div className="text-sm font-bold text-[#1F2937]">Thao tác phê duyệt</div>
            <Button
              className="w-full"
              icon={<span className="material-symbols-outlined text-[18px]">check_circle</span>}
              onClick={() => setIsApproveModalOpen(true)}
            >
              Duyệt yêu cầu giữ chỗ
            </Button>
            <Button
              variant="danger-outline"
              className="w-full"
              icon={<span className="material-symbols-outlined text-[18px]">cancel</span>}
              onClick={() => setIsRejectModalOpen(true)}
            >
              Từ chối yêu cầu
            </Button>
            <p className="text-[11px] text-[#6B7280] text-center leading-relaxed">
              Thao tác phê duyệt sẽ kích hoạt mã VietQR cho khách và tạm khóa slot G-01.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Xác nhận duyệt yêu cầu */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Xác nhận duyệt yêu cầu"
        description="Mã đặt chỗ: BK-2610-007"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button onClick={handleApprove}>Xác nhận duyệt</Button>
          </>
        }
      >
        <p className="text-xs text-[#374151] leading-relaxed">
          Hệ thống sẽ tạm khóa Slot G-01 (P.305) trong 24 giờ và tự động gửi thông báo mã VietQR cọc <strong>1.000.000 ₫</strong> tới khách hàng <strong>Lê Thị Mai</strong>. Bạn có chắc chắn muốn duyệt?
        </p>
      </Modal>

      {/* Modal: Từ chối yêu cầu */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Từ chối yêu cầu giữ phòng"
        description="Mã: BK-2610-007"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Xác nhận từ chối
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1">
              Lý do từ chối (gửi thông báo cho khách)
            </label>
            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full h-9 border border-[#D1D5DB] rounded-[4px] px-3 text-xs bg-white text-[#1F2937]"
            >
              <option value="1">Slot phòng đã có thỏa thuận trực tiếp khác</option>
              <option value="2">Khách yêu cầu thời gian nhận phòng không khả dụng</option>
              <option value="3">Thông tin định danh chưa rõ ràng / không khớp</option>
              <option value="4">Lý do khác</option>
            </select>
          </div>
          <textarea
            placeholder="Nhập thêm ghi chú giải thích cụ thể cho khách (tùy chọn)..."
            className="w-full border border-[#D1D5DB] rounded-[4px] p-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#0D9488] resize-none h-20"
          />
        </div>
      </Modal>
    </div>
  );
};
