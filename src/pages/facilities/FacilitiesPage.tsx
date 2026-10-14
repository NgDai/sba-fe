import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_FACILITIES } from '../../constants/mockData';
import { FacilityItem, FacilityStatus } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface FacilitiesPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate }) => {
  const [facilities, setFacilities] = useState<FacilityItem[]>(MOCK_FACILITIES);
  const [statusFilter, setStatusFilter] = useState<'all' | FacilityStatus>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [reportFacility, setReportFacility] = useState<FacilityItem | null>(null);
  const [reportReason, setReportReason] = useState('Chảy nước dàn lạnh');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New item form
  const [newCode, setNewCode] = useState('TB-DH-305');
  const [newName, setNewName] = useState('Điều hòa Gree 9000 BTU Inverter');
  const [newBrand, setNewBrand] = useState('Gree');
  const [newRoom, setNewRoom] = useState('P.305');
  const [newFloor, setNewFloor] = useState(3);
  const [newValue, setNewValue] = useState(7500000);
  const [newWarranty, setNewWarranty] = useState('01/10/2028');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFacilities = facilities.filter((f) => {
    const matchStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchFloor = floorFilter === 'all' || f.floor.toString() === floorFilter;
    const matchSearch =
      f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.roomCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchFloor && matchSearch;
  });

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FacilityItem = {
      id: `fac-${Date.now()}`,
      code: newCode,
      name: newName,
      brand: newBrand,
      roomCode: newRoom,
      branchName: 'CS Cầu Giấy',
      floor: newFloor,
      installDate: '14/10/2026',
      warrantyUntil: newWarranty,
      originalValue: newValue,
      status: 'good',
    };
    setFacilities([newItem, ...facilities]);
    setIsAddModalOpen(false);
    showToast(`Đã thêm tài sản thiết bị ${newItem.code} thành công!`);
  };

  const handleConfirmReport = () => {
    if (!reportFacility) return;
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === reportFacility.id
          ? { ...f, status: 'maintenance', notes: `Báo hỏng: ${reportReason}` }
          : f
      )
    );
    showToast(
      `Đã chuyển thiết bị ${reportFacility.code} sang trạng thái Cần bảo trì & tạo phiếu sửa chữa!`
    );
    setReportFacility(null);
  };

  const renderStatusBadge = (status: FacilityStatus) => {
    switch (status) {
      case 'good':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-none" />
            <span>Sử dụng tốt</span>
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-amber-50 text-amber-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-none" />
            <span>Cần bảo trì</span>
          </span>
        );
      case 'broken':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-rose-50 text-rose-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-rose-600 rounded-none" />
            <span>Hỏng hóc</span>
          </span>
        );
      case 'replaced':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-500 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-none" />
            <span>Đã thanh lý</span>
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
            Cơ sở vật chất & Thiết bị
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm kê tài sản, trang thiết bị và hạn bảo hành tại các cơ sở
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Khởi chạy đợt kiểm kê tài sản buồng phòng toàn cơ sở...')}
            className="h-9 px-3 rounded-[4px] border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-slate-500">checklist</span>
            <span>Kiểm kê phòng</span>
          </button>
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Thêm tài sản</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Tổng tài sản</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {facilities.length * 20} thiết bị
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Định giá: <span className="font-semibold font-mono text-slate-900">348.500.000 ₫</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Sử dụng tốt</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {facilities.filter((f) => f.status === 'good').length} thiết bị
          </div>
          <div className="mt-2 text-xs text-emerald-700">
            Sẵn sàng vận hành: 88.5%
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Cần bảo trì</div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-700">
            {facilities.filter((f) => f.status === 'maintenance').length} thiết bị
          </div>
          <div className="mt-2 text-xs text-amber-600">
            Đang điều phối kỹ thuật
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Hỏng hóc</div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-600">
            {facilities.filter((f) => f.status === 'broken').length} thiết bị
          </div>
          <div className="mt-2 text-xs text-rose-600">
            Cần mua bổ sung thay thế
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
            onClick={() => setStatusFilter('good')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'good'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Sử dụng tốt ({facilities.filter((f) => f.status === 'good').length})
          </button>
          <button
            onClick={() => setStatusFilter('maintenance')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'maintenance'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Cần bảo trì ({facilities.filter((f) => f.status === 'maintenance').length})
          </button>
          <button
            onClick={() => setStatusFilter('broken')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'broken'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Hỏng hóc ({facilities.filter((f) => f.status === 'broken').length})
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="h-8 border border-slate-200 rounded-[2px] px-2 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
          >
            <option value="all">Tất cả tầng</option>
            <option value="1">Tầng 1</option>
            <option value="2">Tầng 2</option>
            <option value="3">Tầng 3</option>
            <option value="4">Tầng 4</option>
            <option value="5">Tầng 5</option>
          </select>
        </div>

        <div className="relative min-w-[280px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã TB, tên, hãng, phòng..."
            className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F766E]"
          />
        </div>
      </div>

      {/* Facilities Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="px-3 py-2">Mã tài sản</th>
                <th className="px-3 py-2">Tên thiết bị & hãng</th>
                <th className="px-3 py-2">Vị trí</th>
                <th className="px-3 py-2">Lắp đặt & bảo hành</th>
                <th className="px-3 py-2 text-right">Nguyên giá</th>
                <th className="px-3 py-2 text-center">Trạng thái</th>
                <th className="px-3 py-2 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFacilities.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-3 py-3 font-mono font-bold text-[#0F766E]">
                    {f.code}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-slate-900">{f.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Hãng: <span className="font-medium text-slate-700">{f.brand}</span>
                      {f.model && <span> · Model: {f.model}</span>}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-mono font-bold text-[#0F766E]">{f.roomCode}</div>
                    <div className="text-[10px] text-slate-500">
                      Tầng {f.floor} · {f.branchName}
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono text-slate-600">
                    <div>Lắp: {f.installDate}</div>
                    <div className="text-[10px] text-teal-700">BH đến: {f.warrantyUntil}</div>
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-medium text-slate-900">
                    {formatCurrency(f.originalValue)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {renderStatusBadge(f.status)}
                    {f.notes && (
                      <div className="text-[10px] text-amber-700 mt-0.5 max-w-[140px] truncate mx-auto" title={f.notes}>
                        {f.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {f.status === 'good' ? (
                        <button
                          onClick={() => setReportFacility(f)}
                          className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-[2px] text-[11px] font-semibold hover:bg-amber-100 flex items-center gap-1"
                          title="Báo thiết bị hỏng cần bảo dưỡng"
                        >
                          <span className="material-symbols-outlined text-xs">build</span>
                          <span>Báo hỏng</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setFacilities((prev) =>
                              prev.map((item) =>
                                item.id === f.id
                                  ? { ...item, status: 'good', notes: undefined }
                                  : item
                              )
                            );
                            showToast(`Đã nghiệm thu thiết bị ${f.code} hoạt động tốt!`);
                          }}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[2px] text-[11px] font-semibold hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">verified</span>
                          <span>Đã sửa xong</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Broken Modal */}
      {reportFacility && (
        <Modal
          isOpen={true}
          onClose={() => setReportFacility(null)}
          title={`Báo hỏng thiết bị: ${reportFacility.name}`}
          maxWidth="max-w-md"
        >
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-[#F8FAFC] p-3 border border-[#E2E8F0] rounded-[4px] space-y-1.5">
              <div className="text-gray-500">Mã tài sản: <span className="font-mono font-bold text-[#0F766E]">{reportFacility.code}</span></div>
              <div className="text-gray-500">Vị trí: <span className="font-semibold text-[#1F2937]">{reportFacility.roomCode}</span> ({reportFacility.branchName})</div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Mô tả hiện tượng hỏng hóc <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                placeholder="Ví dụ: Điều hòa chảy nước, kêu to, không mát..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setReportFacility(null)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button size="sm" variant="danger" onClick={handleConfirmReport}>
                Chuyển sang bảo trì
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Facility Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Thêm tài sản thiết bị mới"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddFacility} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Mã tài sản <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Thương hiệu / Hãng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên thiết bị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Phòng lắp đặt <span className="text-red-500">*</span>
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
                  Tầng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={newFloor}
                  onChange={(e) => setNewFloor(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Nguyên giá mua (₫)
                </label>
                <input
                  type="number"
                  step="50000"
                  value={newValue}
                  onChange={(e) => setNewValue(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Hạn bảo hành
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={newWarranty}
                  onChange={(e) => setNewWarranty(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
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
                Lưu tài sản
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
