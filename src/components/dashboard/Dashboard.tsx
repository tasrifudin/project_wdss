import React, { useState } from 'react';
import { 
  Truck, 
  PackageCheck, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertCircle, 
  Plus, 
  MapPin, 
  Printer, 
  BarChart3, 
  UserPlus, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Plane,
  Ship,
  Navigation
} from 'lucide-react';
import { StatsCard } from '../common/StatsCard';
import { NavigationTab } from '../../types';
import { 
  mockShipmentTrends, 
  mockRevenueTrends, 
  mockTransportModeBreakdown, 
  mockTopDestinations, 
  mockIndonesiaHubs,
  mockAWBs,
  mockPettyCash
} from '../../data/mockData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

interface DashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  selectedBranch: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, selectedBranch }) => {
  const [selectedHub, setSelectedHub] = useState<string | null>('hub-cgk');
  const [chartTimeframe, setChartTimeframe] = useState<'monthly' | 'weekly'>('monthly');

  const activeHubInfo = mockIndonesiaHubs.find(h => h.id === selectedHub) || mockIndonesiaHubs[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Banner / Operational Welcome */}
      <div className="p-5 rounded-[12px] bg-gradient-to-r from-[#005B9A] via-[#0070C0] to-[#008AE6] text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-[11px] font-bold mb-2">
              <Sparkles size={13} className="text-amber-300" /> WDSS Live Operational Command Center
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              PT Wahana Dwi Satria Solusi Management System
            </h1>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Monitoring {selectedBranch} operations across Air Freight, Sea Freight, Land Trucking, and Inter-island Warehousing.
            </p>
          </div>
        </div>
      </div>

