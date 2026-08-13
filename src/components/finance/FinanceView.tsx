import React, { useState } from 'react';
import { SlideNavContainer } from '../common/SlideNavContainer';
import { 
  CircleDollarSign, 
  Receipt, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Printer, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  X,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { StatsCard } from '../common/StatsCard';
import { PettyCashRecord, GeneralCashRecord, NavigationTab } from '../../types';
import { mockPettyCash, mockGeneralCash } from '../../data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface FinanceViewProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ currentTab, setCurrentTab }) => {
  const [pettyCashList, setPettyCashList] = useState<PettyCashRecord[]>(mockPettyCash);
  const [generalCashList, setGeneralCashList] = useState<GeneralCashRecord[]>(mockGeneralCash);
  const [selectedVoucher, setSelectedVoucher] = useState<PettyCashRecord | null>(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  // New Request Form state
  const [category, setCategory] = useState<'Fuel & Toll' | 'Vehicle Repair' | 'Driver Allowance' | 'Office Supplies' | 'Loading Staff' | 'Customs/Port Fee'>('Fuel & Toll');
  const [amount, setAmount] = useState(1500000);
  const [desc, setDesc] = useState('Fuel & Tol Trans-Jawa wingbox dispatch');

  const handleApprove = (id: string) => {
    setPettyCashList(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved', approvedBy: 'Andi Wijaya (Manager)' } : p));
  };

  const handleReject = (id: string) => {
    setPettyCashList(prev => prev.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
  };

  const handleCreateRequest = () => {
    const newVoucher: PettyCashRecord = {
      id: `PC-${Date.now()}`,
      voucherNo: `VCH-CGK-0809-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().slice(0, 10),
      branchOffice: 'Jakarta Head Office',
      category,
      amountIdr: amount,
      description: desc,
      requestedBy: 'Suryadi Pratama',
      status: 'Pending Approval'
    };

    setPettyCashList(prev => [newVoucher, ...prev]);
    setShowNewRequestModal(false);
  };

  const cashFlowData = [
    { date: '01 Aug', income: 140000000, expense: 45000000 },
    { date: '03 Aug', income: 210000000, expense: 88000000 },
    { date: '05 Aug', income: 185000000, expense: 62000000 },
    { date: '07 Aug', income: 342000000, expense: 120000000 },
    { date: '09 Aug', income: 280000000, expense: 95000000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Finance Navigation Tabs with Slide Controls */}
      <SlideNavContainer className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentTab('finance-cash-dashboard')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
            currentTab === 'finance-cash-dashboard' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Cash Dashboard
        </button>
        <button
          onClick={() => setCurrentTab('finance-general-cash')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
            currentTab === 'finance-general-cash' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          General Cash
        </button>
        <button
          onClick={() => setCurrentTab('finance-petty-cash')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
            currentTab === 'finance-petty-cash' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Petty Cash
        </button>
        <button
          onClick={() => setCurrentTab('finance-request')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1 ${
            currentTab === 'finance-request' ? 'bg-[#0070C0] text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Petty Cash Request</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-400 text-slate-900 font-extrabold">2</span>
        </button>
      </SlideNavContainer>

      {/* 1. Cash Dashboard */}
      {currentTab === 'finance-cash-dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Total Cash Balance" value="Rp 4.25 M" subtext="BCA, Mandiri, BNI Operational" icon={CircleDollarSign} colorScheme="emerald" />
            <StatsCard title="Monthly Freight Income" value="Rp 2.68 M" subtext="+12.8% vs July" icon={TrendingUp} colorScheme="blue" />
            <StatsCard title="Disbursed Expenses" value="Rp 842.5 M" subtext="Vendor settlements & fleet fuel" icon={TrendingDown} colorScheme="rose" />
            <StatsCard title="Branch Petty Cash Fund" value="Rp 85.0 M" subtext="Across 5 regional offices" icon={Receipt} colorScheme="amber" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[12px] p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4">
              Operational Cash Flow Curve (Income vs Expense IDR)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val) => `Rp ${Number(val).toLocaleString('id-ID')}`} />
                  <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="expense" name="Expense" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 2. General Cash Table */}
      {currentTab === 'finance-general-cash' && (
        <EnterpriseTable<GeneralCashRecord>
          title="General Cash & Bank Ledger"
          subtitle="Capital inflow settlements, bank transfers, and bulk vendor payments"
          columns={[
            { header: 'Transaction No', accessorKey: 'transactionNo', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.transactionNo}</span> },
            { header: 'Date', accessorKey: 'date' },
            { header: 'Type', accessorKey: 'type', cell: (r) => (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                r.type === 'Income' ? 'bg-emerald-100 text-emerald-700' :
                r.type === 'Expense' ? 'bg-rose-100 text-rose-700' :
                'bg-blue-100 text-blue-700'
              }`}>{r.type}</span>
            )},
            { header: 'Bank Account', accessorKey: 'accountName' },
            { header: 'Category', accessorKey: 'category' },
            { header: 'Amount (IDR)', accessorKey: 'amountIdr', cell: (r) => <span className="font-mono font-bold">Rp {r.amountIdr.toLocaleString('id-ID')}</span> },
            { header: 'Reference / Invoice', accessorKey: 'referenceNo', cell: (r) => <span className="font-mono">{r.referenceNo}</span> }
          ]}
          data={generalCashList}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* 3. Petty Cash Table */}
      {currentTab === 'finance-petty-cash' && (
        <EnterpriseTable<PettyCashRecord>
          title="Branch Petty Cash Operational Ledger"
          subtitle="Regional petty cash disbursements for tolls, driver allowances, and emergency repair"
          columns={[
            { header: 'Voucher No', accessorKey: 'voucherNo', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.voucherNo}</span> },
            { header: 'Branch Office', accessorKey: 'branchOffice' },
            { header: 'Category', accessorKey: 'category', cell: (r) => <span className="px-2 py-0.5 rounded font-semibold bg-blue-50 text-[#0070C0]">{r.category}</span> },
            { header: 'Amount (IDR)', accessorKey: 'amountIdr', cell: (r) => <span className="font-mono font-extrabold text-[#0070C0]">Rp {r.amountIdr.toLocaleString('id-ID')}</span> },
            { header: 'Requested By', accessorKey: 'requestedBy' },
            { header: 'Approved By', accessorKey: 'approvedBy', cell: (r) => <span className="font-medium text-slate-600 dark:text-slate-300">{r.approvedBy || '-'}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r) => (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                r.status === 'Approved' || r.status === 'Disbursed' ? 'bg-emerald-100 text-emerald-700' :
                r.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                'bg-amber-100 text-amber-700'
              }`}>{r.status}</span>
            )}
          ]}
          data={pettyCashList}
          keyExtractor={(item) => item.id}
          customActions={(item) => (
            <button
              onClick={() => { setSelectedVoucher(item); setShowVoucherModal(true); }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0070C0] hover:bg-blue-50"
              title="Print Voucher Document"
            >
              <Printer size={15} />
            </button>
          )}
        />
      )}

      {/* 4. Petty Cash Request Approval Workflow */}
      {currentTab === 'finance-request' && (
        <div className="space-y-6">
          <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center">
            <div>
              <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                Petty Cash Request Approval Workflow
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manager sign-off queue for driver expenses, toll top-ups, and port gate passes</p>
            </div>

            <button
              onClick={() => setShowNewRequestModal(true)}
              className="px-4 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A] flex items-center gap-1.5"
            >
              <Plus size={16} /> New Petty Cash Request
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pettyCashList.map(pc => (
              <div key={pc.id} className="p-4 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#0070C0]">{pc.voucherNo}</span>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5">{pc.category}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    pc.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                    pc.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{pc.status}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">{pc.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400">Amount:</span> <strong className="font-mono text-[#0070C0] text-sm">Rp {pc.amountIdr.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <p>Req: {pc.requestedBy}</p>
                    <p>{pc.branchOffice}</p>
                  </div>
                </div>

                {pc.status === 'Pending Approval' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApprove(pc.id)}
                      className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Approve Request
                    </button>
                    <button
                      onClick={() => handleReject(pc.id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Printable Voucher Modal */}
      {selectedVoucher && showVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl p-6 overflow-hidden border-2 border-slate-800 space-y-4 text-xs font-sans">
            
            <div className="border-b-2 border-slate-900 pb-2 flex justify-between items-center">
              <div>
                <h2 className="font-black text-lg text-[#005B9A]">PT WAHANA DWI SATRIA SOLUSI</h2>
                <p className="text-[10px] font-bold uppercase text-slate-600">OFFICIAL PETTY CASH DISBURSEMENT VOUCHER</p>
              </div>
              <button onClick={() => setShowVoucherModal(false)} className="p-1 text-slate-400 hover:text-slate-800">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-100 rounded border border-slate-300">
              <div><strong>Voucher No:</strong> {selectedVoucher.voucherNo}</div>
              <div><strong>Date:</strong> {selectedVoucher.date}</div>
              <div><strong>Branch:</strong> {selectedVoucher.branchOffice}</div>
              <div><strong>Category:</strong> {selectedVoucher.category}</div>
            </div>

            <div className="p-3 border border-slate-300 rounded space-y-1">
              <p className="font-bold text-slate-500">DESCRIPTION</p>
              <p className="font-semibold text-slate-800">{selectedVoucher.description}</p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded flex justify-between items-center text-sm font-extrabold text-[#0070C0]">
              <span>Disbursed Amount</span>
              <span className="font-mono text-base">Rp {selectedVoucher.amountIdr.toLocaleString('id-ID')}</span>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px]">
              <div>
                <p className="font-bold">REQUESTED BY</p>
                <div className="h-10 border-b border-slate-400 mt-1" />
                <p className="mt-1">{selectedVoucher.requestedBy}</p>
              </div>
              <div>
                <p className="font-bold">APPROVED BY</p>
                <div className="h-10 border-b border-slate-400 mt-1" />
                <p className="mt-1">{selectedVoucher.approvedBy || 'Pending'}</p>
              </div>
              <div>
                <p className="font-bold">RECIPIENT SIGN</p>
                <div className="h-10 border-b border-slate-400 mt-1" />
                <p className="mt-1">Signature</p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2 bg-[#0070C0] text-white font-bold text-xs rounded-xl hover:bg-[#005B9A]"
            >
              Print Voucher Slip
            </button>

          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Create Petty Cash Voucher Request</h3>
              <button onClick={() => setShowNewRequestModal(false)} className="p-1 text-slate-400">
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block font-bold mb-1">Expense Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="Fuel & Toll">Fuel & Toll Trans-Jawa</option>
                <option value="Vehicle Repair">Vehicle Emergency Repair</option>
                <option value="Driver Allowance">Driver Out-of-town Allowance</option>
                <option value="Office Supplies">Branch Office Supplies</option>
                <option value="Loading Staff">Warehouse Loading Staff Overtime</option>
                <option value="Customs/Port Fee">Port Gate Fee & Stamp Clearance</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Request Amount (IDR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Description / Purpose</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>

            <button
              onClick={handleCreateRequest}
              className="w-full py-2.5 rounded-xl bg-[#0070C0] text-white font-bold hover:bg-[#005B9A]"
            >
              Submit Voucher Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
