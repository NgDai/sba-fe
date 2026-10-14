import React, { useState, useMemo } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_INVOICES } from '../../constants/mockData';
import { Invoice, InvoiceStatus } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface InvoicesListPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const InvoicesListPage: React.FC<InvoicesListPageProps> = ({ onNavigate }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedPeriod, setSelectedPeriod] = useState('10/2026');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Invoice form state
  const [newRoomCode, setNewRoomCode] = useState('P.302');
  const [newRepresentative, setNewRepresentative] = useState('Lê Thu Nga');
  const [newPhone, setNewPhone] = useState('0987 112 233');
  const [newRoomFee, setNewRoomFee] = useState(4200000);
  const [newElectricUsage, setNewElectricUsage] = useState(120);
  const [newWaterUsage, setNewWaterUsage] = useState(6);
  const [newServiceFee, setNewServiceFee] = useState(150000);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
      const matchSearch =
        inv.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.roomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.representativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.representativePhone.includes(searchTerm);
      return matchStatus && matchSearch;
    });
  }, [invoices, statusFilter, searchTerm]);

  // Summary Metrics
  const stats = useMemo(() => {
    const total = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
    const collected = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
    const overdue = invoices
      .filter((i) => i.status === 'overdue')
      .reduce((sum, i) => sum + (i.totalAmount - i.paidAmount), 0);
    const overdueCount = invoices.filter((i) => i.status === 'overdue').length;
    const paidCount = invoices.filter((i) => i.status === 'paid').length;
    const percent = total > 0 ? Math.round((collected / total) * 100) : 0;
    return { total, collected, overdue, overdueCount, paidCount, percent };
  }, [invoices]);

  const handleMarkAsPaid = (invId: string) => {
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invId
          ? {
              ...i,
              status: 'paid',
              paidAmount: i.totalAmount,
              paidDate: '14/10/2026',
              paymentMethod: 'cash',
              note: 'Đã thu tiền mặt & xác nhận phiếu thu thành công',
            }
          : i
      )
    );
    if (selectedInvoice && selectedInvoice.id === invId) {
      setSelectedInvoice((prev) =>
        prev
          ? {
              ...prev,
              status: 'paid',
              paidAmount: prev.totalAmount,
              paidDate: '14/10/2026',
              paymentMethod: 'cash',
            }
          : null
      );
    }
    showToast(`Đã xác nhận thu tiền cho hóa đơn thành công!`);
  };

  const handleSendReminder = (inv: Invoice) => {
    showToast(`Đã gửi thông báo nhắc nợ Zalo & SMS tới số ${inv.representativePhone}`);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const electricCost = newElectricUsage * 3500;
    const waterCost = newWaterUsage * 30000;
    const total = newRoomFee + electricCost + waterCost + newServiceFee;

    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      code: `HD-2610-0${invoices.length + 28}`,
      period: selectedPeriod,
      roomCode: newRoomCode,
      branchName: 'CS Cầu Giấy',
      representativeName: newRepresentative,
      representativePhone: newPhone,
      dueDate: '10/10/2026',
      roomFee: newRoomFee,
      electricUsage: newElectricUsage,
      electricFee: electricCost,
      waterUsage: newWaterUsage,
      waterFee: waterCost,
      serviceFee: newServiceFee,
      totalAmount: total,
      paidAmount: 0,
      status: 'pending',
      note: 'Hóa đơn phát hành thủ công',
    };

    setInvoices([newInv, ...invoices]);
    setIsCreateModalOpen(false);
    showToast(`Đã tạo và phát hành hóa đơn ${newInv.code} cho phòng ${newRoomCode}!`);
  };

  const renderStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#DCFCE7] text-[#15803D] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
            <span>Đã thanh toán</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEF3C7] text-[#B45309] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B45309] rounded-none" />
            <span>Chờ thanh toán</span>
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEE2E2] text-[#B91C1C] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B91C1C] rounded-none" />
            <span>Quá hạn</span>
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#E0F2FE] text-[#0369A1] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#0369A1] rounded-none" />
            <span>Thu một phần</span>
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
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Hóa đơn & Phiếu thu
          </h1>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-[4px] text-[#0F766E] focus:outline-none focus:border-[#0F766E] cursor-pointer"
          >
            <option value="10/2026">Kỳ 10/2026</option>
            <option value="09/2026">Kỳ 09/2026</option>
            <option value="08/2026">Kỳ 08/2026</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Đang tạo file bảng kê hóa đơn Excel...')}
            className="h-9 px-3 rounded-[4px] border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-slate-500">download</span>
            <span>Xuất Excel</span>
          </button>
          <button
            onClick={() => showToast('Đã gửi thông báo nhắc đóng tiền qua Zalo OA đến tất cả phòng chưa nộp!')}
            className="h-9 px-3 rounded-[4px] border border-[#0F766E] text-[#0F766E] bg-teal-50/60 hover:bg-teal-50 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base">campaign</span>
            <span>Gửi nhắc Zalo</span>
          </button>
          <Button
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Lập hóa đơn mới</span>
          </Button>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total to collect */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Tổng cần thu</span>
            <span className="material-symbols-outlined text-[#0F766E] text-lg">receipt_long</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {formatCurrency(stats.total)}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Tổng {invoices.length} hóa đơn phát hành
          </div>
        </div>

        {/* Collected */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Đã thực thu</span>
            <span className="material-symbols-outlined text-emerald-600 text-lg">payments</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {formatCurrency(stats.collected)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{stats.paidCount} HĐ đã thanh toán</span>
            <span className="font-mono font-semibold text-emerald-700">{stats.percent}%</span>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Quá hạn / Còn nợ</span>
            <span className="material-symbols-outlined text-rose-600 text-lg">warning</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-600">
            {formatCurrency(stats.overdue)}
          </div>
          <div className="mt-2 text-xs text-rose-600">
            {stats.overdueCount} phòng chưa hoàn tất
          </div>
        </div>

        {/* Real-time Match */}
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Tự động khớp VietQR</span>
            <span className="material-symbols-outlined text-[#0F766E] text-lg">qr_code_scanner</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {stats.paidCount} / {invoices.length}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Gạch nợ tự động qua Napas 247
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả ({invoices.length})
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
                statusFilter === 'paid'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Đã thanh toán ({invoices.filter((i) => i.status === 'paid').length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
                statusFilter === 'pending'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Chờ thu ({invoices.filter((i) => i.status === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('overdue')}
              className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
                statusFilter === 'overdue'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Quá hạn ({invoices.filter((i) => i.status === 'overdue').length})
            </button>
            <button
              onClick={() => setStatusFilter('partial')}
              className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
                statusFilter === 'partial'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Thu một phần ({invoices.filter((i) => i.status === 'partial').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã HĐ, phòng, người thuê..."
              className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F766E]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Invoices Data Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium h-10 text-[11px]">
                <th className="px-4 py-2.5">Mã hóa đơn</th>
                <th className="px-4 py-2.5">Phòng & Người thuê</th>
                <th className="px-4 py-2.5">Hạn nộp</th>
                <th className="px-4 py-2.5 text-right">Tiền phòng</th>
                <th className="px-4 py-2.5 text-right">Điện & Nước</th>
                <th className="px-4 py-2.5 text-right">Dịch vụ</th>
                <th className="px-4 py-2.5 text-right">Tổng cộng</th>
                <th className="px-4 py-2.5 text-center">Trạng thái</th>
                <th className="px-4 py-2.5 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                        search_off
                      </span>
                      <p className="font-medium">Không tìm thấy hóa đơn phù hợp</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedInvoice(inv)}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-[#0F766E]">
                      {inv.code}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-[2px] text-[10px] font-mono">
                          {inv.roomCode}
                        </span>
                        <span>{inv.representativeName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {inv.representativePhone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="font-mono text-xs">{inv.dueDate}</div>
                      {inv.paidDate && (
                        <div className="text-[10px] text-emerald-700">
                          Đã trả: {inv.paidDate}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-900">
                      {formatCurrency(inv.roomFee)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-600">
                      <div>{formatCurrency(inv.electricFee + inv.waterFee)}</div>
                      <div className="text-[10px] text-slate-400">
                        {inv.electricUsage} kWh · {inv.waterUsage} m³
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-600">
                      {formatCurrency(inv.serviceFee)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 text-sm">
                      {formatCurrency(inv.totalAmount)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {renderStatusBadge(inv.status)}
                    </td>
                    <td
                      className="px-3 py-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          title="Xem chi tiết & mã QR"
                          className="p-1 rounded-[2px] text-[#0F766E] hover:bg-[#CCFBF1]"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        {inv.status !== 'paid' && (
                          <>
                            <button
                              onClick={() => handleMarkAsPaid(inv.id)}
                              title="Xác nhận thu tiền mặt"
                              className="p-1 rounded-[2px] text-[#15803D] hover:bg-[#DCFCE7]"
                            >
                              <span className="material-symbols-outlined text-base">payments</span>
                            </button>
                            <button
                              onClick={() => handleSendReminder(inv)}
                              title="Gửi nhắc nợ qua Zalo/SMS"
                              className="p-1 rounded-[2px] text-[#B45309] hover:bg-[#FEF3C7]"
                            >
                              <span className="material-symbols-outlined text-base">send</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
          <div>
            Hiển thị <span className="font-semibold text-[#1F2937]">{filteredInvoices.length}</span> / {invoices.length} hóa đơn
          </div>
          <div className="font-mono">Kỳ cước {selectedPeriod} · Cơ sở Cầu Giấy</div>
        </div>
      </div>

      {/* Invoice Detail Modal with Real-time VietQR */}
      {selectedInvoice && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInvoice(null)}
          maxWidth="max-w-xl"
        >
          <div className="p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[2px] bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs">
                    TP
                  </div>
                  <span className="font-bold text-sm tracking-wide text-[#0F766E]">
                    TroPro Invoice
                  </span>
                  {renderStatusBadge(selectedInvoice.status)}
                </div>
                <h2 className="text-xl font-bold text-[#1F2937] mt-1">
                  HÓA ĐƠN TIỀN NHÀ — {selectedInvoice.code}
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Kỳ thanh toán: <span className="font-bold text-[#1F2937]">{selectedInvoice.period}</span> · Hạn nộp: {selectedInvoice.dueDate}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-[2px]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Room & Tenant Summary */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] p-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#64748B] block text-[11px]">Phòng thuê:</span>
                <span className="font-bold text-[#0F766E] text-sm font-mono">
                  {selectedInvoice.roomCode}
                </span>{' '}
                <span className="text-gray-500">({selectedInvoice.branchName})</span>
              </div>
              <div>
                <span className="text-[#64748B] block text-[11px]">Người đại diện:</span>
                <span className="font-semibold text-[#1F2937]">
                  {selectedInvoice.representativeName}
                </span>{' '}
                <span className="text-gray-500 font-mono">({selectedInvoice.representativePhone})</span>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="border border-[#E5E7EB] rounded-[4px] overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#F1F5F9] text-[#475569] font-semibold h-8 text-[11px]">
                  <th className="px-3">KHOẢN THU</th>
                  <th className="px-3 text-center">SỐ LƯỢNG</th>
                  <th className="px-3 text-right">ĐƠN GIÁ</th>
                  <th className="px-3 text-right">THÀNH TIỀN</th>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr>
                    <td className="px-3 py-2 font-medium">Tiền thuê phòng tháng {selectedInvoice.period}</td>
                    <td className="px-3 py-2 text-center text-gray-500">1 tháng</td>
                    <td className="px-3 py-2 text-right font-mono">{formatCurrency(selectedInvoice.roomFee)}</td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-[#1F2937]">
                      {formatCurrency(selectedInvoice.roomFee)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      Tiền điện sinh hoạt
                      <div className="text-[10px] text-gray-400">Công tơ riêng buồng phòng</div>
                    </td>
                    <td className="px-3 py-2 text-center font-mono">{selectedInvoice.electricUsage} kWh</td>
                    <td className="px-3 py-2 text-right font-mono">3.500 ₫</td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-[#1F2937]">
                      {formatCurrency(selectedInvoice.electricFee)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      Tiền nước sinh hoạt
                      <div className="text-[10px] text-gray-400">Đồng hồ nước đo lường thực tế</div>
                    </td>
                    <td className="px-3 py-2 text-center font-mono">{selectedInvoice.waterUsage} m³</td>
                    <td className="px-3 py-2 text-right font-mono">30.000 ₫</td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-[#1F2937]">
                      {formatCurrency(selectedInvoice.waterFee)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">
                      Phí dịch vụ chung (Wifi + Rác + Vệ sinh)
                    </td>
                    <td className="px-3 py-2 text-center text-gray-500">Trọn gói</td>
                    <td className="px-3 py-2 text-right font-mono">{formatCurrency(selectedInvoice.serviceFee)}</td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-[#1F2937]">
                      {formatCurrency(selectedInvoice.serviceFee)}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-[#F8FAFC] border-t-2 border-[#CBD5E1] font-bold text-[#1F2937]">
                  <tr>
                    <td colSpan={3} className="px-3 py-2.5 text-right uppercase text-[11px] text-gray-500">
                      TỔNG CỘNG TIỀN PHÒNG:
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-base text-[#0F766E]">
                      {formatCurrency(selectedInvoice.totalAmount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* VietQR Bank Payment Box */}
            <div className="bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white p-2 border border-[#99F6E4] rounded-[4px] shadow-xs shrink-0 flex flex-col items-center">
                {/* SVG Mock of VietQR */}
                <div className="w-28 h-28 bg-[#F8FAFC] border border-dashed border-[#0F766E]/40 flex flex-col items-center justify-center p-2 text-center relative">
                  <span className="material-symbols-outlined text-[#0F766E] text-4xl">qr_code_2</span>
                  <span className="text-[9px] font-mono font-bold text-[#0F766E] mt-1">NAPAS 247</span>
                  <div className="absolute top-1 left-1 text-[8px] font-bold text-red-600">VietinBank</div>
                </div>
                <span className="text-[10px] text-[#0F766E] font-medium mt-1">Quét bằng App Ngân hàng</span>
              </div>

              <div className="text-xs space-y-1.5 flex-1 w-full">
                <div className="font-bold text-[#0F766E] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">account_balance</span>
                  <span>Ngân hàng VietinBank (Chi nhánh Hà Nội)</span>
                </div>
                <div className="text-[#374151]">
                  Số tài khoản:{' '}
                  <span className="font-mono font-bold text-[#1F2937] bg-white px-1.5 py-0.5 border border-[#D1D5DB] rounded-[2px]">
                    109887654321
                  </span>
                </div>
                <div className="text-[#374151]">
                  Chủ TK: <span className="font-semibold text-[#1F2937]">NGUYEN VAN HUNG</span>
                </div>
                <div className="text-[#374151]">
                  Nội dung chuyển khoản (bắt buộc):
                  <div className="font-mono text-[11px] font-bold text-[#0F766E] bg-white p-1 mt-0.5 border border-[#99F6E4] rounded-[2px] break-all">
                    {selectedInvoice.code} {selectedInvoice.roomCode.replace('.', '')} CK TIEN PHONG
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Đang in phiếu thu hóa đơn...')}
                  className="px-3 py-1.5 border border-[#D1D5DB] rounded-[4px] text-xs font-medium text-[#374151] hover:bg-[#F9FAFB] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>In phiếu thu</span>
                </button>
                <button
                  onClick={() => showToast(`Đã gửi đường link xem hóa đơn tới Zalo ${selectedInvoice.representativePhone}`)}
                  className="px-3 py-1.5 border border-[#0F766E] text-[#0F766E] rounded-[4px] text-xs font-medium hover:bg-[#F0FDFA] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  <span>Gửi Zalo</span>
                </button>
              </div>

              {selectedInvoice.status !== 'paid' ? (
                <Button
                  size="sm"
                  onClick={() => handleMarkAsPaid(selectedInvoice.id)}
                  className="flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Xác nhận đã thu tiền</span>
                </Button>
              ) : (
                <div className="text-xs font-semibold text-[#15803D] flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Hóa đơn đã được quyết toán</span>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Create Manual Invoice Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsCreateModalOpen(false)}
          title="Lập hóa đơn thủ công"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateInvoice} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Phòng áp dụng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRoomCode}
                  onChange={(e) => setNewRoomCode(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Kỳ cước thu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={selectedPeriod}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-[#D1D5DB] rounded-[4px] text-xs text-gray-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Người đại diện <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRepresentative}
                  onChange={(e) => setNewRepresentative(e.target.value)}
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

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Tiền thuê phòng (₫)
                </label>
                <input
                  type="number"
                  step="50000"
                  value={newRoomFee}
                  onChange={(e) => setNewRoomFee(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Số điện (kWh)
                </label>
                <input
                  type="number"
                  value={newElectricUsage}
                  onChange={(e) => setNewElectricUsage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Số nước (m³)
                </label>
                <input
                  type="number"
                  value={newWaterUsage}
                  onChange={(e) => setNewWaterUsage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Phí dịch vụ chung (Wifi + Rác + Xe) (₫)
              </label>
              <input
                type="number"
                step="10000"
                value={newServiceFee}
                onChange={(e) => setNewServiceFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* Estimated Total */}
            <div className="bg-[#F0FDFA] border border-[#99F6E4] p-3 rounded-[4px] flex items-center justify-between">
              <span className="font-semibold text-[#0F766E]">Tổng tiền dự kiến phát hành:</span>
              <span className="font-mono font-bold text-base text-[#0F766E]">
                {formatCurrency(
                  newRoomFee + newElectricUsage * 3500 + newWaterUsage * 30000 + newServiceFee
                )}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Phát hành hóa đơn
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
