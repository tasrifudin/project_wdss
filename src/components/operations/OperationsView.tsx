import React from 'react';
import { SlideNavContainer } from '../common/SlideNavContainer';
import { 
  Plane, 
  Ship, 
  Truck, 
  PackageCheck, 
  Layers, 
  Warehouse, 
  Share2, 
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { EnterpriseTable } from '../common/EnterpriseTable';
import { NavigationTab, AWBRecord } from '../../types';
import { mockAWBs, mockVehicles } from '../../data/mockData';

interface OperationsViewProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({ currentTab, setCurrentTab }) => {
  // Filter mock AWBs by service mode
  const airAwbs = mockAWBs.filter(a => a.serviceType === 'Air Freight');
  const seaAwbs = mockAWBs.filter(a => a.serviceType.includes('Sea'));
  const landAwbs = mockAWBs.filter(a => a.serviceType === 'Land Transportation');
  const courierAwbs = mockAWBs.filter(a => a.serviceType === 'Express Courier');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Operations Sub-navigation bar with Slide Controls */}
      <SlideNavContainer className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <NavBtn active={currentTab === 'ops-air-freight'} label="Air Freight" icon={Plane} onClick={() => setCurrentTab('ops-air-freight')} />
        <NavBtn active={currentTab === 'ops-sea-freight'} label="Sea Freight" icon={Ship} onClick={() => setCurrentTab('ops-sea-freight')} />
        <NavBtn active={currentTab === 'ops-land-transport'} label="Land Transportation" icon={Truck} onClick={() => setCurrentTab('ops-land-transport')} />
        <NavBtn active={currentTab === 'ops-courier-service'} label="Courier Express" icon={PackageCheck} onClick={() => setCurrentTab('ops-courier-service')} />
        <NavBtn active={currentTab === 'ops-project-logistics'} label="Project Logistics" icon={Layers} onClick={() => setCurrentTab('ops-project-logistics')} />
        <NavBtn active={currentTab === 'ops-warehousing'} label="Warehousing" icon={Warehouse} onClick={() => setCurrentTab('ops-warehousing')} />
        <NavBtn active={currentTab === 'ops-distribution'} label="Distribution" icon={Share2} onClick={() => setCurrentTab('ops-distribution')} />
      </SlideNavContainer>

      {/* 1. Air Freight Division */}
      {currentTab === 'ops-air-freight' && (
        <EnterpriseTable<AWBRecord>
          title="Air Freight Express Operational Desk"
          subtitle="Airport cargo terminal consolidations, airline space allocations (Garuda / Lion), and Flight Master AWBs"
          columns={[
            { header: 'AWB Number', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</span> },
            { header: 'Route', accessorKey: 'originCity', cell: (r) => <span className="font-semibold">{r.originCity} → {r.destinationCity}</span> },
            { header: 'Airline Partner', accessorKey: 'customerName', cell: () => <span className="font-bold text-slate-800 dark:text-slate-100">Garuda Indonesia Cargo (GA-412)</span> },
            { header: 'Cargo Flight Time', accessorKey: 'bookingDate', cell: (r) => <span className="font-mono text-xs">{r.bookingDate}</span> },
            { header: 'Chg Wt (Kg)', accessorKey: 'chargeableWeightKg', cell: (r) => <span className="font-mono font-bold">{r.chargeableWeightKg} Kg</span> },
            { header: 'Status', accessorKey: 'status', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0070C0]">{r.status}</span> }
          ]}
          data={airAwbs}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* 2. Sea Freight Division */}
      {currentTab === 'ops-sea-freight' && (
        <EnterpriseTable<AWBRecord>
          title="Sea Freight FCL / LCL Container Operations"
          subtitle="Port container yard loadings (Tanjung Priok / Tanjung Perak), Bill of Lading (B/L) manifests, and vessel schedules"
          columns={[
            { header: 'AWB / B/L No', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</span> },
            { header: 'Container No', accessorKey: 'id', cell: (r) => <span className="font-mono font-bold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded">TGHU-491028-9 (40ft HC)</span> },
            { header: 'Shipping Line', accessorKey: 'customerName', cell: () => <span className="font-bold">Samudera Indonesia Vessel V.802</span> },
            { header: 'POL → POD', accessorKey: 'originCity', cell: (r) => <span className="font-semibold">{r.originCity} → {r.destinationCity}</span> },
            { header: 'Volume (CBM)', accessorKey: 'chargeableWeightKg', cell: (r) => <span className="font-mono">{Math.round(r.chargeableWeightKg / 167)} CBM</span> },
            { header: 'Status', accessorKey: 'status', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">{r.status}</span> }
          ]}
          data={seaAwbs}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* 3. Land Transportation */}
      {currentTab === 'ops-land-transport' && (
        <EnterpriseTable<AWBRecord>
          title="Land Transportation & Fleet Dispatch Control"
          subtitle="Intercity trucking, Trans-Jawa wingboxes, trailers, and driver journey logs"
          columns={[
            { header: 'AWB Waybill', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</span> },
            { header: 'Assigned Truck', accessorKey: 'vehiclePlateNo', cell: (r) => <span className="font-mono font-bold bg-amber-50 px-2 py-0.5 rounded text-amber-800">{r.vehiclePlateNo || 'B 9821 WDS'}</span> },
            { header: 'Driver PIC', accessorKey: 'driverName', cell: (r) => <span className="font-semibold">{r.driverName || 'Suryadi Pratama'}</span> },
            { header: 'Origin → Dest', accessorKey: 'originCity', cell: (r) => <span>{r.originCity} → {r.destinationCity}</span> },
            { header: 'Cargo Wt', accessorKey: 'chargeableWeightKg', cell: (r) => <span className="font-mono">{r.chargeableWeightKg} Kg</span> },
            { header: 'Dispatch Status', accessorKey: 'status', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">{r.status}</span> }
          ]}
          data={landAwbs}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* 4. Courier Service */}
      {currentTab === 'ops-courier-service' && (
        <EnterpriseTable<AWBRecord>
          title="Express Courier & Last-Mile City Delivery"
          subtitle="Same-day / Next-day city express couriers, motorbikes, and blind pickup fulfillment"
          columns={[
            { header: 'AWB Number', accessorKey: 'awbNumber', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.awbNumber}</span> },
            { header: 'Consignee Receiver', accessorKey: 'consigneeName', cell: (r) => <span className="font-bold">{r.consigneeName}</span> },
            { header: 'Delivery Address', accessorKey: 'consigneeAddress', cell: (r) => <span className="truncate max-w-[200px] block">{r.consigneeAddress}</span> },
            { header: 'Weight', accessorKey: 'actualWeightKg', cell: (r) => <span className="font-mono">{r.actualWeightKg} Kg</span> },
            { header: 'Courier Status', accessorKey: 'status', cell: (r) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">{r.status}</span> }
          ]}
          data={courierAwbs}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* 5. Project Logistics */}
      {currentTab === 'ops-project-logistics' && (
        <div className="p-6 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers size={18} className="text-[#0070C0]" /> Project Logistics & Heavy Lift Charter Projects
          </h2>
          <p className="text-xs text-slate-400">Turnkey logistics projects for mining, energy, and infrastructure equipment transport in Indonesia</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Active Project</span>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">PT Freeport Indonesia - Mining Rig Transport</h3>
              <p className="text-slate-500">Transporting 120-Ton Heavy Machinery from Tanjung Priok Port to Timika, Papua</p>
              <div className="flex justify-between pt-2 text-[11px] font-mono text-[#0070C0]">
                <span>Contract: Rp 4.80 M</span>
                <span>Milestone: 65% Loaded</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Completed Project</span>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">PLN IKN Nusantara - Transformer Substation</h3>
              <p className="text-slate-500">Heavy Transformer barge shipment from Surabaya to Balikpapan for IKN Grid</p>
              <div className="flex justify-between pt-2 text-[11px] font-mono text-[#0070C0]">
                <span>Contract: Rp 2.20 M</span>
                <span>Status: Delivered & Installed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Warehousing */}
      {currentTab === 'ops-warehousing' && (
        <div className="p-6 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Warehouse size={18} className="text-[#0070C0]" /> Warehousing & Inventory Management
          </h2>
          <p className="text-xs text-slate-400">Warehouse storage capacity, pallet slots, and fulfillment inventory logs across WDSS Depots</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400 font-bold">Jakarta Central Depot</p>
              <p className="text-lg font-extrabold text-[#0070C0] mt-1">12,500 m²</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">78% Pallet Occupancy</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400 font-bold">Surabaya Gateway Warehouse</p>
              <p className="text-lg font-extrabold text-[#0070C0] mt-1">8,200 m²</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">82% Pallet Occupancy</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400 font-bold">Medan Belawan Hub</p>
              <p className="text-lg font-extrabold text-[#0070C0] mt-1">5,000 m²</p>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">91% Pallet Occupancy (Near Capacity)</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Distribution */}
      {currentTab === 'ops-distribution' && (
        <div className="p-6 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Share2 size={18} className="text-[#0070C0]" /> Regional B2B Distribution Matrix
          </h2>
          <p className="text-xs text-slate-400">Scheduled distribution routes for retail FMCG, automotive spare parts, and pharmaceutical chains</p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-100">Java Island Primary Distribution Loop</p>
            <p className="text-slate-500">Jakarta → Bandung → Semarang → Solo → Surabaya → Malang (Daily Schedule)</p>
            <p className="text-emerald-600 font-bold">On-Time SLA: 98.4%</p>
          </div>
        </div>
      )}

    </div>
  );
};

interface NavBtnProps {
  active: boolean;
  label: string;
  icon: React.FC<any>;
  onClick: () => void;
}

const NavBtn: React.FC<NavBtnProps> = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors ${
      active
        ? 'bg-[#0070C0] text-white shadow-xs'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    <Icon size={14} />
    <span>{label}</span>
  </button>
);
