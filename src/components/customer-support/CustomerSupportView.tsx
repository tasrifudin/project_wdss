import React, { useState } from 'react';
import { Headphones, MessageSquare, AlertCircle, CheckCircle2, Clock, Plus, X } from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { CustomerTicket } from '../../types';
import { mockTickets } from '../../data/mockData';

export const CustomerSupportView: React.FC = () => {
  const [tickets, setTickets] = useState<CustomerTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<CustomerTicket | null>(null);

  const handleResolve = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Headphones size={18} className="text-[#0070C0]" />
            Customer Support & Cargo Claim Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Customer service ticketing, POD inquiries, delay escalations, and insurance cargo claims</p>
        </div>
      </div>

      <EnterpriseTable<CustomerTicket>
        title="Customer Service Ticket Queue"
        subtitle="Live customer inquiries, AWB tracking assistance, and claims processing"
        columns={[
          { header: 'Ticket Code', accessorKey: 'ticketNo', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.ticketNo}</span> },
          { header: 'AWB Ref', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold">{r.awbNumber}</span> },
          { header: 'Customer', accessorKey: 'customerName', cell: (r) => <span className="font-bold">{r.customerName}</span> },
          { header: 'Category', accessorKey: 'category', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0070C0]">{r.category}</span> },
          { header: 'Priority', accessorKey: 'priority', cell: (r) => (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              r.priority === 'High' ? 'bg-rose-100 text-rose-700' :
              r.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-100 text-slate-700'
            }`}>{r.priority}</span>
          )},
          { header: 'Assigned Agent', accessorKey: 'assignedAgent' },
          { header: 'Status', accessorKey: 'status', cell: (r) => (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              r.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
              r.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>{r.status}</span>
          )}
        ]}
        data={tickets}
        keyExtractor={(item) => item.id}
        onView={(item) => setSelectedTicket(item)}
      />

      {/* Ticket Details & Resolution Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Ticket {selectedTicket.ticketNo}</h3>
              <button onClick={() => setSelectedTicket(null)} className="p-1 text-slate-400">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <p><strong>Customer:</strong> {selectedTicket.customerName}</p>
              <p><strong>AWB Ref:</strong> {selectedTicket.awbNumber}</p>
              <p><strong>Subject:</strong> {selectedTicket.subject}</p>
            </div>

            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <p className="font-bold text-slate-400">CUSTOMER INQUIRY DETAIL</p>
              <p className="text-slate-700 dark:text-slate-200">{selectedTicket.description}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {selectedTicket.status !== 'Resolved' && (
                <button
                  onClick={() => handleResolve(selectedTicket.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={15} /> Mark Ticket as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
