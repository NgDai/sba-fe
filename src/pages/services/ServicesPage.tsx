import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_SERVICES } from '../../constants/mockData';
import { ServiceItem, ServicePricingType } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface ServicesPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<ServiceItem[]>(MOCK_SERVICES);
  const [filterType, setFilterType] = useState<'all' | ServicePricingType>('all');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formUnit, setFormUnit] = useState('Phòng/tháng');
  const [formPrice, setFormPrice] = useState<number>(50000);
  const [formType, setFormType] = useState<ServicePricingType>('fixed_room');
  const [formDesc, setFormDesc] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredServices = services.filter((s) => {
    if (filterType === 'all') return true;
    return s.type === filterType;
  });

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    setFormName(s.name);
    setFormUnit(s.unit);
    setFormPrice(s.unitPrice);
    setFormType(s.type);
    setFormDesc(s.description);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices((prev) =>
      prev.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              name: formName,
              unit: formUnit,
              unitPrice: formPrice,
              type: formType,
              description: formDesc,
            }
          : s
      )
    );
    setEditingService(null);
    showToast(`Đã cập nhật dịch vụ "${formName}" thành công!`);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: formName,
      unit: formUnit,
      unitPrice: formPrice,
      type: formType,
      description: formDesc,
      appliedBranches: ['CS Cầu Giấy', 'CS Thanh Xuân'],
      isActive: true,
    };
    setServices([...services, newService]);
    setIsAddModalOpen(false);
    showToast(`Đã tạo dịch vụ mới "${newService.name}"!`);
  };

  const handleToggleStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = !s.isActive;
          showToast(
            `Đã ${newStatus ? 'kích hoạt' : 'tạm dừng'} biểu phí dịch vụ ${s.name}!`
          );
          return { ...s, isActive: newStatus };
        }
        return s;
      })
    );
  };

  const renderTypeBadge = (type: ServicePricingType) => {
    switch (type) {
      case 'metered':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            Theo công tơ
          </span>
        );
      case 'fixed_room':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            Cố định / phòng
          </span>
        );
      case 'fixed_person':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            Theo người
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-700 font-medium text-[11px]">
            Miễn phí
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dịch vụ & Biểu phí</h1>
          <p className="text-xs text-slate-500 mt-1">
            Biểu phí điện, nước, tiện ích và phụ phí áp dụng tại các cơ sở
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setFormName('');
            setFormUnit('Phòng/tháng');
            setFormPrice(50000);
            setFormType('fixed_room');
            setFormDesc('');
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Thêm dịch vụ</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-2 flex items-center gap-1.5 text-xs overflow-x-auto shadow-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
            filterType === 'all'
              ? 'bg-[#0F766E] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Tất cả ({services.length})
        </button>
        <button
          onClick={() => setFilterType('metered')}
          className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
            filterType === 'metered'
              ? 'bg-[#0F766E] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Công tơ (Điện/Nước)
        </button>
        <button
          onClick={() => setFilterType('fixed_room')}
          className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
            filterType === 'fixed_room'
              ? 'bg-[#0F766E] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Theo phòng
        </button>
        <button
          onClick={() => setFilterType('fixed_person')}
          className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
            filterType === 'fixed_person'
              ? 'bg-[#0F766E] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Theo người
        </button>
        <button
          onClick={() => setFilterType('free')}
          className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
            filterType === 'free'
              ? 'bg-[#0F766E] text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Miễn phí
        </button>
      </div>

      {/* Services Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-slate-200 rounded-[4px] p-6 shadow-xs flex flex-col justify-between hover:border-[#0F766E] transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">{service.name}</h3>
                  <div className="mt-1.5">{renderTypeBadge(service.type)}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-[#0F766E]">
                    {service.unitPrice === 0 ? 'Miễn phí' : formatCurrency(service.unitPrice)}
                  </div>
                  <div className="text-[11px] text-slate-500">/ {service.unit}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Áp dụng:</span>
                <span className="font-medium text-slate-800">
                  {service.appliedBranches.join(', ')}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                  service.isActive ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-none ${
                    service.isActive ? 'bg-emerald-600' : 'bg-slate-400'
                  }`}
                />
                <span>{service.isActive ? 'Đang áp dụng' : 'Tạm dừng'}</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleStatus(service.id)}
                  title={service.isActive ? 'Tạm dừng áp dụng' : 'Bật áp dụng'}
                  className="p-1 rounded-[2px] text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined text-base">
                    {service.isActive ? 'pause_circle' : 'play_circle'}
                  </span>
                </button>
                <button
                  onClick={() => handleOpenEdit(service)}
                  title="Chỉnh sửa đơn giá"
                  className="px-2 py-1 rounded-[2px] text-xs font-semibold text-[#0F766E] hover:bg-[#F0FDFA] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span>Sửa giá</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <Modal
          isOpen={true}
          onClose={() => setEditingService(null)}
          title={`Chỉnh sửa biểu phí: ${editingService.name}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên dịch vụ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Đơn vị tính <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formUnit}
                  onChange={(e) => setFormUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Đơn giá niêm yết (₫)
                </label>
                <input
                  type="number"
                  step="500"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Phương thức tính cước
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ServicePricingType)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              >
                <option value="metered">Theo công tơ đo lường (kWh, m³)</option>
                <option value="fixed_room">Cố định theo từng phòng</option>
                <option value="fixed_person">Cố định theo đầu người lưu trú</option>
                <option value="free">Tiện ích miễn phí đi kèm</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Quy cách & Mô tả chi tiết
              </label>
              <textarea
                rows={3}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Service Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Thêm dịch vụ & Biểu phí mới"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateService} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên dịch vụ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Giặt ủi sấy khô theo kg"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Đơn vị tính <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="kg / phòng / lần"
                  value={formUnit}
                  onChange={(e) => setFormUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Đơn giá (₫)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Phương thức tính cước
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ServicePricingType)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              >
                <option value="fixed_room">Cố định theo từng phòng</option>
                <option value="fixed_person">Cố định theo đầu người lưu trú</option>
                <option value="metered">Theo công tơ đo lường (kWh, m³)</option>
                <option value="free">Tiện ích miễn phí đi kèm</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Mô tả dịch vụ
              </label>
              <textarea
                rows={3}
                placeholder="Nhập mô tả quy cách phục vụ..."
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
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
                Thêm biểu phí
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
