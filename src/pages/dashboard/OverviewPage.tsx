import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { formatCurrency } from '../../utils/formatters';

interface OverviewPageProps {
  onNavigate: (key: NavItemKey) => void;
  selectedBranch: string;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  selectedBranch,
}) => {
  const [period, setPeriod] = useState('10-2026');

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">
            Tổng quan
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              aria-label="Kỳ cước"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 px-3 pr-8 bg-white border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-[#1F2937] appearance-none focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="10-2026">Kỳ 10/2026</option>
              <option value="09-2026">Kỳ 09/2026</option>
              <option value="08-2026">Kỳ 08/2026</option>
            </select>
            <span className="material-symbols-outlined text-base text-[#6B7280] absolute right-2 top-2.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Chỗ trống */}
        <div
          onClick={() => onNavigate('rooms')}
          className="bg-white border border-slate-200 rounded-[4px] p-5 hover:border-[#0F766E] transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Chỗ trống</span>
            <span className="material-symbols-outlined text-lg text-[#0F766E]">meeting_room</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            12 <span className="text-sm font-normal text-slate-500">/ 104</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Giữ cọc: 6</span>
            <span>Bảo trì: 4</span>
          </div>
        </div>

        {/* Card 2: Đang thuê */}
        <div
          onClick={() => onNavigate('rooms')}
          className="bg-white border border-slate-200 rounded-[4px] p-5 hover:border-[#0F766E] transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Đang cho thuê</span>
            <span className="material-symbols-outlined text-lg text-[#0F766E]">group</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            82 <span className="text-sm font-normal text-slate-500">chỗ</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Lấp đầy</span>
            <span className="font-mono font-semibold text-[#0F766E]">78.8%</span>
          </div>
        </div>

        {/* Card 3: Thực thu */}
        <div
          onClick={() => onNavigate('invoices')}
          className="bg-white border border-slate-200 rounded-[4px] p-5 hover:border-[#0F766E] transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Thực thu tháng</span>
            <span className="material-symbols-outlined text-lg text-emerald-600">payments</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 truncate">
            {formatCurrency(248350000)}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Đạt 79.4%</span>
            <span className="font-mono">36 HĐ</span>
          </div>
        </div>

        {/* Card 4: Công nợ */}
        <div
          onClick={() => onNavigate('invoices')}
          className="bg-white border border-slate-200 rounded-[4px] p-5 hover:border-rose-400 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Công nợ tồn</span>
            <span className="material-symbols-outlined text-lg text-rose-600">warning</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-600 truncate">
            {formatCurrency(64450000)}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>7 HĐ quá hạn</span>
            <span className="text-[#0F766E] font-medium">Xem ngay &rarr;</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2fr): Action Tasks */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[4px] p-6 shadow-xs">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Việc cần xử lý</h2>
            <span className="text-xs text-slate-500">18 mục đang chờ</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {/* Task 1 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#0F766E] rounded-none shrink-0" />
                <span className="font-medium text-slate-800">Yêu cầu giữ phòng chờ duyệt</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-mono font-medium text-[11px]">
                  3
                </span>
              </div>
              <button
                onClick={() => onNavigate('bookings')}
                className="font-medium text-[#0F766E] hover:text-[#0D9488]"
              >
                Xử lý &rarr;
              </button>
            </div>

            {/* Task 2 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#0F766E] rounded-none shrink-0" />
                <span className="font-medium text-slate-800">Lịch xem phòng chờ xác nhận</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-mono font-medium text-[11px]">
                  2
                </span>
              </div>
              <button
                onClick={() => onNavigate('bookings')}
                className="font-medium text-[#0F766E] hover:text-[#0D9488]"
              >
                Xử lý &rarr;
              </button>
            </div>

            {/* Task 3 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#0F766E] rounded-none shrink-0" />
                <span className="font-medium text-slate-800">Yêu cầu sửa chữa mới</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-mono font-medium text-[11px]">
                  5
                </span>
              </div>
              <button
                onClick={() => onNavigate('repairs')}
                className="font-medium text-[#0F766E] hover:text-[#0D9488]"
              >
                Xử lý &rarr;
              </button>
            </div>

            {/* Task 4 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-rose-600 rounded-none shrink-0" />
                <span className="font-medium text-slate-800">Giao dịch VietQR chưa khớp</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-rose-50 text-rose-700 font-mono font-medium text-[11px]">
                  1
                </span>
              </div>
              <button
                onClick={() => onNavigate('transactions')}
                className="font-medium text-[#0F766E] hover:text-[#0D9488]"
              >
                Đối soát &rarr;
              </button>
            </div>

            {/* Task 5 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-rose-600 rounded-none shrink-0" />
                <span className="font-medium text-slate-800">Hóa đơn quá hạn nộp</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-rose-50 text-rose-700 font-mono font-medium text-[11px]">
                  7
                </span>
              </div>
              <button
                onClick={() => onNavigate('invoices')}
                className="font-medium text-[#0F766E] hover:text-[#0D9488]"
              >
                Nhắc nợ &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1fr): Breakdown by Branch */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-6 shadow-xs">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Phân bổ cơ sở</h2>
            <button
              onClick={() => onNavigate('branches-setting')}
              className="text-xs text-[#0F766E] font-medium hover:text-[#0D9488]"
            >
              Cấu hình
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {/* Branch 1 */}
            <div
              onClick={() => onNavigate('rooms')}
              className="py-3 flex items-center justify-between hover:bg-slate-50 -mx-2 px-2 rounded-[2px] cursor-pointer transition-colors"
            >
              <div>
                <div className="font-semibold text-xs text-slate-900">CS Cầu Giấy</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">46 / 56 chỗ</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold text-xs text-rose-600">
                  {formatCurrency(38200000)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Công nợ</div>
              </div>
            </div>

            {/* Branch 2 */}
            <div
              onClick={() => onNavigate('rooms')}
              className="py-3 flex items-center justify-between hover:bg-slate-50 -mx-2 px-2 rounded-[2px] cursor-pointer transition-colors"
            >
              <div>
                <div className="font-semibold text-xs text-slate-900">CS Thanh Xuân</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">36 / 48 chỗ</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold text-xs text-rose-600">
                  {formatCurrency(26250000)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Công nợ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
