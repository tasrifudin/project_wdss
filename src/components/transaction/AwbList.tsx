import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  Eye, 
  KeyRound, 
  Download, 
  X,
  Truck,
  Plus
} from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { AWBRecord, NavigationTab } from '../../types';
import { mockAWBs } from '../../data/mockData';

interface AwbListProps {
  onNavigate: (tab: NavigationTab) => void;
  newAwbs: AWBRecord[];
}

export const AwbList: React.FC<AwbListProps> = ({ onNavigate, newAwbs }) => {
  const [selectedAwb, setSelectedAwb] = useState<AWBRecord | null>(null);
  const [showPrintLabelModal, setShowPrintLabelModal] = useState(false);

  const allAwbs = [...newAwbs, ...mockAWBs];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <EnterpriseTable<AWBRecord>
        title="Air Waybills (AWBs) Operational Registry"
        subtitle="Full lifecycle freight consignment waybills across Air, Sea, and Land transportation"
        columns={[
          {
            header: 'AWB Number',
            accessorKey: 'awbNumber',
            cell: (r) => (
              <div>
                <p className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</p>
                <p className="text-[10px] text-slate-400">{r.bookingDate}</p>
              </div>
            )
          },
          {
            header: 'Service',
            accessorKey: 'serviceType',
            cell: (r) => (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0070C0]">
                {r.serviceType}
              </span>
            )
          },
          {
            header: 'Shipper Customer',
            accessorKey: 'customerName',
            cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.customerName}</span>
          },
          {
            header: 'Consignee Receiver',
            accessorKey: 'consigneeName',
            cell: (r) => <div><p className="font-semibold">{r.consigneeName}</p><p className="text-[10px] text-slate-400">{r.destinationCity}</p></div>
          },
          {
            header: 'Route',
            accessorKey: 'originCity',
            cell: (r) => <span className="font-medium text-slate-600 dark:text-slate-300">{r.originCity} → {r.destinationCity}</span>
          },
          {
            header: 'Chg Wt (Kg)',
            accessorKey: 'chargeableWeightKg',
            cell: (r) => <span className="font-mono font-bold">{r.chargeableWeightKg} Kg</span>
          },
          {
            header: 'Total Cost (IDR)',
            accessorKey: 'totalCostIdr',
            cell: (r) => <span className="font-mono font-extrabold text-[#0070C0]">Rp {r.totalCostIdr.toLocaleString('id-ID')}</span>
          },
          {
            header: 'PIN Status',
            accessorKey: 'pinVerified',
            cell: (r) => (
              r.pinVerified ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  <CheckCircle2 size={11} /> Verified PIN
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  <KeyRound size={11} /> Unverified
                </span>
              )
            )
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r) => (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                r.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                r.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {r.status}
              </span>
            )
          }
        ]}
        data={allAwbs}
        keyExtractor={(item) => item.id}
        onAdd={() => onNavigate('transaction-awb-new')}
        onView={(item) => setSelectedAwb(item)}
        customActions={(item) => (
          <button
            onClick={() => { setSelectedAwb(item); setShowPrintLabelModal(true); }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0070C0] hover:bg-blue-50"
            title="Print Shipping Label & Barcode"
          >
            <Printer size={15} />
          </button>
        )}
      />

      {/* AWB Details Drawer Modal */}
      {selectedAwb && !showPrintLabelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Air Waybill Consignment Detail</span>
                <h3 className="font-mono font-extrabold text-[#0070C0] text-lg">{selectedAwb.awbNumber}</h3>
              </div>
              <button onClick={() => setSelectedAwb(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-slate-400">Booking Date</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{selectedAwb.bookingDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Service Type</p>
                  <p className="font-bold text-[#0070C0]">{selectedAwb.serviceType}</p>
                </div>
                <div>
                  <p className="text-slate-400">Release PIN Code</p>
                  <p className="font-mono font-extrabold text-amber-600">{selectedAwb.pinCode || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Shipper Details</p>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{selectedAwb.customerName}</p>
                  <p className="text-slate-500 mt-1">Origin City: {selectedAwb.originCity}</p>
                  <p className="text-slate-500">Branch: {selectedAwb.branchOffice}</p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Consignee Destination</p>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{selectedAwb.consigneeName}</p>
                  <p className="text-slate-500 mt-1">{selectedAwb.consigneeAddress}</p>
                  <p className="text-slate-500">Phone: {selectedAwb.consigneePhone}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Cargo & Pricing Breakdown</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <span className="text-slate-400">Actual Wt:</span> <span className="font-bold">{selectedAwb.actualWeightKg} Kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Volumetric:</span> <span className="font-bold">{selectedAwb.volumetricWeightKg} Kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Chargeable:</span> <span className="font-bold text-[#0070C0]">{selectedAwb.chargeableWeightKg} Kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Pieces:</span> <span className="font-bold">{selectedAwb.piecesCount} Box</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-extrabold text-sm text-[#0070C0]">
                  <span>Total Billable Amount</span>
                  <span className="font-mono">Rp {selectedAwb.totalCostIdr.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowPrintLabelModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A] flex items-center gap-1.5"
              >
                <Printer size={15} /> Print Shipping Label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Shipping Label View */}
      {selectedAwb && showPrintLabelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl p-6 overflow-hidden border-2 border-slate-800">
            
            <div className="border-b-2 border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h2 className="font-black text-xl tracking-wider text-[#005B9A]">PT WAHANA DWI SATRIA SOLUSI</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Air Freight & Express Consignment Label</p>
              </div>
              <button onClick={() => setShowPrintLabelModal(false)} className="p-1 rounded text-slate-400 hover:text-slate-800">
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-3 font-sans text-xs">
              <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">AWB TRACKING NUMBER</p>
                  <p className="font-mono font-black text-base text-[#0070C0]">{selectedAwb.awbNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">RELEASE PIN</p>
                  <p className="font-mono font-black text-base text-rose-600">{selectedAwb.pinCode}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border border-slate-300 rounded-lg p-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-500">ORIGIN</p>
                  <p className="font-bold text-sm">{selectedAwb.originCity}</p>
                </div>
                <div className="border-l border-slate-300 pl-2">
                  <p className="text-[9px] font-bold text-slate-500">DESTINATION</p>
                  <p className="font-bold text-sm text-[#0070C0]">{selectedAwb.destinationCity}</p>
                </div>
              </div>

              <div className="border border-slate-300 rounded-lg p-3 space-y-1">
                <p className="text-[9px] font-bold text-slate-500">SHIPPER</p>
                <p className="font-bold text-xs">{selectedAwb.customerName}</p>
                <p className="text-[10px] text-slate-600">Commodity: {selectedAwb.commodityType}</p>
              </div>

              <div className="border border-slate-300 rounded-lg p-3 space-y-1 bg-amber-50/50">
                <p className="text-[9px] font-bold text-amber-800">CONSIGNEE DESTINATION</p>
                <p className="font-extrabold text-sm">{selectedAwb.consigneeName}</p>
                <p className="text-[11px] font-semibold">{selectedAwb.consigneeAddress}</p>
                <p className="text-[10px] text-slate-600">TEL: {selectedAwb.consigneePhone}</p>
              </div>

              {/* Barcode Simulator */}
              <div className="pt-2 text-center">
                <div className="h-12 bg-slate-900 rounded w-full flex items-center justify-center text-white font-mono text-xs tracking-widest">
                  ||||| ||| ||||||| |||| |||||| ||||||| |||||
                </div>
                <p className="text-[10px] font-mono mt-1 font-bold">{selectedAwb.awbNumber}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-[#0070C0] text-white font-bold text-xs rounded-xl hover:bg-[#005B9A]"
              >
                Print 3-Ply Thermal Label
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
