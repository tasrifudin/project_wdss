import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { MasterDataView } from './components/master-data/MasterDataView';
import { AwbForm } from './components/transaction/AwbForm';
import { AwbList } from './components/transaction/AwbList';
import { GenerateAwb } from './components/transaction/GenerateAwb';
import { PrintBlankAwb } from './components/transaction/PrintBlankAwb';
import { UploadAwbPin } from './components/transaction/UploadAwbPin';
import { ShipmentMonitoring } from './components/shipment/ShipmentMonitoring';
import { PrintManifest } from './components/shipment/PrintManifest';
import { UpdateShipmentStatus } from './components/track-trace/UpdateShipmentStatus';
import { ShipmentStatusReport } from './components/track-trace/ShipmentStatusReport';
import { FinanceView } from './components/finance/FinanceView';
import { OperationsView } from './components/operations/OperationsView';
import { CustomerSupportView } from './components/customer-support/CustomerSupportView';
import { BranchView } from './components/branch/BranchView';
import { ManagementView } from './components/management/ManagementView';
import { SettingsView } from './components/settings/SettingsView';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { QuickActionModal } from './components/common/QuickActionModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { NavigationTab, UserRole, AWBRecord } from './types';

export default function App() {
  // Application State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('Customer Service');
  const [branchOffice, setBranchOffice] = useState('Jakarta Head Office');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Dynamic state for created AWBs
  const [newAwbs, setNewAwbs] = useState<AWBRecord[]>([]);

  // Function to render active view module based on currentTab
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <Dashboard
            currentRole={currentRole}
            branchOffice={branchOffice}
            onNavigate={setCurrentTab}
            newAwbs={newAwbs}
          />
        );

      // Master Data Sub-routes
      case 'master-country':
      case 'master-province':
      case 'master-city':
      case 'master-customer-type':
      case 'master-base-tariff':
      case 'master-vehicle':
      case 'master-customer':
      case 'master-agent':
      case 'master-vendor':
      case 'master-consignee':
        return <MasterDataView currentTab={currentTab} setCurrentTab={setCurrentTab} />;

      // Transaction Sub-routes
      case 'transaction-awb-new':
        return (
          <AwbForm
            onSuccess={(newAwb) => {
              setNewAwbs([newAwb, ...newAwbs]);
              setCurrentTab('transaction-awb-list');
            }}
            onCancel={() => setCurrentTab('transaction-awb-list')}
          />
        );

      case 'transaction-awb-list':
        return <AwbList onNavigate={setCurrentTab} newAwbs={newAwbs} />;

      case 'transaction-generate-awb':
        return <GenerateAwb />;

      case 'transaction-print-blank':
        return <PrintBlankAwb />;

      case 'transaction-upload-pin':
        return <UploadAwbPin />;

      // Shipment Sub-routes
      case 'shipment-monitoring':
        return <ShipmentMonitoring />;

      case 'shipment-print-manifest':
        return <PrintManifest />;

      // Track & Trace Sub-routes
      case 'track-update-status':
        return <UpdateShipmentStatus />;

      case 'track-status-report':
        return <ShipmentStatusReport />;

      // Finance Sub-routes
      case 'finance-cash-dashboard':
      case 'finance-general-cash':
      case 'finance-petty-cash':
      case 'finance-request':
        return <FinanceView currentTab={currentTab} setCurrentTab={setCurrentTab} />;

      // Operational Sub-routes
      case 'ops-air-freight':
      case 'ops-sea-freight':
      case 'ops-land-transport':
      case 'ops-courier-service':
      case 'ops-project-logistics':
      case 'ops-warehousing':
      case 'ops-distribution':
        return <OperationsView currentTab={currentTab} setCurrentTab={setCurrentTab} />;

      // Other Enterprise Departments
      case 'customer-support-tickets':
        return <CustomerSupportView />;

      case 'branch-offices':
        return <BranchView />;

      case 'management-executive':
        return <ManagementView />;

      case 'settings-system':
        return <SettingsView />;

      default:
        return (
          <Dashboard
            currentRole={currentRole}
            branchOffice={branchOffice}
            onNavigate={setCurrentTab}
            newAwbs={newAwbs}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-[#F7F9FC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-100 selection:text-[#0070C0] ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        currentRole={currentRole}
      />

      {/* Main Operational Stage Layout */}
      <div className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
      }`}>
        
        {/* Top Header Bar */}
        <Header
          sidebarCollapsed={sidebarCollapsed}
          setMobileOpen={setMobileOpen}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          selectedBranch={branchOffice}
          setSelectedBranch={setBranchOffice}
          activeRole={currentRole}
          setActiveRole={(r: any) => setCurrentRole(r)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
        />

        {/* Dynamic Page Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1920px] w-full mx-auto overflow-x-hidden">
          {renderCurrentView()}
        </main>

        {/* Global Footer */}
        <footer className="px-6 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-extrabold text-[#0070C0]">PT WAHANA DWI SATRIA SOLUSI (WDSS)</span> — Internal Enterprise Operational Management System v4.8
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Server: Cloud-Run CGK-A1</span>
            <span>Latency: 12ms</span>
            <span className="text-emerald-600 font-bold">● System Operational</span>
          </div>
        </footer>

      </div>

      {/* Global Interactive Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setIsSearchOpen(false);
        }}
      />

      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setIsQuickActionOpen(false);
        }}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

    </div>
  );
}