      {/* Top KPI Cards (8 Key Metrics Requested) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Today's Shipment"
          value="184 Orders"
          subtext="Air: 62 | Sea: 85 | Land: 37"
          icon={Truck}
          trend={{ value: '+14.2%', isPositive: true }}
          colorScheme="blue"
          onClick={() => onNavigate('transaction-awb-list')}
        />
        <StatsCard
          title="In Transit"
          value="1,248 AWBs"
          subtext="Active inter-island movement"
          icon={Navigation}
          trend={{ value: '+8.5%', isPositive: true }}
          colorScheme="cyan"
          onClick={() => onNavigate('shipment-list')}
        />
        <StatsCard
          title="Delivered Today"
          value="142 Consignments"
          subtext="POD verified with signature"
          icon={PackageCheck}
          trend={{ value: '+5.1%', isPositive: true }}
          colorScheme="emerald"
          onClick={() => onNavigate('track-status-report')}
        />
        <StatsCard
          title="Pending Shipment"
          value="38 AWBs"
          subtext="Awaiting cargo manifest loading"
          icon={Clock}
          trend={{ value: '-3.2%', isPositive: true }}
          colorScheme="amber"
          onClick={() => onNavigate('transaction-awb-list')}
        />
        <StatsCard
          title="Gross Revenue (August)"
          value="Rp 2.68 M"
          subtext="Target: Rp 2.50 M (107%)"
          icon={DollarSign}
          trend={{ value: '+12.8%', isPositive: true }}
          colorScheme="emerald"
          onClick={() => onNavigate('report-sales')}
        />
        <StatsCard
          title="Outstanding Payment"
          value="Rp 825.9 M"
          subtext="Corporate client credit 30 days"
          icon={AlertCircle}
          trend={{ value: '-4.1%', isPositive: true }}
          colorScheme="rose"
          onClick={() => onNavigate('finance-general-cash')}
        />
        <StatsCard
          title="Active Customers"
          value="342 Accounts"
          subtext="28 New corporate tier accounts"
          icon={Users}
          trend={{ value: '+9.4%', isPositive: true }}
          colorScheme="purple"
          onClick={() => onNavigate('master-customer')}
        />
        <StatsCard
          title="Vehicle Fleet Ready"
          value="48 / 52 Units"
          subtext="4 Trucks in KIR maintenance"
          icon={Truck}
          trend={{ value: '92% Availability', isPositive: true }}
          colorScheme="blue"
          onClick={() => onNavigate('master-vehicle')}
        />
      </div>

      {/* Interactive Map & Hub Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map Container */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <MapPin size={16} className="text-[#0070C0]" />
                Interactive Indonesia Logistics Hub Map & Shipment Distribution
              </h3>
              <p className="text-xs text-slate-400">Click a hub node to view live operational metrics & capacity</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
              Live GPS Tracking Sync
            </span>
          </div>

          {/* SVG Indonesia Map Representation */}
          <div className="relative w-full h-[280px] bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 p-2 overflow-hidden flex items-center justify-center">
            
            {/* Background Map Grid */}
            <svg viewBox="0 0 900 400" className="w-full h-full">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700/50" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Simplified Indonesia Islands Vector Outline */}
              <path
                d="M 60 120 Q 120 180 200 280 Q 150 250 80 180 Z 
                   M 210 290 Q 280 320 380 340 Q 320 350 220 310 Z 
                   M 380 160 Q 450 180 480 250 Q 420 260 380 180 Z 
                   M 500 220 Q 560 260 580 310 Q 520 320 500 240 Z 
                   M 750 200 Q 850 230 880 290 Q 800 300 750 220 Z"
                fill="currentColor"
                className="text-slate-200/80 dark:text-slate-700/80"
              />

              {/* Shipping Route Connection Lines */}
              <path d="M 230 310 L 340 330" stroke="#0070C0" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
              <path d="M 230 310 L 90 150" stroke="#0070C0" strokeWidth="1.5" strokeDasharray="4,4" />
              <path d="M 230 310 L 440 220" stroke="#0070C0" strokeWidth="2" strokeDasharray="4,4" />
              <path d="M 340 330 L 520 270" stroke="#0070C0" strokeWidth="1.5" strokeDasharray="4,4" />
              <path d="M 520 270 L 820 260" stroke="#0070C0" strokeWidth="1" strokeDasharray="4,4" />

              {/* Hub Markers */}
              {mockIndonesiaHubs.map((hub) => {
                const isSelected = selectedHub === hub.id;
                return (
                  <g
                    key={hub.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHub(hub.id)}
                  >
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? "12" : "8"}
                      className={`${isSelected ? "fill-[#0070C0]" : "fill-[#005B9A]"} transition-all duration-300 opacity-30 animate-ping`}
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? "8" : "6"}
                      className={`${isSelected ? "fill-[#0070C0] stroke-2 stroke-white" : "fill-[#005B9A]"} hover:scale-125 transition-all`}
                    />
                    <text
                      x={hub.x}
                      y={hub.y - 12}
                      textAnchor="middle"
                      className={`text-[10px] font-extrabold fill-slate-700 dark:fill-slate-200 select-none ${
                        isSelected ? "fill-[#0070C0] dark:fill-blue-400 font-black" : ""
                      }`}
                    >
                      {hub.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Hub Floating Tag */}
            <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-md flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0070C0] animate-pulse" />
                <span className="font-bold text-slate-800 dark:text-slate-100">{activeHubInfo.name} ({activeHubInfo.code})</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">| {activeHubInfo.type}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="font-bold text-slate-700 dark:text-slate-200">{activeHubInfo.activeShipments} AWBs active</span>
                <span className="px-2 py-0.5 rounded font-bold bg-blue-100 dark:bg-blue-900/40 text-[#0070C0]">
                  {activeHubInfo.capacityPercent}% Capacity
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Top Destination Cities & Province Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">
              Top Destination Cities (Cargo Volume)
            </h3>
            <p className="text-xs text-slate-400 mb-4">Highest volume routes from Jakarta Head Hub</p>

            <div className="space-y-3">
              {mockTopDestinations.map((dest, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{dest.city}</span>
                    <span className="font-mono text-slate-500">{dest.shipments} AWBs (Rp {dest.revenueM}M)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#005B9A] to-[#0070C0]"
                      style={{ width: `${(dest.shipments / 500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('track-status-report')}
            className="mt-4 w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#0070C0] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Regional SLA Report</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Shipment Volume Trend Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Shipment Volume Trend (Air vs Sea vs Land)
              </h3>
              <p className="text-xs text-slate-400">Monthly AWBs processed across freight divisions</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0070C0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0070C0]" /> Air
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Sea
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Land
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockShipmentTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070C0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0070C0" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorSea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorLand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="air" stackId="1" stroke="#0070C0" fillOpacity={1} fill="url(#colorAir)" />
                <Area type="monotone" dataKey="sea" stackId="1" stroke="#06b6d4" fillOpacity={1} fill="url(#colorSea)" />
                <Area type="monotone" dataKey="land" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorLand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transportation Mode Pie Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">
              Transportation Mode Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-2">Share of cargo modes in Q3 2026</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockTransportModeBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {mockTransportModeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2">
              {mockTransportModeBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-100">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activities & Urgent Cash Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent AWBs Table Preview */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Recent Air Waybills (AWBs)
              </h3>
              <p className="text-xs text-slate-400">Latest active shipments in processing</p>
            </div>
            <button
              onClick={() => onNavigate('transaction-awb-list')}
              className="text-xs font-bold text-[#0070C0] hover:underline flex items-center gap-1"
            >
              View All AWBs <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-2">AWB Number</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Route</th>
                  <th className="py-2">Service</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {mockAWBs.map(awb => (
                  <tr key={awb.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 font-mono font-bold text-[#0070C0]">{awb.awbNumber}</td>
                    <td className="py-2.5 font-medium text-slate-800 dark:text-slate-200">{awb.customerName}</td>
                    <td className="py-2.5 text-slate-500">{awb.originCity} → {awb.destinationCity}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {awb.serviceType}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        awb.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        awb.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {awb.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Cash Requests Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Petty Cash Requests
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                2 Pending Approval
              </span>
            </div>

            <div className="space-y-2.5">
              {mockPettyCash.slice(0, 3).map(pc => (
                <div key={pc.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-slate-800 dark:text-slate-100">{pc.category}</span>
                    <span className="font-mono text-[#0070C0]">Rp {pc.amountIdr.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pc.description}</p>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400">
                    <span>Req by: {pc.requestedBy}</span>
                    <span className={`font-bold ${
                      pc.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>{pc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('finance-request')}
            className="mt-4 w-full py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
          >
            Manage Petty Cash Vouchers
          </button>
        </div>

      </div>

    </div>
  );
};
