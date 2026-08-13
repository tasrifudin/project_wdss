import React, { useState } from 'react';
import { Search, X, Package, Users, Truck, FileText, ArrowRight } from 'lucide-react';
import { NavigationTab } from '../../types';
import { mockAWBs, mockCustomers, mockVehicles } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredAwbs = query.trim() ? mockAWBs.filter(a => 
    a.awbNumber.toLowerCase().includes(query.toLowerCase()) ||
    a.customerName.toLowerCase().includes(query.toLowerCase()) ||
    a.consigneeName.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const filteredCustomers = query.trim() ? mockCustomers.filter(c =>
    c.companyName.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const filteredVehicles = query.trim() ? mockVehicles.filter(v =>
    v.plateNumber.toLowerCase().includes(query.toLowerCase()) ||
    v.driverName.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search size={20} className="text-[#0070C0]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type AWB number, customer name, vehicle plate, consignee..."
            className="flex-1 bg-transparent border-none text-slate-800 dark:text-slate-100 text-sm focus:outline-none placeholder:text-slate-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-500 dark:text-slate-400 mb-1">Global WDSS Operational Search</p>
              <p>Quickly search across 5,000+ AWBs, Customer Records, Vehicle Fleets & Manifests.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono">WDSS-CGK-2026</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">PT Kalbe Farma</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono">B 9821 WDS</span>
              </div>
            </div>
          ) : (
            <>
              {/* AWBs */}
              {filteredAwbs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package size={14} className="text-[#0070C0]" /> Air Waybills ({filteredAwbs.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredAwbs.map(awb => (
                      <div
                        key={awb.id}
                        onClick={() => { onNavigate('transaction-awb-list'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-mono font-bold text-xs text-[#0070C0] dark:text-blue-400">{awb.awbNumber}</div>
                          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">{awb.customerName} → {awb.consigneeName}</div>
                          <div className="text-[11px] text-slate-400">{awb.originCity} to {awb.destinationCity} ({awb.serviceType})</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-[#0070C0] dark:text-blue-300">
                          {awb.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers */}
              {filteredCustomers.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={14} className="text-emerald-500" /> Customers ({filteredCustomers.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredCustomers.map(cust => (
                      <div
                        key={cust.id}
                        onClick={() => { onNavigate('master-customer'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-800 dark:text-slate-100">{cust.companyName}</div>
                          <div className="text-[11px] text-slate-400">PIC: {cust.contactPerson} ({cust.phone})</div>
                        </div>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{cust.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicles */}
              {filteredVehicles.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Truck size={14} className="text-amber-500" /> Vehicle Fleets ({filteredVehicles.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredVehicles.map(veh => (
                      <div
                        key={veh.id}
                        onClick={() => { onNavigate('master-vehicle'); onClose(); }}
                        className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">{veh.plateNumber}</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300">{veh.brandModel} ({veh.vehicleType})</div>
                        </div>
                        <span className="text-[11px] text-slate-500">Driver: {veh.driverName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredAwbs.length === 0 && filteredCustomers.length === 0 && filteredVehicles.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No records matching &quot;{query}&quot; found in WDSS system.
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
