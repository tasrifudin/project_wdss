import { 
  AWBRecord, 
  MasterCountry, 
  MasterProvince, 
  MasterCity, 
  MasterCustomerType, 
  MasterBaseTariff, 
  MasterVehicle, 
  MasterCustomer, 
  MasterAgent, 
  MasterVendor, 
  MasterConsignee, 
  PettyCashRecord, 
  GeneralCashRecord, 
  SystemUser, 
  RolePermission, 
  AuditLog,
  BranchOffice,
  CustomerTicket
} from '../types';

export const mockBranchOffices: BranchOffice[] = [
  { id: 'BR-01', code: 'CGK', name: 'Jakarta Head Office & Central Hub', city: 'Jakarta', address: 'Jl. Raya Yos Sudarso No. 88, Tanjung Priok', phone: '021-4390011', managerName: 'Tasrifudin, S.T.', staffCount: 142, monthlyVolumeAwbs: 4820, active: true },
  { id: 'BR-02', code: 'SUB', name: 'Surabaya Gateway Branch', city: 'Surabaya', address: 'Kawasan Industri Rungkut Industri III No. 12', phone: '031-8439900', managerName: 'Andi Wijaya, S.E.', staffCount: 88, monthlyVolumeAwbs: 2890, active: true },
  { id: 'BR-03', code: 'KNO', name: 'Medan Logistics Hub', city: 'Medan', address: 'Jl. Kualanamu Airport Road Km. 14, Deli Serdang', phone: '061-7368811', managerName: 'Rahmat Hidayat', staffCount: 54, monthlyVolumeAwbs: 1940, active: true },
  { id: 'BR-04', code: 'BPN', name: 'Balikpapan Port & IKN Branch', city: 'Balikpapan', address: 'Jl. Mulawarman No. 200, Batakan', phone: '0542-762888', managerName: 'Danang Kurniadi', staffCount: 62, monthlyVolumeAwbs: 2150, active: true },
  { id: 'BR-05', code: 'UPG', name: 'Makassar Eastern Regional Hub', city: 'Makassar', address: 'Kawasan Industri Makassar (KIMA) 10', phone: '0411-510888', managerName: 'Syamsul Bahri', staffCount: 45, monthlyVolumeAwbs: 1680, active: true }
];

export const mockCountries: MasterCountry[] = [
  { id: '1', code: 'ID', name: 'Indonesia', region: 'Southeast Asia', currency: 'IDR', active: true },
  { id: '2', code: 'SG', name: 'Singapore', region: 'Southeast Asia', currency: 'SGD', active: true },
  { id: '3', code: 'MY', name: 'Malaysia', region: 'Southeast Asia', currency: 'MYR', active: true },
  { id: '4', code: 'CN', name: 'China', region: 'East Asia', currency: 'CNY', active: true },
  { id: '5', code: 'AU', name: 'Australia', region: 'Oceania', currency: 'AUD', active: true },
  { id: '6', code: 'US', name: 'United States', region: 'North America', currency: 'USD', active: true },
];

export const mockProvinces: MasterProvince[] = [
  { id: 'P01', code: 'DKI', country: 'Indonesia', name: 'DKI Jakarta', islandGroup: 'Java', capitalCity: 'Jakarta Pusat', hubCode: 'CGK', active: true },
  { id: 'P02', code: 'JBT', country: 'Indonesia', name: 'Jawa Barat', islandGroup: 'Java', capitalCity: 'Bandung', hubCode: 'BDO', active: true },
  { id: 'P03', code: 'JTG', country: 'Indonesia', name: 'Jawa Tengah', islandGroup: 'Java', capitalCity: 'Semarang', hubCode: 'SRG', active: true },
  { id: 'P04', code: 'JTM', country: 'Indonesia', name: 'Jawa Timur', islandGroup: 'Java', capitalCity: 'Surabaya', hubCode: 'SUB', active: true },
  { id: 'P05', code: 'SU', country: 'Indonesia', name: 'Sumatera Utara', islandGroup: 'Sumatra', capitalCity: 'Medan', hubCode: 'KNO', active: true },
  { id: 'P06', code: 'KI', country: 'Indonesia', name: 'Kalimantan Timur', islandGroup: 'Kalimantan', capitalCity: 'Samarinda', hubCode: 'BPN', active: true },
  { id: 'P07', code: 'SA', country: 'Indonesia', name: 'Sulawesi Selatan', islandGroup: 'Sulawesi', capitalCity: 'Makassar', hubCode: 'UPG', active: true },
  { id: 'P08', code: 'BA', country: 'Indonesia', name: 'Bali', islandGroup: 'Bali & Nusa Tenggara', capitalCity: 'Denpasar', hubCode: 'DPS', active: true },
  { id: 'P09', code: 'KR', country: 'Indonesia', name: 'Kepulauan Riau', islandGroup: 'Sumatra', capitalCity: 'Tanjung Pinang', hubCode: 'BTH', active: true },
  { id: 'P10', code: 'PA', country: 'Indonesia', name: 'Papua', islandGroup: 'Maluku & Papua', capitalCity: 'Jayapura', hubCode: 'DJJ', active: true },
];

