/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { RoomsListPage } from './pages/rooms/RoomsListPage';
import { RoomDetailPage } from './pages/rooms/RoomDetailPage';
import { TenantsListPage } from './pages/tenants/TenantsListPage';
import { TenantDetailPage } from './pages/tenants/TenantDetailPage';
import { BookingsListPage } from './pages/bookings/BookingsListPage';
import { BookingDetailPage } from './pages/bookings/BookingDetailPage';
import { ContractsListPage } from './pages/contracts/ContractsListPage';
import { CreateContractPage } from './pages/contracts/CreateContractPage';
import { UtilityReadingsPage } from './pages/utilities/UtilityReadingsPage';
import { InvoicesListPage } from './pages/invoices/InvoicesListPage';
import { TransactionsListPage } from './pages/transactions/TransactionsListPage';
import { ServicesPage } from './pages/services/ServicesPage';
import { FacilitiesPage } from './pages/facilities/FacilitiesPage';
import { RepairsPage } from './pages/repairs/RepairsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { OtpVerification } from './pages/auth/OtpVerification';
import { ForgotPassword } from './pages/auth/ForgotPassword';

export type AppViewMode = 'dashboard' | 'login' | 'register' | 'otp' | 'forgot-password';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('dashboard');
  const [currentNav, setCurrentNav] = useState<NavItemKey>('overview');
  const [selectedBranch, setSelectedBranch] = useState('cau-giay');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedRoomCode, setSelectedRoomCode] = useState('P.305');
  const [selectedTenantId, setSelectedTenantId] = useState('t-mai');
  const [selectedBookingCode, setSelectedBookingCode] = useState('BK-2610-007');

  // Handle Auth View Routing
  if (viewMode === 'login') {
    return (
      <Login
        onSuccess={() => setViewMode('dashboard')}
        onNavigateToRegister={() => setViewMode('register')}
        onNavigateToForgotPassword={() => setViewMode('forgot-password')}
        onBackToApp={() => setViewMode('dashboard')}
      />
    );
  }

  if (viewMode === 'register') {
    return (
      <Register
        onSuccess={() => setViewMode('otp')}
        onNavigateToLogin={() => setViewMode('login')}
        onBackToApp={() => setViewMode('dashboard')}
      />
    );
  }

  if (viewMode === 'otp') {
    return (
      <OtpVerification
        onSuccess={() => setViewMode('dashboard')}
        onNavigateToLogin={() => setViewMode('login')}
        onBackToApp={() => setViewMode('dashboard')}
      />
    );
  }

  if (viewMode === 'forgot-password') {
    return (
      <ForgotPassword
        onSuccess={() => setViewMode('login')}
        onNavigateToLogin={() => setViewMode('login')}
        onBackToApp={() => setViewMode('dashboard')}
      />
    );
  }

  // Render current dashboard page
  const renderDashboardContent = () => {
    switch (currentNav) {
      case 'overview':
        return (
          <OverviewPage
            onNavigate={(key) => setCurrentNav(key)}
            selectedBranch={selectedBranch}
          />
        );
      case 'rooms':
        return (
          <RoomsListPage
            onNavigate={(key) => setCurrentNav(key)}
            onSelectRoom={(code) => setSelectedRoomCode(code)}
          />
        );
      case 'room-detail':
        return (
          <RoomDetailPage
            roomCode={selectedRoomCode}
            onNavigate={(key) => setCurrentNav(key)}
            onSelectTenant={(id) => setSelectedTenantId(id)}
          />
        );
      case 'tenants':
        return (
          <TenantsListPage
            onNavigate={(key) => setCurrentNav(key)}
            onSelectTenant={(id) => setSelectedTenantId(id)}
          />
        );
      case 'tenant-detail':
        return (
          <TenantDetailPage
            tenantId={selectedTenantId}
            onNavigate={(key) => setCurrentNav(key)}
          />
        );
      case 'bookings':
        return (
          <BookingsListPage
            onNavigate={(key) => setCurrentNav(key)}
            onSelectBooking={(code) => setSelectedBookingCode(code)}
          />
        );
      case 'booking-detail':
        return (
          <BookingDetailPage
            bookingCode={selectedBookingCode}
            onNavigate={(key) => setCurrentNav(key)}
          />
        );
      case 'contracts':
        return <ContractsListPage onNavigate={(key) => setCurrentNav(key)} />;
      case 'contract-create':
        return <CreateContractPage onNavigate={(key) => setCurrentNav(key)} />;
      case 'utilities':
        return <UtilityReadingsPage onNavigate={(key) => setCurrentNav(key)} />;

      // Full-featured Modules
      case 'invoices':
        return <InvoicesListPage onNavigate={(key) => setCurrentNav(key)} />;

      case 'transactions':
        return <TransactionsListPage onNavigate={(key) => setCurrentNav(key)} />;

      case 'services':
        return <ServicesPage onNavigate={(key) => setCurrentNav(key)} />;

      case 'facilities':
        return <FacilitiesPage onNavigate={(key) => setCurrentNav(key)} />;

      case 'repairs':
        return <RepairsPage onNavigate={(key) => setCurrentNav(key)} />;

      case 'branches-setting':
        return (
          <SettingsPage
            onNavigate={(key) => setCurrentNav(key)}
            defaultTab="branches"
          />
        );

      case 'room-types':
        return (
          <SettingsPage
            onNavigate={(key) => setCurrentNav(key)}
            defaultTab="room-types"
          />
        );

      case 'managers':
        return (
          <SettingsPage
            onNavigate={(key) => setCurrentNav(key)}
            defaultTab="managers"
          />
        );

      case 'bank-accounts':
        return (
          <SettingsPage
            onNavigate={(key) => setCurrentNav(key)}
            defaultTab="bank-accounts"
          />
        );

      default:
        return (
          <OverviewPage
            onNavigate={(key) => setCurrentNav(key)}
            selectedBranch={selectedBranch}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#1F2937]">
      {/* Fixed Sidebar */}
      <Sidebar
        currentKey={currentNav}
        onSelect={(key) => {
          setCurrentNav(key);
          setIsMobileSidebarOpen(false);
        }}
        selectedBranch={selectedBranch}
        onSelectBranch={(branch) => setSelectedBranch(branch)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="md:pl-[240px] flex flex-col min-h-screen">
        <Header
          currentKey={currentNav}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenAuthPreview={(mode) => setViewMode(mode)}
        />

        <main className="pt-14 flex-1 min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC]">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
}
