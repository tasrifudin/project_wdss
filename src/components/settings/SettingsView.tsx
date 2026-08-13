import React, { useState } from 'react';
import { Settings, Shield, Users, Key, History, Plus, Lock } from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { UserRole } from '../../types';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'audit'>('users');

  const usersList = [
    { id: '1', name: 'Tasrifudin', email: 'tasrifudin@wdss.co.id', role: 'Customer Service' as UserRole, branch: 'Jakarta HQ', status: 'Active' },
    { id: '2', name: 'Budi Santoso', email: 'budi.s@wdss.co.id', role: 'Freight Forwarding' as UserRole, branch: 'Jakarta HQ', status: 'Active' },
    { id: '3', name: 'Andi Wijaya', email: 'andi.w@wdss.co.id', role: 'Operations' as UserRole, branch: 'Surabaya Hub', status: 'Active' },
    { id: '4', name: 'Dewi Lestari', email: 'dewi.l@wdss.co.id', role: 'Finance' as UserRole, branch: 'Jakarta HQ', status: 'Active' },
    { id: '5', name: 'Rahmat Hidayat', email: 'rahmat.h@wdss.co.id', role: 'Management' as UserRole, branch: 'Jakarta HQ', status: 'Active' },
  ];

  const auditLogs = [
    { id: '1', timestamp: '2026-08-09 14:32:10', user: 'Tasrifudin', action: 'Issued Air Waybill WDSS-CGK-2026-0809-0012', module: 'Transaction / AWB' },
    { id: '2', timestamp: '2026-08-09 13:15:44', user: 'Dewi Lestari', action: 'Approved Petty Cash Request VCH-CGK-0809-12', module: 'Finance / Petty Cash' },
    { id: '3', timestamp: '2026-08-09 11:02:18', user: 'Andi Wijaya', action: 'Updated Shipment Status WDSS-SUB-2026-0809-004 to In Transit', module: 'Track & Trace' },
    { id: '4', timestamp: '2026-08-09 09:45:00', user: 'System Admin', action: 'Modified Base Tariff Rate for CGK-SUB Air Freight', module: 'Master Data / Tariff' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Settings size={18} className="text-[#0070C0]" />
          System Settings & Enterprise Security Administration
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">SAP/Oracle ERP style role-based access control (RBAC), user provisioning, and audit logs</p>

        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 ${
              activeTab === 'users' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users size={14} /> System Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 ${
              activeTab === 'roles' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Shield size={14} /> Role Permissions Matrix
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 ${
              activeTab === 'audit' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History size={14} /> System Audit Trail
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <EnterpriseTable
          title="System User Directory"
          subtitle="Active operational staff across Customer Service, Freight Forwarding, Operations, Finance, and Management"
          columns={[
            { header: 'Full Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> },
            { header: 'Email Login', accessorKey: 'email', cell: (r: any) => <span className="font-mono">{r.email}</span> },
            { header: 'Assigned Role', accessorKey: 'role', cell: (r: any) => <span className="px-2 py-0.5 rounded font-bold bg-blue-50 text-[#0070C0] text-[10px]">{r.role}</span> },
            { header: 'Branch Office', accessorKey: 'branch' },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">{r.status}</span> }
          ]}
          data={usersList}
          keyExtractor={(i: any) => i.id}
        />
      )}

      {activeTab === 'roles' && (
        <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">SAP Fiori Style Authorization Matrix</h3>
          <p className="text-xs text-slate-400">Granular module permissions for operational roles</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 font-bold text-slate-400 uppercase">
                  <th className="p-3">Module Name</th>
                  <th className="p-3">Customer Service</th>
                  <th className="p-3">Freight Forwarding</th>
                  <th className="p-3">Operations</th>
                  <th className="p-3">Finance</th>
                  <th className="p-3">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-100">Master Data CRUD</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-100">AWB Issue & Pricing</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                  <td className="p-3 text-slate-400">Read Only</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-100">Petty Cash Approval</td>
                  <td className="p-3 text-rose-500 font-bold">No Access</td>
                  <td className="p-3 text-rose-500 font-bold">No Access</td>
                  <td className="p-3 text-rose-500 font-bold">No Access</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <EnterpriseTable
          title="System Audit Trail & Security Logs"
          subtitle="Immutable operational timestamp logs for compliance & traceability"
          columns={[
            { header: 'Timestamp', accessorKey: 'timestamp', cell: (r: any) => <span className="font-mono text-slate-500">{r.timestamp}</span> },
            { header: 'User', accessorKey: 'user', cell: (r: any) => <span className="font-bold">{r.user}</span> },
            { header: 'Module', accessorKey: 'module', cell: (r: any) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0070C0]">{r.module}</span> },
            { header: 'Action Description', accessorKey: 'action', cell: (r: any) => <span className="font-medium text-slate-700 dark:text-slate-200">{r.action}</span> }
          ]}
          data={auditLogs}
          keyExtractor={(i: any) => i.id}
        />
      )}

    </div>
  );
};
