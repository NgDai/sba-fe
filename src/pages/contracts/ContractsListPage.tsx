import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_CONTRACTS } from '../../constants/mockData';
import { Contract, ContractStatus } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

interface ContractsListPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const ContractsListPage: React.FC<ContractsListPageProps> = ({
  onNavigate,
}) => {
  const [contracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [statusFilter, setStatusFilter] = useState<'all' | ContractStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredContracts = contracts.filter((c) => {
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.representativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.roomCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const renderStatusBadge = (contract: Contract) => {
    switch (contract.status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#DCFCE7] text-[#15803D] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
            <span>Hiệu lực</span>
          </span>
        );
      case 'expiring':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEF3C7] text-[#B45309] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B45309] rounded-none" />
            <span>Sắp hết hạn</span>
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F1F5F9] text-[#475569] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#475569] rounded-none" />
            <span>Nháp</span>
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEE2E2] text-[#B91C1C] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B91C1C] rounded-none" />
            <span>Hết hạn</span>
          </span>
        );
      case 'ended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#F1F5F9] text-[#6B7280] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-none" />
            <span>Đã kết thúc</span>
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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hợp đồng
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-teal-50 text-[#0F766E] font-mono text-xs font-semibold border border-teal-100">
              36 hợp đồng
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý vòng đời hợp đồng thuê và chu kỳ thanh toán
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<span className="material-symbols-outlined text-base">file_download</span>}
            onClick={() => showToast('Đang trích xuất danh sách hợp đồng ra tệp Excel...')}
          >
            Xuất Excel
          </Button>
          <Button
            size="sm"
            icon={<span className="material-symbols-outlined text-base">add</span>}
            onClick={() => onNavigate('contract-create')}
          >
            Tạo hợp đồng
          </Button>
        </div>
      </div>

      {/* Filter Bar Card */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 space-y-3.5 shadow-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center flex-wrap gap-1.5 pb-2 border-b border-slate-100">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Tất cả</span>
            <span className="font-mono text-[11px] ml-1 opacity-80">36</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('draft')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'draft'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Nháp</span>
            <span className="font-mono text-[11px] ml-1 text-slate-400">2</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'active'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Hiệu lực</span>
            <span className="font-mono text-[11px] ml-1 font-semibold">28</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('expiring')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'expiring'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Sắp hết hạn</span>
            <span className="font-mono text-[11px] ml-1 font-semibold">3</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('expired')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'expired'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Hết hạn</span>
            <span className="font-mono text-[11px] ml-1">1</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('ended')}
            className={`h-8 px-3 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'ended'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Đã kết thúc</span>
            <span className="font-mono text-[11px] ml-1">2</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[18px] text-slate-400 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã HĐ, tên người đại diện, phòng..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0F766E] text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="md:col-span-3 relative">
            <select className="w-full h-9 bg-white text-xs rounded-[4px] border border-slate-200 px-3 pr-8 appearance-none focus:outline-none focus:border-[#0F766E] cursor-pointer text-slate-700">
              <option value="cau-giay">CS Cầu Giấy (32 HĐ)</option>
              <option value="thanh-xuan">CS Thanh Xuân (4 HĐ)</option>
              <option value="all">Tất cả cơ sở</option>
            </select>
            <span className="material-symbols-outlined text-slate-500 text-[18px] absolute right-2.5 top-2 pointer-events-none">
              unfold_more
            </span>
          </div>

          <div className="md:col-span-3 relative">
            <select className="w-full h-9 bg-white text-xs rounded-[4px] border border-slate-200 px-3 pr-8 appearance-none focus:outline-none focus:border-[#0F766E] cursor-pointer text-slate-700">
              <option value="all">Tất cả kỳ hạn thuê</option>
              <option value="6m">6 tháng</option>
              <option value="12m">12 tháng (1 năm)</option>
              <option value="exp30">Hết hạn trong 30 ngày</option>
            </select>
            <span className="material-symbols-outlined text-slate-500 text-[18px] absolute right-2.5 top-2 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="py-2 px-3.5 w-[145px]">
                  Mã HĐ
                </th>
                <th className="py-2 px-3.5">
                  Phòng / Chỗ
                </th>
                <th className="py-2 px-3.5">
                  Người đại diện
                </th>
                <th className="py-2 px-3.5">
                  Thời hạn thuê
                </th>
                <th className="py-2 px-3.5 text-right">
                  Tiền thuê/tháng
                </th>
                <th className="py-2 px-3.5 text-center w-[100px]">
                  Số người
                </th>
                <th className="py-2 px-3.5 text-center w-[120px]">
                  Trạng thái
                </th>
                <th className="py-2 px-3 text-center w-[52px]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-[#0F766E] hover:underline cursor-pointer">
                      {c.code}
                    </span>
                  </td>

                  <td className="py-3 px-3.5">
                    <div className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                      <span>{c.roomCode}</span>
                      <span className="text-[#9CA3AF]">·</span>
                      <span className="text-[11px] font-normal text-[#6B7280]">
                        {c.branchName}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#0F766E] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">
                        {c.roomDesc.includes('Slot') ? 'bed' : 'home'}
                      </span>
                      <span>{c.roomDesc}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3.5">
                    <div className="text-xs font-bold text-[#1F2937]">
                      {c.representativeName}
                    </div>
                    <div className="font-mono text-[11px] text-[#6B7280] mt-0.5">
                      {c.representativePhone}
                    </div>
                  </td>

                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div
                      className={`text-xs ${
                        c.status === 'expiring'
                          ? 'font-bold text-[#B45309]'
                          : 'font-medium text-[#1F2937]'
                      }`}
                    >
                      {c.startDate} – {c.endDate}
                    </div>
                    <div
                      className={`text-[11px] ${
                        c.status === 'expiring'
                          ? 'text-[#B45309] font-semibold'
                          : 'text-[#6B7280]'
                      }`}
                    >
                      {c.daysRemaining
                        ? `Còn ${c.daysRemaining} ngày hết hạn`
                        : c.status === 'draft'
                        ? 'Chờ ký & nhận cọc'
                        : `Kỳ hạn: ${c.durationMonths} tháng`}
                    </div>
                  </td>

                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-[#0F766E] tabular-nums">
                      {formatCurrency(c.monthlyRent)}
                    </span>
                    <div className="text-[10px] text-[#6B7280]">
                      {c.paymentCycleDay
                        ? `Kỳ thu ngày ${String(c.paymentCycleDay).padStart(2, '0')} hàng tháng`
                        : `Cọc: ${formatCurrency(c.deposit)}`}
                    </div>
                  </td>

                  <td className="py-3 px-3.5 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-[#F1F5F9] text-[#1F2937] text-xs">
                      {c.peopleCount} người
                    </span>
                  </td>

                  <td className="py-3 px-3.5 text-center whitespace-nowrap">
                    {renderStatusBadge(c)}
                  </td>

                  <td className="py-3 px-3 text-center relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === c.id ? null : c.id)
                      }
                      className="w-7 h-7 inline-flex items-center justify-center rounded-[2px] hover:bg-[#F1F5F9] text-[#6B7280] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_vert
                      </span>
                    </button>

                    {activeMenuId === c.id && (
                      <div className="absolute right-3 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg z-20 py-1 text-left animate-in fade-in zoom-in-95">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            alert(`Xem chi tiết hợp đồng ${c.code}`);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#1F2937] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            visibility
                          </span>
                          <span>Xem chi tiết</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            alert(`In hợp đồng ${c.code}`);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#1F2937] hover:bg-[#F0FDFA] hover:text-[#0F766E]"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            print
                          </span>
                          <span>In hợp đồng</span>
                        </button>
                        <div className="my-1 border-t border-[#E5E7EB]" />
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            alert(`Thanh lý hợp đồng ${c.code}`);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#B91C1C] hover:bg-[#FEE2E2]"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            cancel
                          </span>
                          <span>Thanh lý / Kết thúc</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <div>
            Hiển thị{' '}
            <span className="font-semibold text-[#1F2937]">
              1–{filteredContracts.length}
            </span>{' '}
            trong số <span className="font-semibold text-[#1F2937]">36</span> hợp đồng
          </div>
          <div className="flex items-center gap-1 select-none">
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] bg-[#0F766E] text-white font-mono text-xs font-semibold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] font-mono text-xs">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] font-mono text-xs">
              3
            </button>
            <span className="px-1 text-[#9CA3AF] font-mono">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] font-mono text-xs">
              6
            </button>
          </div>
        </div>
      </div>

      {/* System Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-[4px] bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] text-xs shadow-xs">
        <span className="material-symbols-outlined text-[18px] text-[#0D9488] shrink-0 mt-0.5">
          info
        </span>
        <div className="leading-relaxed">
          <strong className="text-[#134E4A]">Lưu ý:</strong> Hợp đồng hiệu lực tự động khóa các slot phòng tương ứng và đồng bộ vào danh sách lập hóa đơn hàng tháng. Khi hợp đồng đến hạn hoặc thanh lý, hệ thống sẽ tự động đối soát tiền cọc và giải phóng slot phòng về trạng thái trống.
        </div>
      </div>
    </div>
  );
};