export const mockCities: MasterCity[] = [
  { id: 'C01', code: 'CGK', name: 'Jakarta', provinceName: 'DKI Jakarta', country: 'Indonesia', type: 'City', postalCode: '10110', isPortCity: true, airportCode: 'CGK', active: true },
  { id: 'C02', code: 'SUB', name: 'Surabaya', provinceName: 'Jawa Timur', country: 'Indonesia', type: 'City', postalCode: '60111', isPortCity: true, airportCode: 'SUB', active: true },
  { id: 'C03', code: 'KNO', name: 'Medan', provinceName: 'Sumatera Utara', country: 'Indonesia', type: 'City', postalCode: '20111', isPortCity: true, airportCode: 'KNO', active: true },
  { id: 'C04', code: 'BPN', name: 'Balikpapan', provinceName: 'Kalimantan Timur', country: 'Indonesia', type: 'City', postalCode: '76111', isPortCity: true, airportCode: 'BPN', active: true },
  { id: 'C05', code: 'UPG', name: 'Makassar', provinceName: 'Sulawesi Selatan', country: 'Indonesia', type: 'City', postalCode: '90111', isPortCity: true, airportCode: 'UPG', active: true },
  { id: 'C06', code: 'SRG', name: 'Semarang', provinceName: 'Jawa Tengah', country: 'Indonesia', type: 'City', postalCode: '50111', isPortCity: true, airportCode: 'SRG', active: true },
  { id: 'C07', code: 'BDO', name: 'Bandung', provinceName: 'Jawa Barat', country: 'Indonesia', type: 'City', postalCode: '40111', isPortCity: false, airportCode: 'BDO', active: true },
  { id: 'C08', code: 'BTH', name: 'Batam', provinceName: 'Kepulauan Riau', country: 'Indonesia', type: 'City', postalCode: '29400', isPortCity: true, airportCode: 'BTH', active: true },
  { id: 'C09', code: 'DPS', name: 'Denpasar', provinceName: 'Bali', country: 'Indonesia', type: 'City', postalCode: '80111', isPortCity: true, airportCode: 'DPS', active: true },
  { id: 'C10', code: 'DJJ', name: 'Jayapura', provinceName: 'Papua', country: 'Indonesia', type: 'City', postalCode: '99111', isPortCity: true, airportCode: 'DJJ', active: true },
];

export const mockCustomerTypes: MasterCustomerType[] = [
  { id: 'CT1', code: 'CORP-A', name: 'Enterprise Corporate Tier A', discountPercentage: 15, creditTermDays: 30, minimumMonthlyVolumeKg: 5000 },
  { id: 'CT2', code: 'CORP-B', name: 'Corporate Standard Tier B', discountPercentage: 10, creditTermDays: 14, minimumMonthlyVolumeKg: 1000 },
  { id: 'CT3', code: 'SME', name: 'Small Medium Business', discountPercentage: 5, creditTermDays: 7, minimumMonthlyVolumeKg: 200 },
  { id: 'CT4', code: 'RETAIL', name: 'Retail / Cash Customer', discountPercentage: 0, creditTermDays: 0, minimumMonthlyVolumeKg: 0 },
  { id: 'CT5', code: 'GOV', name: 'Government & BUMN Agency', discountPercentage: 12, creditTermDays: 45, minimumMonthlyVolumeKg: 3000 },
];

export const mockBaseTariffs: MasterBaseTariff[] = [
  { id: 'T01', effectiveDate: '2026-01-01', destinationAndCode: 'Surabaya (SUB)', transportType: 'Udara', costPrice: 12000, regionalHandling: 2000, jakartaHandling: 1500, leadTime: '1-2 Days', minWeightKg: 10, marginPercentage: 20, sellingPrice: 18600 },
  { id: 'T02', effectiveDate: '2026-01-01', destinationAndCode: 'Medan (KNO)', transportType: 'Udara', costPrice: 18000, regionalHandling: 2500, jakartaHandling: 1500, leadTime: '1-2 Days', minWeightKg: 10, marginPercentage: 20, sellingPrice: 26400 },
  { id: 'T03', effectiveDate: '2026-01-01', destinationAndCode: 'Balikpapan (BPN)', transportType: 'Udara', costPrice: 22000, regionalHandling: 3000, jakartaHandling: 2000, leadTime: '2-3 Days', minWeightKg: 10, marginPercentage: 20, sellingPrice: 32400 },
  { id: 'T04', effectiveDate: '2026-01-01', destinationAndCode: 'Surabaya (SUB)', transportType: 'Laut', costPrice: 2500, regionalHandling: 800, jakartaHandling: 700, leadTime: '3-4 Days', minWeightKg: 100, marginPercentage: 15, sellingPrice: 4600 },
  { id: 'T05', effectiveDate: '2026-01-01', destinationAndCode: 'Makassar (UPG)', transportType: 'Laut', costPrice: 5000, regionalHandling: 1200, jakartaHandling: 1000, leadTime: '5-7 Days', minWeightKg: 50, marginPercentage: 18, sellingPrice: 8500 },
  { id: 'T06', effectiveDate: '2026-01-01', destinationAndCode: 'Semarang (SRG)', transportType: 'Darat', costPrice: 4000, regionalHandling: 1000, jakartaHandling: 800, leadTime: '1-2 Days', minWeightKg: 50, marginPercentage: 15, sellingPrice: 6670 },
  { id: 'T07', effectiveDate: '2026-01-01', destinationAndCode: 'Bandung (BDO)', transportType: 'Darat', costPrice: 8000, regionalHandling: 1500, jakartaHandling: 1000, leadTime: '1 Day', minWeightKg: 5, marginPercentage: 20, sellingPrice: 12600 },
];

