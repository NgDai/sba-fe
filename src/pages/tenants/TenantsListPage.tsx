import React, { useState } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_TENANTS } from '../../constants/mockData';
import { Tenant } from '../../types';
import { Drawer } from '../../components/common/Drawer';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

interface TenantsListPageProps {
  onNavigate: (key: NavItemKey) => void;
  onSelectTenant: (tenantId: string) => void;
}

export const TenantsListPage: React.FC<TenantsListPageProps> = ({
  onNavigate,
  onSelectTenant,
}) => {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'departed'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // New tenant form state matching Image 5
  const [newName, setNewName] = useState('');
  const [newDob, setNewDob] = useState('2001-08-12');
  const [newGender, setNewGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nữ');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCccd, setNewCccd] = useState('');
  const [newRoomSlot, setNewRoomSlot] = useState('P.305 - G.04 (Còn trống)');
  const [newRole, setNewRole] = useState('Thành viên ở cùng');
  const [sendInvite, setSendInvite] = useState(true);

  const filteredTenants = tenants.filter((t) => {
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.roomCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    const created: Tenant = {
      id: `t-${Date.now()}`,
      code: `UID-NT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      dob: newDob,
      gender: newGender,
      idNumber: newCccd || '0012 0100 8921',
      idVerified: true,
      idIssueDate: '10/05/2021',
      idIssuePlace: 'Cục CSQLHC về TTXH',
      hometown: 'Hà Nội',
      occupation: 'Sinh viên / Đi làm',
      status: 'active',
      isRepresentative: newRole.includes('đại diện'),
      roomId: 'r-305',
      roomCode: 'P.305',
      slotCode: 'G-04',
      contractCode: 'HĐ-2611-0501',
      startDate: '01/11/2026',
      branchName: 'CS Cầu Giấy',
      currentDebt: 0,
    };
    setTenants([created, ...tenants]);
    setIsDrawerOpen(false);
    // Reset form
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewCccd('');
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Khách thuê
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            48 khách đang lưu trú · CS Cầu Giấy & CS Thanh Xuân
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            icon={<span className="material-symbols-outlined text-base">person_add</span>}
          >
            Thêm người thuê
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Chips */}
        <div className="flex items-center gap-1.5 select-none">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`h-8 px-3 rounded-[2px] text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Tất cả</span>
            <span className="font-mono text-[11px] opacity-80">48</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`h-8 px-3 rounded-[2px] text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Đang ở</span>
            <span className="font-mono text-[11px] opacity-80">42</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('departed')}
            className={`h-8 px-3 rounded-[2px] text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'departed'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Đã chuyển đi</span>
            <span className="font-mono text-[11px] opacity-80">6</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-slate-400 pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, SĐT, số CCCD..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0F766E] text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold h-9 text-xs">
                <th className="py-2 px-4">
                  Họ tên
                </th>
                <th className="py-2 px-3">
                  Số điện thoại
                </th>
                <th className="py-2 px-3">
                  Phòng / Chỗ
                </th>
                <th className="py-2 px-3">
                  Vai trò
                </th>
                <th className="py-2 px-3">
                  CCCD / Định danh
                </th>
                <th className="py-2 px-4 text-center w-16">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  onClick={() => {
                    onSelectTenant(tenant.id);
                    onNavigate('tenant-detail');
                  }}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[4px] bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex items-center justify-center font-mono flex-shrink-0">
                        {getInitials(tenant.name)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1F2937] group-hover:underline">
                          {tenant.name}
                        </div>
                        <div className="text-[11px] text-[#6B7280]">
                          {tenant.gender} · {tenant.dob.slice(-4)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs text-[#1F2937]">
                    {tenant.phone}
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono text-xs font-semibold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-[2px] border border-[#CCFBF1]">
                      {tenant.roomCode} {tenant.slotCode ? `- ${tenant.slotCode}` : ''}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    {tenant.isRepresentative ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#DBEAFE] text-[#1D4ED8] font-semibold text-[11px] rounded-[2px]">
                        <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-none" />
                        Đại diện HĐ
                      </span>
                    ) : (
                      <span className="text-xs text-[#6B7280]">Thành viên ở cùng</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-[#1F2937]">
                        {tenant.idNumber}
                      </span>
                      {tenant.idVerified && (
                        <span
                          className="material-symbols-outlined text-[16px] text-[#15803D]"
                          title="Đã xác thực CCCD"
                        >
                          verified
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-[2px] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F1F5F9] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
          <div>
            Hiển thị <span className="font-mono font-semibold text-[#1F2937]">1–{filteredTenants.length}</span> trong số <span className="font-mono font-semibold text-[#1F2937]">38</span> người đang ở
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-[4px] bg-[#0F766E] text-white font-mono text-xs font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] hover:bg-[#F0FDFA] font-mono text-xs flex items-center justify-center">
              2
            </button>
          </div>
        </div>
      </div>

      {/* Drawer: Thêm người thuê mới (Exact Image 5 screen) */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Thêm người thuê mới"
        icon={<span className="material-symbols-outlined text-[20px]">person_add</span>}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleAddTenant}
              icon={<span className="material-symbols-outlined text-[18px]">save</span>}
            >
              Lưu người thuê
            </Button>
          </>
        }
      >
        {/* Info callout */}
        <div className="bg-[#F0FDFA] border border-[#99F6E4] rounded-[4px] p-3.5 flex items-start gap-2.5 text-xs text-[#0F766E] leading-relaxed">
          <span className="material-symbols-outlined text-[20px] text-[#0D9488] shrink-0 mt-0.5">
            info
          </span>
          <span>
            Thông tin định danh CCCD và số điện thoại dùng để xuất hợp đồng điện tử và phân quyền ứng dụng dành cho khách thuê.
          </span>
        </div>

        <form onSubmit={handleAddTenant} className="space-y-4">
          <Input
            label="Họ và tên"
            placeholder="Ví dụ: Nguyễn Văn An"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Ngày sinh
              </label>
              <input
                type="date"
                value={newDob}
                onChange={(e) => setNewDob(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-2">
                Giới tính
              </label>
              <div className="flex items-center gap-4 text-xs text-[#374151] h-9">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={newGender === 'Nam'}
                    onChange={() => setNewGender('Nam')}
                    className="text-[#0F766E] focus:ring-0"
                  />
                  <span>Nam</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={newGender === 'Nữ'}
                    onChange={() => setNewGender('Nữ')}
                    className="text-[#0F766E] focus:ring-0"
                  />
                  <span>Nữ</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={newGender === 'Khác'}
                    onChange={() => setNewGender('Khác')}
                    className="text-[#0F766E] focus:ring-0"
                  />
                  <span>Khác</span>
                </label>
              </div>
            </div>
          </div>

          <Input
            label="Số điện thoại"
            placeholder="0912 345 678"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            rightIcon={<span className="material-symbols-outlined text-[18px]">call</span>}
            required
          />

          <Input
            label="Email liên hệ"
            placeholder="nguyenvanan@gmail.com"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            rightIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
          />

          <Input
            label="Số CCCD / Mã định danh"
            placeholder="12 chữ số trên thẻ CCCD gắn chip"
            value={newCccd}
            onChange={(e) => setNewCccd(e.target.value)}
            rightIcon={<span className="material-symbols-outlined text-[18px]">badge</span>}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Phòng / Vị trí giường <span className="text-[#B91C1C]">*</span>
              </label>
              <select
                value={newRoomSlot}
                onChange={(e) => setNewRoomSlot(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              >
                <option value="P.305 - G.04 (Còn trống)">P.305 - G.04 (Còn trống)</option>
                <option value="P.102 (Nguyên phòng)">P.102 (Nguyên phòng)</option>
                <option value="P.402 - K.02">P.402 - Slot K.02</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Vai trò hợp đồng <span className="text-[#B91C1C]">*</span>
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-xs text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
              >
                <option value="Thành viên ở cùng">Thành viên ở cùng</option>
                <option value="Đại diện hợp đồng">Đại diện hợp đồng</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px]">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendInvite}
                onChange={(e) => setSendInvite(e.target.checked)}
                className="mt-0.5 rounded-[2px] text-[#0F766E] focus:ring-0 border-[#D1D5DB]"
              />
              <div>
                <div className="text-xs font-semibold text-[#1F2937]">
                  Tạo tài khoản và gửi lời mời đăng nhập
                </div>
                <div className="text-[11px] text-[#6B7280] mt-0.5">
                  Gửi thông báo mã kích hoạt tài khoản cư dân qua SMS và Zalo ZNS.
                </div>
              </div>
            </label>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
