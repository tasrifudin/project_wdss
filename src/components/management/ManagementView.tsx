import React from 'react';
import { TrendingUp, PieChart as PieChartIcon, DollarSign, Award, Target } from 'lucide-react';
import { StatsCard } from '../common/StatsCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ManagementView: React.FC = () => {
  const modeRevenueData = [
    { name: 'Air Freight Express', value: 1420000000, color: '#0070C0' },
    { name: 'Sea Freight Container', value: 980000000, color: '#0284c7' },
    { name: 'Land Transportation', value: 650000000, color: '#06b6d4' },
    { name: 'Warehousing & Dist', value: 410000000, color: '#10b981' },
  ];

  const branchProfitData = [
    { branch: 'Jakarta HQ', revenue: 1450000000, margin: 380000000 },
    { branch: 'Surabaya Hub', revenue: 880000000, margin: 220000000 },
    { branch: 'Medan Branch', revenue: 520000000, margin: 120000000 },
    { branch: 'Balikpapan Hub', revenue: 410000000, margin: 950000000 },
    { branch: 'Makassar Office', revenue: 320000000, margin: 750000000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp size={18} className="text-[#0070C0]" />
          Executive Management Dashboard & Profitability KPI
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">High-level financial yields, operational margins, mode revenue split, and strategic branch profitability</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="YTD Gross Revenue" value="Rp 34.6 M" subtext="+14.2% vs target" icon={DollarSign} colorScheme="blue" />
        <StatsCard title="Net Operational Margin" value="28.4 %" subtext="Rp 9.82 M EBITDA" icon={Award} colorScheme="emerald" />
        <StatsCard title="Monthly Active Clients" value="482 B2B" subtext="Corporate accounts" icon={Target} colorScheme="purple" />
        <StatsCard title="Fleet SLA Fulfillment" value="95.8 %" subtext="Across all 5 modes" icon={PieChartIcon} colorScheme="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Share Pie Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            Gross Revenue Share by Logistics Service Line
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modeRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {modeRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {modeRevenueData.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                <span className="truncate text-slate-600 dark:text-slate-300 font-medium">{m.name}: Rp {(m.value / 1000000000).toFixed(2)} M</span>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Profitability Bar Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            Branch Office Revenue vs Operating Margin (IDR)
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchProfitData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val) => `Rp ${Number(val).toLocaleString('id-ID')}`} />
                <Bar dataKey="revenue" name="Revenue" fill="#0070C0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="margin" name="Net Margin" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