export const mockVehicles: MasterVehicle[] = [
  { id: 'V01', plateNumber: 'B 9821 WDS', vehicleType: 'Wingbox Truck', brandModel: 'Isuzu Giga FVR', maxWeightKg: 18000, maxVolumeCbm: 45, driverName: 'Suryadi Pratama', driverPhone: '0812-3456-7890', status: 'In Transit', kirValidityDate: '2026-11-20', branchOffice: 'Jakarta Head Office' },
  { id: 'V02', plateNumber: 'B 9042 WDS', vehicleType: 'CDD Box', brandModel: 'Mitsubishi Fuso Canter', maxWeightKg: 5000, maxVolumeCbm: 18, driverName: 'Budi Santoso', driverPhone: '0813-8899-1234', status: 'Ready', kirValidityDate: '2026-09-15', branchOffice: 'Jakarta Head Office' },
  { id: 'V03', plateNumber: 'L 8102 WDS', vehicleType: 'Wingbox Truck', brandModel: 'Hino Ranger FL', maxWeightKg: 20000, maxVolumeCbm: 50, driverName: 'Eko Raharjo', driverPhone: '0811-9283-4712', status: 'Ready', kirValidityDate: '2026-12-05', branchOffice: 'Surabaya Branch' },
  { id: 'V04', plateNumber: 'BK 9112 WDS', vehicleType: 'Container Trailer 40ft', brandModel: 'Volvo FM 400', maxWeightKg: 30000, maxVolumeCbm: 68, driverName: 'Ahmad Hasibuan', driverPhone: '0852-7711-0022', status: 'Assigned', kirValidityDate: '2026-10-10', branchOffice: 'Medan Logistics Hub' },
  { id: 'V05', plateNumber: 'KT 8820 WDS', vehicleType: 'CDE Pickup', brandModel: 'Isuzu Traga Box', maxWeightKg: 2500, maxVolumeCbm: 8, driverName: 'Rian Kurniawan', driverPhone: '0821-4455-6677', status: 'Maintenance', kirValidityDate: '2026-08-30', branchOffice: 'Balikpapan Port Office' },
];

export const mockCustomers: MasterCustomer[] = [
  { id: 'CUST-00001', code: 'CUST-00001', companyName: 'PT Kalbe Farma Tbk', contactPerson: 'Hendra Gunawan', email: 'logistics@kalbefarma.co.id', phone: '021-4287388', address: 'Jl. Letjen Suprapto Kav. 4, Cempaka Putih', city: 'Jakarta', npwpTaxId: '01.234.567.8-012.000', customerType: 'Enterprise Corporate Tier A', creditLimitIdr: 500000000, outstandingBalanceIdr: 125400000, active: true },
  { id: 'CUST-00002', code: 'CUST-00002', companyName: 'PT Indofood CBP Sukses Makmur', contactPerson: 'Dewi Lestari', email: 'shipping@indofoodcbp.com', phone: '021-5795888', address: 'Indofood Tower Lt. 23, Jl. Jend. Sudirman', city: 'Jakarta', npwpTaxId: '01.333.444.5-015.000', customerType: 'Enterprise Corporate Tier A', creditLimitIdr: 1000000000, outstandingBalanceIdr: 342000000, active: true },
  { id: 'CUST-00003', code: 'CUST-00003', companyName: 'PT Astra Otoparts Tbk', contactPerson: 'Bambang Tri', email: 'procurement@component.astra.co.id', phone: '021-4603550', address: 'Jl. Raya Pegangsaan Dua Km. 2.2, Kelapa Gading', city: 'Jakarta', npwpTaxId: '01.999.888.7-042.000', customerType: 'Corporate Standard Tier B', creditLimitIdr: 250000000, outstandingBalanceIdr: 48500000, active: true },
  { id: 'CUST-00004', code: 'CUST-00004', companyName: 'PT Petrosea Tbk Mining & Offshore', contactPerson: 'Yudha Perkasa', email: 'cargo@petrosea.com', phone: '0542-762200', address: 'Jl. Mulawarman No. 88, Manggar', city: 'Balikpapan', npwpTaxId: '02.121.343.4-721.000', customerType: 'Enterprise Corporate Tier A', creditLimitIdr: 750000000, outstandingBalanceIdr: 210000000, active: true },
  { id: 'CUST-00005', code: 'CUST-00005', companyName: 'PT United Tractors Tbk', contactPerson: 'Rizal Efendi', email: 'freight@unitedtractors.com', phone: '021-2457999', address: 'Jl. Raya Bekasi Km. 22, Cakung', city: 'Jakarta', npwpTaxId: '01.555.666.7-002.000', customerType: 'Enterprise Corporate Tier A', creditLimitIdr: 800000000, outstandingBalanceIdr: 95000000, active: true },
];

export const mockAgents: MasterAgent[] = [
  { id: 'AGENT-00001', code: 'AGENT-00001', agentName: 'PT East Java Logistics Express', coverageArea: 'Surabaya, Malang, Gresik, Sidoarjo', contactPerson: 'Agus Wijaya', phone: '031-8432100', email: 'ops@eastjavalogistics.co.id', address: 'Jl. Rungkut Industri III No. 12, Rungkut', city: 'Surabaya', status: 'Active' },
  { id: 'AGENT-00002', code: 'AGENT-00002', agentName: 'CV Sumatra Freight Services', coverageArea: 'Medan, Belawan, Binjai, Tebing Tinggi', contactPerson: 'Rahmat Hidayat', phone: '061-7365000', email: 'medan@sumatrafreight.com', address: 'Jl. Yos Sudarso Km. 8.5, Belawan', city: 'Medan', status: 'Active' },
  { id: 'AGENT-00003', code: 'AGENT-00003', agentName: 'PT Borneo Cargo Logistics', coverageArea: 'Balikpapan, Samarinda, Bontang, IKN', contactPerson: 'Danang Kurniadi', phone: '0542-882211', email: 'ikn.logistics@borneocargo.co.id', address: 'Jl. Jend. Sudirman No. 45, Klandasan', city: 'Balikpapan', status: 'Active' },
  { id: 'AGENT-00004', code: 'AGENT-00004', agentName: 'PT Celebes Marine Express', coverageArea: 'Makassar, Maros, Gowa, Parepare', contactPerson: 'Syamsul Bahri', phone: '0411-445566', email: 'dispatch@celebesmarine.co.id', address: 'Jl. Nusantara Port Terminal 2', city: 'Makassar', status: 'Active' },
];

