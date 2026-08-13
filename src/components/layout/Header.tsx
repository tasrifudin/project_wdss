import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Moon, 
  Sun, 
  Menu, 
  Building2, 
  Shield, 
  UserCircle, 
  ChevronDown,
  Sparkles,
  FilePlus,
  Truck,
  Printer,
  Barcode,
  CheckCircle2,
  LogOut,
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface HeaderProps {
  sidebarCollapsed?: boolean;
  setMobileOpen?: (open: boolean) => void;
  onOpenSearch: () => void;
  onOpenQuickAction: () => void;
  onOpenNotifications: () => void;
  currentTab?: NavigationTab;
  setCurrentTab?: (tab: NavigationTab) => void;
  isDarkMode?: boolean;
  setIsDarkMode?: (dark: boolean) => void;
  selectedBranch?: string;
  setSelectedBranch?: (branch: string) => void;
  activeRole?: string;
  setActiveRole?: (role: string) => void;
  currentRole?: string;
  setCurrentRole?: (role: any) => void;
  branchOffice?: string;
  setBranchOffice?: (branch: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarCollapsed = false,
  setMobileOpen = (_open: boolean) => {},
  onOpenSearch,
  onOpenQuickAction,
  onOpenNotifications,
  currentTab = 'dashboard',
  setCurrentTab = (_tab: NavigationTab) => {},
  isDarkMode: propDarkMode,
  setIsDarkMode: propSetDarkMode,
  selectedBranch: propBranch,
  setSelectedBranch: propSetBranch,
  activeRole: propRole,
  setActiveRole: propSetRole,
  currentRole,
  setCurrentRole,
  branchOffice,
  setBranchOffice,
}) => {
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  const isDarkMode = propDarkMode !== undefined ? propDarkMode : internalDarkMode;
  const setIsDarkMode = propSetDarkMode || setInternalDarkMode;

  const selectedBranch = propBranch || branchOffice || 'Jakarta Head Office (CGK)';
  const setSelectedBranch = (b: string) => {
    if (propSetBranch) propSetBranch(b);
    if (setBranchOffice) setBranchOffice(b);
  };

  const activeRole = propRole || currentRole || 'Customer Service';
  const setActiveRole = (r: string) => {
    if (propSetRole) propSetRole(r);
    if (setCurrentRole) setCurrentRole(r as any);
  };
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const branches = [
    'Jakarta Head Office (CGK)',
    'Surabaya Branch (SUB)',
    'Medan Logistics Hub (KNO)',
    'Balikpapan Port Office (BPN)',
    'Makassar Regional Hub (UPG)'
  ];

  const roles = [
    'Super Admin',
    'Customer Service',
    'Freight Forwarding',
    'Operations',
    'Finance Manager',
    'Branch Manager'
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left side: Mobile Toggle & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search size={16} className="text-slate-400 group-hover:text-[#0070C0] transition-colors" />
              <span className="truncate">Search AWB, Customer, Vehicle, Manifest...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005B9A] to-[#0070C0] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                TF
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">Tasrifudin</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{activeRole}</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-slate-800 dark:text-slate-100">Tasrifudin</p>
                  <p className="text-slate-400 text-[11px] truncate">tasrifudin0@gmail.com</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-[#0070C0] dark:text-blue-300 font-semibold text-[10px]">
                    NIK: WDSS-2020-001
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setCurrentTab('settings-user'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <UserCircle size={15} /> My Profile & Preferences
                  </button>
                  <button
                    onClick={() => { setCurrentTab('settings-role'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Shield size={15} /> Role & Permissions
                  </button>
                  <button
                    onClick={() => { setCurrentTab('settings-audit'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <SlidersHorizontal size={15} /> Audit Log
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 pt-1">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 font-medium"
                  >
                    <LogOut size={15} /> Sign Out (Lock Session)
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
