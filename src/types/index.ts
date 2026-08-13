export type UserRole = 
  | 'Customer Service'
  | 'Freight Forwarding'
  | 'Operations'
  | 'Finance'
  | 'Finance Manager'
  | 'Customer Support'
  | 'Warehouse'
  | 'Branch Manager'
  | 'Management'
  | 'Super Admin';

export type NavigationTab = 
  | 'dashboard'
  | 'master-country'
  | 'master-province'
  | 'master-city'
  | 'master-customer-type'
  | 'master-base-tariff'
  | 'master-vehicle'
  | 'master-customer'
  | 'master-agent'
  | 'master-vendor'
  | 'master-consignee'
  | 'transaction-awb-list'
  | 'transaction-awb-new'
  | 'transaction-generate-awb'
  | 'transaction-print-blank'
  | 'transaction-upload-pin'
  | 'shipment-list'
  | 'shipment-manifest'
  | 'shipment-monitoring'
  | 'shipment-print-manifest'
  | 'report-petty-cash'
  | 'report-general-cash'
  | 'report-sales'
  | 'track-update-status'
  | 'track-status-report'
  | 'finance-cash-dashboard'
  | 'finance-general-cash'
  | 'finance-petty-cash'
  | 'finance-voucher'
  | 'finance-request'
  | 'ops-air-freight'
  | 'ops-sea-freight'
  | 'ops-land-transport'
  | 'ops-courier-service'
  | 'ops-project-logistics'
  | 'ops-warehousing'
  | 'ops-distribution'
  | 'customer-support-tickets'
  | 'branch-offices'
  | 'management-executive'
  | 'settings-user'
  | 'settings-role'
  | 'settings-audit'
  | 'settings-system';

export type ServiceType = 'Air Freight' | 'Sea Freight FCL' | 'Sea Freight LCL' | 'Land Transportation' | 'Express Courier';

export type ShipmentStatus = 
  | 'Draft'
  | 'Booking Confirmed'
  | 'Cargo Picked Up'
  | 'Warehouse Processing'
  | 'Manifested'
  | 'In Transit'
  | 'Customs Clearance'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delayed'
  | 'Cancelled';

export interface AWBRecord {
  id: string;
  awbNumber: string;
  pinCode?: string;
  pinVerified?: boolean;
  bookingDate: string;
  serviceType: ServiceType;
  customerName: string;
  customerId: string;
  consigneeName: string;
  consigneePhone: string;
  consigneeAddress: string;
  originCity: string;
  destinationCity: string;
  destinationProvince: string;
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  piecesCount: number;
  commodityType: string;
  declaredValueIdr: number;
  tariffPerKgIdr: number;
  baseCostIdr: number;
  surchargesIdr: number;
  insuranceCostIdr: number;
  taxIdr: number;
  totalCostIdr: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial' | 'Credit 30 Days';
  status: ShipmentStatus;
  currentLocation: string;
  vehiclePlateNo?: string;
  driverName?: string;
  estimatedArrival: string;
  branchOffice: string;
  createdByName: string;
  notes?: string;
  podName?: string;
  podTime?: string;
}

export interface MasterCountry {
  id: string;
  code: string;
  name: string;
  region: string;
  currency: string;
  active: boolean;
}

export interface MasterProvince {
  id: string;
  code: string;
  country: string;
  name: string;
  capitalCity: string;
  islandGroup?: 'Java' | 'Sumatra' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku & Papua';
  hubCode?: string;
  active: boolean;
}

export interface MasterCity {
  id: string;
  code: string;
  name: string;
  provinceName: string;
  country: string;
  type?: 'City' | 'Regency';
  postalCode?: string;
  isPortCity?: boolean;
  airportCode?: string;
  active: boolean;
}

export interface MasterCustomerType {
  id: string;
  code?: string;
  name: string;
  discountPercentage?: number;
  creditTermDays?: number;
  minimumMonthlyVolumeKg?: number;
}

