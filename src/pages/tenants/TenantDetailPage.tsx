import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { Button } from '../../components/common/Button';

interface TenantDetailPageProps {
  onNavigate: (key: NavItemKey) => void;
  tenantId?: string;
}

export const TenantDetailPage: React.FC<TenantDetailPageProps> = ({
  onNavigate,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#0F766E] text-white px-4 py-2.5 rounded-[4px] shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">
            Lê Thị Mai
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-xs font-semibold rounded-[2px]">
            <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none inline-block" />
            Đang ở
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold rounded-[2px]">
            <span className="w-1.5 h-1.5 bg-[#0369A1] rounded-none inline-block" />
            Đại diện hợp đồng
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('tenants')}
            className="px-3 py-1.5 rounded-[4px] border border-[#D1D5DB] bg-white text-xs font-medium text-[#374151] hover:bg-[#F9FAFB] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-[#6B7280]">arrow_back</span>
            <span>Danh sách khách thuê</span>
          </button>
          <Button
            size="sm"
            variant="outline"
            icon={<span className="material-symbols-outlined text-base">edit</span>}
            onClick={() => showToast('Mở biểu mẫu chỉnh sửa thông tin khách thuê')}
          >
            Sửa thông tin
          </Button>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5/12): Thông tin cá nhân */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <h2 className="text-base font-bold text-[#1F2937]">Thông tin cá nhân</h2>
            <span className="font-mono text-xs text-[#9CA3AF]">UID-NT-0842</span>
          </div>

          {/* Avatar and name banner */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-[4px] bg-[#CCFBF1] text-[#0F766E] font-bold text-xl flex items-center justify-center font-mono flex-shrink-0 border border-[#99F6E4]">
              LM
            </div>
            <div>
              <div className="text-base font-bold text-[#1F2937]">Lê Thị Mai</div>
              <div className="text-[11px] font-semibold text-[#0F766E] uppercase tracking-wide">
                NHÂN VIÊN VĂN PHÒNG
              </div>
              <div className="text-xs text-[#6B7280]">Tham gia từ 15/06/2025</div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 pt-2 border-t border-[#F1F5F9] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  call
                </span>
                Số điện thoại
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#1F2937]">0912 345 678</span>
                <span className="inline-flex items-center px-1.5 py-0.2 bg-[#DCFCE7] text-[#15803D] font-semibold text-[10px] rounded-[2px]">
                  Đã xác minh
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  mail
                </span>
                Email
              </span>
              <span className="text-[#1F2937] font-medium">mai.lethimai@gmail.com</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  cake
                </span>
                Ngày sinh
              </span>
              <span className="text-[#1F2937]">12/08/2001 (25 tuổi)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  wc
                </span>
                Giới tính
              </span>
              <span className="text-[#1F2937] font-medium">Nữ</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  badge
                </span>
                Số CCCD
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-[#1F2937]">
                  0012 0100 ****
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#9CA3AF]">
                  lock
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  calendar_today
                </span>
                Ngày cấp
              </span>
              <span className="font-mono text-[#1F2937]">10/05/2021</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  domain
                </span>
                Nơi cấp
              </span>
              <span className="text-[#1F2937]">Cục CSQLHC về TTXH</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  location_on
                </span>
                Quê quán
              </span>
              <span className="text-[#1F2937] font-medium">Nam Định</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF]">
                  work
                </span>
                Nghề nghiệp
              </span>
              <span className="text-[#1F2937]">Nhân viên văn phòng</span>
            </div>
          </div>

          {/* Dossier Status Banner */}
          <div className="p-3 bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] flex items-start gap-2.5 text-xs text-[#0F766E]">
            <span className="material-symbols-outlined text-[18px] text-[#0D9488] shrink-0 mt-0.5">
              verified
            </span>
            <div>
              <div className="font-semibold text-[#115E59]">Tình trạng hồ sơ</div>
              <div className="mt-0.5 leading-relaxed text-[#0F766E]">
                Đã xác minh định danh CCCD và tạm trú đầy đủ tại Công an phường Cầu Giấy.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7/12): Hợp đồng, Công nợ, Lịch sử lưu trú */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Hợp đồng thuê hiện tại */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  description
                </span>
                <h3 className="text-base font-bold text-[#1F2937]">
                  Hợp đồng thuê hiện tại
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contracts')}
                className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Xem chi tiết hợp đồng</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#6B7280] border-b border-[#F1F5F9]">
                    <th className="pb-2 font-semibold">MÃ HĐ</th>
                    <th className="pb-2 font-semibold">PHÒNG & CHỖ</th>
                    <th className="pb-2 font-semibold">VAI TRÒ</th>
                    <th className="pb-2 font-semibold">THỜI HẠN</th>
                    <th className="pb-2 font-semibold text-right">TIỀN THUÊ / THÁNG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2.5 font-mono font-bold text-[#0F766E]">
                      HĐ-2603-0412
                    </td>
                    <td className="py-2.5">
                      <div className="font-semibold text-[#1F2937]">P.305 (G-01)</div>
                      <div className="text-[11px] text-[#6B7280]">CS Cầu Giấy</div>
                    </td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-[10px] rounded-[2px]">
                        <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-none" />
                        Đại diện HĐ
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-[#4B5563]">
                      01/03/2026 – 28/02/2027
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#1F2937]">
                      1.300.000 ₫
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6B7280] gap-2">
              <div>
                Tiền cọc giữ chỗ:{' '}
                <strong className="font-mono text-[#1F2937]">1.300.000 ₫</strong> · Hình thức thanh toán:{' '}
                <strong className="text-[#1F2937]">Theo tháng (ngày 05)</strong>
              </div>
              <span className="text-[#15803D] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Đã thanh toán cọc lúc nhận phòng
              </span>
            </div>
          </div>

          {/* Card 2: Công nợ & Hóa đơn liên quan */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  receipt_long
                </span>
                <h3 className="text-base font-bold text-[#1F2937]">
                  Công nợ & Hóa đơn liên quan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('invoices')}
                className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Xem toàn bộ hóa đơn</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Zero Debt banner */}
            <div className="p-3 bg-[#DCFCE7]/60 border border-[#86EFAC] rounded-[4px] flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#15803D] text-white rounded-[2px] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">done</span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#15803D] uppercase">
                    CÔNG NỢ CÁ NHÂN HIỆN TẠI
                  </div>
                  <div className="text-base font-bold text-[#15803D] font-mono">
                    0 ₫{' '}
                    <span className="text-xs font-normal text-[#1F2937]">
                      (Đã thanh toán đủ kỳ 10/2026)
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<span className="material-symbols-outlined text-[14px]">history</span>}
              >
                Lịch sử thanh toán
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-[#6B7280] border-b border-[#E5E7EB] bg-[#F9FAFB] h-8">
                    <th className="px-3 font-semibold">MÃ HÓA ĐƠN</th>
                    <th className="px-3 font-semibold">KỲ</th>
                    <th className="px-3 font-semibold text-right">PHẦN PHẢI TRẢ</th>
                    <th className="px-3 font-semibold text-right">ĐÃ ĐÓNG</th>
                    <th className="px-3 font-semibold text-right">CÒN THIẾU</th>
                    <th className="px-3 font-semibold text-center">TRẠNG THÁI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0F766E]">
                      HD-2610-021
                    </td>
                    <td className="py-2.5 px-3 font-mono">Kỳ 10/2026</td>
                    <td className="py-2.5 px-3 font-mono text-right font-semibold">
                      2.268.500 ₫
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-[#15803D] font-semibold">
                      2.268.500 ₫
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right">0 ₫</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#DCFCE7] text-[#15803D] font-semibold text-[10px] rounded-[2px]">
                        <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
                        Đã đủ
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0F766E]">
                      HD-2609-019
                    </td>
                    <td className="py-2.5 px-3 font-mono">Kỳ 09/2026</td>
                    <td className="py-2.5 px-3 font-mono text-right font-semibold">
                      2.145.000 ₫
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-[#15803D] font-semibold">
                      2.145.000 ₫
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right">0 ₫</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#DCFCE7] text-[#15803D] font-semibold text-[10px] rounded-[2px]">
                        <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
                        Đã đủ
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: Lịch sử lưu trú */}
          <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                  timeline
                </span>
                <h3 className="text-base font-bold text-[#1F2937]">Lịch sử lưu trú</h3>
              </div>
              <span className="text-xs text-[#6B7280]">
                Tổng thời gian: <strong className="text-[#1F2937]">1 năm 4 tháng</strong>
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-[2px] bg-[#0F766E] border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#1F2937] flex items-center gap-2">
                    <span>P.305 (G-01), CS Cầu Giấy</span>
                    <span className="inline-flex items-center px-1.5 py-0.2 bg-[#DCFCE7] text-[#15803D] text-[10px] font-semibold rounded-[2px]">
                      Đang cư trú
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#6B7280]">
                    01/03/2026 → Hiện tại
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-1">
                  Loại phòng: Studio KTX 4 giường • Hợp đồng đại diện chính thức • Tiền thuê: 1.300.000 ₫/tháng.
                </p>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-[2px] bg-[#94A3B8] border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-xs font-bold text-[#1F2937] flex items-center gap-2">
                    <span>P.102, CS Cầu Giấy</span>
                    <span className="inline-flex items-center px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] text-[10px] font-semibold rounded-[2px]">
                      Đã kết thúc hợp đồng
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#6B7280]">
                    15/06/2025 → 28/02/2026
                  </div>
                </div>
                <p className="text-xs text-[#4B5563] mt-1 flex items-center gap-1 text-[#15803D]">
                  <span className="material-symbols-outlined text-[14px]">done</span>
                  <span>
                    Bàn giao phòng sạch đẹp, không hư hại tài sản CSVC, đã hoàn trả 100% tiền cọc (1.200.000 ₫).
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