export const mockVendors: MasterVendor[] = [
  { id: 'VDR-00001', code: 'VDR-00001', vendorName: 'PT Garuda Indonesia (Persero) Cargo', category: 'Airlines', contactPerson: 'Lia Fitriani', phone: '021-25608888', email: 'cargo.support@garuda-indonesia.com', paymentTermDays: 'TOP 14 Days', address: 'Soekarno-Hatta Int. Airport Cargo Area', city: 'Tangerang', status: 'Active' },
  { id: 'VDR-00002', code: 'VDR-00002', vendorName: 'PT Samudera Indonesia Tbk Shipping', category: 'Shipping Line', contactPerson: 'Johan Setiawan', phone: '021-5480088', email: 'container@samudera.id', paymentTermDays: 'TOP 30 Days', address: 'Gedung Samudera Indonesia Jl. Letjen S. Parman', city: 'Jakarta Pusat', status: 'Active' },
  { id: 'VDR-00003', code: 'VDR-00003', vendorName: 'PT Meratus Line FCL/LCL Service', category: 'Shipping Line', contactPerson: 'Arif Hidayat', phone: '031-3292288', email: 'customer@meratusline.com', paymentTermDays: 'TOP 30 Days', address: 'Jl. Alun-Alun Priok No. 27', city: 'Surabaya', status: 'Active' },
  { id: 'VDR-00004', code: 'VDR-00004', vendorName: 'PT Lion Express Cargo Division', category: 'Airlines', contactPerson: 'Maya Angela', phone: '021-63798000', email: 'cargo.ops@lionair.co.id', paymentTermDays: 'TOP 14 Days', address: 'Jl. Gajah Mada No. 7, Harmoni', city: 'Jakarta Pusat', status: 'Active' },
  { id: 'VDR-00005', code: 'VDR-00005', vendorName: 'PT Wahana Trans Logistics Partner', category: 'Trucking Agent', contactPerson: 'Dwi Prasetyo', phone: '021-8839000', email: 'fleet@wahanatrans.com', paymentTermDays: 'TOP 15 Days', address: 'Jl. Raya Bekasi Km. 21, Pulogadung', city: 'Jakarta Timur', status: 'Active' },
];

export const mockConsignees: MasterConsignee[] = [
  { id: 'CNEE-00001', consigneeCode: 'CNEE-00001', name: 'Apotek Kimia Farma Depot SUB', contactPerson: 'Bambang Soeprapto', phone: '031-5034111', email: 'depot.surabaya@kimiafarma.co.id', city: 'Surabaya', postCode: '60241', address: 'Jl. Raya Darmo No. 120, Tegalsari', status: 'Active' },
  { id: 'CNEE-00002', consigneeCode: 'CNEE-00002', name: 'Mining Field Site Support Base', contactPerson: 'Hendrikus Tan', phone: '0542-990011', email: 'site.logistics@petrosea.com', city: 'Balikpapan', postCode: '76115', address: 'Kawasan Industri Kariangau KM 13', status: 'Active' },
  { id: 'CNEE-00003', consigneeCode: 'CNEE-00003', name: 'Auto2000 Regional Distribution Center', contactPerson: 'Robby Firmansyah', phone: '061-6623000', email: 'rdc.medan@auto2000.co.id', city: 'Medan', postCode: '20217', address: 'Jl. Sisingamangaraja No. 332, Amplas', status: 'Active' },
  { id: 'CNEE-00004', consigneeCode: 'CNEE-00004', name: 'Indofood Distribution Hub Makassar', contactPerson: 'Siti Nurhaliza', phone: '0411-510000', email: 'hub.makassar@indofood.co.id', city: 'Makassar', postCode: '90245', address: 'Kawasan Industri Makassar (KIMA) Kav. 8', status: 'Active' },
];

