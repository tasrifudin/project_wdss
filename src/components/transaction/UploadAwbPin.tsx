import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockAWBs } from '../../data/mockData';

export const UploadAwbPin: React.FC = () => {
  const [awbInput, setAwbInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    awb?: any;
  } | null>(null);

  const handleVerifyPin = () => {
    const found = mockAWBs.find(a => a.awbNumber.toLowerCase().trim() === awbInput.toLowerCase().trim());
    if (!found) {
      setVerificationResult({
        success: false,
        message: `AWB Number "${awbInput}" not found in PT WDSS active registry.`
      });
      return;
    }

    if (found.pinCode === pinInput.trim()) {
      setVerificationResult({
        success: true,
        message: `PIN Verification SUCCESSFUL! Cargo release authorized for ${found.consigneeName}.`,
        awb: found
      });
    } else {
      setVerificationResult({
        success: false,
        message: `INVALID PIN Code for AWB ${found.awbNumber}. Cargo release blocked by security rule.`
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <KeyRound size={18} className="text-[#0070C0]" />
          Verify & Upload AWB Cargo Release PIN
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">High-security PIN verification for high-value & bonded cargo pickup authorization at port terminals</p>

        <div className="mt-5 max-w-xl space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Air Waybill (AWB) Number</label>
            <input
              type="text"
              value={awbInput}
              onChange={(e) => setAwbInput(e.target.value)}
              placeholder="e.g. WDSS-CGK-2026-0809-0012"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">4-Digit Cargo Release PIN Code</label>
            <input
              type="text"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="e.g. 8912"
              maxLength={6}
              className="w-full px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-mono font-bold text-amber-800 dark:text-amber-300 text-center tracking-widest text-base"
            />
          </div>

          <button
            onClick={handleVerifyPin}
            className="w-full py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} /> Verify Release Authorization
          </button>
        </div>
      </div>

      {/* Verification Result Banner */}
      {verificationResult && (
        <div className={`p-5 rounded-[12px] border text-xs shadow-xs animate-in fade-in duration-200 ${
          verificationResult.success
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            {verificationResult.success ? (
              <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={22} className="text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-extrabold text-sm mb-1">{verificationResult.message}</h3>
              {verificationResult.awb && (
                <div className="mt-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-1 text-slate-700 dark:text-slate-200">
                  <p><strong>Shipper:</strong> {verificationResult.awb.customerName}</p>
                  <p><strong>Consignee:</strong> {verificationResult.awb.consigneeName} ({verificationResult.awb.consigneePhone})</p>
                  <p><strong>Commodity:</strong> {verificationResult.awb.commodityType}</p>
                  <p className="text-emerald-600 font-bold mt-1">Status: Ready for Terminal Gate Release</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
