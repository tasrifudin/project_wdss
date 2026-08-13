import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  FileText, 
  Truck, 
  BarChart3, 
  MapPin, 
  CircleDollarSign, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  Users,
  Layers,
  Sparkles,
  Printer,
  KeyRound,
  FileSpreadsheet,
  PackageCheck,
  Receipt,
  ShieldCheck,
  ShieldAlert,
  ClipboardList,
  X
} from 'lucide-react';
import { NavigationTab } from '../../types';
import WDSLogo from '../common/WDSLogo';

interface SidebarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  currentRole?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed: externalCollapsed,
  setCollapsed: externalSetCollapsed,
  mobileOpen: externalMobileOpen,
  setMobileOpen: externalSetMobileOpen,
  currentRole,
}) => {
  // Internal fallback state if props not provided
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const setCollapsed = externalSetCollapsed || setInternalCollapsed;

  const mobileOpen = externalMobileOpen !== undefined ? externalMobileOpen : internalMobileOpen;
  const setMobileOpen = externalSetMobileOpen || setInternalMobileOpen;
  // Accordion state for submenus
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(() => {
    if (currentTab.startsWith('master-')) return 'master';
    if (currentTab.startsWith('transaction-')) return 'transaction';
    if (currentTab.startsWith('shipment-')) return 'shipment';
    if (currentTab.startsWith('report-')) return 'report';
    if (currentTab.startsWith('track-')) return 'track';
    if (currentTab.startsWith('finance-')) return 'finance';
    if (currentTab.startsWith('settings-')) return 'settings';
    return null;
  });

  const toggleSubmenu = (menu: string) => {
    if (collapsed) setCollapsed(false);
    setOpenSubmenu(prev => (prev === menu ? null : menu));
  };

  const handleTabClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-[#005B9A] text-white flex flex-col transition-all duration-300 border-r border-[#004a7f] shadow-xl ${
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Logo & Header */}
        <div className={`h-16 border-b border-white/10 bg-[#004c82] flex items-center justify-between ${collapsed ? 'px-2' : 'px-4'}`}>
          <div className="flex items-center space-x-2.5 overflow-hidden min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
              <WDSLogo className="w-full h-full" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm text-white tracking-tight truncate">
                  PT WAHANA DWI SATRIA
                </span>
                <span className="text-[11px] text-blue-200/90 tracking-wider uppercase font-medium">
                  SOLUSI - LOGISTICS
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center shrink-0">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-white/20">
          
          {/* Dashboard Item */}
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-white text-[#0070C0] shadow-md shadow-black/10 font-bold'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </button>

          {/* Master Data Menu */}
          <div>
            <button
              onClick={() => toggleSubmenu('master')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab.startsWith('master-')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Database size={18} className="shrink-0 text-blue-200" />
                {!collapsed && <span>Master Data</span>}
              </div>
              {!collapsed && (
                openSubmenu === 'master' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </button>

            {(!collapsed && openSubmenu === 'master') && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                <SubMenuItem active={currentTab === 'master-country'} label="Country" onClick={() => handleTabClick('master-country')} />
                <SubMenuItem active={currentTab === 'master-province'} label="Province" onClick={() => handleTabClick('master-province')} />
                <SubMenuItem active={currentTab === 'master-city'} label="City / Regency" onClick={() => handleTabClick('master-city')} />
                <SubMenuItem active={currentTab === 'master-customer-type'} label="Customer Type" onClick={() => handleTabClick('master-customer-type')} />
                <SubMenuItem active={currentTab === 'master-base-tariff'} label="Base Tariff" onClick={() => handleTabClick('master-base-tariff')} />
                <SubMenuItem active={currentTab === 'master-vehicle'} label="Vehicle" onClick={() => handleTabClick('master-vehicle')} />
                <SubMenuItem active={currentTab === 'master-customer'} label="Customer" onClick={() => handleTabClick('master-customer')} />
                <SubMenuItem active={currentTab === 'master-agent'} label="Agent" onClick={() => handleTabClick('master-agent')} />
                <SubMenuItem active={currentTab === 'master-vendor'} label="Vendor" onClick={() => handleTabClick('master-vendor')} />
                <SubMenuItem active={currentTab === 'master-consignee'} label="Consignee" onClick={() => handleTabClick('master-consignee')} />
              </div>
            )}
          </div>

          {/* Transaction Menu */}
          <div>
            <button
              onClick={() => toggleSubmenu('transaction')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab.startsWith('transaction-')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText size={18} className="shrink-0 text-amber-300" />
                {!collapsed && <span>Transaction</span>}
              </div>
              {!collapsed && (
                openSubmenu === 'transaction' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </button>

            {(!collapsed && openSubmenu === 'transaction') && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                <SubMenuItem active={currentTab === 'transaction-awb-list'} label="Air Waybill (AWB)" onClick={() => handleTabClick('transaction-awb-list')} />
                <SubMenuItem active={currentTab === 'transaction-awb-new'} label="Create New AWB" onClick={() => handleTabClick('transaction-awb-new')} />
                <SubMenuItem active={currentTab === 'transaction-generate-awb'} label="Generate AWB Number" onClick={() => handleTabClick('transaction-generate-awb')} />
                <SubMenuItem active={currentTab === 'transaction-print-blank'} label="Print Blank AWB" onClick={() => handleTabClick('transaction-print-blank')} />
                <SubMenuItem active={currentTab === 'transaction-upload-pin'} label="Upload AWB PIN" onClick={() => handleTabClick('transaction-upload-pin')} badge="New" />
              </div>
            )}
          </div>

          {/* Shipment Menu */}
          <div>
            <button
              onClick={() => toggleSubmenu('shipment')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab.startsWith('shipment-')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Truck size={18} className="shrink-0 text-emerald-300" />
                {!collapsed && <span>Shipment</span>}
              </div>
              {!collapsed && (
                openSubmenu === 'shipment' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </button>

            {(!collapsed && openSubmenu === 'shipment') && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                <SubMenuItem active={currentTab === 'shipment-monitoring'} label="Shipment Monitoring" onClick={() => handleTabClick('shipment-monitoring')} />
                <SubMenuItem active={currentTab === 'shipment-print-manifest'} label="Print Manifest" onClick={() => handleTabClick('shipment-print-manifest')} />
              </div>
            )}
          </div>

          {/* Track & Trace */}
          <div>
            <button
              onClick={() => toggleSubmenu('track')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab.startsWith('track-')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="shrink-0 text-cyan-300" />
                {!collapsed && <span>Track & Trace</span>}
              </div>
              {!collapsed && (
                openSubmenu === 'track' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </button>

            {(!collapsed && openSubmenu === 'track') && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                <SubMenuItem active={currentTab === 'track-update-status'} label="Update Shipment Status" onClick={() => handleTabClick('track-update-status')} />
                <SubMenuItem active={currentTab === 'track-status-report'} label="Shipment Status Report" onClick={() => handleTabClick('track-status-report')} />
              </div>
            )}
          </div>

          {/* Finance Menu */}
          <div>
            <button
              onClick={() => toggleSubmenu('finance')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab.startsWith('finance-')
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CircleDollarSign size={18} className="shrink-0 text-lime-300" />
                {!collapsed && <span>Finance</span>}
              </div>
              {!collapsed && (
                openSubmenu === 'finance' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
            </button>

            {(!collapsed && openSubmenu === 'finance') && (
              <div className="mt-1 ml-4 pl-3 border-l border-white/15 space-y-1 py-1">
                <SubMenuItem active={currentTab === 'finance-cash-dashboard'} label="Cash Dashboard" onClick={() => handleTabClick('finance-cash-dashboard')} />
                <SubMenuItem active={currentTab === 'finance-general-cash'} label="General Cash" onClick={() => handleTabClick('finance-general-cash')} />
                <SubMenuItem active={currentTab === 'finance-petty-cash'} label="Petty Cash" onClick={() => handleTabClick('finance-petty-cash')} />
                <SubMenuItem active={currentTab === 'finance-request'} label="Petty Cash Request" onClick={() => handleTabClick('finance-request')} badge="2 Pending" />
              </div>
            )}
          </div>

          {/* Settings Menu */}
          <div>
            <button
              onClick={() => handleTabClick('settings-system')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'settings-system'
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings size={18} className="shrink-0 text-slate-300" />
                {!collapsed && <span>Settings & Security</span>}
              </div>
            </button>
          </div>

        </div>

        {/* System Info Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-white/10 bg-[#004a7f]/60 text-[11px] text-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">WDSS v4.2.0</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Online
              </span>
            </div>
            <p className="mt-1 text-[10px] text-blue-200/80">PT Wahana Dwi Satria Solusi System</p>
          </div>
        )}
      </aside>
    </>
  );
};

interface SubMenuItemProps {
  active: boolean;
  label: string;
  onClick: () => void;
  badge?: string;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ active, label, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
      active
        ? 'bg-white text-[#0070C0] font-bold shadow-xs'
        : 'text-blue-100 hover:text-white hover:bg-white/10'
    }`}
  >
    <span className="truncate">{label}</span>
    {badge && (
      <span className="ml-1 px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-amber-400 text-slate-900">
        {badge}
      </span>
    )}
  </button>
);
