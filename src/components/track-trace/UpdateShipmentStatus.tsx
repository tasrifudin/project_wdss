import React, { useState } from 'react';
import { MapPin, Camera, CheckCircle2, Navigation, Send, Upload, Sparkles } from 'lucide-react';
import { ShipmentStatus } from '../../types';
import { mockAWBs } from '../../data/mockData';

export const UpdateShipmentStatus: React.FC = () => {
  const [selectedAwbId, setSelectedAwbId] = useState(mockAWBs[0].id);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [locationTag, setLocationTag] = useState('Garuda Air Cargo Terminal 3 CGK');
  const [remarks, setRemarks] = useState('Cargo inspected and transferred to depart lounge.');
  const [podName, setPodName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedAwb = mockAWBs.find(a => a.id === selectedAwbId) || mockAWBs[0];

  const handleUpdate = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <MapPin size={18} className="text-[#0070C0]" />
          Update Shipment Status & Proof of Delivery (POD)
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Post milestone tracking events, GPS coordinates, driver photo proof, and recipient signature</p>

        <div className="mt-5 max-w-2xl space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Select Active Air Waybill</label>
            <select
              value={selectedAwbId}
              onChange={(e) => setSelectedAwbId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100"
            >
              {mockAWBs.map(a => (
                <option key={a.id} value={a.id}>{a.awbNumber} - {a.customerName} ({a.originCity} → {a.destinationCity})</option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 space-y-1">
            <p className="font-bold text-[#0070C0] text-sm">{selectedAwb.awbNumber}</p>
            <p className="text-slate-600 dark:text-slate-300">Consignee: <strong>{selectedAwb.consigneeName}</strong> ({selectedAwb.consigneeAddress})</p>
            <p className="text-slate-500">Current Status: <span className="font-bold text-emerald-600">{selectedAwb.status}</span></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">New Milestone Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="Booking Confirmed">Booking Confirmed</option>
                <option value="Cargo Picked Up">Cargo Picked Up</option>
                <option value="Warehouse Processing">Warehouse Processing</option>
                <option value="Manifested">Manifested</option>
                <option value="In Transit">In Transit</option>
                <option value="Customs Clearance">Customs Clearance</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered (POD Signed)</option>
                <option value="Delayed">Delayed / Exception</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Current GPS / Hub Location Tag</label>
              <input
                type="text"
                value={locationTag}
                onChange={(e) => setLocationTag(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              />
            </div>
          </div>

          {newStatus === 'Delivered' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 space-y-3">
              <div>
                <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-1">Recipient Name (POD Signer)</label>
                <input
                  type="text"
                  value={podName}
                  onChange={(e) => setPodName(e.target.value)}
                  placeholder="e.g. Pak Andi - Warehouse Supervisor"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-xs font-bold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Operational Remarks / Event Notes</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2"
          >
            <Send size={16} /> Broadcast Milestone Status Event
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>Milestone Status Event Broadcasted & Sync Saved to PT WDSS Track System!</span>
        </div>
      )}

    </div>
  );
};
