import React from 'react';
import { Building2, MapPin, Users, Phone, ShieldCheck, TrendingUp } from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { BranchOffice } from '../../types';
import { mockBranchOffices } from '../../data/mockData';

export const BranchView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Building2 size={18} className="text-[#0070C0]" />
          Regional Branch Office Network (PT WDSS Indonesia)
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">National branch offices, regional warehouse hubs, branch managers, and operational throughput</p>
      </div>

      <EnterpriseTable<BranchOffice>
        title="Branch Offices Directory"
        subtitle="5 Primary logistics hubs covering Greater Jakarta, East Java, North Sumatra, East Kalimantan, and South Sulawesi"
        columns={[
          { header: 'Branch Code', accessorKey: 'code', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code}</span> },
          { header: 'Branch Name', accessorKey: 'name', cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> },
          { header: 'City', accessorKey: 'city' },
          { header: 'Branch Manager', accessorKey: 'managerName', cell: (r) => <div><p className="font-semibold">{r.managerName}</p><p className="text-[10px] text-slate-400">{r.phone}</p></div> },
          { header: 'Staff Count', accessorKey: 'staffCount', cell: (r) => <span className="font-mono font-bold">{r.staffCount} Staff</span> },
          { header: 'Monthly AWBs', accessorKey: 'monthlyVolumeAwbs', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.monthlyVolumeAwbs.toLocaleString('id-ID')} AWBs</span> },
          { header: 'Status', accessorKey: 'active', cell: (r) => (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Active Branch</span>
          )}
        ]}
        data={mockBranchOffices}
        keyExtractor={(item) => item.id}
      />

    </div>
  );
};
