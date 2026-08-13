import React, { useState } from 'react';
import { Printer, Download, Sparkles } from 'lucide-react';
import WDSLogo from '../common/WDSLogo';

export const PrintBlankAwb: React.FC = () => {
  const [copies, setCopies] = useState(5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Printer size={18} className="text-[#0070C0]" />
            Print Blank Air Waybill Forms (3-Ply Carbon Paper)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Pre-print official PT WDSS blank waybill forms for field couriers and warehouse pickup staff</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Copies:</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            min={1}
            max={50}
            className="w-16 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold"
          />
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Printer size={15} /> Print {copies} Blank Copies
          </button>
        </div>
      </div>

      {/* Printable Template Preview */}
      <div className="p-8 bg-white text-slate-900 border-2 border-slate-800 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-4 font-sans text-xs">
        
        <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-0.5 border border-slate-300 shrink-0">
              <WDSLogo className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-black text-xl text-[#005B9A] tracking-wider">PT WAHANA DWI SATRIA SOLUSI</h1>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Freight Forwarding & Logistics Operational Air Waybill</p>
              <p className="text-[10px] text-slate-500">Head Office: Jl. Raya Yos Sudarso No. 88, Tanjung Priok, Jakarta Utara | Tel: (021) 4390011</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-32 h-10 border border-dashed border-slate-400 flex items-center justify-center font-mono text-slate-400 text-[10px]">
              [STAMP / BARCODE HERE]
            </div>
            <p className="text-[9px] font-bold text-slate-500 mt-1">ORIGINAL - SHIPPER COPY</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border border-slate-800 rounded-lg p-3">
          <div className="space-y-1">
            <p className="font-bold text-[10px] text-slate-500 uppercase">1. SHIPPER (PENGIRIM)</p>
            <div className="h-12 border-b border-dotted border-slate-300">Company / Name: ___________________________________</div>
            <div className="h-8">Phone / Address: ____________________________________</div>
          </div>
          <div className="space-y-1 border-l border-slate-800 pl-3">
            <p className="font-bold text-[10px] text-slate-500 uppercase">2. CONSIGNEE (PENERIMA)</p>
            <div className="h-12 border-b border-dotted border-slate-300">Name / Company: ___________________________________</div>
            <div className="h-8">Dest City & Tel: ____________________________________</div>
          </div>
        </div>

        <div className="border border-slate-800 rounded-lg p-3">
          <p className="font-bold text-[10px] text-slate-500 uppercase mb-2">3. CARGO SPECIFICATION & SERVICE TYPE</p>
          <div className="grid grid-cols-4 gap-2 text-[11px] font-semibold">
            <div>[ ] Air Freight</div>
            <div>[ ] Sea Freight FCL/LCL</div>
            <div>[ ] Land Trucking</div>
            <div>[ ] Express Courier</div>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2 pt-2 border-t border-slate-300 text-center text-[10px]">
            <div>Pcs: ______</div>
            <div>Actual Wt: ____ Kg</div>
            <div>Vol Wt: ____ Kg</div>
            <div>Chg Wt: ____ Kg</div>
            <div>Decl Value: Rp _______</div>
          </div>
        </div>

        <div className="border border-slate-800 rounded-lg p-3 grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-[10px] text-slate-500">SIGNATURE SHIPPER</p>
            <div className="h-14 mt-2 border-b border-slate-400" />
            <p className="text-[9px] text-center mt-1">Name & Date</p>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <p className="font-bold text-[10px] text-slate-500">PT WDSS DISPATCH OFFICER</p>
            <div className="h-14 mt-2 border-b border-slate-400" />
            <p className="text-[9px] text-center mt-1">Officer Stamp & Signature</p>
          </div>
        </div>

      </div>

    </div>
  );
};
