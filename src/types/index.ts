export type BranchId = 'all' | 'cau-giay' | 'thanh-xuan';

export interface Branch {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  occupiedRooms: number;
  totalDebt: number;
}

export type RoomStatus = 'rented' | 'vacant' | 'reserved' | 'maintenance' | 'stopped';
export type RoomForm = 'Nguyên phòng' | 'Theo chỗ';

export interface Room {
  id: string;
  code: string;
  name: string;
  type: string;
  form: RoomForm;
  occupied: number;
  capacity: number;
  referencePrice: number;
  priceUnit?: string; // '/chỗ' or ''
  status: RoomStatus;
  branchId: string;
  floor: number;
  area?: number;
}

export interface Slot {
  id: string;
  code: string;
  roomId: string;
  tenantId?: string;
  tenantName?: string;
  isRepresentative?: boolean;
  contractCode?: string;
  startDate?: string;
  expectedEndDate?: string;
  status: 'occupied' | 'vacant' | 'reserved';
}

export interface Tenant {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  idNumber: string;
  idVerified: boolean;
  idIssueDate: string;
  idIssuePlace: string;
  hometown: string;
  occupation: string;
  status: 'active' | 'departed';
  isRepresentative: boolean;
  roomId: string;
  roomCode: string;
  slotCode?: string;
  contractCode: string;
  startDate: string;
  branchName: string;
  currentDebt: number;
}

export type ContractStatus = 'active' | 'expiring' | 'draft' | 'expired' | 'ended';

export interface Contract {
  id: string;
  code: string;
  roomCode: string;
  branchName: string;
  roomDesc: string;
  slotDesc?: string;
  representativeName: string;
  representativePhone: string;
  startDate: string;
  endDate: string;
  durationMonths: number;
  monthlyRent: number;
  deposit: number;
  paymentCycleDay: number;
  peopleCount: number;
  status: ContractStatus;
  daysRemaining?: number;
}

export type BookingStatus = 'pending' | 'deposit_pending' | 'reserved' | 'converted' | 'cancelled';

export interface Booking {
  id: string;
  code: string;
  timeStr: string;
  customerName: string;
  customerPhone: string;
  customerIdNumber: string;
  idVerified: boolean;
  customerEmail: string;
  roomCode: string;
  slotCode?: string;
  roomDesc: string;
  branchName: string;
  checkInDate: string;
  daysUntilCheckIn: number;
  depositAmount: number;
  depositStatus: 'unpaid' | 'paid' | 'transferred' | 'vietqr';
  bookingStatus: BookingStatus;
  customerNote?: string;
  urgentRemainingSeconds?: number;
}

export interface UtilityRecord {
  id: string;
  roomCode: string;
  tenantName: string;
  isMaintenance?: boolean;
  electricPrev: number;
  electricCurrent: number | string;
  waterPrev: number;
  waterCurrent: number | string;
  status: 'completed' | 'pending' | 'invalid_electric' | 'invalid_water' | 'free';
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  phone: string;
  email: string;
}

// Invoices & Billing
export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'partial';

export interface Invoice {
  id: string;
  code: string; // e.g. HD-2610-021
  period: string; // e.g. '10/2026'
  roomCode: string;
  branchName: string;
  representativeName: string;
  representativePhone: string;
  dueDate: string;
  paidDate?: string;
  roomFee: number;
  electricFee: number;
  electricUsage: number;
  waterFee: number;
  waterUsage: number;
  serviceFee: number;
  discount?: number;
  totalAmount: number;
  paidAmount: number;
  status: InvoiceStatus;
  paymentMethod?: 'vietqr' | 'cash' | 'transfer';
  note?: string;
}

// Transactions & VietQR
export type TransactionStatus = 'matched' | 'unmatched' | 'review_needed';

export interface Transaction {
  id: string;
  code: string;
  bankName: string;
  accountNumber: string;
  amount: number;
  time: string;
  content: string;
  matchedInvoiceCode?: string;
  matchedRoom?: string;
  status: TransactionStatus;
}

// Services & Pricing
export type ServicePricingType = 'metered' | 'fixed_room' | 'fixed_person' | 'free';

export interface ServiceItem {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
  type: ServicePricingType;
  description: string;
  appliedBranches: string[];
  isActive: boolean;
}

// Facilities & Assets
export type FacilityStatus = 'good' | 'maintenance' | 'broken' | 'replaced';

export interface FacilityItem {
  id: string;
  code: string;
  name: string;
  brand: string;
  model?: string;
  roomCode: string;
  branchName: string;
  floor: number;
  installDate: string;
  warrantyUntil: string;
  originalValue: number;
  status: FacilityStatus;
  notes?: string;
}

// Repairs & Maintenance
export type RepairPriority = 'urgent' | 'normal' | 'low';
export type RepairStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type RepairCategory = 'Điện nước' | 'Điều hòa' | 'Khóa & Cửa' | 'Nội thất' | 'Thấm dột' | 'Khác';

export interface RepairRequest {
  id: string;
  code: string;
  roomCode: string;
  tenantName: string;
  tenantPhone: string;
  category: RepairCategory;
  description: string;
  priority: RepairPriority;
  status: RepairStatus;
  assignedTechnician?: string;
  technicianPhone?: string;
  estimatedCost: number;
  actualCost?: number;
  createdAt: string;
  completedAt?: string;
  isChargedToTenant?: boolean;
}

// Settings items
export interface BranchSettingItem {
  id: string;
  name: string;
  code: string;
  address: string;
  managerName: string;
  phone: string;
  totalFloors: number;
  totalRooms: number;
  electricRate: number;
  waterRate: number;
}

export interface RoomTypeItem {
  id: string;
  code: string;
  name: string;
  targetOccupancy: number;
  defaultArea: number;
  basePrice: number;
  depositMonths: number;
  amenities: string[];
}

export interface ManagerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Chủ trọ' | 'Quản lý cơ sở' | 'Kế toán' | 'Kỹ thuật viên';
  branches: string[];
  status: 'active' | 'locked';
}

export interface BankAccountItem {
  id: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branchName: string;
  isDefault: boolean;
}
