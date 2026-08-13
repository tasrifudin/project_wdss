import React from 'react';
import { X, FilePlus, Printer, KeyRound, UserPlus, DollarSign, Truck, MapPin, BarChart3 } from 'lucide-react';
import { NavigationTab } from '../../types';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const actions = [
    {
      title: 'Create New AWB',
      desc: 'Issue new Air Waybill shipping order with cost calculation',
      icon: FilePlus,
      color: 'bg-blue-500 text-white',
      tab: 'transaction-awb-new' as NavigationTab
    },
    {
      title: 'Track & Trace Shipment',
      desc: 'Live update location, POD status and milestone events',
      icon: MapPin,
      color: 'bg-cyan-500 text-white',
      tab: 'track-update-status' as NavigationTab
    },
    {
      title: 'Print Cargo Manifest',
      desc: 'Generate loading list & sea/air master manifest',
      icon: Printer,
      color: 'bg-emerald-500 text-white',
      tab: 'shipment-manifest' as NavigationTab
    },
    {
      title: 'Generate AWB Sequence',
      desc: 'Auto-generate bulk reserved AWB tracking numbers',
      icon: BarChart3,
      color: 'bg-purple-500 text-white',
      tab: 'transaction-generate-awb' as NavigationTab
    },
    {
      title: 'Petty Cash Request',
      desc: 'Submit operational cash voucher request for driver/port',
      icon: DollarSign,
      color: 'bg-amber-500 text-white',
      tab: 'finance-request' as NavigationTab
    },
    {
      title: 'Register New Customer',
      desc: 'Add corporate client profile & credit limit setup',
      icon: UserPlus,
      color: 'bg-indigo-500 text-white',
      tab: 'master-customer' as NavigationTab
    },
    {
      title: 'Upload AWB Release PIN',
      desc: 'Verify customer cargo pickup authorization PIN',
      icon: KeyRound,
      color: 'bg-rose-500 text-white',
      tab: 'transaction-upload-pin' as NavigationTab
    },
    {
      title: 'Dispatch Fleet Vehicle',
      desc: 'Assign truck/trailer fleet to scheduled manifest',
      icon: Truck,
      color: 'bg-teal-500 text-white',
      tab: 'master-vehicle' as NavigationTab
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Quick Action Dispatcher</h3>
            <p className="text-xs text-slate-400">Select an operational workflow to launch directly</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {actions.map((act, idx) => {
            const IconComponent = act.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  onNavigate(act.tab);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-[#0070C0] hover:shadow-md cursor-pointer transition-all flex items-start gap-3 group"
              >
                <div className={`p-2.5 rounded-xl ${act.color} shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                  <IconComponent size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-[#0070C0] transition-colors">{act.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{act.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
