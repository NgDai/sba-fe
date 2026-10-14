import React, { useState, useMemo } from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { MOCK_ROOMS } from '../../constants/mockData';
import { Room, RoomStatus } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface RoomsListPageProps {
  onNavigate: (key: NavItemKey) => void;
  onSelectRoom: (roomCode: string) => void;
}

export const RoomsListPage: React.FC<RoomsListPageProps> = ({
  onNavigate,
  onSelectRoom,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RoomStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoomCode, setNewRoomCode] = useState('');
  const [newRoomType, setNewRoomType] = useState('Phòng đơn 1 người');
  const [newRoomPrice, setNewRoomPrice] = useState('3500000');
  const [newRoomCapacity, setNewRoomCapacity] = useState('1');
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const matchSearch =
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType =
        typeFilter === 'all' ||
        (typeFilter === 'single' && r.type.includes('đơn')) ||
        (typeFilter === 'double' && r.type.includes('đôi')) ||
        (typeFilter === 'dorm4' && r.type.includes('ghép')) ||
        (typeFilter === 'studio' && r.type.includes('studio'));

      const matchStatus = statusFilter === 'all' || r.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [rooms, searchTerm, typeFilter, statusFilter]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomCode) return;
    const newRoom: Room = {
      id: `r-${Date.now()}`,
      code: newRoomCode.toUpperCase(),
      name: `Phòng ${newRoomCode.toUpperCase()}`,
      type: newRoomType,
      form: newRoomType.includes('ghép') ? 'Theo chỗ' : 'Nguyên phòng',
      occupied: 0,
      capacity: parseInt(newRoomCapacity) || 1,
      referencePrice: parseInt(newRoomPrice) || 3000000,
      status: 'vacant',
      branchId: 'cau-giay',
      floor: 1,
    };
    setRooms([newRoom, ...rooms]);
    setIsAddModalOpen(false);
    setNewRoomCode('');
  };

  const renderStatusBadge = (status: RoomStatus, occupied: number, capacity: number) => {
    switch (status) {
      case 'rented':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-none bg-slate-500 flex-shrink-0" />
            <span>Đang thuê {capacity > 1 ? `(${occupied}/${capacity})` : ''}</span>
          </span>
        );
      case 'vacant':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[2px] bg-emerald-50 text-emerald-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-600 flex-shrink-0" />
            <span>Còn trống</span>
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[2px] bg-amber-50 text-amber-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-none bg-amber-600 flex-shrink-0" />
            <span>Giữ cọc</span>
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[2px] bg-slate-100 text-slate-700 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-none bg-slate-500 flex-shrink-0" />
            <span>Bảo trì</span>
          </span>
        );
      case 'stopped':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[2px] bg-slate-100 text-slate-500 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-none bg-slate-400 flex-shrink-0" />
            <span>Tạm khóa</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 lg:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Phòng & chỗ ở
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            38 phòng vận hành tại CS Cầu Giấy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<span className="material-symbols-outlined text-base">add</span>}
          >
            Thêm phòng
          </Button>
        </div>
      </div>

      {/* Summary KPI Ribbons (Dense 6-Card Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Tổng phòng
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-slate-900">38</span>
            <span className="text-xs text-slate-400 font-mono">100%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Đang thuê
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-slate-900">28</span>
            <span className="text-xs text-[#0F766E] font-medium font-mono">73.7%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Còn trống
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-emerald-700">4</span>
            <span className="text-xs text-emerald-600 font-medium">Trống</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Giữ cọc
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-amber-700">2</span>
            <span className="text-xs text-amber-600 font-medium">Chờ ký</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Bảo trì
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-slate-700">2</span>
            <span className="text-xs text-slate-500 font-medium">Sửa chữa</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[4px] p-4 flex flex-col justify-between shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">
            Tạm khóa
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-bold font-mono text-slate-400">2</span>
            <span className="text-xs text-slate-400 font-medium">Dừng</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Strict 3-block logic) */}
      <div className="bg-white border border-slate-200 rounded-[4px] p-4 space-y-3 shadow-xs">
        {/* Row 1: Search & Room Type */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-slate-400 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm mã phòng..."
              className="w-full h-10 pl-10 pr-3 text-sm bg-white border border-slate-200 rounded-[4px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="relative w-full md:w-64">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full h-10 pl-3 pr-8 text-xs font-medium bg-white border border-slate-200 rounded-[4px] text-slate-900 focus:outline-none focus:border-[#0F766E] cursor-pointer appearance-none"
            >
              <option value="all">Loại phòng: Tất cả</option>
              <option value="single">Phòng đơn 1 người</option>
              <option value="double">Phòng đôi 2 người</option>
              <option value="dorm4">Phòng ghép 4 người</option>
              <option value="studio">Căn hộ studio</option>
            </select>
            <span className="material-symbols-outlined text-slate-400 text-[20px] absolute right-2.5 top-2.5 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto select-none py-1">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Tất cả</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('vacant')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'vacant'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Còn trống</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'vacant' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.filter((r) => r.status === 'vacant').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('reserved')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'reserved'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Giữ cọc</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'reserved' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.filter((r) => r.status === 'reserved').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('rented')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'rented'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Đang thuê</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'rented' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.filter((r) => r.status === 'rented').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('maintenance')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'maintenance'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Bảo trì</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'maintenance' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.filter((r) => r.status === 'maintenance').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('stopped')}
            className={`h-8 px-3 rounded-[2px] font-medium text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer ${
              statusFilter === 'stopped'
                ? 'bg-[#0F766E] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Tạm khóa</span>
            <span className={`font-mono text-[11px] px-1 py-0.2 rounded-[2px] ${
              statusFilter === 'stopped' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {rooms.filter((r) => r.status === 'stopped').length}
            </span>
          </button>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="h-10 bg-slate-50/80 border-b border-slate-200">
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 w-28">
                  Mã phòng
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Loại phòng
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 w-36">
                  Hình thức
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 text-center w-36">
                  Đang ở / Sức chứa
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 text-right w-44">
                  Giá tham chiếu
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 w-36">
                  Trạng thái
                </th>
                <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 text-center w-20">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.map((room) => (
                <tr
                  key={room.id}
                  onClick={() => {
                    onSelectRoom(room.code);
                    onNavigate('room-detail');
                  }}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-[13px] font-bold text-[#115E59] group-hover:underline">
                      {room.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#1F2937] font-medium">
                    {room.type}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B7280]">{room.form}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#1F2937]">
                      {room.occupied}/{room.capacity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[#1F2937]">
                      {formatCurrency(room.referencePrice)}
                      {room.priceUnit && (
                        <span className="text-[#6B7280] font-sans font-normal ml-0.5">
                          {room.priceUnit}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {renderStatusBadge(room.status, room.occupied, room.capacity)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room.code);
                        onNavigate('room-detail');
                      }}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-[2px] text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
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

        {/* Pagination Footer */}
        <div className="px-4 py-3 bg-white border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#6B7280]">
            Hiển thị{' '}
            <span className="font-mono font-semibold text-[#1F2937]">
              1–{filteredRooms.length}
            </span>{' '}
            trong số{' '}
            <span className="font-mono font-semibold text-[#1F2937]">38</span> phòng
          </div>
          <div className="flex items-center gap-1.5 select-none">
            <button
              disabled
              className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-[#F1F5F9] text-[#9CA3AF] flex items-center justify-center cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-[4px] bg-[#0F766E] text-white font-mono text-xs font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] text-[#1F2937] font-mono text-xs font-medium flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] text-[#1F2937] font-mono text-xs font-medium flex items-center justify-center transition-colors">
              3
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] text-[#1F2937] font-mono text-xs font-medium flex items-center justify-center transition-colors">
              4
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] text-[#1F2937] font-mono text-xs font-medium flex items-center justify-center transition-colors">
              5
            </button>
            <button className="w-8 h-8 rounded-[4px] border border-[#E5E7EB] bg-white hover:bg-[#F0FDFA] text-[#1F2937] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Quick Notes */}
      <div className="p-3 bg-white border border-[#E5E7EB] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between text-xs text-[#6B7280] gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#0D9488]">
            verified
          </span>
          <span>
            Đồng bộ theo thời gian thực với hợp đồng thuê và danh sách cọc cơ sở Cầu Giấy.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#9CA3AF]">
          <span>
            Cập nhật lần cuối:{' '}
            <strong className="font-mono font-normal text-[#1F2937]">Hôm nay, 14:32</strong>
          </span>
        </div>
      </div>

      {/* Add Room Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm phòng mới"
        description="Thêm buồng phòng vào cơ sở Cầu Giấy"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreateRoom}>Lưu thông tin phòng</Button>
          </>
        }
      >
        <form onSubmit={handleCreateRoom} className="space-y-3.5">
          <Input
            label="Mã phòng"
            placeholder="VD: P.103, P.205"
            value={newRoomCode}
            onChange={(e) => setNewRoomCode(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Loại phòng <span className="text-[#B91C1C]">*</span>
            </label>
            <select
              value={newRoomType}
              onChange={(e) => setNewRoomType(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-[#D1D5DB] rounded-[4px] text-sm text-[#1F2937] focus:outline-none focus:border-[#0D9488]"
            >
              <option value="Phòng đơn 1 người">Phòng đơn 1 người</option>
              <option value="Phòng đôi 2 người">Phòng đôi 2 người</option>
              <option value="Phòng ghép 4 người">Phòng ghép 4 người</option>
              <option value="Căn hộ studio">Căn hộ studio</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Sức chứa (người/chỗ)"
              type="number"
              min="1"
              max="8"
              value={newRoomCapacity}
              onChange={(e) => setNewRoomCapacity(e.target.value)}
              required
            />
            <Input
              label="Giá thuê tham chiếu (₫)"
              type="number"
              step="100000"
              value={newRoomPrice}
              onChange={(e) => setNewRoomPrice(e.target.value)}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
