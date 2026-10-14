import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_REPAIRS } from '../../constants/mockData';
import { RepairRequest, RepairStatus, RepairCategory, RepairPriority } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface RepairsPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const RepairsPage: React.FC<RepairsPageProps> = ({ onNavigate }) => {
  const [repairs, setRepairs] = useState<RepairRequest[]>(MOCK_REPAIRS);
  const [statusFilter, setStatusFilter] = useState<'all' | RepairStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [completeRepairItem, setCompleteRepairItem] = useState<RepairRequest | null>(null);
  const [actualCost, setActualCost] = useState(300000);
  const [isChargedToTenant, setIsChargedToTenant] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New repair form state
  const [newRoom, setNewRoom] = useState('P.305');
  const [newTenant, setNewTenant] = useState('Lê Thị Mai');
  const [newPhone, setNewPhone] = useState('0912 345 678');
  const [newCategory, setNewCategory] = useState<RepairCategory>('Điện nước');
  const [newPriority, setNewPriority] = useState<RepairPriority>('normal');
  const [newDesc, setNewDesc] = useState('');
  const [newEstimatedCost, setNewEstimatedCost] = useState(150000);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRepairs = repairs.filter((r) => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchCat = categoryFilter === 'all' || r.category === categoryFilter;
    const matchSearch =
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.roomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });

  const handleCreateRepair = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: RepairRequest = {
      id: `rep-${Date.now()}`,
      code: `SC-2610-00${repairs.length + 5}`,
      roomCode: newRoom,
      tenantName: newTenant,
      tenantPhone: newPhone,
      category: newCategory,
      description: newDesc,
      priority: newPriority,
      status: 'pending',
      estimatedCost: newEstimatedCost,
      createdAt: '14/10/2026 10:30',
      isChargedToTenant: false,
    };
    setRepairs([newReq, ...repairs]);
    setIsAddModalOpen(false);
    showToast(`Đã tạo phiếu sửa chữa ${newReq.code} cho phòng ${newReq.roomCode}!`);
  };

  const handleConfirmComplete = () => {
    if (!completeRepairItem) return;
    setRepairs((prev) =>
      prev.map((r) =>
        r.id === completeRepairItem.id
          ? {
              ...r,
              status: 'completed',
              actualCost: actualCost,
              isChargedToTenant: isChargedToTenant,
              completedAt: '14/10/2026 17:00',
            }
          : r
      )
    );
    showToast(
      `Đã nghiệm thu phiếu ${completeRepairItem.code} thành công với chi phí ${formatCurrency(
        actualCost
      )}!`
    );
    setCompleteRepairItem(null);
  };

  const renderStatusBadge = (status: RepairStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-amber-50 text-amber-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-none" />
            <span>Chờ duyệt</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-none" />
            <span>Đang sửa</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-none" />
            <span>Hoàn thành</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-500 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-none" />
            <span>Đã hủy</span>
          </span>
        );
    }
  };

  const renderPriorityBadge = (priority: RepairPriority) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-rose-50 text-rose-700 font-medium text-[10px]">
            Khẩn cấp
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-amber-50 text-amber-700 font-medium text-[10px]">
            Bình thường
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-600 font-medium text-[10px]">
            Thấp
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Yêu cầu sửa chữa & Bảo trì
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Xử lý báo hỏng từ khách thuê và điều phối kỹ thuật viên
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setNewDesc('');
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Tạo phiếu sửa chữa</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Tiếp nhận mới</div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-700">
            {repairs.filter((r) => r.status === 'pending').length} phiếu
          </div>
          <div className="mt-2 text-xs text-amber-600">
            Cần phân công kỹ thuật
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Đang xử lý</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {repairs.filter((r) => r.status === 'in_progress').length} phiếu
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Kỹ thuật đang khắc phục
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Hoàn tất tháng này</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            18 phiếu
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium">
            Thời gian TB: 4.2 giờ
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Chi phí phát sinh</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {formatCurrency(1900000)}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Chủ nhà hỗ trợ miễn phí
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'pending'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Chờ duyệt ({repairs.filter((r) => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'in_progress'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang sửa ({repairs.filter((r) => r.status === 'in_progress').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'completed'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Hoàn tất ({repairs.filter((r) => r.status === 'completed').length})
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#D1D5DB] rounded-[2px] px-2 py-1 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#0F766E]"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="Điện nước">Điện nước</option>
            <option value="Điều hòa">Điều hòa</option>
            <option value="Khóa & Cửa">Khóa & Cửa</option>
            <option value="Nội thất">Nội thất</option>
            <option value="Thấm dột">Thấm dột</option>
          </select>
        </div>

        <div className="relative min-w-[260px]">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã, phòng, người báo..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] text-xs text-[#1F2937] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0F766E]"
          />
        </div>
      </div>

      {/* Repairs Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="px-3 py-2">Mã phiếu</th>
                <th className="px-3 py-2">Phòng & khách</th>
                <th className="px-3 py-2">Danh mục & mô tả</th>
                <th className="px-3 py-2 text-center">Ưu tiên</th>
                <th className="px-3 py-2">Kỹ thuật viên</th>
                <th className="px-3 py-2 text-right">Chi phí</th>
                <th className="px-3 py-2 text-center">Trạng thái</th>
                <th className="px-3 py-2 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRepairs.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-3 py-3 font-mono font-bold text-[#0F766E]">
                    {r.code}
                    <div className="text-[10px] text-slate-400 font-normal">{r.createdAt}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="font-mono text-[#0F766E] bg-teal-50 px-1 rounded-[2px] text-[10px]">
                        {r.roomCode}
                      </span>
                      <span>{r.tenantName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{r.tenantPhone}</div>
                  </td>
                  <td className="px-3 py-3 max-w-xs">
                    <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[10px] mb-1">
                      {r.category}
                    </span>
                    <p className="text-slate-700 line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {renderPriorityBadge(r.priority)}
                  </td>
                  <td className="px-3 py-3">
                    {r.assignedTechnician ? (
                      <div>
                        <div className="font-medium text-slate-900">{r.assignedTechnician}</div>
                        {r.technicianPhone && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            {r.technicianPhone}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-amber-700 text-[11px]">Chưa phân công</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-slate-900">
                    {r.actualCost !== undefined ? (
                      <span className="font-bold text-emerald-700">
                        {formatCurrency(r.actualCost)}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">
                        ~{formatCurrency(r.estimatedCost)}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {renderStatusBadge(r.status)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {r.status === 'pending' && (
                        <button
                          onClick={() => {
                            setRepairs((prev) =>
                              prev.map((item) =>
                                item.id === r.id
                                  ? {
                                      ...item,
                                      status: 'in_progress',
                                      assignedTechnician: 'Nguyễn Văn Tuấn (Kỹ thuật)',
                                      technicianPhone: '0912 998 776',
                                    }
                                  : item
                              )
                            );
                            showToast(`Đã duyệt và giao phiếu ${r.code} cho kỹ thuật viên!`);
                          }}
                          className="px-2 py-1 bg-[#0F766E] text-white rounded-[2px] text-[11px] font-semibold hover:bg-[#0D9488]"
                        >
                          Giao việc
                        </button>
                      )}
                      {r.status === 'in_progress' && (
                        <button
                          onClick={() => {
                            setCompleteRepairItem(r);
                            setActualCost(r.estimatedCost);
                          }}
                          className="px-2 py-1 bg-emerald-600 text-white rounded-[2px] text-[11px] font-semibold hover:bg-emerald-700"
                        >
                          Nghiệm thu
                        </button>
                      )}
                      {r.status === 'completed' && (
                        <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-sm">done_all</span>
                          <span>Xong</span>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Repair Modal */}
      {completeRepairItem && (
        <Modal
          isOpen={true}
          onClose={() => setCompleteRepairItem(null)}
          title={`Nghiệm thu sửa chữa: ${completeRepairItem.code}`}
          maxWidth="max-w-md"
        >
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-[#F8FAFC] p-3 border border-[#E2E8F0] rounded-[4px] space-y-1">
              <div>Phòng: <span className="font-bold text-[#0F766E]">{completeRepairItem.roomCode}</span></div>
              <div>Sự cố: <span className="font-medium">{completeRepairItem.description}</span></div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Chi phí thực tế thanh toán cho thợ (₫)
              </label>
              <input
                type="number"
                step="10000"
                value={actualCost}
                onChange={(e) => setActualCost(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-[4px]">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={isChargedToTenant}
                  onChange={(e) => setIsChargedToTenant(e.target.checked)}
                  className="rounded-[2px] text-[#0F766E] focus:ring-0"
                />
                <span>Trừ chi phí này vào hóa đơn tháng tới của khách thuê (do lỗi khách làm hỏng)</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setCompleteRepairItem(null)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button size="sm" onClick={handleConfirmComplete}>
                Xác nhận hoàn tất
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Repair Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Tạo phiếu yêu cầu sửa chữa"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateRepair} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Phòng cần sửa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Danh mục sự cố
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as RepairCategory)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                >
                  <option value="Điện nước">Điện nước</option>
                  <option value="Điều hòa">Điều hòa</option>
                  <option value="Khóa & Cửa">Khóa & Cửa</option>
                  <option value="Nội thất">Nội thất</option>
                  <option value="Thấm dột">Thấm dột</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Người báo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTenant}
                  onChange={(e) => setNewTenant(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Mức độ ưu tiên
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as RepairPriority)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                >
                  <option value="urgent">Khẩn cấp</option>
                  <option value="normal">Bình thường</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Chi phí dự kiến (₫)
                </label>
                <input
                  type="number"
                  step="50000"
                  value={newEstimatedCost}
                  onChange={(e) => setNewEstimatedCost(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Chi tiết sự cố & hiện tượng <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Mô tả cụ thể để thợ mang đúng linh kiện phụ tùng..."
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Tạo phiếu sửa chữa
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
