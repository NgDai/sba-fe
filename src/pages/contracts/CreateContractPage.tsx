import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { Button } from '../../components/common/Button';

interface CreateContractPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const CreateContractPage: React.FC<CreateContractPageProps> = ({
  onNavigate,
}) => {
  const [rentType, setRentType] = useState<'entire' | 'slot'>('slot');
  const [representativeSlot, setRepresentativeSlot] = useState('G-01');
  const [isActivating, setIsActivating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        onNavigate('contracts');
      }, 1500);
    }, 800);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 font-sans space-y-6 pb-28">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-16 right-6 z-50 bg-[#15803D] text-white px-4 py-3 rounded-[4px] shadow-lg flex items-center gap-2 animate-in slide-in-from-top text-xs font-semibold">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Đã kích hoạt hợp đồng HD-2026-CSCG-0305 thành công!</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">
              Tạo hợp đồng thuê mới
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#E0F2FE] text-[#0369A1] text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-[#0369A1] rounded-none" />
              Hợp đồng ghép (Theo slot)
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Mã dự thảo: <span className="font-mono font-semibold text-[#1F2937]">HD-2026-CSCG-0305</span> · CS Cầu Giấy
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('contracts')}
            className="px-3 py-1.5 rounded-[4px] border border-[#D1D5DB] bg-white text-xs font-medium text-[#374151] hover:bg-[#F9FAFB] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-[#6B7280]">arrow_back</span>
            <span>Danh sách hợp đồng</span>
          </button>
        </div>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="p-3 bg-white border-2 border-[#0D9488] rounded-[4px] flex items-center gap-3">
          <div className="w-6 h-6 rounded-[2px] bg-[#0F766E] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-[#0F766E]">BƯỚC 1</div>
            <div className="text-xs font-bold text-[#1F2937]">Phòng & Hình thức</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E5E7EB] rounded-[4px] flex items-center gap-3">
          <div className="w-6 h-6 rounded-[2px] bg-[#F1F5F9] text-[#475569] font-mono text-xs font-bold flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-[#6B7280]">BƯỚC 2</div>
            <div className="text-xs font-medium text-[#1F2937]">Thời hạn & Tài chính</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E5E7EB] rounded-[4px] flex items-center gap-3">
          <div className="w-6 h-6 rounded-[2px] bg-[#F1F5F9] text-[#475569] font-mono text-xs font-bold flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-[#6B7280]">BƯỚC 3</div>
            <div className="text-xs font-medium text-[#1F2937]">Người ở & Đại diện</div>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E5E7EB] rounded-[4px] flex items-center gap-3">
          <div className="w-6 h-6 rounded-[2px] bg-[#F1F5F9] text-[#475569] font-mono text-xs font-bold flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase text-[#6B7280]">BƯỚC 4</div>
            <div className="text-xs font-medium text-[#1F2937]">Dịch vụ & Hoàn tất</div>
          </div>
        </div>
      </div>

      {/* 01. Phòng & Hình thức thuê */}
      <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#0F766E] text-white font-mono text-xs font-bold rounded-[2px] flex items-center justify-center">
              01
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#1F2937]">
                Phòng & Hình thức thuê
              </h2>
              <p className="text-[11px] text-[#6B7280]">
                Xác định vị trí phòng, cơ sở và phương thức vận hành chỗ ở
              </p>
            </div>
          </div>
          <span className="text-xs text-[#15803D] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-none bg-[#15803D]" />
            Đang có chỗ khả dụng
          </span>
        </div>

        {/* Từ yêu cầu giữ phòng */}
        <div>
          <label className="block text-xs font-semibold text-[#374151] mb-1.5">
            Từ yêu cầu giữ phòng (Booking) <span className="text-[#6B7280] font-normal">(tùy chọn)</span>
          </label>
          <select className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#0D9488]">
            <option value="bk-007">
              BK - 2610-007 - Lê Thị Mai - P.305 (Đã cọc giữ chỗ 1.000.000 ₫)
            </option>
            <option value="bk-008">
              BK - 2610-008 - Trần Văn Hưng - P.202
            </option>
          </select>
        </div>

        {/* Cơ sở & Phòng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Cơ sở <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              type="text"
              readOnly
              value="CS Cầu Giấy (12A Ngõ 86 Cầu Giấy, Hà Nội)"
              className="w-full h-10 px-3 bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] text-xs text-[#374151] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Phòng áp dụng <span className="text-[#B91C1C]">*</span>
            </label>
            <select className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#0D9488]">
              <option value="p305">P.305 (Phòng ghép 4 người - Tầng 3)</option>
              <option value="p101">P.101 (Phòng đơn - Tầng 1)</option>
            </select>
          </div>
        </div>

        {/* Hình thức cho thuê cards */}
        <div>
          <label className="block text-xs font-semibold text-[#374151] mb-2">
            Hình thức cho thuê <span className="text-[#B91C1C]">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              onClick={() => setRentType('entire')}
              className={`p-3.5 border rounded-[4px] cursor-pointer transition-all flex items-start gap-3 ${
                rentType === 'entire'
                  ? 'border-[#0D9488] bg-[#F0FDFA]'
                  : 'border-[#D1D5DB] hover:bg-[#F9FAFB]'
              }`}
            >
              <input
                type="radio"
                name="rentType"
                checked={rentType === 'entire'}
                onChange={() => setRentType('entire')}
                className="mt-0.5 text-[#0F766E] focus:ring-0"
              />
              <div>
                <div className="text-xs font-bold text-[#1F2937]">Nguyên phòng</div>
                <div className="text-[11px] text-[#6B7280] mt-0.5">
                  Giao toàn bộ diện tích cho 1 nhóm/hộ gia đình đứng tên trọn gói
                </div>
              </div>
            </div>

            <div
              onClick={() => setRentType('slot')}
              className={`p-3.5 border rounded-[4px] cursor-pointer transition-all flex items-start gap-3 ${
                rentType === 'slot'
                  ? 'border-[#0D9488] bg-[#F0FDFA] ring-1 ring-[#0D9488]'
                  : 'border-[#D1D5DB] hover:bg-[#F9FAFB]'
              }`}
            >
              <input
                type="radio"
                name="rentType"
                checked={rentType === 'slot'}
                onChange={() => setRentType('slot')}
                className="mt-0.5 text-[#0F766E] focus:ring-0"
              />
              <div>
                <div className="text-xs font-bold text-[#0F766E]">Theo chỗ (Slot)</div>
                <div className="text-[11px] text-[#4B5563] mt-0.5">
                  Chia theo giường tầng/chỗ đơn, lập hóa đơn hoặc tính người đại diện linh hoạt
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capacity banner */}
        <div className="bg-[#F0FDFA] border border-[#CCFBF1] rounded-[4px] p-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-[#0F766E]">
              meeting_room
            </span>
            <div>
              <span className="font-bold text-[#1F2937]">Trạng thái công suất P.305</span>
              <span className="text-[#6B7280] ml-2">
                Đang cấu hình chỗ cho đợt tuyển khách kỳ 03/2026
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span>
              SỨC CHỨA: <strong className="text-[#1F2937]">04 chỗ</strong>
            </span>
            <span>
              ĐÃ Ở: <strong className="text-[#B45309]">02 chỗ</strong>
            </span>
            <span>
              CÒN TRỐNG: <strong className="text-[#15803D]">02 chỗ</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 02. Thời hạn & Tiền nong */}
      <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#0F766E] text-white font-mono text-xs font-bold rounded-[2px] flex items-center justify-center">
              02
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#1F2937]">
                Thời hạn & Tiền nong
              </h2>
              <p className="text-[11px] text-[#6B7280]">
                Biểu phí định kỳ, tiền cọc cam kết và chu kỳ lập biểu thanh toán
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#6B7280]">Kỳ hạn 12 tháng</span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Ngày bắt đầu <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              type="text"
              defaultValue="01/03/2026"
              className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs font-mono font-medium text-[#1F2937]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Ngày kết thúc <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              type="text"
              defaultValue="28/02/2027"
              className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs font-mono font-medium text-[#1F2937]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Tổng thời gian hiệu lực
            </label>
            <input
              type="text"
              readOnly
              value="12 tháng (1 năm)"
              className="w-full h-10 px-3 bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] text-xs font-medium text-[#4B5563]"
            />
          </div>
        </div>

        {/* Financial inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] space-y-2">
            <label className="block text-xs font-semibold text-[#374151]">
              Tiền thuê hàng tháng <span className="text-[#B91C1C]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="1.300.000"
                className="w-full h-10 px-3 pr-24 bg-white border border-[#D1D5DB] rounded-[4px] text-sm font-mono font-bold text-[#1F2937]"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#6B7280]">
                ₫ / chỗ / tháng
              </span>
            </div>
            <div className="text-[11px] text-[#6B7280] font-mono">
              TỔNG PHÒNG NẾU ĐỦ 4 CHỖ:{' '}
              <strong className="text-[#0F766E]">5.200.000 ₫/tháng</strong>
            </div>
          </div>

          <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] space-y-2">
            <label className="block text-xs font-semibold text-[#374151]">
              Tiền cọc quy định <span className="text-[#B91C1C]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="1.300.000"
                className="w-full h-10 px-3 pr-20 bg-white border border-[#D1D5DB] rounded-[4px] text-sm font-mono font-bold text-[#1F2937]"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#6B7280]">
                ₫ / chỗ
              </span>
            </div>
            <div className="text-[11px] flex items-center justify-between font-mono">
              <span className="text-[#B45309]">
                ■ Đã nhận giữ chỗ: 1.000.000 ₫
              </span>
              <span className="text-[#B91C1C] font-semibold">
                Cần thu bổ sung: 300.000 ₫
              </span>
            </div>
          </div>
        </div>

        {/* Payment Cycle & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Kỳ hạn thanh toán <span className="text-[#B91C1C]">*</span>
            </label>
            <select className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs text-[#1F2937]">
              <option>Hạn đóng trước ngày 05 hàng tháng</option>
              <option>Hạn đóng trước ngày 15 hàng tháng</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Điều khoản thỏa thuận khác
            </label>
            <textarea
              defaultValue="Không tụ tập sau 23:00. Vệ sinh cá nhân tự bảo quản. Không đưa người lạ ngủ qua đêm khi chưa có sự đồng ý của cả phòng và quản lý."
              className="w-full border border-[#D1D5DB] rounded-[4px] p-2 text-xs text-[#1F2937] h-16 resize-none focus:outline-none focus:border-[#0D9488]"
            />
          </div>
        </div>
      </div>

      {/* 03. Danh sách người ở & Người đại diện */}
      <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#0F766E] text-white font-mono text-xs font-bold rounded-[2px] flex items-center justify-center">
              03
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#1F2937]">
                Danh sách người ở & Người đại diện
              </h2>
              <p className="text-[11px] text-[#6B7280]">
                Gán từng cá nhân vào giường slot tương ứng và chọn đầu mối liên hệ pháp lý
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<span className="material-symbols-outlined text-[16px]">person_add</span>}
            onClick={() => alert('Thêm người ở')}
          >
            + Thêm người ở
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280]">
                <th className="py-2.5 px-3 font-semibold uppercase">CHỖ (SLOT)</th>
                <th className="py-2.5 px-3 font-semibold uppercase">HỌ TÊN & THÔNG TIN</th>
                <th className="py-2.5 px-3 font-semibold uppercase">SỐ ĐIỆN THOẠI / CCCD</th>
                <th className="py-2.5 px-3 font-semibold uppercase">VAI TRÒ HỢP ĐỒNG</th>
                <th className="py-2.5 px-3 font-semibold uppercase">NGÀY VÀO Ở</th>
                <th className="py-2.5 px-3 font-semibold uppercase text-center w-16">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {/* Row 1: G-01 */}
              <tr className="hover:bg-[#F0FDFA]">
                <td className="py-3 px-3">
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-[2px] border border-[#CCFBF1]">
                    G-01
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1F2937]">Lê Thị Mai</div>
                  <div className="text-[10px] text-[#15803D] font-medium">Khách booking duyệt</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-mono font-semibold text-[#1F2937]">0912 345 678</div>
                  <div className="font-mono text-[10px] text-[#6B7280]">CCCD: 00120100****</div>
                </td>
                <td className="py-3 px-3">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-[#0F766E]">
                    <input
                      type="radio"
                      name="repSlot"
                      checked={representativeSlot === 'G-01'}
                      onChange={() => setRepresentativeSlot('G-01')}
                      className="text-[#0F766E] focus:ring-0"
                    />
                    <span>Đại diện HĐ</span>
                  </label>
                </td>
                <td className="py-3 px-3 font-mono text-[#4B5563]">01/03/2026</td>
                <td className="py-3 px-3 text-center">
                  <button className="text-[#6B7280] hover:text-[#1F2937] p-1">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </td>
              </tr>

              {/* Row 2: G-02 */}
              <tr className="hover:bg-[#F0FDFA]">
                <td className="py-3 px-3">
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-[2px] border border-[#CCFBF1]">
                    G-02
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1F2937]">Trần Thị Lan</div>
                  <div className="text-[10px] text-[#6B7280]">Thành viên phòng</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-mono font-semibold text-[#1F2937]">0987 654 321</div>
                  <div className="font-mono text-[10px] text-[#6B7280]">CCCD: 03420000****</div>
                </td>
                <td className="py-3 px-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#4B5563]">
                    <input
                      type="radio"
                      name="repSlot"
                      checked={representativeSlot === 'G-02'}
                      onChange={() => setRepresentativeSlot('G-02')}
                      className="text-[#0F766E] focus:ring-0"
                    />
                    <span>Thành viên</span>
                  </label>
                </td>
                <td className="py-3 px-3 font-mono text-[#4B5563]">01/03/2026</td>
                <td className="py-3 px-3 text-center">
                  <button className="text-[#6B7280] hover:text-[#B91C1C] p-1">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </td>
              </tr>

              {/* Row 3: G-03 */}
              <tr className="hover:bg-[#F0FDFA]">
                <td className="py-3 px-3">
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-[2px] border border-[#CCFBF1]">
                    G-03
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1F2937]">Đặng Hải Yến</div>
                  <div className="text-[10px] text-[#6B7280]">Thành viên phòng</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-mono font-semibold text-[#1F2937]">0905 123 456</div>
                  <div className="font-mono text-[10px] text-[#6B7280]">CCCD: 04020101****</div>
                </td>
                <td className="py-3 px-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#4B5563]">
                    <input
                      type="radio"
                      name="repSlot"
                      checked={representativeSlot === 'G-03'}
                      onChange={() => setRepresentativeSlot('G-03')}
                      className="text-[#0F766E] focus:ring-0"
                    />
                    <span>Thành viên</span>
                  </label>
                </td>
                <td className="py-3 px-3 font-mono text-[#4B5563]">15/08/2026</td>
                <td className="py-3 px-3 text-center">
                  <button className="text-[#6B7280] hover:text-[#B91C1C] p-1">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </td>
              </tr>

              {/* Row 4: G-04 (Trống) */}
              <tr className="bg-[#F9FAFB]/60 text-[#9CA3AF]">
                <td className="py-3 px-3">
                  <span className="font-mono text-xs text-[#9CA3AF] bg-white px-2 py-0.5 rounded-[2px] border border-[#E5E7EB]">
                    G-04
                  </span>
                </td>
                <td colSpan={4} className="py-3 px-3 italic text-xs">
                  Chỗ còn trống - Sẵn sàng cho người thuê tiếp theo
                </td>
                <td className="py-3 px-3 text-center">
                  <button className="text-[#0F766E] font-semibold text-[11px] hover:underline">
                    + Thêm vào chỗ này
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Banner */}
        <div className="p-3 bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] flex items-center justify-between text-xs text-[#0F766E]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#0D9488]">
              verified
            </span>
            <span>
              Đã xếp <strong>3/4 chỗ</strong>. Người đại diện (<strong>Lê Thị Mai</strong>) chịu trách nhiệm nhận hóa đơn và thông báo chung của phòng.
            </span>
          </div>
          <span className="font-mono font-bold">TỶ LỆ LẤP ĐẦY: 75%</span>
        </div>
      </div>

      {/* 04. Dịch vụ áp dụng */}
      <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#0F766E] text-white font-mono text-xs font-bold rounded-[2px] flex items-center justify-center">
              04
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#1F2937]">Dịch vụ áp dụng</h2>
              <p className="text-[11px] text-[#6B7280]">
                Đơn giá tiện ích bắt buộc và các gói bổ sung cho hợp đồng
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-[#0F766E]">
            4 dịch vụ kích hoạt
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#6B7280]">
                <th className="py-2 px-3 w-16">CHỌN</th>
                <th className="py-2 px-3">TÊN DỊCH VỤ</th>
                <th className="py-2 px-3">HÌNH THỨC TÍNH</th>
                <th className="py-2 px-3 text-right">ĐƠN GIÁ</th>
                <th className="py-2 px-3 text-right">GHI CHÚ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              <tr>
                <td className="py-3 px-3">
                  <input type="checkbox" defaultChecked disabled className="rounded-[2px] text-[#0F766E]" />
                </td>
                <td className="py-3 px-3 font-semibold text-[#1F2937] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                    bolt
                  </span>
                  <span>Tiền điện</span>
                </td>
                <td className="py-3 px-3 text-[#6B7280]">Theo chỉ số công tơ điện tử</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1F2937]">
                  3.500 ₫ <span className="font-normal text-[#6B7280]">/ kWh</span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded-[2px]">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    Mặc định hệ thống
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <input type="checkbox" defaultChecked disabled className="rounded-[2px] text-[#0F766E]" />
                </td>
                <td className="py-3 px-3 font-semibold text-[#1F2937] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                    water_drop
                  </span>
                  <span>Tiền nước sinh hoạt</span>
                </td>
                <td className="py-3 px-3 text-[#6B7280]">Theo chỉ số đồng hồ nước</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1F2937]">
                  18.000 ₫ <span className="font-normal text-[#6B7280]">/ m³</span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded-[2px]">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    Mặc định hệ thống
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <input type="checkbox" defaultChecked className="rounded-[2px] text-[#0F766E]" />
                </td>
                <td className="py-3 px-3 font-semibold text-[#1F2937] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                    wifi
                  </span>
                  <span>Internet cáp quang</span>
                </td>
                <td className="py-3 px-3 text-[#6B7280]">Cố định theo phòng hàng tháng</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1F2937]">
                  100.000 ₫ <span className="font-normal text-[#6B7280]">/ phòng</span>
                </td>
                <td className="py-3 px-3 text-right text-[#15803D] font-semibold">
                  Đã đăng ký
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <input type="checkbox" defaultChecked className="rounded-[2px] text-[#0F766E]" />
                </td>
                <td className="py-3 px-3 font-semibold text-[#1F2937] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                    cleaning_services
                  </span>
                  <span>Dịch vụ vệ sinh chung</span>
                </td>
                <td className="py-3 px-3 text-[#6B7280]">Thu theo đầu người ở thực tế</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1F2937]">
                  30.000 ₫ <span className="font-normal text-[#6B7280]">/ người</span>
                </td>
                <td className="py-3 px-3 text-right text-[#0F766E] font-mono">
                  3 người = 90.000 ₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 md:left-[240px] right-0 bg-white border-t border-[#E5E7EB] px-4 md:px-8 py-3.5 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 border-r border-[#E5E7EB] pr-4">
            <span className="w-5 h-5 rounded-[2px] bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px]">done</span>
            </span>
            <div>
              <div className="text-xs font-bold text-[#1F2937]">P.305</div>
              <div className="text-[10px] text-[#6B7280]">3 người ở hiện tại</div>
            </div>
          </div>

          <div className="text-xs">
            <span className="text-[#6B7280]">Tiền thuê: </span>
            <strong className="font-mono text-[#1F2937]">5.200.000 ₫/tháng</strong>
          </div>

          <div className="text-xs">
            <span className="text-[#6B7280]">Tiền cọc: </span>
            <strong className="font-mono text-[#1F2937]">1.300.000 ₫/người</strong>
          </div>

          <div className="text-xs bg-[#FEE2E2] px-2 py-0.5 rounded-[2px] border border-[#FCA5A5]">
            <span className="text-[#B91C1C]">Thu bổ sung cọc: </span>
            <strong className="font-mono text-[#B91C1C]">300.000 ₫</strong>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('contracts')}
          >
            Lưu nháp
          </Button>
          <Button
            size="sm"
            loading={isActivating}
            icon={<span className="material-symbols-outlined text-[16px]">check_circle</span>}
            onClick={handleActivate}
          >
            Kích hoạt hợp đồng
          </Button>
        </div>
      </div>
    </div>
  );
};
