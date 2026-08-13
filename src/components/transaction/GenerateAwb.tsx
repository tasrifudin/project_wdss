import React, { useState } from 'react';
import { BarChart3, Copy, CheckCircle2, RefreshCw, Printer, ShieldCheck } from 'lucide-react';
import { mockCities } from '../../data/mockData';

export const GenerateAwb: React.FC = () => {
  const [hubCode, setHubCode] = useState('CGK');
  const [yearCode, setYearCode] = useState('2026');
  const [quantity, setQuantity] = useState(10);
  const [generatedList, setGeneratedList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const list: string[] = [];
    const startNum = Math.floor(1000 + Math.random() * 8000);
    for (let i = 0; i < quantity; i++) {
      const seq = String(startNum + i).padStart(4, '0');
      list.push(`WDSS-${hubCode}-${yearCode}-0809-${seq}`);
    }
    setGeneratedList(list);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedList.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 size={18} className="text-[#0070C0]" />
          Reserved AWB Sequence Generator
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Pre-allocate AWB tracking numbers for corporate client bulk manifests & branch offices</p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Branch Hub Code</label>
            <select
              value={hubCode}
              onChange={(e) => setHubCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="CGK">CGK - Jakarta HQ</option>
              <option value="SUB">SUB - Surabaya</option>
              <option value="KNO">KNO - Medan</option>
              <option value="BPN">BPN - Balikpapan</option>
              <option value="UPG">UPG - Makassar</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Fiscal Year Prefix</label>
            <input
              type="text"
              value={yearCode}
              onChange={(e) => setYearCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Quantity of AWBs</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              max={100}
              min={1}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              className="w-full py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2"
            >
              <RefreshCw size={15} /> Generate Sequence
            </button>
          </div>
        </div>
      </div>

      {generatedList.length > 0 && (
        <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
              Generated AWB Numbers ({generatedList.length} Reserved)
            </h3>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-[#0070C0] font-bold text-xs flex items-center gap-1.5"
            >
              {copied ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy All Numbers'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {generatedList.map((awb, idx) => (
              <div key={idx} className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-[#0070C0]">{awb}</span>
                <span className="text-[10px] text-slate-400 font-sans">Reserved</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