export const mockAWBs: AWBRecord[] = [
  {
    id: 'AWB-1001',
    awbNumber: 'WDSS-CGK-2026-0809-0012',
    pinCode: '8912',
    pinVerified: true,
    bookingDate: '2026-08-09 07:30',
    serviceType: 'Air Freight',
    customerName: 'PT Kalbe Farma Tbk',
    customerId: 'CUST-001',
    consigneeName: 'Apotek Kimia Farma Depot SUB',
    consigneePhone: '031-5034111',
    consigneeAddress: 'Jl. Raya Darmo No. 120, Surabaya',
    originCity: 'Jakarta',
    destinationCity: 'Surabaya',
    destinationProvince: 'Jawa Timur',
    actualWeightKg: 245,
    volumetricWeightKg: 310,
    chargeableWeightKg: 310,
    lengthCm: 120,
    widthCm: 80,
    heightCm: 100,
    piecesCount: 12,
    commodityType: 'Pharmaceutical Products (Cold Chain)',
    declaredValueIdr: 450000000,
    tariffPerKgIdr: 18500,
    baseCostIdr: 5735000,
    surchargesIdr: 450000,
    insuranceCostIdr: 900000,
    taxIdr: 780350,
    totalCostIdr: 7865350,
    paymentStatus: 'Credit 30 Days',
    status: 'In Transit',
    currentLocation: 'Garuda Air Cargo Warehouse CGK Terminal 3',
    vehiclePlateNo: 'B 9821 WDS',
    driverName: 'Suryadi Pratama',
    estimatedArrival: '2026-08-09 18:30',
    branchOffice: 'Jakarta Head Office',
    createdByName: 'Tasrifudin - CS Senior',
    notes: 'Handle with extreme care. Keep temperature 2-8 C.'
  },
  {
    id: 'AWB-1002',
    awbNumber: 'WDSS-CGK-2026-0808-0098',
    pinCode: '4421',
    pinVerified: true,
    bookingDate: '2026-08-08 14:15',
    serviceType: 'Sea Freight FCL',
    customerName: 'PT Petrosea Tbk Mining & Offshore',
    customerId: 'CUST-004',
    consigneeName: 'Mining Field Site Support Base',
    consigneePhone: '0542-990011',
    consigneeAddress: 'Kawasan Industri Kariangau KM 13, Balikpapan',
    originCity: 'Jakarta',
    destinationCity: 'Balikpapan',
    destinationProvince: 'Kalimantan Timur',
    actualWeightKg: 14200,
    volumetricWeightKg: 12000,
    chargeableWeightKg: 14200,
    lengthCm: 1200,
    widthCm: 240,
    heightCm: 260,
    piecesCount: 1,
    commodityType: 'Heavy Mining Machinery Spare Parts',
    declaredValueIdr: 1250000000,
    tariffPerKgIdr: 4500,
    baseCostIdr: 63900000,
    surchargesIdr: 3500000,
    insuranceCostIdr: 2500000,
    taxIdr: 7689000,
    totalCostIdr: 77589000,
    paymentStatus: 'Credit 30 Days',
    status: 'Customs Clearance',
    currentLocation: 'Tanjung Perak Port Terminal Pier 2 Surabaya',
    vehiclePlateNo: 'KT 8820 WDS',
    driverName: 'Rian Kurniawan',
    estimatedArrival: '2026-08-11 10:00',
    branchOffice: 'Balikpapan Port Office',
    createdByName: 'Siti Rahma - Operations',
    notes: 'Container Seal No: WDS-CNTR-90812'
  },
  {
    id: 'AWB-1003',
    awbNumber: 'WDSS-CGK-2026-0809-0015',
    pinCode: '1092',
    pinVerified: false,
    bookingDate: '2026-08-09 08:10',
    serviceType: 'Land Transportation',
    customerName: 'PT Astra Otoparts Tbk',
    customerId: 'CUST-003',
    consigneeName: 'Auto2000 Regional Distribution Center',
    consigneePhone: '061-6623000',
    consigneeAddress: 'Jl. Sisingamangaraja No. 332, Medan',
    originCity: 'Jakarta',
    destinationCity: 'Semarang',
    destinationProvince: 'Jawa Tengah',
    actualWeightKg: 3800,
    volumetricWeightKg: 4200,
    chargeableWeightKg: 4200,
    lengthCm: 600,
    widthCm: 220,
    heightCm: 220,
    piecesCount: 85,
    commodityType: 'Automotive Engine Components & Filters',
    declaredValueIdr: 320000000,
    tariffPerKgIdr: 6500,
    baseCostIdr: 27300000,
    surchargesIdr: 1200000,
    insuranceCostIdr: 640000,
    taxIdr: 3205400,
    totalCostIdr: 32345400,
    paymentStatus: 'Paid',
    status: 'Cargo Picked Up',
    currentLocation: 'WDSS Hub Cikarang Distribution Center',
    vehiclePlateNo: 'B 9042 WDS',
    driverName: 'Budi Santoso',
    estimatedArrival: '2026-08-10 09:00',
    branchOffice: 'Jakarta Head Office',
    createdByName: 'Budi Kurnia - Freight',
    notes: 'Direct land truck loading'
  },
  {
    id: 'AWB-1004',
    awbNumber: 'WDSS-SUB-2026-0807-0044',
    pinCode: '7723',
    pinVerified: true,
    bookingDate: '2026-08-07 10:00',
    serviceType: 'Sea Freight LCL',
    customerName: 'PT Indofood CBP Sukses Makmur',
    customerId: 'CUST-002',
    consigneeName: 'Indofood Distribution Hub Makassar',
    consigneePhone: '0411-510000',
    consigneeAddress: 'Kawasan Industri Makassar (KIMA) 8, Makassar',
    originCity: 'Surabaya',
    destinationCity: 'Makassar',
    destinationProvince: 'Sulawesi Selatan',
    actualWeightKg: 1850,
    volumetricWeightKg: 2100,
    chargeableWeightKg: 2100,
    lengthCm: 200,
    widthCm: 150,
    heightCm: 180,
    piecesCount: 40,
    commodityType: 'Processed Food Ingredients & Seasonings',
    declaredValueIdr: 180000000,
    tariffPerKgIdr: 8500,
    baseCostIdr: 17850000,
    surchargesIdr: 850000,
    insuranceCostIdr: 360000,
    taxIdr: 2096600,
    totalCostIdr: 21156600,
    paymentStatus: 'Paid',
    status: 'Delivered',
    currentLocation: 'Delivered to KIMA Makassar Hub',
    vehiclePlateNo: 'DD 8120 WDS',
    driverName: 'Syamsul Bahri',
    estimatedArrival: '2026-08-09 11:00',
    branchOffice: 'Surabaya Branch',
    createdByName: 'Maya Anita - CS',
    podName: 'Pak Andi - Warehouse Manager',
    podTime: '2026-08-09 10:45'
  },
  {
    id: 'AWB-1005',
    awbNumber: 'WDSS-CGK-2026-0809-0019',
    pinCode: '3310',
    pinVerified: false,
    bookingDate: '2026-08-09 09:40',
    serviceType: 'Express Courier',
    customerName: 'PT United Tractors Tbk',
    customerId: 'CUST-005',
    consigneeName: 'Astra Heavy Equipment Service Site',
    consigneePhone: '022-778811',
    consigneeAddress: 'Jl. Soekarno Hatta No. 450, Bandung',
    originCity: 'Jakarta',
    destinationCity: 'Bandung',
    destinationProvince: 'Jawa Barat',
    actualWeightKg: 15,
    volumetricWeightKg: 12,
    chargeableWeightKg: 15,
    lengthCm: 40,
    widthCm: 30,
    heightCm: 30,
    piecesCount: 2,
    commodityType: 'Urgent Hydraulics Control Valve Doc & Part',
    declaredValueIdr: 45000000,
    tariffPerKgIdr: 12000,
    baseCostIdr: 180000,
    surchargesIdr: 50000,
    insuranceCostIdr: 90000,
    taxIdr: 35200,
    totalCostIdr: 355200,
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    currentLocation: 'WDSS Courier Hub Bandung Kota',
    vehiclePlateNo: 'D 1290 WDS',
    driverName: 'Agung Wicaksono',
    estimatedArrival: '2026-08-09 14:00',
    branchOffice: 'Jakarta Head Office',
    createdByName: 'Tasrifudin - CS Senior'
  }
];

