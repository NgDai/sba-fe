import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_SLOTS_P305 } from '../../constants/mockData';
import { Slot } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

interface RoomDetailPageProps {
  onNavigate: (key: NavItemKey) => void;
  onSelectTenant: (tenantId: string) => void;
  roomCode?: string;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  onNavigate,
  onSelectTenant,
  roomCode = 'P.305',
}) => {
  const [activeTab, setActiveTab] = useState<'slots' | 'services' | 'facilities'>('slots');
  const [slots, setSlots] = useState<Slot[]>(MOCK_SLOTS_P305);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAssignGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;
    setSlots((prev) =>
      prev.map((s) =>
        s.code === 'G-04'
          ? {
              ...s,
              tenantName: newGuestName,
              status: 'occupied',
              startDate: '01/11/2026',
              expectedEndDate: '31/10/2027',
              contractCode: 'HĐ-2611-0501',
            }
          : s
      )
    );
    setIsAssignModalOpen(false);
    setNewGuestName('');
    setNewGuestPhone('');
  };

  const occupiedCount = slots.filter((s) => s.status === 'occupied').length;
  const occupancyPercent = Math.round((occupiedCount / slots.length) * 100);

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 lg:p-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#0F766E] text-white px-4 py-2.5 rounded-[4px] shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {roomCode}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-[2px] leading-none">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-none inline-block" />
              Đang thuê
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Phòng ghép 4 người · CS Cầu Giấy ·{' '}
            <span className="font-mono font-medium text-slate-900">1.300.000 ₫</span>/chỗ · Tầng 3
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('rooms')}
            className="px-3 py-1.5 rounded-[4px] border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-slate-500">arrow_back</span>
            <span>Danh sách phòng</span>
          </button>
          <Button
            size="sm"
            variant="outline"
            icon={<span className="material-symbols-outlined text-base">edit</span>}
            onClick={() => showToast(`Mở cấu hình thiết lập phòng ${roomCode}`)}
          >
            Sửa thông tin
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-6 -mb-px text-xs font-semibold">
          <button
            onClick={() => setActiveTab('slots')}
            className={`border-b-2 pb-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'slots'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Chỗ ở & người ở</span>
            <span className="font-mono text-[11px] px-1.5 py-0.5 bg-teal-50 text-[#0F766E] rounded-[2px]">
              4
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`border-b-2 pb-3 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'services'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Dịch vụ</span>
            <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-[2px]">
              5
            </span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`border-b-2 pb-3 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'facilities'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Cơ sở vật chất</span>
            <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-[2px]">
              6
            </span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'slots' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Data Table Container (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Danh sách chỗ & khách lưu trú
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quản lý định danh vị trí giường và khách hàng hiện tại
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[#0F766E] hover:text-[#0D9488] hover:bg-teal-50 px-2.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span>Xem lịch sử ở</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                    <th className="py-2 px-3">
                      Chỗ
                    </th>
                    <th className="py-2 px-3">
                      Người ở
                    </th>
                    <th className="py-2 px-3">
                      Hợp đồng
                    </th>
                    <th className="py-2 px-3">
                      Từ ngày
                    </th>
                    <th className="py-2 px-3">
                      Đến ngày dự kiến
                    </th>
                    <th className="py-2 px-3 text-right">
                      Trạng thái chỗ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slots.map((slot) => (
                    <tr
                      key={slot.id}
                      className="hover:bg-[#F0FDFA] transition-colors cursor-pointer group"
                      onClick={() => {
                        if (slot.tenantName) {
                          onSelectTenant(slot.tenantId || 't-mai');
                          onNavigate('tenant-detail');
                        }
                      }}
                    >
                      <td className="py-3 px-3">
                        <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-[2px] border border-[#CCFBF1]">
                          {slot.code}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {slot.tenantName ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#1F2937] group-hover:underline">
                              {slot.tenantName}
                            </span>
                            {slot.isRepresentative && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-[#CCFBF1] text-[#0F766E] rounded-[2px]">
                                Đại diện
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs italic text-[#9CA3AF]">Chưa có người</span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        {slot.contractCode ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('contracts');
                            }}
                            className="font-mono text-xs text-[#0F766E] hover:underline"
                          >
                            {slot.contractCode}
                          </button>
                        ) : (
                          <span className="font-mono text-xs text-[#9CA3AF]">—</span>
                        )}
                      </td>

                      <td className="py-3 px-3 font-mono text-xs text-[#4B5563]">
                        {slot.startDate || '—'}
                      </td>

                      <td className="py-3 px-3 font-mono text-xs text-[#4B5563]">
                        {slot.expectedEndDate || '—'}
                      </td>

                      <td className="py-3 px-3 text-right">
                        {slot.status === 'occupied' ? (
                          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] text-[11px] font-semibold rounded-[2px] leading-none">
                            <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-none inline-block" />
                            Đang ở
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold rounded-[2px] leading-none">
                            <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none inline-block" />
                            Còn trống
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Side Card (1 col) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Tỷ lệ lấp đầy
                </span>
                <span className="font-mono text-sm font-bold text-[#0F766E]">
                  {occupancyPercent}%
                </span>
              </div>
              <div className="pt-4 space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                      {occupiedCount}
                      <span className="text-base font-normal text-slate-400">
                        /{slots.length}
                      </span>
                    </span>
                    <span className="text-xs text-slate-500">Chỗ đã có người</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-[2px] overflow-hidden">
                    <div
                      className="bg-[#0F766E] h-full rounded-[2px] transition-all"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-slate-400 rounded-none inline-block" />
                      Đang cư trú:
                    </span>
                    <span className="font-mono font-semibold text-slate-900">
                      {occupiedCount} chỗ
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-600 rounded-none inline-block" />
                      Chỗ trống nhận khách:
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">
                      {slots.length - occupiedCount} chỗ (G-04)
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Doanh thu dự kiến:</span>
                    <span className="font-mono font-semibold text-slate-900">
                      5.200.000 ₫
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Doanh thu thực tế:</span>
                    <span className="font-mono font-semibold text-emerald-700">
                      {(occupiedCount * 1300000).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5E7EB]">
                <Button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="w-full"
                  icon={<span className="material-symbols-outlined text-[18px]">person_add</span>}
                >
                  Xếp khách vào G-04
                </Button>
              </div>
            </div>

            {/* Quick Room Policy Note */}
            <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-4 text-xs text-[#6B7280] space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#1F2937]">
                <span className="material-symbols-outlined text-[16px] text-[#0F766E]">
                  info
                </span>
                <span>Thông tin buồng phòng</span>
              </div>
              <p className="leading-relaxed">
                Hợp đồng chính do khách đại diện <strong>Lê Thị Mai</strong> đứng tên đại diện thanh toán phí dịch vụ chung.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Dịch vụ */}
      {activeTab === 'services' && (
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4">
          <h3 className="text-base font-bold text-[#1F2937]">Dịch vụ áp dụng buồng phòng</h3>
          <div className="divide-y divide-[#F1F5F9]">
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm text-[#1F2937]">Tiền điện</div>
                <div className="text-xs text-[#6B7280]">Theo công tơ điện riêng phòng</div>
              </div>
              <span className="font-mono font-semibold text-sm text-[#0F766E]">3.500 ₫/kWh</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm text-[#1F2937]">Nước sinh hoạt</div>
                <div className="text-xs text-[#6B7280]">Theo đồng hồ nước</div>
              </div>
              <span className="font-mono font-semibold text-sm text-[#0F766E]">30.000 ₫/m³</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm text-[#1F2937]">Internet cáp quang</div>
                <div className="text-xs text-[#6B7280]">Định mức cố định hàng tháng</div>
              </div>
              <span className="font-mono font-semibold text-sm text-[#0F766E]">100.000 ₫/phòng</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm text-[#1F2937]">Dịch vụ vệ sinh chung</div>
                <div className="text-xs text-[#6B7280]">Theo số người ở thực tế</div>
              </div>
              <span className="font-mono font-semibold text-sm text-[#0F766E]">30.000 ₫/người</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Cơ sở vật chất */}
      {activeTab === 'facilities' && (
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 space-y-4">
          <h3 className="text-base font-bold text-[#1F2937]">Trang thiết bị & CSVC bàn giao</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 border border-[#E5E7EB] rounded-[4px] flex items-center justify-between">
              <span>Điều hòa Inverter Daikin 12000 BTU</span>
              <span className="text-[#15803D] font-semibold">Tốt</span>
            </div>
            <div className="p-3 border border-[#E5E7EB] rounded-[4px] flex items-center justify-between">
              <span>Bình nóng lạnh Rossi 20L</span>
              <span className="text-[#15803D] font-semibold">Tốt</span>
            </div>
            <div className="p-3 border border-[#E5E7EB] rounded-[4px] flex items-center justify-between">
              <span>Giường tầng gỗ tự nhiên (2 bộ)</span>
              <span className="text-[#15803D] font-semibold">Tốt</span>
            </div>
            <div className="p-3 border border-[#E5E7EB] rounded-[4px] flex items-center justify-between">
              <span>Tủ quần áo 4 cánh có khóa riêng</span>
              <span className="text-[#15803D] font-semibold">Tốt</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xếp khách vào G-04 */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Xếp khách vào chỗ G-04"
        description="Gán khách hàng vào giường đơn còn trống tại P.305"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAssignGuest}>Xác nhận xếp chỗ</Button>
          </>
        }
      >
        <form onSubmit={handleAssignGuest} className="space-y-3.5">
          <Input
            label="Họ và tên khách thuê"
            placeholder="Ví dụ: Hoàng Thị Ánh"
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            required
          />
          <Input
            label="Số điện thoại liên hệ"
            placeholder="09xx xxx xxx"
            value={newGuestPhone}
            onChange={(e) => setNewGuestPhone(e.target.value)}
            required
          />
          <div className="p-3 bg-[#F0FDFA] border border-[#CCFBF1] rounded-[4px] text-xs text-[#0F766E]">
            Giá thuê chỗ G-04: <strong>1.300.000 ₫/tháng</strong>. Sau khi xác nhận, hệ thống sẽ kích hoạt tạo hợp đồng bổ sung cho khách.
          </div>
        </form>
      </Modal>
    </div>
  );
};
