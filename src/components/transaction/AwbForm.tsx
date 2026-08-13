import React, { useState } from 'react';
import { 
  Calculator, 
  Upload, 
  Save, 
  Send, 
  Building2, 
  MapPin, 
  Package, 
  DollarSign, 
  FileText, 
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { ServiceType, AWBRecord } from '../../types';
import { mockCustomers, mockConsignees, mockCities, mockBaseTariffs } from '../../data/mockData';

interface AwbFormProps {
  onSuccess: (newAwb: AWBRecord) => void;
  onCancel: () => void;
}

export const AwbForm: React.FC<AwbFormProps> = ({ onSuccess, onCancel }) => {
  // Form State
  const [awbNumber, setAwbNumber] = useState(`WDSS-CGK-${new Date().getFullYear()}-0809-${Math.floor(1000 + Math.random() * 9000)}`);
  const [pinCode, setPinCode] = useState(String(Math.floor(1000 + Math.random() * 9000)));
  const [serviceType, setServiceType] = useState<ServiceType>('Air Freight');
  const [selectedCustomerId, setSelectedCustomerId] = useState(mockCustomers[0].id);
  const [selectedConsigneeId, setSelectedConsigneeId] = useState(mockConsignees[0].id);
  const [originCity, setOriginCity] = useState('Jakarta');
  const [destinationCity, setDestinationCity] = useState('Surabaya');
  const [commodityType, setCommodityType] = useState('General Commercial Cargo');
  
  // Dimensions & Weight
  const [actualWeight, setActualWeight] = useState<number>(250);
  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthCm, setWidthCm] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(100);
  const [piecesCount, setPiecesCount] = useState<number>(10);
  const [declaredValue, setDeclaredValue] = useState<number>(350000000);
  
  // Surcharges & Tax
  const [tariffPerKg, setTariffPerKg] = useState<number>(18500);
  const [surcharge, setSurcharge] = useState<number>(450000);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  // Volumetric Calculation (L x W x H / 6000 for Air/Land, L x W x H / 5000 for Sea)
  const volFactor = serviceType.includes('Sea') ? 5000 : 6000;
  const volumetricWeight = Math.round(((lengthCm * widthCm * heightCm) / volFactor) * piecesCount);
  const chargeableWeight = Math.max(actualWeight, volumetricWeight);

  const baseCost = chargeableWeight * tariffPerKg;
  const insuranceCost = Math.round(declaredValue * 0.002); // 0.2% insurance
  const tax = Math.round((baseCost + surcharge) * 0.11); // 11% PPN
  const totalCost = baseCost + surcharge + insuranceCost + tax;

  const handleAutoGenerateNumber = () => {
    const hub = originCity === 'Surabaya' ? 'SUB' : originCity === 'Medan' ? 'KNO' : 'CGK';
    setAwbNumber(`WDSS-${hub}-2026-0809-${Math.floor(1000 + Math.random() * 9000)}`);
    setPinCode(String(Math.floor(1000 + Math.random() * 9000)));
  };

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId) || mockCustomers[0];
  const selectedConsignee = mockConsignees.find(c => c.id === selectedConsigneeId) || mockConsignees[0];

  const handleSubmit = (status: 'Submitted' | 'Draft') => {
    const newRecord: AWBRecord = {
      id: `AWB-${Date.now()}`,
      awbNumber,
      pinCode,
      pinVerified: true,
      bookingDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      serviceType,
      customerName: selectedCustomer.companyName,
      customerId: selectedCustomer.id,
      consigneeName: selectedConsignee.name,
      consigneePhone: selectedConsignee.phone,
      consigneeAddress: selectedConsignee.address,
      originCity,
      destinationCity,
      destinationProvince: 'Jawa Timur',
      actualWeightKg: actualWeight,
      volumetricWeightKg: volumetricWeight,
      chargeableWeightKg: chargeableWeight,
      lengthCm,
      widthCm,
      heightCm,
      piecesCount,
      commodityType,
      declaredValueIdr: declaredValue,
      tariffPerKgIdr: tariffPerKg,
      baseCostIdr: baseCost,
      surchargesIdr: surcharge,
      insuranceCostIdr: insuranceCost,
      taxIdr: tax,
      totalCostIdr: totalCost,
      paymentStatus: 'Credit 30 Days',
      status: status === 'Submitted' ? 'Booking Confirmed' : 'Draft',
      currentLocation: `WDSS ${originCity} Consolidation Depot`,
      estimatedArrival: '2026-08-11 18:00',
      branchOffice: `${originCity} Head Office`,
      createdByName: 'Tasrifudin - CS Senior'
    };

    onSuccess(newRecord);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Form Title */}
      <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileText size={18} className="text-[#0070C0]" />
            New Air Waybill (AWB) Operational Entry
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Issue freight forwarding waybill, tariff pricing, volumetric auto-calc & barcode PIN</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit('Draft')}
            className="px-3.5 py-1.5 rounded-xl border border-blue-200 dark:border-slate-700 bg-blue-50 dark:bg-slate-800 text-[#0070C0] dark:text-blue-300 text-xs font-bold hover:bg-blue-100 flex items-center gap-1.5"
          >
            <Save size={15} /> Save Draft
          </button>
          <button
            onClick={() => handleSubmit('Submitted')}
            className="px-4 py-1.5 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Send size={15} /> Submit & Print AWB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: AWB Header & Number Generator */}
          <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#0070C0]" /> Waybill Identification & Service
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Air Waybill Number (Auto Generated)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={awbNumber}
                    onChange={(e) => setAwbNumber(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-sm text-[#0070C0]"
                  />
                  <button
                    onClick={handleAutoGenerateNumber}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-xs font-bold"
                    title="Generate Random Sequence"
                  >
                    <RefreshCw size={14} /> Regenerate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Cargo Release PIN Code
                </label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-mono font-bold text-sm text-amber-800 dark:text-amber-300 text-center tracking-widest"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                >
                  <option value="Air Freight">Air Freight Express</option>
                  <option value="Sea Freight FCL">Sea Freight FCL Container</option>
                  <option value="Sea Freight LCL">Sea Freight LCL Loose</option>
                  <option value="Land Transportation">Land Trucking Intercity</option>
                  <option value="Express Courier">Same Day / Next Day Courier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Origin City</label>
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
                >
                  {mockCities.map(c => <option key={c.id} value={c.name}>{c.name} ({c.code})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Destination City</label>
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
                >
                  {mockCities.map(c => <option key={c.id} value={c.name}>{c.name} ({c.code})</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Shipper (Customer) & Consignee */}
          <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 size={14} className="text-[#0070C0]" /> Shipper Client & Consignee Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Shipper Customer</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                >
                  {mockCustomers.map(c => <option key={c.id} value={c.id}>{c.companyName} ({c.code})</option>)}
                </select>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 space-y-0.5">
                  <p className="font-bold text-slate-700 dark:text-slate-200">PIC: {selectedCustomer.contactPerson}</p>
                  <p>Tax NPWP: {selectedCustomer.npwpTaxId}</p>
                  <p className="text-emerald-600 font-bold">Credit TOP: {selectedCustomer.customerType}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Consignee Receiver</label>
                <select
                  value={selectedConsigneeId}
                  onChange={(e) => setSelectedConsigneeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                >
                  {mockConsignees.map(c => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
                </select>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 space-y-0.5">
                  <p className="font-bold text-slate-700 dark:text-slate-200">{selectedConsignee.address}, {selectedConsignee.city}</p>
                  <p>Phone: {selectedConsignee.phone} {selectedConsignee.email ? `• ${selectedConsignee.email}` : ''}</p>
                  <p className="text-amber-600 font-medium">PIC: {selectedConsignee.contactPerson || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Cargo Dimensions & Weight */}
          <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Package size={14} className="text-[#0070C0]" /> Cargo Cargo Dimensions & Volumetric Calculator
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Commodity Description</label>
              <input
                type="text"
                value={commodityType}
                onChange={(e) => setCommodityType(e.target.value)}
                placeholder="e.g. Pharmaceutical Products / Spare Parts / Electronics"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Actual Wt (Kg)</label>
                <input
                  type="number"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Length (cm)</label>
                <input
                  type="number"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Width (cm)</label>
                <input
                  type="number"
                  value={widthCm}
                  onChange={(e) => setWidthCm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Pieces Count</label>
                <input
                  type="number"
                  value={piecesCount}
                  onChange={(e) => setPiecesCount(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Volumetric Banner */}
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-[#0070C0] dark:text-blue-300">
                  Volumetric Calculation Result: {volumetricWeight} Kg (Factor 1:{volFactor})
                </p>
                <p className="text-[11px] text-slate-500">
                  Formula: ({lengthCm} × {widthCm} × {heightCm} / {volFactor}) × {piecesCount} pcs
                </p>
              </div>
              <div className="px-3 py-1 rounded-xl bg-[#0070C0] text-white font-extrabold text-xs shrink-0 text-center">
                Chargeable Weight: {chargeableWeight} Kg
              </div>
            </div>

            {/* Upload attachment simulation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Upload Shipping Documents (Packing List / Commercial Invoice)</label>
              <div className="p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <Upload size={18} className="mx-auto text-slate-400 mb-1" />
                <span className="text-xs text-slate-500 font-medium">Click or drag & drop Packing List / Customs Invoice PDF</span>
                {attachmentName && <p className="text-xs font-bold text-emerald-600 mt-1">Uploaded: {attachmentName}</p>}
              </div>
            </div>

          </div>

        </div>

        {/* Cost Breakdown & Summary Panel */}
        <div className="space-y-6">
          <div className="p-5 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 sticky top-20">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#0070C0]" /> Cost Calculation Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Tariff Rate / Kg (IDR)</label>
                <input
                  type="number"
                  value={tariffPerKg}
                  onChange={(e) => setTariffPerKg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Declared Value (IDR)</label>
                <input
                  type="number"
                  value={declaredValue}
                  onChange={(e) => setDeclaredValue(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Surcharges / Port Gate Fee (IDR)</label>
                <input
                  type="number"
                  value={surcharge}
                  onChange={(e) => setSurcharge(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Base Freight Cost ({chargeableWeight} kg × Rp {tariffPerKg.toLocaleString('id-ID')})</span>
                  <span className="font-mono font-semibold">Rp {baseCost.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Handling & Surcharges</span>
                  <span className="font-mono font-semibold">Rp {surcharge.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Cargo Insurance (0.2%)</span>
                  <span className="font-mono font-semibold">Rp {insuranceCost.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between">
                  <span>VAT / PPN (11%)</span>
                  <span className="font-mono font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
                </div>

                <div className="border-t-2 border-slate-200 dark:border-slate-700 pt-2 flex justify-between items-center text-sm font-extrabold text-[#0070C0] dark:text-blue-400">
                  <span>Total Billing Cost</span>
                  <span className="font-mono text-lg">Rp {totalCost.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSubmit('Submitted')}
                className="w-full py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} /> Confirm & Issue Air Waybill
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