export const mockPettyCash: PettyCashRecord[] = [
  { id: 'PC-2026-001', voucherNo: 'VCH-CGK-0809-01', date: '2026-08-09', branchOffice: 'Jakarta Head Office', category: 'Fuel & Toll', amountIdr: 1250000, description: 'Pertamax Turbo & Tol Trans-Jawa Cikampek Wingbox B 9821 WDS', requestedBy: 'Suryadi Pratama', approvedBy: 'Andi Wijaya (Manager)', status: 'Approved', receiptAttachment: 'fuel_receipt_0809.jpg' },
  { id: 'PC-2026-002', voucherNo: 'VCH-CGK-0809-02', date: '2026-08-09', branchOffice: 'Jakarta Head Office', category: 'Customs/Port Fee', amountIdr: 850000, description: 'Tanjung Priok Pier Gate Pass & Port Clearance Stamp', requestedBy: 'Budi Santoso', approvedBy: 'Andi Wijaya (Manager)', status: 'Approved', receiptAttachment: 'port_gate_pass.pdf' },
  { id: 'PC-2026-003', voucherNo: 'VCH-SUB-0808-11', date: '2026-08-08', branchOffice: 'Surabaya Branch', category: 'Loading Staff', amountIdr: 600000, description: 'Overtime Loading Crew 4 persons for Sea Container LCL loading', requestedBy: 'Eko Raharjo', approvedBy: 'Hendra (Branch Mgr)', status: 'Disbursed' },
  { id: 'PC-2026-004', voucherNo: 'VCH-BPN-0809-05', date: '2026-08-09', branchOffice: 'Balikpapan Port Office', category: 'Vehicle Repair', amountIdr: 3450000, description: 'Emergency Hydraulic Hose Replacement Isuzu Traga KT 8820 WDS', requestedBy: 'Rian Kurniawan', status: 'Pending Approval' },
  { id: 'PC-2026-005', voucherNo: 'VCH-KNO-0809-02', date: '2026-08-09', branchOffice: 'Medan Logistics Hub', category: 'Driver Allowance', amountIdr: 1500000, description: 'Out-of-town overnight allowance Medan - Banda Aceh route', requestedBy: 'Ahmad Hasibuan', status: 'Pending Approval' }
];

export const mockTickets: CustomerTicket[] = [
  {
    id: 'TCK-001',
    ticketNo: 'TCK-20260809-01',
    awbNumber: 'WDSS-CGK-2026-0809-0012',
    customerName: 'PT Kalbe Farma Tbk',
    category: 'SLA Delay Escalation',
    priority: 'High',
    subject: 'Express Temperature Sensitive Cargo Arrival Time Inquiries',
    description: 'Cold chain pharmaceuticals shipment needs priority dispatch confirmation at Surabaya airport terminal.',
    assignedAgent: 'Dewi Anggraini (CS Senior)',
    status: 'In Progress',
    createdAt: '2026-08-09 08:30'
  },
  {
    id: 'TCK-002',
    ticketNo: 'TCK-20260808-14',
    awbNumber: 'WDSS-CGK-2026-0808-0098',
    customerName: 'PT Petrosea Tbk Mining & Offshore',
    category: 'POD Document Request',
    priority: 'Medium',
    subject: 'Signed Hardcopy Proof of Delivery (POD) Voucher Request',
    description: 'Finance department requires physical signed POD copy for monthly invoice release.',
    assignedAgent: 'Budi Kurnia (CS Logistics)',
    status: 'Open',
    createdAt: '2026-08-08 15:40'
  },
  {
    id: 'TCK-003',
    ticketNo: 'TCK-20260807-09',
    awbNumber: 'WDSS-CGK-2026-0807-0041',
    customerName: 'PT Astra Otoparts Tbk',
    category: 'Cargo Insurance Claim',
    priority: 'High',
    subject: 'Minor Packaging Scratch on Outer Wooden Crate',
    description: 'Report submitted by consignee receiver upon gate entry inspection. Claim submitted to PT Asuransi Jasa Indonesia.',
    assignedAgent: 'Siti Rahma (Claims Officer)',
    status: 'Resolved',
    createdAt: '2026-08-07 10:15'
  }
];

