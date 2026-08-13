import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Phone, 
  Calendar,
  Navigation,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { AWBRecord } from '../../types';
import { mockAWBs } from '../../data/mockData';

export const ShipmentMonitoring: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<AWBRecord | null>(mockAWBs[0]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Active Selected Shipment Monitoring Banner */}
      {selectedShipment && (
        <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-[#0070C0]">
                  {selectedShipment.serviceType}
                </span>
                <span className="font-mono font-extrabold text-[#0070C0] text-sm">{selectedShipment.awbNumber}</span>
              </div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                {selectedShipment.originCity} → {selectedShipment.destinationCity} ({selectedShipment.destinationProvince})
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={`px-3 py-1 rounded-full font-bold ${
                selectedShipment.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                selectedShipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                ● {selectedShipment.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Timeline Progress */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="font-bold text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-[#0070C0]" /> Milestone Status Timeline & GPS Location
              </h3>

              <div className="relative pl-6 space-y-4 border-l-2 border-blue-200 dark:border-slate-700 my-2">
                
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#0070C0] ring-4 ring-blue-100 text-white flex items-center justify-center text-[10px]">✓</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Booking Confirmed & Waybill Issued</p>
                  <p className="text-[11px] text-slate-400">{selectedShipment.bookingDate} | {selectedShipment.originCity} Hub</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#0070C0] ring-4 ring-blue-100 text-white flex items-center justify-center text-[10px]">✓</span>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Cargo Loaded & In Transit</p>
                  <p className="text-[11px] text-slate-400">Current Location: {selectedShipment.currentLocation}</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 text-white flex items-center justify-center text-[10px]">⏳</span>
                  <p className="font-bold text-amber-600">Estimated Arrival & Unloading</p>
                  <p className="text-[11px] text-slate-400">ETA: {selectedShipment.estimatedArrival}</p>
                </div>

              </div>
            </div>

            {/* Vehicle & Dispatch Driver Info */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-400 text-[10px] uppercase">Assigned Fleet & Driver</h3>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#0070C0]" />
                <div>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-100">{selectedShipment.vehiclePlateNo || 'B 9821 WDS'}</p>
                  <p className="text-[11px] text-slate-500">Isuzu Wingbox Heavy Truck</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700 text-[11px] space-y-1">
                <p className="flex justify-between"><span className="text-slate-400">Driver:</span> <span className="font-bold">{selectedShipment.driverName || 'Suryadi Pratama'}</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-mono">0812-3456-7890</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Weight:</span> <span className="font-bold text-[#0070C0]">{selectedShipment.chargeableWeightKg} Kg</span></p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Main Monitoring Table */}
      <EnterpriseTable<AWBRecord>
        title="Live Shipment Operational Table"
        subtitle="Filter shipments by fleet, driver, route, or delivery SLA"
        columns={[
          { header: 'AWB Number', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</span> },
          { header: 'Route', accessorKey: 'originCity', cell: (r) => <span className="font-semibold">{r.originCity} → {r.destinationCity}</span> },
          { header: 'Service', accessorKey: 'serviceType', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0070C0]">{r.serviceType}</span> },
          { header: 'Fleet Plate No', accessorKey: 'vehiclePlateNo', cell: (r) => <span className="font-mono font-bold bg-amber-50 px-2 py-0.5 rounded text-amber-800">{r.vehiclePlateNo || 'Assigned'}</span> },
          { header: 'Driver Name', accessorKey: 'driverName', cell: (r) => <span className="font-medium">{r.driverName || '-'}</span> },
          { header: 'Current Location', accessorKey: 'currentLocation', cell: (r) => <span className="truncate max-w-[180px] block text-slate-600 dark:text-slate-300">{r.currentLocation}</span> },
          { header: 'ETA', accessorKey: 'estimatedArrival', cell: (r) => <span className="font-mono text-emerald-600 font-bold">{r.estimatedArrival}</span> },
          { header: 'Status', accessorKey: 'status', cell: (r) => (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              r.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
              r.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>{r.status}</span>
          )}
        ]}
        data={mockAWBs}
        keyExtractor={(item) => item.id}
        onView={(item) => setSelectedShipment(item)}
      />

    </div>
  );
};
