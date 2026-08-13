import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Clock, DollarSign, Package } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Customs Clearance Delay',
      desc: 'AWB WDSS-CGK-2026-0808-0098 requires container inspection at Tanjung Perak Pier 2.',
      time: '10 mins ago',
      type: 'warning',
      icon: AlertTriangle,
    },
    {
      id: '2',
      title: 'Petty Cash Voucher Approval Needed',
      desc: 'Rian Kurniawan submitted emergency repair request VCH-BPN-0809-05 (IDR 3,450,000).',
      time: '25 mins ago',
      type: 'finance',
      icon: DollarSign,
    },
    {
      id: '3',
      title: 'Air Freight Cargo Departed',
      desc: 'Garuda GA-312 carrying AWB WDSS-CGK-2026-0809-0012 departed for Juanda Surabaya.',
      time: '1 hour ago',
      type: 'info',
      icon: Package,
    },
    {
      id: '4',
      title: 'POD Confirmation Received',
      desc: 'AWB WDSS-SUB-2026-0807-0044 delivered to KIMA Makassar. Signed by Pak Andi.',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-[#0070C0]" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Operational Alerts</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-[#0070C0] rounded-full">
                {notifications.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map(n => {
              const IconComp = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    n.type === 'warning' ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50' :
                    n.type === 'finance' ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' :
                    n.type === 'success' ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50' :
                    'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      n.type === 'warning' ? 'bg-amber-500 text-white' :
                      n.type === 'finance' ? 'bg-emerald-500 text-white' :
                      n.type === 'success' ? 'bg-blue-500 text-white' :
                      'bg-slate-600 text-white'
                    }`}>
                      <IconComp size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{n.title}</h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">{n.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#0070C0] hover:underline"
            >
              Mark All as Read & Dismiss
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