export const mockGeneralCash: GeneralCashRecord[] = [
  { id: 'GC-001', transactionNo: 'TRX-BANK-20260809-001', date: '2026-08-09', type: 'Income', accountName: 'BCA Main Operations 880-129000-1', category: 'Freight Revenue', amountIdr: 125400000, referenceNo: 'INV-2026-0771', notes: 'Settlement from PT Kalbe Farma Tbk for July AWB Invoices', status: 'Verified' },
  { id: 'GC-002', transactionNo: 'TRX-BANK-20260809-002', date: '2026-08-09', type: 'Expense', accountName: 'Mandiri Corporate 120-00-998811-2', category: 'Vendor Settlement', amountIdr: 85000000, referenceNo: 'VEND-GA-0809', notes: 'Garuda Air Freight Bulk Space Payment August Block 1', status: 'Verified' },
  { id: 'GC-003', transactionNo: 'TRX-BANK-20260808-014', date: '2026-08-08', type: 'Expense', accountName: 'BCA Main Operations 880-129000-1', category: 'Fleet Maintenance', amountIdr: 18500000, referenceNo: 'PO-ISUZU-882', notes: 'Scheduled 50,000 KM Major Service Isuzu Wingbox Fleet', status: 'Verified' },
  { id: 'GC-004', transactionNo: 'TRX-BANK-20260808-012', date: '2026-08-08', type: 'Income', accountName: 'BNI Corporate 090-8812-00', category: 'Freight Revenue', amountIdr: 342000000, referenceNo: 'INV-2026-0765', notes: 'Payment PT Indofood CBP Sukses Makmur', status: 'Verified' },
  { id: 'GC-005', transactionNo: 'TRX-BANK-20260809-005', date: '2026-08-09', type: 'Transfer', accountName: 'BCA Main -> Branch Petty Cash Surabaya', category: 'Branch Operation', amountIdr: 25000000, referenceNo: 'TRF-SUB-CASH', notes: 'Weekly Petty Cash Top-up Surabaya Branch', status: 'Verified' },
];

export const mockUsers: SystemUser[] = [
  { id: 'U-001', nik: 'WDSS-2020-001', fullName: 'Tasrifudin', email: 'tasrifudin0@gmail.com', role: 'Super Admin', department: 'Executive Management', branchOffice: 'Jakarta Head Office', status: 'Active', lastLogin: '2026-08-09 08:00' },
  { id: 'U-002', nik: 'WDSS-2021-014', fullName: 'Andi Wijaya, S.E.', email: 'andi.wijaya@wdss.co.id', role: 'Branch Manager', department: 'Branch Management', branchOffice: 'Jakarta Head Office', status: 'Active', lastLogin: '2026-08-09 07:45' },
  { id: 'U-003', nik: 'WDSS-2022-088', fullName: 'Siti Rahma', email: 'siti.rahma@wdss.co.id', role: 'Operations', department: 'Air & Land Operations', branchOffice: 'Jakarta Head Office', status: 'Active', lastLogin: '2026-08-09 08:02' },
  { id: 'U-004', nik: 'WDSS-2023-102', fullName: 'Budi Kurnia', email: 'budi.kurnia@wdss.co.id', role: 'Freight Forwarding', department: 'Sea Freight Division', branchOffice: 'Surabaya Branch', status: 'Active', lastLogin: '2026-08-08 17:30' },
  { id: 'U-005', nik: 'WDSS-2021-042', fullName: 'Ratna Sari, Ak.', email: 'ratna.sari@wdss.co.id', role: 'Finance Manager', department: 'Finance & Treasury', branchOffice: 'Jakarta Head Office', status: 'Active', lastLogin: '2026-08-09 07:15' },
  { id: 'U-006', nik: 'WDSS-2024-210', fullName: 'Dewi Anggraini', email: 'dewi.a@wdss.co.id', role: 'Customer Service', department: 'Customer Service', branchOffice: 'Jakarta Head Office', status: 'Active', lastLogin: '2026-08-09 08:04' },
];