export interface MasterBaseTariff {
  id: string;
  effectiveDate: string;
  destinationAndCode: string;
  transportType: 'Udara' | 'Laut' | 'Darat';
  costPrice: number;
  regionalHandling: number;
  jakartaHandling: number;
  leadTime: string;
  minWeightKg: number;
  marginPercentage: number;
  sellingPrice: number;
  serviceType?: ServiceType;
  originCity?: string;
  destinationCity?: string;
  ratePerKgIdr?: number;
  minimumWeightKg?: number;
  leadTimeDays?: string;
}

export interface MasterVehicle {
  id: string;
  plateNumber: string;
  vehicleType: 'Wingbox Truck' | 'Container Trailer 40ft' | 'CDE Pickup' | 'CDD Box' | 'Blind Van' | 'Cargo Vessel';
  brandModel: string;
  maxWeightKg: number;
  maxVolumeCbm: number;
  driverName: string;
  driverPhone: string;
  status: 'Ready' | 'In Transit' | 'Maintenance' | 'Assigned';
  kirValidityDate: string;
  branchOffice: string;
}

export interface MasterCustomer {
  id: string;
  code: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  npwpTaxId: string;
  customerType: string;
  creditLimitIdr: number;
  outstandingBalanceIdr: number;
  active: boolean;
}

export interface MasterAgent {
  id: string;
  code: string;
  agentName: string;
  coverageArea: string;
  contactPerson: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  ratingScore?: number;
  status: 'Active' | 'Inactive' | 'Pending Review' | 'Suspended';
}

export interface MasterVendor {
  id: string;
  code: string;
  vendorName: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  paymentTermDays: number | string;
  address?: string;
  city?: string;
  ratingScore?: number;
  status?: 'Active' | 'Inactive' | 'Pending Review' | 'Suspended';
}

export interface MasterConsignee {
  id: string;
  consigneeCode: string;
  name: string;
  companyName?: string;
  contactPerson?: string;
  phone: string;
  email: string;
  city: string;
  postCode?: string;
  address: string;
  notes?: string;
  status?: 'Active' | 'Inactive' | 'Pending Review' | 'Suspended';
}

export interface PettyCashRecord {
  id: string;
  voucherNo: string;
  date: string;
  branchOffice: string;
  category: 'Fuel & Toll' | 'Vehicle Repair' | 'Driver Allowance' | 'Office Supplies' | 'Loading Staff' | 'Customs/Port Fee';
  amountIdr: number;
  description: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'Approved' | 'Pending Approval' | 'Rejected' | 'Disbursed';
  receiptAttachment?: string;
}

export interface GeneralCashRecord {
  id: string;
  transactionNo: string;
  date: string;
  type: 'Income' | 'Expense' | 'Transfer';
  accountName: string;
  category: 'Freight Revenue' | 'Vendor Settlement' | 'Fleet Maintenance' | 'Branch Operation' | 'Tax Payment';
  amountIdr: number;
  referenceNo: string;
  notes: string;
  status: 'Verified' | 'Pending';
}

export interface SystemUser {
  id: string;
  nik: string;
  fullName: string;
  email: string;
  role: 'Super Admin' | 'Customer Service' | 'Freight Forwarding' | 'Operations' | 'Finance Manager' | 'Branch Manager' | 'Warehouse Staff';
  department: string;
  branchOffice: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface RolePermission {
  id: string;
  roleName: string;
  description: string;
  canCreateAwb: boolean;
  canApprovePettyCash: boolean;
  canEditMasterData: boolean;
  canAccessFinance: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT' | 'APPROVE';
  module: string;
  details: string;
  ipAddress: string;
}

export interface BranchOffice {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  staffCount: number;
  monthlyVolumeAwbs: number;
  active: boolean;
}

export interface CustomerTicket {
  id: string;
  ticketNo: string;
  awbNumber: string;
  customerName: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  subject: string;
  description: string;
  assignedAgent: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
}
