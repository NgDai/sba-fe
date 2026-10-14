import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import {
  MOCK_BRANCH_SETTINGS,
  MOCK_ROOM_TYPES,
  MOCK_MANAGERS,
  MOCK_BANK_ACCOUNTS,
} from '../../constants/mockData';
import {
  BranchSettingItem,
  RoomTypeItem,
  ManagerItem,
  BankAccountItem,
} from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export type SettingsTab = 'branches' | 'room-types' | 'managers' | 'bank-accounts';

interface SettingsPageProps {
  onNavigate: (key: NavItemKey) => void;
  defaultTab?: SettingsTab;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onNavigate,
  defaultTab = 'branches',
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(defaultTab);
  const [branches, setBranches] = useState<BranchSettingItem[]>(MOCK_BRANCH_SETTINGS);
  const [roomTypes, setRoomTypes] = useState<RoomTypeItem[]>(MOCK_ROOM_TYPES);
  const [managers, setManagers] = useState<ManagerItem[]>(MOCK_MANAGERS);
  const [bankAccounts, setBankAccounts] = useState<BankAccountItem[]>(MOCK_BANK_ACCOUNTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal controls
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);

  // Form states for Branch
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchManager, setBranchManager] = useState('');
  const [branchPhone, setBranchPhone] = useState('');
  const [branchRooms, setBranchRooms] = useState(30);

  // Form states for Room Type
  const [rtName, setRtName] = useState('');
  const [rtCode, setRtCode] = useState('RT-NEW');
  const [rtArea, setRtArea] = useState(25);
  const [rtPrice, setRtPrice] = useState(4500000);
  const [rtOccupancy, setRtOccupancy] = useState(2);

  // Form states for Manager
  const [mgrName, setMgrName] = useState('');
  const [mgrEmail, setMgrEmail] = useState('');
  const [mgrPhone, setMgrPhone] = useState('');
  const [mgrRole, setMgrRole] = useState<'Quản lý cơ sở' | 'Kế toán' | 'Kỹ thuật viên'>('Quản lý cơ sở');

  // Form states for Bank
  const [bankName, setBankName] = useState('Techcombank');
  const [bankAccNumber, setBankAccNumber] = useState('');
  const [bankAccHolder, setBankAccHolder] = useState('NGUYEN VAN HUNG');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: BranchSettingItem = {
      id: `branch-${Date.now()}`,
      code: `CS-${branches.length + 1}`,
      name: branchName,
      address: branchAddress,
      managerName: branchManager,
      phone: branchPhone,
      totalFloors: 5,
      totalRooms: branchRooms,
      electricRate: 3500,
      waterRate: 30000,
    };
    setBranches([...branches, newB]);
    setIsAddBranchOpen(false);
    showToast(`Đã thêm cơ sở tòa nhà mới: "${newB.name}"!`);
  };

  const handleAddRoomType = (e: React.FormEvent) => {
    e.preventDefault();
    const newRT: RoomTypeItem = {
      id: `rt-${Date.now()}`,
      code: rtCode,
      name: rtName,
      targetOccupancy: rtOccupancy,
      defaultArea: rtArea,
      basePrice: rtPrice,
      depositMonths: 1,
      amenities: ['Điều hòa Inverter', 'Bình nóng lạnh', 'Giường đệm', 'Tủ quần áo'],
    };
    setRoomTypes([...roomTypes, newRT]);
    setIsAddRoomTypeOpen(false);
    showToast(`Đã thêm loại phòng mới: "${newRT.name}"!`);
  };

  const handleAddManager = (e: React.FormEvent) => {
    e.preventDefault();
    const newMgr: ManagerItem = {
      id: `m-${Date.now()}`,
      name: mgrName,
      email: mgrEmail,
      phone: mgrPhone,
      role: mgrRole,
      branches: ['Cơ sở Cầu Giấy'],
      status: 'active',
    };
    setManagers([...managers, newMgr]);
    setIsAddManagerOpen(false);
    showToast(`Đã gửi thư mời tham gia ban quản lý tới "${newMgr.email}"!`);
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    const newBA: BankAccountItem = {
      id: `ba-${Date.now()}`,
      bankCode: 'TCB',
      bankName: bankName,
      accountNumber: bankAccNumber,
      accountHolder: bankAccHolder,
      branchName: 'Chi nhánh Hà Nội',
      isDefault: false,
    };
    setBankAccounts([...bankAccounts, newBA]);
    setIsAddBankOpen(false);
    showToast(`Đã cấu hình tài khoản thụ hưởng VietQR ${newBA.accountNumber}!`);
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
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cấu hình & Thiết lập</h1>
        <p className="text-xs text-slate-500 mt-1">
          Thiết lập cơ sở tòa nhà, danh mục loại phòng, tài khoản nhân sự và thông tin thụ hưởng VietQR
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-2 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('branches')}
          className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'branches'
              ? 'border-[#0F766E] text-[#0F766E] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-base">domain</span>
          <span>Cơ sở & Tòa nhà ({branches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('room-types')}
          className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'room-types'
              ? 'border-[#0F766E] text-[#0F766E] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-base">category</span>
          <span>Loại phòng & Tiện ích ({roomTypes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('managers')}
          className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'managers'
              ? 'border-[#0F766E] text-[#0F766E] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-base">badge</span>
          <span>Nhân sự & Phân quyền ({managers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bank-accounts')}
          className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'bank-accounts'
              ? 'border-[#0F766E] text-[#0F766E] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-base">account_balance</span>
          <span>Tài khoản VietQR ({bankAccounts.length})</span>
        </button>
      </div>

      {/* TAB 1: BRANCHES */}
      {activeTab === 'branches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1F2937]">Danh sách cơ sở lưu trú</h2>
            <Button
              size="sm"
              onClick={() => {
                setBranchName('');
                setBranchAddress('');
                setBranchManager('');
                setBranchPhone('');
                setIsAddBranchOpen(true);
              }}
              className="flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Thêm cơ sở mới</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-[4px] p-5 shadow-xs hover:border-[#0F766E] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-teal-50 px-1.5 py-0.5 rounded-[2px]">
                      {b.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">{b.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-slate-400">
                        location_on
                      </span>
                      <span>{b.address}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => showToast(`Cập nhật cơ sở ${b.name}`)}
                    className="p-1 rounded-[2px] text-slate-400 hover:text-[#0F766E]"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Quản lý:</span>
                    <span className="font-semibold text-gray-800">{b.managerName}</span>
                    <div className="text-[10px] text-gray-500 font-mono">{b.phone}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Quy mô:</span>
                    <span className="font-bold font-mono text-[#0F766E]">
                      {b.totalRooms} phòng
                    </span>
                    <div className="text-[10px] text-gray-500">{b.totalFloors} tầng lầu</div>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Đơn giá cơ sở:</span>
                    <div className="font-mono text-[11px] font-semibold text-gray-700">
                      Đ: {formatCurrency(b.electricRate)}
                    </div>
                    <div className="font-mono text-[11px] font-semibold text-gray-700">
                      N: {formatCurrency(b.waterRate)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ROOM TYPES */}
      {activeTab === 'room-types' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1F2937]">Danh mục cấu hình loại phòng</h2>
            <Button
              size="sm"
              onClick={() => {
                setRtName('');
                setIsAddRoomTypeOpen(true);
              }}
              className="flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Thêm loại phòng</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomTypes.map((rt) => (
              <div
                key={rt.id}
                className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs hover:border-[#0F766E] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-[2px]">
                      {rt.code}
                    </span>
                    <h3 className="text-base font-bold text-[#1F2937] mt-1">{rt.name}</h3>
                    <div className="text-xs text-[#6B7280] mt-1">
                      Diện tích tiêu chuẩn: <span className="font-mono font-bold text-gray-800">{rt.defaultArea} m²</span> · Sức chứa: <span className="font-bold text-gray-800">{rt.targetOccupancy} người</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-[#0F766E]">
                      {formatCurrency(rt.basePrice)}
                    </div>
                    <div className="text-[10px] text-gray-400">/ tháng</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1.5">
                    Trang thiết bị & tiện ích đi kèm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rt.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-[2px] bg-gray-100 text-gray-700 text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MANAGERS */}
      {activeTab === 'managers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1F2937]">Ban quản lý & Kỹ thuật viên</h2>
            <Button
              size="sm"
              onClick={() => {
                setMgrName('');
                setMgrEmail('');
                setMgrPhone('');
                setIsAddManagerOpen(true);
              }}
              className="flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>Mời nhân sự</span>
            </Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="px-4 py-2">Họ và tên</th>
                <th className="px-4 py-2">Vai trò</th>
                <th className="px-4 py-2">Liên hệ</th>
                <th className="px-4 py-2">Cơ sở phụ trách</th>
                <th className="px-4 py-2 text-center">Trạng thái</th>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {managers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {m.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-[2px] bg-teal-50 text-teal-800 font-medium text-[11px]">
                        {m.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{m.email}</div>
                      <div className="font-mono text-[10px] text-slate-400">{m.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {m.branches.join(', ')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-600" />
                        <span>Đang hoạt động</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BANK ACCOUNTS */}
      {activeTab === 'bank-accounts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1F2937]">
                Tài khoản ngân hàng VietQR thụ hưởng
              </h2>
              <p className="text-xs text-gray-500">
                Tiền phòng và hóa đơn dịch vụ của khách thuê sẽ được thanh toán vào các số tài khoản này.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                setBankAccNumber('');
                setIsAddBankOpen(true);
              }}
              className="flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Thêm tài khoản</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankAccounts.map((ba) => (
              <div
                key={ba.id}
                className="bg-white border border-[#E5E7EB] rounded-[4px] p-5 shadow-xs relative overflow-hidden"
              >
                {ba.isDefault && (
                  <div className="absolute top-0 right-0 bg-[#0F766E] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-[4px]">
                    TÀI KHOẢN MẶC ĐỊNH
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-red-50 text-red-700 border border-red-200 flex items-center justify-center font-bold text-xs">
                    {ba.bankCode}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1F2937]">{ba.bankName}</h3>
                    <p className="text-xs text-gray-500">{ba.branchName}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Số tài khoản:</span>
                    <span className="font-mono font-bold text-sm text-[#0F766E]">
                      {ba.accountNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Chủ tài khoản:</span>
                    <span className="font-semibold text-gray-800 uppercase">
                      {ba.accountHolder}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  <span className="text-[#15803D] flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                    <span>Tích hợp Napas 247 VietQR</span>
                  </span>
                  <button
                    onClick={() => showToast(`Đã kiểm tra kết nối Webhook VietQR ngân hàng ${ba.bankCode}!`)}
                    className="text-[#0F766E] hover:underline font-semibold"
                  >
                    Kiểm tra kết nối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Branch */}
      {isAddBranchOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddBranchOpen(false)}
          title="Thêm cơ sở tòa nhà mới"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddBranch} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên cơ sở <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Cơ sở Ba Đình"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Địa chỉ chi tiết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Số nhà, ngõ, đường, quận..."
                value={branchAddress}
                onChange={(e) => setBranchAddress(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Quản lý trưởng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên..."
                  value={branchManager}
                  onChange={(e) => setBranchManager(e.target.value)}
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
                  placeholder="09xx..."
                  value={branchPhone}
                  onChange={(e) => setBranchPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsAddBranchOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Tạo cơ sở
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Add Room Type */}
      {isAddRoomTypeOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddRoomTypeOpen(false)}
          title="Thêm loại phòng mới"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddRoomType} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Mã loại phòng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={rtCode}
                  onChange={(e) => setRtCode(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Sức chứa tối đa (người)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rtOccupancy}
                  onChange={(e) => setRtOccupancy(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên loại phòng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Căn hộ Duplex gác lửng cao cấp"
                value={rtName}
                onChange={(e) => setRtName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Diện tích tiêu chuẩn (m²)
                </label>
                <input
                  type="number"
                  value={rtArea}
                  onChange={(e) => setRtArea(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Giá thuê niêm yết (₫/tháng)
                </label>
                <input
                  type="number"
                  step="100000"
                  value={rtPrice}
                  onChange={(e) => setRtPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsAddRoomTypeOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Lưu loại phòng
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Add Manager */}
      {isAddManagerOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddManagerOpen(false)}
          title="Mời nhân sự quản lý"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddManager} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={mgrName}
                onChange={(e) => setMgrName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#374151] mb-1">
                  Email nhận lời mời <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={mgrEmail}
                  onChange={(e) => setMgrEmail(e.target.value)}
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
                  value={mgrPhone}
                  onChange={(e) => setMgrPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Vai trò phân quyền
              </label>
              <select
                value={mgrRole}
                onChange={(e) => setMgrRole(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              >
                <option value="Quản lý cơ sở">Quản lý cơ sở (Full quyền chi nhánh)</option>
                <option value="Kế toán">Kế toán (Thu chi, hóa đơn & đối soát)</option>
                <option value="Kỹ thuật viên">Kỹ thuật viên (CSVC & sửa chữa)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsAddManagerOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Gửi lời mời
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Add Bank */}
      {isAddBankOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddBankOpen(false)}
          title="Cấu hình tài khoản nhận tiền VietQR"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddBank} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Ngân hàng thụ hưởng <span className="text-red-500">*</span>
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-xs focus:outline-none focus:border-[#0F766E]"
              >
                <option value="Techcombank (Ngân hàng Kỹ Thương)">Techcombank</option>
                <option value="MB Bank (Ngân hàng Quân Đội)">MB Bank</option>
                <option value="VPBank (Ngân hàng Việt Nam Thịnh Vượng)">VPBank</option>
                <option value="ACB (Ngân hàng Á Châu)">ACB</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Số tài khoản ngân hàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Nhập số tài khoản chính xác..."
                value={bankAccNumber}
                onChange={(e) => setBankAccNumber(e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#374151] mb-1">
                Tên chủ tài khoản (Viết hoa không dấu) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={bankAccHolder}
                onChange={(e) => setBankAccHolder(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] font-mono text-xs focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setIsAddBankOpen(false)}
                className="px-4 py-2 border border-[#D1D5DB] rounded-[4px] text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <Button type="submit" size="sm">
                Lưu tài khoản VietQR
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
