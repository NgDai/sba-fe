import React from 'react';
import { NavItemKey } from '../../components/layout/Sidebar';
import { Button } from '../../components/common/Button';

interface SimpleModulePageProps {
  onNavigate: (key: NavItemKey) => void;
  title: string;
  category: string;
  description: string;
  actionText?: string;
  children?: React.ReactNode;
}

export const SimpleModulePage: React.FC<SimpleModulePageProps> = ({
  onNavigate,
  title,
  category,
  description,
  actionText = 'Thêm mới',
  children,
}) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 font-sans space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
        <button
          onClick={() => onNavigate('overview')}
          className="hover:text-[#0F766E] transition-colors cursor-pointer"
        >
          Hệ thống TroPro
        </button>
        <span className="text-[#9CA3AF]">/</span>
        <span className="text-[#6B7280]">{category}</span>
        <span className="text-[#9CA3AF]">/</span>
        <span className="text-[#1F2937] font-semibold">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            icon={<span className="material-symbols-outlined text-[16px]">add</span>}
            onClick={() => alert(`Thực hiện thao tác: ${actionText}`)}
          >
            {actionText}
          </Button>
        </div>
      </div>

      {children || (
        <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-8 text-center shadow-xs space-y-3">
          <div className="w-12 h-12 bg-[#F0FDFA] text-[#0F766E] rounded-[4px] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[24px]">folder_open</span>
          </div>
          <h3 className="text-sm font-bold text-[#1F2937]">Phân hệ {title}</h3>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            Dữ liệu được liên kết và đồng bộ tự động với hợp đồng, buồng phòng và giao dịch thanh toán trong hệ thống TroPro.
          </p>
        </div>
      )}
    </div>
  );
};
