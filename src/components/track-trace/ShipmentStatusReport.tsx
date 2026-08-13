import React from 'react';
import { BarChart3, Clock, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ShipmentStatusReport: React.FC = () => {
  const slaData = [
    { mode: 'Air Freight Express', onTimePct: 96.5, delayedPct: 3.5, targetPct: 95 },
    { mode: 'Sea Freight FCL', onTimePct: 92.0, delayedPct: 8.0, targetPct: 90 },
    { mode: 'Sea Freight LCL', onTimePct: 89.4, delayedPct: 10.6, targetPct: 88 },
    { mode: 'Land Trucking Intercity', onTimePct: 94.2, delayedPct: 5.8, targetPct: 92 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 size={18} className="text-[#0070C0]" />
          Shipment SLA Performance & Delay Analysis Report
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Historical delivery lead time analytics, bottleneck root-causes, and regional SLA fulfillment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SLA Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4">
            On-Time Delivery SLA Performance by Mode (%)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mode" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => `${val}%`} />
                <Bar dataKey="onTimePct" name="On-Time Delivery %" fill="#0070C0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="delayedPct" name="Delayed %" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delay Reason Root Causes */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">
            Primary Delay Root Causes (August 2026)
          </h3>
          <p className="text-xs text-slate-400 mb-2">Category distribution of SLA exception tickets</p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200">
              <div className="flex justify-between font-bold text-amber-800 dark:text-amber-300">
                <span>Port Terminal Customs Congestion</span>
                <span>42%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Pier inspection delays at Tanjung Perak & Belawan ports</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200">
              <div className="flex justify-between font-bold text-[#0070C0] dark:text-blue-300">
                <span>Adverse Maritime & Air Weather</span>
                <span>28%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">High waves in Java Sea & Flight delays during rainfall</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200">
                <span>Consignee Unloading Gate Hold</span>
                <span>18%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Warehouse dock queues at site delivery points</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
