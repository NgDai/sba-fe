import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_TRANSACTIONS, MOCK_INVOICES } from '../../constants/mockData';
import { Transaction, TransactionStatus } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface TransactionsListPageProps {
  onNavigate: (key: NavItemKey) => void;
}

export const TransactionsListPage: React.FC<TransactionsListPageProps> = ({ onNavigate }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [statusFilter, setStatusFilter] = useState<'all' | TransactionStatus>('all');
  const [bankFilter, setBankFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [manualMatchTxn, setManualMatchTxn] = useState<Transaction | null>(null);
  const [selectedInvoiceCode, setSelectedInvoiceCode] = useState('HD-2610-022');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Đã đồng bộ thành công các giao dịch mới nhất từ VietinBank & BIDV!');
    }, 1200);
  };

  const handleConfirmManualMatch = () => {
    if (!manualMatchTxn) return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === manualMatchTxn.id
          ? {
              ...t,
              status: 'matched',
              matchedInvoiceCode: selectedInvoiceCode,
              matchedRoom: selectedInvoiceCode === 'HD-2610-022' ? 'P.202' : 'P.101',
            }
          : t
      )
    );
    showToast(`Đã khớp giao dịch ${manualMatchTxn.code} với hóa đơn ${selectedInvoiceCode}!`);
    setManualMatchTxn(null);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchBank = bankFilter === 'all' || t.bankName === bankFilter;
    const matchSearch =
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.matchedInvoiceCode && t.matchedInvoiceCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.matchedRoom && t.matchedRoom.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchBank && matchSearch;
  });

  const renderStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'matched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#DCFCE7] text-[#15803D] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#15803D] rounded-none" />
            <span>Đã khớp</span>
          </span>
        );
      case 'unmatched':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEE2E2] text-[#B91C1C] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B91C1C] rounded-none" />
            <span>Chưa khớp</span>
          </span>
        );
      case 'review_needed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#FEF3C7] text-[#B45309] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 bg-[#B45309] rounded-none" />
            <span>Cần đối soát</span>
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
            Giao dịch & Đối soát VietQR
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi dòng tiền vào tài khoản và tự động khớp hóa đơn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Đang trích xuất sao kê giao dịch ngân hàng CSV...')}
            className="h-9 px-3 rounded-[4px] border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-slate-500">download</span>
            <span>Xuất sao kê</span>
          </button>
          <Button
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5"
          >
            <span
              className={`material-symbols-outlined text-base ${
                isSyncing ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ VietQR'}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Khớp hôm nay</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">
            {formatCurrency(7849500)}
          </div>
          <div className="mt-2 text-xs text-emerald-700">
            2 giao dịch Napas 247 thành công
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Chờ đối soát</div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-700">
            {formatCurrency(2500000)}
          </div>
          <div className="mt-2 text-xs text-amber-600">
            2 giao dịch thiếu cú pháp
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Tỷ lệ bóc tách tự động</div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900">94.2%</div>
          <div className="mt-2 text-xs text-slate-500">
            Nhận diện đúng mã HĐ và phòng
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Tài khoản kết nối</span>
            <span className="material-symbols-outlined text-base text-[#0F766E]">account_balance</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            VietinBank & BIDV
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Webhook đồng bộ tức thì
          </div>
        </div>
      </div>

      {/* Filter Bar */}
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
            Tất cả ({transactions.length})
          </button>
          <button
            onClick={() => setStatusFilter('matched')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'matched'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã khớp ({transactions.filter((t) => t.status === 'matched').length})
          </button>
          <button
            onClick={() => setStatusFilter('review_needed')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'review_needed'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Cần đối soát ({transactions.filter((t) => t.status === 'review_needed').length})
          </button>
          <button
            onClick={() => setStatusFilter('unmatched')}
            className={`h-8 px-3 rounded-[2px] font-medium transition-colors whitespace-nowrap ${
              statusFilter === 'unmatched'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Chưa khớp ({transactions.filter((t) => t.status === 'unmatched').length})
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <select
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
            className="h-8 border border-slate-200 rounded-[2px] px-2 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#0F766E] cursor-pointer"
          >
            <option value="all">Tất cả ngân hàng</option>
            <option value="VietinBank">VietinBank</option>
            <option value="BIDV">BIDV</option>
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
            placeholder="Tìm theo mã GD, nội dung, phòng..."
            className="w-full h-9 pl-9 pr-3 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F766E]"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium h-10 text-[11px]">
                <th className="px-4 py-2.5">Thời gian</th>
                <th className="px-4 py-2.5">Mã giao dịch</th>
                <th className="px-4 py-2.5">Tài khoản</th>
                <th className="px-4 py-2.5 text-right">Số tiền</th>
                <th className="px-4 py-2.5">Nội dung</th>
                <th className="px-4 py-2.5">Hóa đơn khớp</th>
                <th className="px-4 py-2.5 text-center">Trạng thái</th>
                <th className="px-4 py-2.5 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                    {t.time}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-[#0F766E]">
                    {t.code}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{t.bankName}</div>
                    <div className="font-mono text-[10px] text-slate-400">..{t.accountNumber.slice(-4)}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-700 text-sm">
                    +{formatCurrency(t.amount)}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-mono text-[11px] text-slate-800 bg-slate-50 p-1.5 border border-slate-200 rounded-[2px] break-all">
                      {t.content}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {t.matchedInvoiceCode ? (
                      <div>
                        <span className="font-mono font-bold text-[#0F766E] block">
                          {t.matchedInvoiceCode}
                        </span>
                        {t.matchedRoom && (
                          <span className="text-[10px] font-mono text-gray-500">
                            {t.matchedRoom}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-[11px]">Chưa gắn</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {renderStatusBadge(t.status)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {t.status !== 'matched' ? (
                      <button
                        onClick={() => setManualMatchTxn(t)}
                        className="px-2.5 py-1 bg-[#0F766E] text-white rounded-[2px] text-[11px] font-semibold hover:bg-[#0D9488] transition-colors"
                      >
                        Khớp thủ công
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('invoices')}
                        className="text-[#0F766E] hover:underline text-[11px] font-medium"
                      >
                        Xem hóa đơn
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Match Modal */}
      {manualMatchTxn && (
        <Modal
          isOpen={true}
          onClose={() => setManualMatchTxn(null)}
          title="Đối soát & Khớp lệnh thủ công"
          maxWidth="max-w-md"
        >
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-[#F8FAFC] p-3 border border-[#E2E8F0] rounded-[4px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Mã giao dịch:</span>
                <span className="font-mono font-bold text-[#0F766E]">{manualMatchTxn.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Số tiền nhận được:</span>
                <span className="font-mono font-bold text-[#15803D] text-sm">
                  {formatCurrency(manualMatchTxn.amount)}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Nội dung chuyển:</span>
                <div className="font-mono text-[11px] bg-white p-2 border border-gray-200 rounded-[2px] text-gray-800">
                  {manualMatchTxn.content}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Chọn hóa đơn cần gạch nợ:
              </label>
              <select
                value={selectedInvoiceCode}
                onChange={(e) => setSelectedInvoiceCode(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
              >
                {MOCK_INVOICES.filter((i) => i.status !== 'paid').map((inv) => (
                  <option key={inv.id} value={inv.code}>
                    {inv.code} — {inv.roomCode} ({inv.representativeName}) — Cần thu:{' '}
                    {formatCurrency(inv.totalAmount - inv.paidAmount)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setManualMatchTxn(null)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button size="sm" onClick={handleConfirmManualMatch}>
                Xác nhận gạch nợ
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
