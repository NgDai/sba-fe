import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_UTILITIES } from '../../constants/mockData';
import { UtilityRecord } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface UtilityReadingsPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const UtilityReadingsPage: React.FC<UtilityReadingsPageProps> = ({
  onNavigate,
}) => {
  const [period, setPeriod] = useState('10-2026');
  const [searchTerm, setSearchTerm] = useState('');
  const [floorFilter, setFloorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [utilities, setUtilities] = useState<UtilityRecord[]>(MOCK_UTILITIES);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const electricRate = 3500;
  const waterRate = 30000;

  const handleElectricChange = (id: string, value: string) => {
    setUtilities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const num = value === '' ? '' : Number(value);
          return { ...item, electricCurrent: num };
        }
        return item;
      })
    );
  };

  const handleWaterChange = (id: string, value: string) => {
    setUtilities((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const num = value === '' ? '' : Number(value);
          return { ...item, waterCurrent: num };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 700);
  };

  const filteredUtilities = utilities.filter((u) => {
    const matchSearch =
      u.roomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

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
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Chỉ số điện nước
          </h1>
          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <div className="relative inline-flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-base text-[#0F766E] pointer-events-none">
              calendar_month
            </span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 pl-8 pr-8 bg-white border border-slate-200 rounded-[4px] text-xs font-semibold text-[#0F766E] cursor-pointer focus:outline-none focus:border-[#0F766E]"
            >
              <option value="10-2026">Kỳ 10/2026</option>
              <option value="09-2026">Kỳ 09/2026</option>
              <option value="08-2026">Kỳ 08/2026</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 text-base text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>

          <span className="px-2.5 py-1 bg-teal-50 text-teal-800 font-mono text-xs font-medium rounded-[2px] flex items-center gap-1.5 border border-teal-100">
            <span className="w-1.5 h-1.5 bg-[#0F766E]" />
            3.500 ₫/kWh · 30.000 ₫/m³
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast('Đang mở hộp thoại nhập tệp Excel chỉ số điện nước...')}
            className="h-9 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-slate-500">file_upload</span>
            <span>Nhập Excel</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`h-9 px-4 font-semibold text-xs rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer text-white shadow-xs ${
              saveSuccess
                ? 'bg-emerald-600'
                : 'bg-[#0F766E] hover:bg-[#0D9488]'
            }`}
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                <span>Đang lưu...</span>
              </>
            ) : saveSuccess ? (
              <>
                <span className="material-symbols-outlined text-base">check</span>
                <span>Đã lưu thành công!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">save</span>
                <span>Lưu chỉ số</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Status Bar Banner */}
      <div className="bg-white border border-slate-200 rounded-[4px] px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[4px] bg-teal-50 flex items-center justify-center text-[#0F766E] shrink-0 border border-teal-100">
            <span className="material-symbols-outlined text-[20px]">speed</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs">
            <span className="font-semibold text-slate-900">
              Đã nhập 28/38 phòng (73.7%)
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-500">
              Còn 10 phòng chưa chốt chỉ số
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-64">
          <div className="flex-1 bg-slate-100 rounded-none h-2 overflow-hidden">
            <div className="bg-[#0F766E] h-full w-[73.7%] transition-all duration-300" />
          </div>
          <span className="font-mono text-xs text-[#0F766E] font-semibold shrink-0">
            73.7%
          </span>
        </div>
      </div>

      {/* Quick Filters Toolbar */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã phòng..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0F766E] text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="relative w-full sm:w-44">
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="w-full h-9 pl-3 pr-8 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="all">Tất cả tầng</option>
              <option value="1">Tầng 1 (8 phòng)</option>
              <option value="2">Tầng 2 (10 phòng)</option>
              <option value="3">Tầng 3 (10 phòng)</option>
              <option value="4">Tầng 4 (10 phòng)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[18px] text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 pl-3 pr-8 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="done">Đã nhập đủ</option>
              <option value="pending">Chưa hoàn tất</option>
              <option value="vacant">Trống / Bảo trì</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-[18px] text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Data Input Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 h-10 select-none text-[11px] font-medium text-slate-500">
                <th className="py-2.5 px-4 w-28">
                  Phòng
                </th>
                <th className="py-2.5 px-3 w-32 text-right">
                  Điện đầu kỳ
                </th>
                <th className="py-2.5 px-3 w-40">
                  Điện cuối kỳ
                </th>
                <th className="py-2.5 px-3 w-36 text-right">
                  Tiêu thụ điện
                </th>
                <th className="py-2.5 px-3 w-28 text-right">
                  Nước đầu kỳ
                </th>
                <th className="py-2.5 px-3 w-36">
                  Nước cuối kỳ
                </th>
                <th className="py-2.5 px-3 w-32 text-right">
                  Tiêu thụ nước
                </th>
                <th className="py-2.5 px-4 w-36 text-right">
                  Tạm tính
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUtilities.map((u) => {
                const isMaintenance = !!u.isMaintenance;
                const eCurrent = u.electricCurrent !== '' ? Number(u.electricCurrent) : null;
                const wCurrent = u.waterCurrent !== '' ? Number(u.waterCurrent) : null;

                const eDiff = eCurrent !== null ? eCurrent - u.electricPrev : null;
                const wDiff = wCurrent !== null ? wCurrent - u.waterPrev : null;

                const isElectricInvalid = eDiff !== null && eDiff < 0;
                const isWaterInvalid = wDiff !== null && wDiff < 0;

                const eCost = eDiff !== null && eDiff >= 0 ? eDiff * electricRate : 0;
                const wCost = wDiff !== null && wDiff >= 0 ? wDiff * waterRate : 0;
                const totalCost = eCost + wCost;

                return (
                  <tr
                    key={u.id}
                    className={`transition-colors ${
                      isMaintenance
                        ? 'bg-[#F9FAFB]/70 opacity-60'
                        : isWaterInvalid || isElectricInvalid
                        ? 'bg-[#FEE2E2]/30 hover:bg-[#FEE2E2]/40'
                        : 'hover:bg-[#F0FDFA]/50'
                    }`}
                  >
                    {/* Phòng */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-3.5 rounded-none ${
                            isMaintenance
                              ? 'bg-[#6D28D9]'
                              : isWaterInvalid || isElectricInvalid
                              ? 'bg-[#F04E2C]'
                              : 'bg-[#0D9488]'
                          }`}
                        />
                        <div>
                          <span
                            className={`font-bold text-sm text-[#1F2937] ${
                              isMaintenance ? 'line-through text-[#6B7280]' : ''
                            }`}
                          >
                            {u.roomCode}
                          </span>
                          <span
                            className={`block text-[11px] ${
                              isMaintenance ? 'italic text-[#6D28D9]' : 'text-[#6B7280]'
                            }`}
                          >
                            {u.tenantName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Điện đầu kỳ */}
                    <td className="py-3 px-3 text-right font-mono text-xs tabular-nums text-[#4B5563]">
                      <span>{formatNumber(u.electricPrev)}</span>
                      <span className="block text-[10px] text-[#9CA3AF] uppercase font-sans">
                        kWh
                      </span>
                    </td>

                    {/* Điện cuối kỳ Input */}
                    <td className="py-3 px-3">
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          disabled={isMaintenance}
                          value={u.electricCurrent}
                          onChange={(e) => handleElectricChange(u.id, e.target.value)}
                          className={`w-full h-9 pl-3 pr-8 font-mono text-xs tabular-nums text-[#1F2937] rounded-[4px] border focus:outline-none ${
                            isElectricInvalid
                              ? 'border-[#B91C1C] bg-[#FEE2E2]/20 text-[#B91C1C]'
                              : 'border-[#D1D5DB] bg-white focus:border-[#0D9488]'
                          }`}
                        />
                        {!isMaintenance && eCurrent !== null && !isElectricInvalid && (
                          <span className="material-symbols-outlined text-[#15803D] text-[18px] absolute right-2 pointer-events-none">
                            check_circle
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tiêu thụ điện */}
                    <td className="py-3 px-3 text-right">
                      {isMaintenance ? (
                        <>
                          <span className="font-mono text-xs text-[#6B7280]">0 kWh</span>
                          <span className="block font-mono text-[11px] text-[#9CA3AF]">
                            0 ₫
                          </span>
                        </>
                      ) : eDiff !== null ? (
                        <>
                          <span className="font-mono text-xs font-bold text-[#0F766E] tabular-nums">
                            {eDiff} kWh
                          </span>
                          <span className="block font-mono text-[11px] text-[#6B7280] tabular-nums">
                            {formatCurrency(eCost)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-[#9CA3AF]">--</span>
                      )}
                    </td>

                    {/* Nước đầu kỳ */}
                    <td className="py-3 px-3 text-right font-mono text-xs tabular-nums text-[#4B5563]">
                      <span>{formatNumber(u.waterPrev)}</span>
                      <span className="block text-[10px] text-[#9CA3AF] uppercase font-sans">
                        m³
                      </span>
                    </td>

                    {/* Nước cuối kỳ Input */}
                    <td className="py-3 px-3">
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          disabled={isMaintenance}
                          placeholder={isMaintenance ? '' : 'Nhập...'}
                          value={u.waterCurrent}
                          onChange={(e) => handleWaterChange(u.id, e.target.value)}
                          className={`w-full h-9 pl-3 pr-8 font-mono text-xs tabular-nums rounded-[4px] border focus:outline-none ${
                            isWaterInvalid
                              ? 'border-[#B91C1C] bg-[#FEE2E2]/20 text-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]'
                              : 'border-[#D1D5DB] bg-white text-[#1F2937] focus:border-[#0D9488]'
                          }`}
                        />
                        {isWaterInvalid && (
                          <span
                            className="material-symbols-outlined text-[#B91C1C] text-[18px] absolute right-2 pointer-events-none"
                            title="Chỉ số cuối không thể nhỏ hơn đầu kỳ!"
                          >
                            error
                          </span>
                        )}
                        {!isMaintenance &&
                          wCurrent !== null &&
                          !isWaterInvalid &&
                          u.waterCurrent !== '' && (
                            <span className="material-symbols-outlined text-[#15803D] text-[18px] absolute right-2 pointer-events-none">
                              check_circle
                            </span>
                          )}
                      </div>
                    </td>

                    {/* Tiêu thụ nước */}
                    <td className="py-3 px-3 text-right">
                      {isMaintenance ? (
                        <>
                          <span className="font-mono text-xs text-[#6B7280]">0 m³</span>
                          <span className="block font-mono text-[11px] text-[#9CA3AF]">
                            0 ₫
                          </span>
                        </>
                      ) : isWaterInvalid ? (
                        <>
                          <span className="font-mono text-xs font-bold text-[#B91C1C] tabular-nums">
                            {wDiff} m³
                          </span>
                          <span className="block font-mono text-[10px] text-[#B91C1C]">
                            Không hợp lệ
                          </span>
                        </>
                      ) : wDiff !== null && u.waterCurrent !== '' ? (
                        <>
                          <span className="font-mono text-xs font-bold text-[#0F766E] tabular-nums">
                            {wDiff} m³
                          </span>
                          <span className="block font-mono text-[11px] text-[#6B7280] tabular-nums">
                            {formatCurrency(wCost)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-mono text-xs text-[#9CA3AF]">-- m³</span>
                          <span className="block font-mono text-[11px] text-[#9CA3AF]">
                            -- ₫
                          </span>
                        </>
                      )}
                    </td>

                    {/* Tạm tính & Status */}
                    <td className="py-3 px-4 text-right">
                      {isMaintenance ? (
                        <>
                          <div className="font-mono text-xs text-[#6B7280]">0 ₫</div>
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-[#EDE9FE] text-[#6D28D9] font-semibold text-[10px] rounded-[2px] mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[#6D28D9] mr-1" />
                            Miễn phí
                          </span>
                        </>
                      ) : isWaterInvalid || isElectricInvalid ? (
                        <>
                          <div className="font-mono text-xs text-[#6B7280]">Chờ sửa lỗi</div>
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-[#FEE2E2] text-[#B91C1C] font-semibold text-[10px] rounded-[2px] mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[#B91C1C] mr-1" />
                            Sai số
                          </span>
                        </>
                      ) : u.waterCurrent === '' || u.electricCurrent === '' ? (
                        <>
                          <div className="font-mono text-xs text-[#9CA3AF]">
                            Chưa đủ dữ liệu
                          </div>
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-[#FEF3C7] text-[#B45309] font-semibold text-[10px] rounded-[2px] mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[#B45309] mr-1" />
                            Thiếu nước
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="font-mono text-xs font-bold text-[#F04E2C] tabular-nums">
                            {formatCurrency(totalCost)}
                          </div>
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-[#DCFCE7] text-[#15803D] font-semibold text-[10px] rounded-[2px] mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[#15803D] mr-1" />
                            Đã chốt
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B7280]">
          <div>
            Hiển thị <strong className="text-[#1F2937]">1–{filteredUtilities.length}</strong> trong số <strong className="text-[#1F2937]">38</strong> phòng
          </div>
          <div className="flex items-center gap-1 select-none">
            <button className="h-8 w-8 bg-[#0F766E] text-white rounded-[2px] font-mono text-xs font-bold flex items-center justify-center">
              1
            </button>
            <button className="h-8 w-8 hover:bg-[#F0FDFA] border border-[#E5E7EB] text-[#1F2937] rounded-[2px] font-mono text-xs flex items-center justify-center">
              2
            </button>
            <button className="h-8 w-8 hover:bg-[#F0FDFA] border border-[#E5E7EB] text-[#1F2937] rounded-[2px] font-mono text-xs flex items-center justify-center">
              3
            </button>
            <span className="px-1 text-[#9CA3AF]">...</span>
            <button className="h-8 w-8 hover:bg-[#F0FDFA] border border-[#E5E7EB] text-[#1F2937] rounded-[2px] font-mono text-xs flex items-center justify-center">
              7
            </button>
          </div>
        </div>
      </div>

      {/* Operational Note & Legend (3 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-3 flex items-start gap-2.5 shadow-xs">
          <span className="material-symbols-outlined text-[#0F766E] text-[20px] shrink-0 mt-0.5">
            calculate
          </span>
          <div>
            <div className="text-xs font-bold text-[#1F2937]">Công thức tự động</div>
            <div className="text-[11px] text-[#6B7280] mt-0.5 leading-relaxed">
              Số tiêu thụ = Số cuối - Số đầu. Hệ thống tự động nhân đơn giá theo biểu phí phòng đã cấu hình.
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-3 flex items-start gap-2.5 shadow-xs">
          <span className="material-symbols-outlined text-[#B45309] text-[20px] shrink-0 mt-0.5">
            verified_user
          </span>
          <div>
            <div className="text-xs font-bold text-[#1F2937]">Chốt hóa đơn hàng loạt</div>
            <div className="text-[11px] text-[#6B7280] mt-0.5 leading-relaxed">
              Chỉ các phòng có chỉ số hợp lệ mới được đưa vào phiếu tính tiền phát hành ngày 01 kế tiếp.
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-3 flex items-start gap-2.5 shadow-xs">
          <span className="material-symbols-outlined text-[#F04E2C] text-[20px] shrink-0 mt-0.5">
            report_problem
          </span>
          <div>
            <div className="text-xs font-bold text-[#1F2937]">Cảnh báo sai lệch</div>
            <div className="text-[11px] text-[#6B7280] mt-0.5 leading-relaxed">
              Chỉ số cuối nhỏ hơn chỉ số đầu hoặc vượt quá 400% mức tiêu thụ trung bình sẽ hiển thị cảnh báo đỏ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
