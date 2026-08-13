import React, { useState } from 'react';
import { Printer, Download, FileSpreadsheet, Ship, Plane, Truck } from 'lucide-react';
import { mockAWBs, mockVehicles, mockVendors } from '../../data/mockData';

export const PrintManifest: React.FC = () => {
  const [manifestNo, setManifestNo] = useState(`MNF-WDSS-2026-0809-004`);
  const [manifestType, setManifestType] = useState('Sea Freight FCL Loading Manifest');
  const [vesselName, setVesselName] = useState('KM Samudera Indonesia V.802');
  const [portOrigin, setPortOrigin] = useState('Tanjung Priok, Jakarta');
  const [portDest, setPortDest] = useState('Tanjung Perak, Surabaya');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Printer size={18} className="text-[#0070C0]" />
            Cargo Consignment Manifest Generator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Generate official sea/air/land loading manifest for port customs & vessel captain sign-off</p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
        >
          <Printer size={15} /> Print Official Manifest
        </button>
      </div>

      {/* Manifest Configuration Controls */}
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Manifest Document No</label>
          <input
            type="text"
            value={manifestNo}
            onChange={(e) => setManifestNo(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Vessel / Airline / Truck</label>
          <input
            type="text"
            value={vesselName}
            onChange={(e) => setVesselName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Port of Loading (POL)</label>
          <input
            type="text"
            value={portOrigin}
            onChange={(e) => setPortOrigin(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Port of Discharge (POD)</label>
          <input
            type="text"
            value={portDest}
            onChange={(e) => setPortDest(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Printable Manifest Preview Paper */}
      <div className="p-8 bg-white text-slate-900 border-2 border-slate-800 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-4 font-sans text-xs">
        
        <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
          <div>
            <h1 className="font-black text-xl text-[#005B9A]">PT WAHANA DWI SATRIA SOLUSI</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">MASTER CONSIGNMENT CARGO MANIFEST</p>
          </div>
          <div className="text-right">
            <p className="font-mono font-extrabold text-sm text-[#0070C0]">{manifestNo}</p>
            <p className="text-[10px] text-slate-500">Date: 09 August 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 border border-slate-300 rounded-lg p-3 text-[11px]">
          <div><strong>Carrier / Line:</strong> {vesselName}</div>
          <div><strong>Voyage No:</strong> V.2026-Q3</div>
          <div><strong>POL:</strong> {portOrigin}</div>
          <div><strong>POD:</strong> {portDest}</div>
        </div>

        <table className="w-full border-collapse border border-slate-800 text-left text-[11px]">
          <thead>
            <tr className="bg-slate-200 border-b border-slate-800 font-bold uppercase">
              <th className="p-2 border-r border-slate-800">No</th>
              <th className="p-2 border-r border-slate-800">AWB Number</th>
              <th className="p-2 border-r border-slate-800">Shipper</th>
              <th className="p-2 border-r border-slate-800">Consignee</th>
              <th className="p-2 border-r border-slate-800">Pcs</th>
              <th className="p-2 border-r border-slate-800">Gross Wt (Kg)</th>
              <th className="p-2">Commodity Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {mockAWBs.map((a, idx) => (
              <tr key={a.id}>
                <td className="p-2 border-r border-slate-300 text-center font-bold">{idx + 1}</td>
                <td className="p-2 border-r border-slate-300 font-mono font-bold text-[#0070C0]">{a.awbNumber}</td>
                <td className="p-2 border-r border-slate-300">{a.customerName}</td>
                <td className="p-2 border-r border-slate-300">{a.consigneeName}</td>
                <td className="p-2 border-r border-slate-300 text-center">{a.piecesCount}</td>
                <td className="p-2 border-r border-slate-300 text-right font-mono font-bold">{a.chargeableWeightKg}</td>
                <td className="p-2">{a.commodityType}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-center text-[10px]">
          <div>
            <p className="font-bold">PREPARED BY OPERATIONAL DISPATCH</p>
            <div className="h-12 border-b border-slate-400 mt-2" />
            <p className="mt-1 font-bold">PT WDSS Operations Officer</p>
          </div>
          <div>
            <p className="font-bold">VERIFIED BY CUSTOMS AGENT</p>
            <div className="h-12 border-b border-slate-400 mt-2" />
            <p className="mt-1 font-bold">Port Customs Inspector</p>
          </div>
          <div>
            <p className="font-bold">RECEIVED BY VESSEL MASTER / DRIVER</p>
            <div className="h-12 border-b border-slate-400 mt-2" />
            <p className="mt-1 font-bold">Captain / Driver Signature</p>
          </div>
        </div>

      </div>

    </div>
  );
};