export const mockRolePermissions: RolePermission[] = [
  { id: 'R-01', roleName: 'Super Admin', description: 'Full Unrestricted Administrative Access Across All Modules & Branches', canCreateAwb: true, canApprovePettyCash: true, canEditMasterData: true, canAccessFinance: true, canManageUsers: true, canViewReports: true },
  { id: 'R-02', roleName: 'Customer Service', description: 'AWB Creation, Consignee Lookup, Customer Management, Rate Calculation', canCreateAwb: true, canApprovePettyCash: false, canEditMasterData: false, canAccessFinance: false, canManageUsers: false, canViewReports: true },
  { id: 'R-03', roleName: 'Freight Forwarding & Operations', description: 'Manifest Generation, Vehicle Dispatch, Status Updates, PIN Verification', canCreateAwb: true, canApprovePettyCash: false, canEditMasterData: true, canAccessFinance: false, canManageUsers: false, canViewReports: true },
  { id: 'R-04', roleName: 'Finance Manager', description: 'Cash Management, Petty Cash Voucher Approval, Financial Statements', canCreateAwb: false, canApprovePettyCash: true, canEditMasterData: false, canAccessFinance: true, canManageUsers: false, canViewReports: true },
  { id: 'R-05', roleName: 'Branch Manager', description: 'Branch Operational Supervision, Local Petty Cash Approval & Monitoring', canCreateAwb: true, canApprovePettyCash: true, canEditMasterData: true, canAccessFinance: true, canManageUsers: false, canViewReports: true },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'LOG-901', timestamp: '2026-08-09 08:04:12', userName: 'Dewi Anggraini', userRole: 'Customer Service', actionType: 'CREATE', module: 'Air Waybill (AWB)', details: 'Generated new Air Waybill AWB WDSS-CGK-2026-0809-0019 for PT United Tractors', ipAddress: '192.168.1.45' },
  { id: 'LOG-902', timestamp: '2026-08-09 08:00:15', userName: 'Tasrifudin', userRole: 'Super Admin', actionType: 'LOGIN', module: 'System Security', details: 'Successful SSO Master Authentication Session Started', ipAddress: '10.0.4.12' },
  { id: 'LOG-903', timestamp: '2026-08-09 07:45:30', userName: 'Andi Wijaya, S.E.', userRole: 'Branch Manager', actionType: 'APPROVE', module: 'Finance Petty Cash', details: 'Approved Petty Cash Voucher VCH-CGK-0809-01 IDR 1,250,000 (Suryadi - Fuel)', ipAddress: '192.168.1.10' },
  { id: 'LOG-904', timestamp: '2026-08-08 16:20:00', userName: 'Siti Rahma', userRole: 'Operations', actionType: 'UPDATE', module: 'Track & Trace', details: 'Updated shipment status AWB WDSS-CGK-2026-0808-0098 to Customs Clearance', ipAddress: '192.168.1.32' },
  { id: 'LOG-905', timestamp: '2026-08-08 14:10:05', userName: 'Ratna Sari, Ak.', userRole: 'Finance Manager', actionType: 'EXPORT', module: 'General Cash Report', details: 'Exported July 2026 General Ledger Statement to Excel Format', ipAddress: '192.168.2.11' },
];

// Operational Analytics Data for Dashboard
export const mockShipmentTrends = [
  { month: 'Jan', air: 320, sea: 540, land: 410, total: 1270 },
  { month: 'Feb', air: 340, sea: 580, land: 430, total: 1350 },
  { month: 'Mar', air: 390, sea: 620, land: 480, total: 1490 },
  { month: 'Apr', air: 410, sea: 690, land: 520, total: 1620 },
  { month: 'May', air: 450, sea: 710, land: 560, total: 1720 },
  { month: 'Jun', air: 480, sea: 780, land: 610, total: 1870 },
  { month: 'Jul', air: 520, sea: 840, land: 670, total: 2030 },
  { month: 'Aug (EST)', air: 560, sea: 890, land: 720, total: 2170 },
];

export const mockRevenueTrends = [
  { month: 'Jan', revenue: 1420000000, target: 1350000000 },
  { month: 'Feb', revenue: 1580000000, target: 1400000000 },
  { month: 'Mar', revenue: 1750000000, target: 1500000000 },
  { month: 'Apr', revenue: 1890000000, target: 1600000000 },
  { month: 'May', revenue: 2100000000, target: 1750000000 },
  { month: 'Jun', revenue: 2350000000, target: 1900000000 },
  { month: 'Jul', revenue: 2680000000, target: 2100000000 },
];

export const mockTransportModeBreakdown = [
  { name: 'Sea Freight (FCL/LCL)', value: 45, color: '#0070C0' },
  { name: 'Air Freight Express', value: 32, color: '#0099FF' },
  { name: 'Land Trucking Intercity', value: 18, color: '#00C49F' },
  { name: 'Same Day Courier', value: 5, color: '#FFBB28' },
];

export const mockTopDestinations = [
  { city: 'Surabaya (SUB)', shipments: 482, revenueM: 890 },
  { city: 'Medan (KNO)', shipments: 364, revenueM: 710 },
  { city: 'Balikpapan (BPN)', shipments: 312, revenueM: 950 },
  { city: 'Makassar (UPG)', shipments: 289, revenueM: 580 },
  { city: 'Semarang (SRG)', shipments: 215, revenueM: 320 },
];

export const mockIndonesiaHubs = [
  { id: 'hub-cgk', name: 'Jakarta CGK Main Hub', code: 'CGK', type: 'Headquarters & Air/Sea Hub', x: 230, y: 310, activeShipments: 412, capacityPercent: 82, city: 'Jakarta' },
  { id: 'hub-sub', name: 'Surabaya Tanjung Perak Hub', code: 'SUB', type: 'East Java Maritime Hub', x: 340, y: 330, activeShipments: 289, capacityPercent: 76, city: 'Surabaya' },
  { id: 'hub-kno', name: 'Medan Kualanamu Hub', code: 'KNO', type: 'North Sumatra Gateway', x: 90, y: 150, activeShipments: 194, capacityPercent: 68, city: 'Medan' },
  { id: 'hub-bpn', name: 'Balikpapan Semayang Hub', code: 'BPN', type: 'Kalimantan & IKN Logistics', x: 440, y: 220, activeShipments: 215, capacityPercent: 89, city: 'Balikpapan' },
  { id: 'hub-upg', name: 'Makassar Soekarno-Hatta Hub', code: 'UPG', type: 'Eastern Indonesia Distribution', x: 520, y: 270, activeShipments: 168, capacityPercent: 64, city: 'Makassar' },
  { id: 'hub-djj', name: 'Jayapura Sentani Port', code: 'DJJ', type: 'Papua Regional Forwarding', x: 820, y: 260, activeShipments: 84, capacityPercent: 52, city: 'Jayapura' },
];
