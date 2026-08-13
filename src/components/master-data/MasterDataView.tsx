import React, { useState } from 'react';
import { 
  Plus,
  X,
  CheckCircle2,
  Globe,
  Power,
  PowerOff,
  Settings
} from 'lucide-react';
import { EnterpriseTable, Column } from '../common/EnterpriseTable';
import { 
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
  NavigationTab 
} from '../../types';
import { 
  mockCountries, 
  mockProvinces, 
  mockCities, 
  mockCustomerTypes, 
  mockBaseTariffs, 
  mockVehicles, 
  mockCustomers, 
  mockAgents, 
  mockVendors, 
  mockConsignees 
} from '../../data/mockData';

interface MasterDataViewProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
}

export const MasterDataView: React.FC<MasterDataViewProps> = ({ currentTab, setCurrentTab }) => {
  // Fallback to master-country if root master-data is passed
  const activeTab = currentTab === 'master-data' ? 'master-country' : currentTab;

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<any>(null);

  // Country Form State
  const [countryFormData, setCountryFormData] = useState<MasterCountry>({
    id: '',
    code: '',
    name: '',
    region: 'Southeast Asia',
    currency: 'USD',
    active: true,
  });

  // Province Form State
  const [provinceFormData, setProvinceFormData] = useState<MasterProvince>({
    id: '',
    code: '',
    country: 'Indonesia',
    name: '',
    capitalCity: '',
    active: true,
  });

  // City / Regency Form State
  const [cityFormData, setCityFormData] = useState<MasterCity>({
    id: '',
    code: '',
    name: '',
    provinceName: 'DKI Jakarta',
    country: 'Indonesia',
    active: true,
  });

  // Customer Type Form State
  const [customerTypeFormData, setCustomerTypeFormData] = useState<MasterCustomerType>({
    id: '',
    code: '',
    name: '',
  });

  // Base Tariff Form State
  const [tariffFormData, setTariffFormData] = useState<MasterBaseTariff>({
    id: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    destinationAndCode: '',
    transportType: 'Udara',
    costPrice: 0,
    regionalHandling: 0,
    jakartaHandling: 0,
    leadTime: '1-2 Days',
    minWeightKg: 10,
    marginPercentage: 15,
    sellingPrice: 0,
  });

  // Vehicle Form State & Dynamic Option Lists
  const [vehicleTypesList, setVehicleTypesList] = useState<string[]>([
    'Wingbox Truck',
    'Container Trailer 40ft',
    'CDE Pickup',
    'CDD Box',
    'Blind Van',
    'Cargo Vessel',
  ]);

  const [brandModelsList, setBrandModelsList] = useState<string[]>([
    'Isuzu Giga FVR',
    'Scania P360',
    'Isuzu Traga',
    'Mitsubishi Fuso Canter',
    'Daihatsu Gran Max',
    'Hino Ranger',
    'Mercedes-Benz Axor',
  ]);

  const [vehicleFormData, setVehicleFormData] = useState<MasterVehicle>({
    id: '',
    plateNumber: '',
    vehicleType: 'Wingbox Truck',
    brandModel: 'Isuzu Giga FVR',
    maxWeightKg: 10000,
    maxVolumeCbm: 30,
    driverName: '',
    driverPhone: '',
    status: 'Ready',
    kirValidityDate: new Date().toISOString().split('T')[0],
    branchOffice: 'Jakarta HQ',
  });

  // Customer Form State
  const [customerFormData, setCustomerFormData] = useState<MasterCustomer>({
    id: '',
    code: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: 'Jakarta',
    creditLimitIdr: 0,
    outstandingBalanceIdr: 0,
    active: true,
  });

  // Agent Form State
  const [agentFormData, setAgentFormData] = useState<MasterAgent>({
    id: '',
    code: '',
    agentName: '',
    coverageArea: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: 'Surabaya',
    status: 'Active',
  });

  // Vendor Form State
  const [vendorFormData, setVendorFormData] = useState<MasterVendor>({
    id: '',
    code: '',
    vendorName: '',
    category: 'Airlines',
    contactPerson: '',
    phone: '',
    email: '',
    paymentTermDays: 'TOP 30 Days',
    address: '',
    city: 'Jakarta',
    status: 'Active',
  });

  // Consignee Form State
  const [consigneeFormData, setConsigneeFormData] = useState<MasterConsignee>({
    id: '',
    consigneeCode: '',
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Surabaya',
    postCode: '',
    address: '',
    status: 'Active',
  });

  const toggleConsigneeStatus = (id: string) => {
    setConsignees(prev => prev.map(c => {
      if (c.id === id || c.consigneeCode === id) {
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Dynamic Vendor Categories List
  const [vendorCategories, setVendorCategories] = useState<string[]>([
    'Airlines',
    'Shipping Line',
    'Trucking Agent',
    'Customs Broker',
    'Insurance',
  ]);

  const [isAddVendorCategoryModalOpen, setIsAddVendorCategoryModalOpen] = useState(false);
  const [newVendorCategoryInput, setNewVendorCategoryInput] = useState('');

  // Sub-modal states for adding dynamic options via gear icon
  const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);
  const [newVehicleTypeInput, setNewVehicleTypeInput] = useState('');

  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [newBrandModelInput, setNewBrandModelInput] = useState('');

  // Local state for interactive CRUD simulation
  const [countries, setCountries] = useState<MasterCountry[]>(mockCountries);
  const [provinces, setProvinces] = useState<MasterProvince[]>(mockProvinces);
  const [cities, setCities] = useState<MasterCity[]>(mockCities);
  const [customerTypes, setCustomerTypes] = useState<MasterCustomerType[]>(mockCustomerTypes);
  const [tariffs, setTariffs] = useState<MasterBaseTariff[]>(mockBaseTariffs);
  const [vehicles, setVehicles] = useState<MasterVehicle[]>(mockVehicles);
  const [customers, setCustomers] = useState<MasterCustomer[]>(mockCustomers);
  const [agents, setAgents] = useState<MasterAgent[]>(mockAgents);
  const [vendors, setVendors] = useState<MasterVendor[]>(mockVendors);
  const [consignees, setConsignees] = useState<MasterConsignee[]>(mockConsignees);

  const toggleCountryStatus = (id: string) => {
    setCountries(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, active: !c.active };
      }
      return c;
    }));
  };

  const toggleProvinceStatus = (id: string) => {
    setProvinces(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, active: !p.active };
      }
      return p;
    }));
  };

  const toggleCityStatus = (id: string) => {
    setCities(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, active: !c.active };
      }
      return c;
    }));
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id || a.code === id) {
        const nextStatus = a.status === 'Active' ? 'Inactive' : 'Active';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleAddNew = () => {
    setModalItem(null);
    if (activeTab === 'master-country') {
      setCountryFormData({
        id: '',
        code: '',
        name: '',
        region: 'Southeast Asia',
        currency: 'USD',
        active: true,
      });
    }
    if (activeTab === 'master-province') {
      setProvinceFormData({
        id: '',
        code: '',
        country: 'Indonesia',
        name: '',
        capitalCity: '',
        active: true,
      });
    }
    if (activeTab === 'master-city') {
      setCityFormData({
        id: '',
        code: '',
        name: '',
        provinceName: provinces[0]?.name || 'DKI Jakarta',
        country: 'Indonesia',
        active: true,
      });
    }
    if (activeTab === 'master-customer-type') {
      const nextNum = customerTypes.length + 1;
      const defaultId = `CT${nextNum < 10 ? '0' + nextNum : nextNum}`;
      setCustomerTypeFormData({
        id: defaultId,
        code: defaultId,
        name: '',
      });
    }
    if (activeTab === 'master-base-tariff') {
      const nextNum = tariffs.length + 1;
      const defaultId = `T${nextNum < 10 ? '0' + nextNum : nextNum}`;
      setTariffFormData({
        id: defaultId,
        effectiveDate: new Date().toISOString().split('T')[0],
        destinationAndCode: '',
        transportType: 'Udara',
        costPrice: 0,
        regionalHandling: 0,
        jakartaHandling: 0,
        leadTime: '1-2 Days',
        minWeightKg: 10,
        marginPercentage: 15,
        sellingPrice: 0,
      });
    }
    if (activeTab === 'master-vehicle') {
      const nextNum = vehicles.length + 1;
      const defaultId = `V${nextNum < 10 ? '0' + nextNum : nextNum}`;
      setVehicleFormData({
        id: defaultId,
        plateNumber: '',
        vehicleType: (vehicleTypesList[0] as any) || 'Wingbox Truck',
        brandModel: brandModelsList[0] || 'Isuzu Giga FVR',
        maxWeightKg: 10000,
        maxVolumeCbm: 30,
        driverName: '',
        driverPhone: '',
        status: 'Ready',
        kirValidityDate: new Date().toISOString().split('T')[0],
        branchOffice: 'Jakarta HQ',
      });
    }
    if (activeTab === 'master-customer') {
      const nextNum = customers.length + 1;
      const numStr = String(nextNum).padStart(5, '0');
      const defaultId = `CUST-${numStr}`;
      setCustomerFormData({
        id: defaultId,
        code: defaultId,
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: 'Jakarta',
        creditLimitIdr: 100000000,
        outstandingBalanceIdr: 0,
        active: true,
      });
    }
    if (activeTab === 'master-agent') {
      const nextNum = agents.length + 1;
      const numStr = String(nextNum).padStart(5, '0');
      const defaultCode = `AGENT-${numStr}`;
      const defaultCity = cities[0]?.name || 'Surabaya';
      setAgentFormData({
        id: defaultCode,
        code: defaultCode,
        agentName: '',
        coverageArea: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        city: defaultCity,
        status: 'Active',
      });
    }
    if (activeTab === 'master-vendor') {
      const nextNum = vendors.length + 1;
      const numStr = String(nextNum).padStart(5, '0');
      const defaultCode = `VDR-${numStr}`;
      const defaultCity = cities[0]?.name || 'Jakarta';
      setVendorFormData({
        id: defaultCode,
        code: defaultCode,
        vendorName: '',
        category: vendorCategories[0] || 'Airlines',
        contactPerson: '',
        phone: '',
        email: '',
        paymentTermDays: 'TOP 30 Days',
        address: '',
        city: defaultCity,
        status: 'Active',
      });
    }
    if (activeTab === 'master-consignee') {
      const nextNum = consignees.length + 1;
      const numStr = String(nextNum).padStart(5, '0');
      const defaultCode = `CNEE-${numStr}`;
      const defaultCity = cities[0]?.name || 'Surabaya';
      setConsigneeFormData({
        id: defaultCode,
        consigneeCode: defaultCode,
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        city: defaultCity,
        postCode: '',
        address: '',
        status: 'Active',
      });
    }
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalItem(item);
    if (activeTab === 'master-country') {
      setCountryFormData({
        id: item.id,
        code: item.code || '',
        name: item.name || '',
        region: item.region || 'Southeast Asia',
        currency: item.currency || 'USD',
        active: item.active !== undefined ? item.active : true,
      });
    }
    if (activeTab === 'master-province') {
      setProvinceFormData({
        id: item.id,
        code: item.code || '',
        country: item.country || 'Indonesia',
        name: item.name || '',
        capitalCity: item.capitalCity || '',
        active: item.active !== undefined ? item.active : true,
      });
    }
    if (activeTab === 'master-city') {
      setCityFormData({
        id: item.id,
        code: item.code || '',
        name: item.name || '',
        provinceName: item.provinceName || 'DKI Jakarta',
        country: item.country || 'Indonesia',
        active: item.active !== undefined ? item.active : true,
      });
    }
    if (activeTab === 'master-customer-type') {
      setCustomerTypeFormData({
        id: item.id || '',
        code: item.code || item.id || '',
        name: item.name || '',
        discountPercentage: item.discountPercentage || 0,
        creditTermDays: item.creditTermDays || 0,
        minimumMonthlyVolumeKg: item.minimumMonthlyVolumeKg || 0,
      });
    }
    if (activeTab === 'master-base-tariff') {
      setTariffFormData({
        id: item.id || '',
        effectiveDate: item.effectiveDate || new Date().toISOString().split('T')[0],
        destinationAndCode: item.destinationAndCode || (item.destinationCity ? `${item.destinationCity} (${item.originCity || ''})` : ''),
        transportType: item.transportType || (item.serviceType?.includes('Air') ? 'Udara' : item.serviceType?.includes('Sea') ? 'Laut' : 'Darat'),
        costPrice: item.costPrice !== undefined ? item.costPrice : (item.ratePerKgIdr || 0),
        regionalHandling: item.regionalHandling || 0,
        jakartaHandling: item.jakartaHandling || 0,
        leadTime: item.leadTime || item.leadTimeDays || '1-2 Days',
        minWeightKg: item.minWeightKg !== undefined ? item.minWeightKg : (item.minimumWeightKg || 10),
        marginPercentage: item.marginPercentage !== undefined ? item.marginPercentage : 15,
        sellingPrice: item.sellingPrice !== undefined ? item.sellingPrice : (item.ratePerKgIdr || 0),
      });
    }
    if (activeTab === 'master-vehicle') {
      if (item.vehicleType && !vehicleTypesList.includes(item.vehicleType)) {
        setVehicleTypesList(prev => [...prev, item.vehicleType]);
      }
      if (item.brandModel && !brandModelsList.includes(item.brandModel)) {
        setBrandModelsList(prev => [...prev, item.brandModel]);
      }
      setVehicleFormData({
        id: item.id || '',
        plateNumber: item.plateNumber || '',
        vehicleType: item.vehicleType || 'Wingbox Truck',
        brandModel: item.brandModel || 'Isuzu Giga FVR',
        maxWeightKg: item.maxWeightKg || 0,
        maxVolumeCbm: item.maxVolumeCbm || 0,
        driverName: item.driverName || '',
        driverPhone: item.driverPhone || '',
        status: item.status || 'Ready',
        kirValidityDate: item.kirValidityDate || new Date().toISOString().split('T')[0],
        branchOffice: item.branchOffice || 'Jakarta HQ',
      });
    }
    if (activeTab === 'master-customer') {
      setCustomerFormData({
        id: item.id || '',
        code: item.code || item.id || '',
        companyName: item.companyName || '',
        contactPerson: item.contactPerson || '',
        email: item.email || '',
        phone: item.phone || '',
        address: item.address || '',
        city: item.city || 'Jakarta',
        creditLimitIdr: item.creditLimitIdr || 0,
        outstandingBalanceIdr: item.outstandingBalanceIdr || 0,
        active: item.active !== undefined ? item.active : true,
      });
    }
    if (activeTab === 'master-agent') {
      setAgentFormData({
        id: item.id || '',
        code: item.code || item.id || '',
        agentName: item.agentName || '',
        coverageArea: item.coverageArea || '',
        contactPerson: item.contactPerson || '',
        phone: item.phone || '',
        email: item.email || '',
        address: item.address || '',
        city: item.city || cities[0]?.name || 'Surabaya',
        status: item.status || 'Active',
      });
    }
    if (activeTab === 'master-vendor') {
      if (item.category && !vendorCategories.includes(item.category)) {
        setVendorCategories(prev => [...prev, item.category]);
      }
      setVendorFormData({
        id: item.id || '',
        code: item.code || item.id || '',
        vendorName: item.vendorName || '',
        category: item.category || 'Airlines',
        contactPerson: item.contactPerson || '',
        phone: item.phone || '',
        email: item.email || '',
        paymentTermDays: item.paymentTermDays ? (typeof item.paymentTermDays === 'number' ? `TOP ${item.paymentTermDays} Days` : item.paymentTermDays) : 'TOP 30 Days',
        address: item.address || '',
        city: item.city || cities[0]?.name || 'Jakarta',
        status: item.status || 'Active',
      });
    }
    if (activeTab === 'master-consignee') {
      setConsigneeFormData({
        id: item.id || '',
        consigneeCode: item.consigneeCode || item.customerCode || item.id || '',
        name: item.name || '',
        contactPerson: item.contactPerson || '',
        phone: item.phone || '',
        email: item.email || '',
        city: item.city || cities[0]?.name || 'Surabaya',
        postCode: item.postCode || '',
        address: item.address || '',
        status: item.status || 'Active',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryFormData.code.trim() || !countryFormData.name.trim()) {
      alert('Please fill in required fields (Country Code and Country Name).');
      return;
    }

    if (modalItem && countryFormData.id) {
      // Edit existing country
      setCountries(prev => prev.map(c => c.id === countryFormData.id ? { ...countryFormData } : c));
    } else {
      // Create new country
      const newCountry: MasterCountry = {
        ...countryFormData,
        id: `CTY-${Date.now()}`,
        code: countryFormData.code.toUpperCase().trim(),
        name: countryFormData.name.trim(),
        currency: countryFormData.currency.toUpperCase().trim(),
      };
      setCountries(prev => [newCountry, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveProvince = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provinceFormData.code.trim() || !provinceFormData.name.trim()) {
      alert('Please fill in required fields (Province Code and Province Name).');
      return;
    }

    if (modalItem && provinceFormData.id) {
      // Edit existing province
      setProvinces(prev => prev.map(p => p.id === provinceFormData.id ? { ...provinceFormData } : p));
    } else {
      // Create new province
      const newProvince: MasterProvince = {
        ...provinceFormData,
        id: `PRV-${Date.now()}`,
        code: provinceFormData.code.toUpperCase().trim(),
        country: provinceFormData.country.trim() || 'Indonesia',
        name: provinceFormData.name.trim(),
        capitalCity: provinceFormData.capitalCity.trim(),
      };
      setProvinces(prev => [newProvince, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityFormData.code.trim() || !cityFormData.name.trim()) {
      alert('Please fill in required fields (Code and City/Regency Name).');
      return;
    }

    if (modalItem && cityFormData.id) {
      // Edit existing city
      setCities(prev => prev.map(c => c.id === cityFormData.id ? { ...cityFormData } : c));
    } else {
      // Create new city
      const newCity: MasterCity = {
        ...cityFormData,
        id: `CITY-${Date.now()}`,
        code: cityFormData.code.toUpperCase().trim(),
        name: cityFormData.name.trim(),
        provinceName: cityFormData.provinceName.trim(),
        country: cityFormData.country.trim() || 'Indonesia',
      };
      setCities(prev => [newCity, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveCustomerType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerTypeFormData.id.trim() || !customerTypeFormData.name.trim()) {
      alert('Please fill in required fields (ID and Customer Type Name).');
      return;
    }

    if (modalItem && (modalItem.id || customerTypeFormData.id)) {
      // Edit existing customer type
      const targetId = modalItem.id || customerTypeFormData.id;
      setCustomerTypes(prev => prev.map(ct => ct.id === targetId ? { ...ct, ...customerTypeFormData } : ct));
    } else {
      // Create new customer type
      const newCustomerType: MasterCustomerType = {
        ...customerTypeFormData,
        id: customerTypeFormData.id.toUpperCase().trim(),
        code: customerTypeFormData.code?.toUpperCase().trim() || customerTypeFormData.id.toUpperCase().trim(),
        name: customerTypeFormData.name.trim(),
      };
      setCustomerTypes(prev => [newCustomerType, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveTariff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tariffFormData.id.trim() || !tariffFormData.destinationAndCode.trim()) {
      alert('Please fill in required fields (ID and Destination & Code).');
      return;
    }

    if (modalItem && (modalItem.id || tariffFormData.id)) {
      // Edit existing tariff
      const targetId = modalItem.id || tariffFormData.id;
      setTariffs(prev => prev.map(t => t.id === targetId ? { ...t, ...tariffFormData } : t));
    } else {
      // Create new tariff
      const newTariff: MasterBaseTariff = {
        ...tariffFormData,
        id: tariffFormData.id.toUpperCase().trim(),
      };
      setTariffs(prev => [newTariff, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleFormData.plateNumber.trim() || !vehicleFormData.driverName.trim()) {
      alert('Please fill in required fields (Plate Number and Driver Name).');
      return;
    }

    if (modalItem && (modalItem.id || vehicleFormData.id)) {
      // Edit existing vehicle
      const targetId = modalItem.id || vehicleFormData.id;
      setVehicles(prev => prev.map(v => v.id === targetId ? { ...v, ...vehicleFormData } : v));
    } else {
      // Create new vehicle
      const newVehicle: MasterVehicle = {
        ...vehicleFormData,
        id: vehicleFormData.id.toUpperCase().trim() || `V${vehicles.length + 1}`,
        plateNumber: vehicleFormData.plateNumber.toUpperCase().trim(),
      };
      setVehicles(prev => [newVehicle, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerFormData.companyName.trim() || !customerFormData.contactPerson.trim()) {
      alert('Please fill in required fields (Company Name and Contact Person).');
      return;
    }

    if (modalItem && (modalItem.id || customerFormData.id)) {
      // Edit existing customer
      const targetId = modalItem.id || customerFormData.id;
      setCustomers(prev => prev.map(c => c.id === targetId ? { ...c, ...customerFormData } : c));
    } else {
      // Create new customer
      const numStr = String(customers.length + 1).padStart(5, '0');
      const autoId = `CUST-${numStr}`;
      const newCust: MasterCustomer = {
        ...customerFormData,
        id: customerFormData.id.trim() || autoId,
        code: customerFormData.id.trim() || autoId,
      };
      setCustomers(prev => [newCust, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentFormData.agentName.trim() || !agentFormData.contactPerson.trim()) {
      alert('Please fill in required fields (Agent Name and Contact Person).');
      return;
    }

    if (modalItem && (modalItem.id || agentFormData.id)) {
      // Edit existing agent
      const targetId = modalItem.id || agentFormData.id;
      setAgents(prev => prev.map(a => (a.id === targetId || a.code === targetId) ? { ...a, ...agentFormData } : a));
    } else {
      // Create new agent
      const numStr = String(agents.length + 1).padStart(5, '0');
      const autoCode = `AGENT-${numStr}`;
      const newAgent: MasterAgent = {
        ...agentFormData,
        id: agentFormData.code.trim() || autoCode,
        code: agentFormData.code.trim() || autoCode,
      };
      setAgents(prev => [newAgent, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorFormData.vendorName.trim() || !vendorFormData.contactPerson.trim()) {
      alert('Please fill in required fields (Vendor Name and Contact Person).');
      return;
    }

    if (modalItem && (modalItem.id || vendorFormData.id)) {
      // Edit existing vendor
      const targetId = modalItem.id || vendorFormData.id;
      setVendors(prev => prev.map(v => (v.id === targetId || v.code === targetId) ? { ...v, ...vendorFormData } : v));
    } else {
      // Create new vendor
      const numStr = String(vendors.length + 1).padStart(5, '0');
      const autoCode = `VDR-${numStr}`;
      const newVendor: MasterVendor = {
        ...vendorFormData,
        id: vendorFormData.code.trim() || autoCode,
        code: vendorFormData.code.trim() || autoCode,
      };
      setVendors(prev => [newVendor, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleSaveConsignee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consigneeFormData.name.trim()) {
      alert('Please fill in required fields (Consignee Name).');
      return;
    }

    if (modalItem && (modalItem.id || consigneeFormData.id || consigneeFormData.consigneeCode)) {
      // Edit existing consignee
      const targetId = modalItem.id || consigneeFormData.id || consigneeFormData.consigneeCode;
      setConsignees(prev => prev.map(c => (c.id === targetId || c.consigneeCode === targetId) ? { ...c, ...consigneeFormData } : c));
    } else {
      // Create new consignee
      const numStr = String(consignees.length + 1).padStart(5, '0');
      const autoCode = `CNEE-${numStr}`;
      const newConsignee: MasterConsignee = {
        ...consigneeFormData,
        id: consigneeFormData.consigneeCode.trim() || autoCode,
        consigneeCode: consigneeFormData.consigneeCode.trim() || autoCode,
      };
      setConsignees(prev => [newConsignee, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this master data record?')) {
      if (activeTab === 'master-country') setCountries(prev => prev.filter(c => c.id !== id));
      if (activeTab === 'master-province') setProvinces(prev => prev.filter(p => p.id !== id));
      if (activeTab === 'master-city') setCities(prev => prev.filter(c => c.id !== id));
      if (activeTab === 'master-customer-type') setCustomerTypes(prev => prev.filter(ct => ct.id !== id));
      if (activeTab === 'master-base-tariff') setTariffs(prev => prev.filter(t => t.id !== id));
      if (activeTab === 'master-vehicle') setVehicles(prev => prev.filter(v => v.id !== id));
      if (activeTab === 'master-customer') setCustomers(prev => prev.filter(c => c.id !== id));
      if (activeTab === 'master-agent') setAgents(prev => prev.filter(a => a.id !== id));
      if (activeTab === 'master-vendor') setVendors(prev => prev.filter(v => v.id !== id));
      if (activeTab === 'master-consignee') setConsignees(prev => prev.filter(c => c.id !== id && c.consigneeCode !== id));
    }
  };

  const handleImportExcel = () => {
    alert('Import Excel File dialog triggered. Select a CSV/XLSX file conforming to PT WDSS schema.');
  };

  // Render sub-table based on active subtab
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Country Master */}
      {activeTab === 'master-country' && (
        <EnterpriseTable<MasterCountry>
          title="Master Country Database"
          subtitle="International logistics countries, ISO codes, and currency definitions"
          columns={[
            { header: 'Country Code', accessorKey: 'code', width: '130px', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code}</span> },
            { header: 'Country Name', accessorKey: 'name', cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> },
            { header: 'Global Region', accessorKey: 'region' },
            { header: 'Currency', accessorKey: 'currency', cell: (r) => <span className="font-mono font-bold">{r.currency}</span> },
            { 
              header: 'Status', 
              accessorKey: 'active', 
              cell: (r) => (
                <button
                  onClick={() => toggleCountryStatus(r.id)}
                  title="Klik untuk mengubah status (Active / Non-Active)"
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    r.active 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' 
                      : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${r.active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {r.active ? 'Active' : 'Non-Active'}
                </button>
              ) 
            }
          ]}
          data={countries}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
          customActions={(r) => (
            <button
              onClick={() => toggleCountryStatus(r.id)}
              className={`p-1.5 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 ${
                r.active
                  ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30'
                  : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
              title={r.active ? 'Ubah status menjadi Non-Active' : 'Ubah status menjadi Active'}
            >
              {r.active ? <PowerOff size={15} /> : <Power size={15} />}
              <span className="hidden sm:inline text-[11px]">{r.active ? 'Non-Active' : 'Active'}</span>
            </button>
          )}
        />
      )}

      {/* 2. Province Master */}
      {activeTab === 'master-province' && (
        <EnterpriseTable<MasterProvince>
          title="Master Province Directory"
          subtitle="Administrative provinces, countries, capital cities, and status management"
          columns={[
            { header: 'Code', accessorKey: 'code', width: '120px', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code}</span> },
            { header: 'Country', accessorKey: 'country', cell: (r) => <span className="font-semibold text-slate-700 dark:text-slate-200">{r.country || 'Indonesia'}</span> },
            { header: 'Province Name', accessorKey: 'name', cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> },
            { header: 'Capital City', accessorKey: 'capitalCity' },
            { 
              header: 'Status', 
              accessorKey: 'active', 
              cell: (r) => (
                <button
                  onClick={() => toggleProvinceStatus(r.id)}
                  title="Klik untuk mengubah status (Active / Non-Active)"
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    r.active 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' 
                      : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${r.active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {r.active ? 'Active' : 'Non-Active'}
                </button>
              ) 
            }
          ]}
          data={provinces}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
          customActions={(r) => (
            <button
              onClick={() => toggleProvinceStatus(r.id)}
              className={`p-1.5 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 ${
                r.active
                  ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30'
                  : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
              title={r.active ? 'Ubah status menjadi Non-Active' : 'Ubah status menjadi Active'}
            >
              {r.active ? <PowerOff size={15} /> : <Power size={15} />}
              <span className="hidden sm:inline text-[11px]">{r.active ? 'Non-Active' : 'Active'}</span>
            </button>
          )}
        />
      )}

      {/* 3. City/Regency Master */}
      {activeTab === 'master-city' && (
        <EnterpriseTable<MasterCity>
          title="Master City & Regency Database"
          subtitle="Administrative cities, regencies, provinces, countries, and operational status"
          columns={[
            { header: 'Code', accessorKey: 'code', width: '120px', cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code}</span> },
            { header: 'City / Regency Name', accessorKey: 'name', cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> },
            { header: 'Province', accessorKey: 'provinceName' },
            { header: 'Country', accessorKey: 'country', cell: (r) => <span className="font-semibold text-slate-700 dark:text-slate-200">{r.country || 'Indonesia'}</span> },
            { 
              header: 'Status', 
              accessorKey: 'active', 
              cell: (r) => (
                <button
                  onClick={() => toggleCityStatus(r.id)}
                  title="Klik untuk mengubah status (Active / Non-Active)"
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    r.active 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' 
                      : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${r.active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {r.active ? 'Active' : 'Non-Active'}
                </button>
              ) 
            }
          ]}
          data={cities}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
          customActions={(r) => (
            <button
              onClick={() => toggleCityStatus(r.id)}
              className={`p-1.5 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 ${
                r.active
                  ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30'
                  : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
              }`}
              title={r.active ? 'Ubah status menjadi Non-Active' : 'Ubah status menjadi Active'}
            >
              {r.active ? <PowerOff size={15} /> : <Power size={15} />}
              <span className="hidden sm:inline text-[11px]">{r.active ? 'Non-Active' : 'Active'}</span>
            </button>
          )}
        />
      )}

      {/* 4. Customer Type Master */}
      {activeTab === 'master-customer-type' && (
        <EnterpriseTable<MasterCustomerType>
          title="Master Customer Type Directory"
          subtitle="Classification and category master data for customer accounts"
          columns={[
            { 
              header: 'ID', 
              accessorKey: 'id', 
              width: '120px', 
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.id}</span> 
            },
            { 
              header: 'CUSTOMER TYPE', 
              accessorKey: 'name', 
              cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.name}</span> 
            },
          ]}
          data={customerTypes}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 5. Base Tariff Master */}
      {activeTab === 'master-base-tariff' && (
        <EnterpriseTable<MasterBaseTariff>
          title="Master Base Freight Tariff Sheet"
          subtitle="Standard shipping base tariffs, handling fees, margin percentages, and selling prices"
          columns={[
            { 
              header: 'ID', 
              accessorKey: 'id',
              width: '90px',
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.id}</span>
            },
            { 
              header: 'Effective Date', 
              accessorKey: 'effectiveDate',
              cell: (r) => <span className="font-mono text-xs">{r.effectiveDate}</span>
            },
            { 
              header: 'Destination & Code', 
              accessorKey: 'destinationAndCode',
              cell: (r) => <span className="font-bold text-slate-800 dark:text-slate-100">{r.destinationAndCode}</span>
            },
            { 
              header: 'Type', 
              accessorKey: 'transportType',
              cell: (r) => {
                const typeColor = 
                  r.transportType === 'Udara' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300' :
                  r.transportType === 'Laut' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
                return (
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${typeColor}`}>
                    {r.transportType}
                  </span>
                );
              }
            },
            { 
              header: 'Base Cost', 
              accessorKey: 'costPrice',
              cell: (r) => <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">Rp {r.costPrice ? r.costPrice.toLocaleString('id-ID') : 0}</span>
            },
            { 
              header: 'Regional Handling', 
              accessorKey: 'regionalHandling',
              cell: (r) => <span className="font-mono text-slate-600 dark:text-slate-400">Rp {r.regionalHandling ? r.regionalHandling.toLocaleString('id-ID') : 0}</span>
            },
            { 
              header: 'Jakarta Handling', 
              accessorKey: 'jakartaHandling',
              cell: (r) => <span className="font-mono text-slate-600 dark:text-slate-400">Rp {r.jakartaHandling ? r.jakartaHandling.toLocaleString('id-ID') : 0}</span>
            },
            { 
              header: 'Lead Time', 
              accessorKey: 'leadTime',
              cell: (r) => <span className="font-semibold text-emerald-600 dark:text-emerald-400">{r.leadTime}</span>
            },
            { 
              header: 'Min Weight (Kg)', 
              accessorKey: 'minWeightKg',
              cell: (r) => <span className="font-mono font-medium">{r.minWeightKg} Kg</span>
            },
            { 
              header: 'Margin', 
              accessorKey: 'marginPercentage',
              cell: (r) => <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{r.marginPercentage}%</span>
            },
            { 
              header: 'Selling Price', 
              accessorKey: 'sellingPrice',
              cell: (r) => <span className="font-mono font-extrabold text-[#0070C0]">Rp {r.sellingPrice ? r.sellingPrice.toLocaleString('id-ID') : 0}</span>
            },
          ]}
          data={tariffs}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 6. Vehicle Master */}
      {activeTab === 'master-vehicle' && (
        <EnterpriseTable<MasterVehicle>
          title="Master Fleet & Driver Management"
          subtitle="Truck fleet, trailers, Kir validity, drivers, and operational readiness"
          columns={[
            { header: 'Plate Number', accessorKey: 'plateNumber', cell: (r) => <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{r.plateNumber}</span> },
            { header: 'Vehicle Type', accessorKey: 'vehicleType' },
            { header: 'Brand / Model', accessorKey: 'brandModel' },
            { header: 'Max Capacity', accessorKey: 'maxWeightKg', cell: (r) => <span className="font-mono">{r.maxWeightKg.toLocaleString('id-ID')} Kg / {r.maxVolumeCbm} CBM</span> },
            { header: 'Driver Name', accessorKey: 'driverName', cell: (r) => <div><p className="font-semibold">{r.driverName}</p><p className="text-[10px] text-slate-400">{r.driverPhone}</p></div> },
            { header: 'KIR Valid Until', accessorKey: 'kirValidityDate', cell: (r) => <span className="font-mono text-emerald-600 font-bold">{r.kirValidityDate}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r) => (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                r.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' :
                r.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                'bg-rose-100 text-rose-700'
              }`}>
                {r.status}
              </span>
            )}
          ]}
          data={vehicles}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 7. Customer Master */}
      {activeTab === 'master-customer' && (
        <EnterpriseTable<MasterCustomer>
          title="Master Customer Directory"
          subtitle="Corporate profiles, address details, contact persons, credit limit allocations, and outstanding balances"
          columns={[
            { 
              header: 'ID', 
              accessorKey: 'id', 
              width: '130px',
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.id || r.code}</span> 
            },
            { 
              header: 'COMPANY NAME', 
              accessorKey: 'companyName', 
              cell: (r) => (
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{r.companyName}</p>
                  {r.address && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {r.address}{r.city ? `, ${r.city}` : ''}
                    </p>
                  )}
                </div>
              ) 
            },
            { 
              header: 'CONTACT PERSON', 
              accessorKey: 'contactPerson', 
              cell: (r) => (
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{r.contactPerson}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{r.phone}{r.email ? ` • ${r.email}` : ''}</p>
                </div>
              ) 
            },
            { 
              header: 'CREDIT LIMIT', 
              accessorKey: 'creditLimitIdr', 
              cell: (r) => <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">Rp {r.creditLimitIdr.toLocaleString('id-ID')}</span> 
            },
            { 
              header: 'OUTSTANDING', 
              accessorKey: 'outstandingBalanceIdr', 
              cell: (r) => <span className="font-mono font-bold text-rose-600 dark:text-rose-400">Rp {r.outstandingBalanceIdr.toLocaleString('id-ID')}</span> 
            }
          ]}
          data={customers}
          keyExtractor={(item) => item.id}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 8. Agent Master */}
      {activeTab === 'master-agent' && (
        <EnterpriseTable<MasterAgent>
          title="Master Regional Forwarding Agents"
          subtitle="Domestic & international sub-agent shipping partners, addresses, cities, and regional coverage"
          columns={[
            { 
              header: 'AGENT CODE', 
              accessorKey: 'code', 
              width: '140px',
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code || r.id}</span> 
            },
            { 
              header: 'AGENT NAME', 
              accessorKey: 'agentName', 
              cell: (r) => (
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{r.agentName}</p>
                  {r.address && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {r.address}{r.city ? `, ${r.city}` : ''}
                    </p>
                  )}
                </div>
              ) 
            },
            { 
              header: 'CITY', 
              accessorKey: 'city', 
              width: '120px',
              cell: (r) => (
                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {r.city || '-'}
                </span>
              ) 
            },
            { 
              header: 'COVERAGE AREA', 
              accessorKey: 'coverageArea',
              cell: (r) => <span className="text-xs text-slate-600 dark:text-slate-300">{r.coverageArea}</span>
            },
            { 
              header: 'CONTACT PERSON', 
              accessorKey: 'contactPerson', 
              cell: (r) => (
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{r.contactPerson}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{r.phone}{r.email ? ` • ${r.email}` : ''}</p>
                </div>
              ) 
            },
            { 
              header: 'STATUS', 
              accessorKey: 'status', 
              cell: (r) => {
                const isActive = r.status === 'Active';
                return (
                  <button
                    onClick={() => toggleAgentStatus(r.id || r.code)}
                    title={`Click to set ${isActive ? 'Inactive' : 'Active'}`}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all hover:scale-105 ${
                      isActive 
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200' 
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 hover:bg-rose-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {r.status || (isActive ? 'Active' : 'Inactive')}
                  </button>
                );
              }
            }
          ]}
          data={agents}
          keyExtractor={(item) => item.id || item.code}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id || item.code)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 9. Vendor Master */}
      {activeTab === 'master-vendor' && (
        <EnterpriseTable<MasterVendor>
          title="Master Logistics Vendor Directory"
          subtitle="Airlines, Shipping Lines, Trucking Contractors, Customs Brokers, and Insurance Providers"
          columns={[
            { 
              header: 'VENDOR CODE', 
              accessorKey: 'code', 
              width: '140px',
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.code || r.id}</span> 
            },
            { 
              header: 'VENDOR NAME', 
              accessorKey: 'vendorName', 
              cell: (r) => (
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{r.vendorName}</p>
                  {r.address && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {r.address}{r.city ? `, ${r.city}` : ''}
                    </p>
                  )}
                </div>
              ) 
            },
            { 
              header: 'CATEGORY', 
              accessorKey: 'category', 
              cell: (r) => (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  {r.category}
                </span>
              ) 
            },
            { 
              header: 'CONTACT PERSON', 
              accessorKey: 'contactPerson', 
              cell: (r) => (
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{r.contactPerson}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{r.phone}{r.email ? ` • ${r.email}` : ''}</p>
                </div>
              ) 
            },
            { 
              header: 'TOP (PAYMENT TERM)', 
              accessorKey: 'paymentTermDays', 
              cell: (r) => (
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {typeof r.paymentTermDays === 'number' ? `TOP ${r.paymentTermDays} Days` : r.paymentTermDays}
                </span>
              ) 
            }
          ]}
          data={vendors}
          keyExtractor={(item) => item.id || item.code}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id || item.code)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* 10. Consignee Master */}
      {activeTab === 'master-consignee' && (
        <EnterpriseTable<MasterConsignee>
          title="Master Cargo Consignee Directory"
          subtitle="Destination receiver profiles, warehouse contacts, city locations, and postal code details"
          columns={[
            { 
              header: 'CONSIGNEE CODE', 
              accessorKey: 'consigneeCode', 
              width: '150px',
              cell: (r) => <span className="font-mono font-bold text-[#0070C0]">{r.consigneeCode || r.id}</span> 
            },
            { 
              header: 'CONSIGNEE NAME', 
              accessorKey: 'name', 
              cell: (r) => (
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{r.name}</p>
                  {r.address && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {r.address}
                    </p>
                  )}
                </div>
              ) 
            },
            { 
              header: 'CONTACT PERSON', 
              accessorKey: 'contactPerson', 
              cell: (r) => (
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{r.contactPerson || '-'}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{r.phone}{r.email ? ` • ${r.email}` : ''}</p>
                </div>
              ) 
            },
            { 
              header: 'CITY', 
              accessorKey: 'city', 
              width: '120px',
              cell: (r) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {r.city || '-'}
                </span>
              ) 
            },
            { 
              header: 'POST CODE', 
              accessorKey: 'postCode', 
              width: '100px',
              cell: (r) => <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{r.postCode || '-'}</span> 
            },
            { 
              header: 'STATUS', 
              accessorKey: 'status', 
              cell: (r) => {
                const isActive = r.status === 'Active' || r.status === undefined;
                return (
                  <button
                    onClick={() => toggleConsigneeStatus(r.id || r.consigneeCode)}
                    title={`Click to set ${isActive ? 'Inactive' : 'Active'}`}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all hover:scale-105 ${
                      isActive 
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200' 
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 hover:bg-rose-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    {r.status || (isActive ? 'Active' : 'Inactive')}
                  </button>
                );
              }
            }
          ]}
          data={consignees}
          keyExtractor={(item) => item.id || item.consigneeCode}
          onAdd={handleAddNew}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item.id || item.consigneeCode)}
          onImportExcel={handleImportExcel}
        />
      )}

      {/* Shared Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                {activeTab === 'master-country' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-province' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-city' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-customer-type' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-base-tariff' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-vehicle' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-customer' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-agent' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-vendor' && <Globe size={18} className="text-[#0070C0]" />}
                {activeTab === 'master-consignee' && <Globe size={18} className="text-[#0070C0]" />}
                {modalItem 
                  ? (activeTab === 'master-country' 
                      ? `Edit Country: ${countryFormData.name || modalItem.name}` 
                      : activeTab === 'master-province'
                      ? `Edit Province: ${provinceFormData.name || modalItem.name}`
                      : activeTab === 'master-city'
                      ? `Edit City / Regency: ${cityFormData.name || modalItem.name}`
                      : activeTab === 'master-customer-type'
                      ? `Edit Customer Type: ${customerTypeFormData.name || modalItem.name}`
                      : activeTab === 'master-base-tariff'
                      ? `Edit Base Tariff: ${tariffFormData.destinationAndCode || modalItem.id}`
                      : activeTab === 'master-vehicle'
                      ? `Edit Vehicle: ${vehicleFormData.plateNumber || modalItem.plateNumber}`
                      : activeTab === 'master-customer'
                      ? `Edit Customer: ${customerFormData.companyName || modalItem.companyName || modalItem.id}`
                      : activeTab === 'master-agent'
                      ? `Edit Agent: ${agentFormData.agentName || modalItem.agentName || modalItem.id}`
                      : activeTab === 'master-vendor'
                      ? `Edit Vendor: ${vendorFormData.vendorName || modalItem.vendorName || modalItem.id}`
                      : activeTab === 'master-consignee'
                      ? `Edit Consignee: ${consigneeFormData.name || modalItem.name || modalItem.id}`
                      : 'Edit Master Record') 
                  : (activeTab === 'master-country' 
                      ? 'Create New Country' 
                      : activeTab === 'master-province'
                      ? 'Create New Province'
                      : activeTab === 'master-city'
                      ? 'Create New City / Regency'
                      : activeTab === 'master-customer-type'
                      ? 'Create New Customer Type'
                      : activeTab === 'master-base-tariff'
                      ? 'Create New Base Tariff'
                      : activeTab === 'master-vehicle'
                      ? 'Create New Vehicle'
                      : activeTab === 'master-customer'
                      ? 'Create New Customer'
                      : activeTab === 'master-agent'
                      ? 'Create New Agent'
                      : activeTab === 'master-vendor'
                      ? 'Create New Vendor'
                      : activeTab === 'master-consignee'
                      ? 'Create New Consignee'
                      : 'Create New Master Record')}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {activeTab === 'master-country' ? (
              <form onSubmit={handleSaveCountry}>
                <div className="py-4 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Country Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="e.g. ID, SG, US"
                        value={countryFormData.code}
                        onChange={(e) => setCountryFormData({ ...countryFormData, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Currency Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IDR, SGD, USD"
                        value={countryFormData.currency}
                        onChange={(e) => setCountryFormData({ ...countryFormData, currency: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Country Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indonesia, Singapore, Japan"
                      value={countryFormData.name}
                      onChange={(e) => setCountryFormData({ ...countryFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Global Region
                    </label>
                    <select
                      value={countryFormData.region}
                      onChange={(e) => setCountryFormData({ ...countryFormData, region: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      <option value="Southeast Asia">Southeast Asia</option>
                      <option value="East Asia">East Asia</option>
                      <option value="South Asia">South Asia</option>
                      <option value="Oceania">Oceania</option>
                      <option value="Europe">Europe</option>
                      <option value="North America">North America</option>
                      <option value="South America">South America</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Africa">Africa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Operational Status
                    </label>
                    <div className="flex items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="countryStatus"
                          checked={countryFormData.active === true}
                          onChange={() => setCountryFormData({ ...countryFormData, active: true })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700">Active</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="countryStatus"
                          checked={countryFormData.active === false}
                          onChange={() => setCountryFormData({ ...countryFormData, active: false })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700">Non-Active</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Country' : 'Create Country'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-province' ? (
              <form onSubmit={handleSaveProvince}>
                <div className="py-4 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Province Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="e.g. DKI, JBT, SU"
                        value={provinceFormData.code}
                        onChange={(e) => setProvinceFormData({ ...provinceFormData, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={provinceFormData.country}
                        onChange={(e) => setProvinceFormData({ ...provinceFormData, country: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {countries.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Province Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DKI Jakarta, Jawa Barat, Sumatera Utara"
                      value={provinceFormData.name}
                      onChange={(e) => setProvinceFormData({ ...provinceFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Capital City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jakarta Pusat, Bandung, Medan"
                      value={provinceFormData.capitalCity}
                      onChange={(e) => setProvinceFormData({ ...provinceFormData, capitalCity: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Operational Status
                    </label>
                    <div className="flex items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="provinceStatus"
                          checked={provinceFormData.active === true}
                          onChange={() => setProvinceFormData({ ...provinceFormData, active: true })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700">Active</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="provinceStatus"
                          checked={provinceFormData.active === false}
                          onChange={() => setProvinceFormData({ ...provinceFormData, active: false })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700">Non-Active</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Province' : 'Create Province'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-city' ? (
              <form onSubmit={handleSaveCity}>
                <div className="py-4 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="e.g. CGK, SUB, BDO"
                        value={cityFormData.code}
                        onChange={(e) => setCityFormData({ ...cityFormData, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={cityFormData.country}
                        onChange={(e) => setCityFormData({ ...cityFormData, country: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {countries.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      City / Regency Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jakarta, Surabaya, Bandung"
                      value={cityFormData.name}
                      onChange={(e) => setCityFormData({ ...cityFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Province <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={cityFormData.provinceName}
                      onChange={(e) => setCityFormData({ ...cityFormData, provinceName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      {provinces.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Operational Status
                    </label>
                    <div className="flex items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="cityStatus"
                          checked={cityFormData.active === true}
                          onChange={() => setCityFormData({ ...cityFormData, active: true })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700">Active</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="radio"
                          name="cityStatus"
                          checked={cityFormData.active === false}
                          onChange={() => setCityFormData({ ...cityFormData, active: false })}
                          className="text-[#0070C0] focus:ring-[#0070C0]"
                        />
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700">Non-Active</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update City / Regency' : 'Create City / Regency'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-customer-type' ? (
              <form onSubmit={handleSaveCustomerType}>
                <div className="py-4 space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={15}
                      placeholder="e.g. CT01, CORP-A, SME"
                      value={customerTypeFormData.id}
                      onChange={(e) => setCustomerTypeFormData({ ...customerTypeFormData, id: e.target.value.toUpperCase(), code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      CUSTOMER TYPE <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Enterprise Corporate Tier A, Small Medium Business"
                      value={customerTypeFormData.name}
                      onChange={(e) => setCustomerTypeFormData({ ...customerTypeFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Customer Type' : 'Create Customer Type'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-base-tariff' ? (
              <form onSubmit={handleSaveTariff}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="e.g. T01, BT-001"
                        value={tariffFormData.id}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, id: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Effective Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={tariffFormData.effectiveDate}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, effectiveDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Destination & Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Surabaya (SUB)"
                        value={tariffFormData.destinationAndCode}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, destinationAndCode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={tariffFormData.transportType}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, transportType: e.target.value as 'Udara' | 'Laut' | 'Darat' })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        <option value="Udara">Udara</option>
                        <option value="Laut">Laut</option>
                        <option value="Darat">Darat</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Base Cost (IDR)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={tariffFormData.costPrice}
                        onChange={(e) => {
                          const cost = Number(e.target.value);
                          const subtotal = cost + tariffFormData.regionalHandling + tariffFormData.jakartaHandling;
                          const computedSelling = Math.round(subtotal + (subtotal * tariffFormData.marginPercentage) / 100);
                          setTariffFormData({ ...tariffFormData, costPrice: cost, sellingPrice: computedSelling });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Regional Handling
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={tariffFormData.regionalHandling}
                        onChange={(e) => {
                          const reg = Number(e.target.value);
                          const subtotal = tariffFormData.costPrice + reg + tariffFormData.jakartaHandling;
                          const computedSelling = Math.round(subtotal + (subtotal * tariffFormData.marginPercentage) / 100);
                          setTariffFormData({ ...tariffFormData, regionalHandling: reg, sellingPrice: computedSelling });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Jakarta Handling
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={tariffFormData.jakartaHandling}
                        onChange={(e) => {
                          const jk = Number(e.target.value);
                          const subtotal = tariffFormData.costPrice + tariffFormData.regionalHandling + jk;
                          const computedSelling = Math.round(subtotal + (subtotal * tariffFormData.marginPercentage) / 100);
                          setTariffFormData({ ...tariffFormData, jakartaHandling: jk, sellingPrice: computedSelling });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Lead Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1-2 Days"
                        value={tariffFormData.leadTime}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, leadTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Min Weight (Kg)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={tariffFormData.minWeightKg}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, minWeightKg: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Margin (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={tariffFormData.marginPercentage}
                        onChange={(e) => {
                          const margin = Number(e.target.value);
                          const subtotal = tariffFormData.costPrice + tariffFormData.regionalHandling + tariffFormData.jakartaHandling;
                          const computedSelling = Math.round(subtotal + (subtotal * margin) / 100);
                          setTariffFormData({ ...tariffFormData, marginPercentage: margin, sellingPrice: computedSelling });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-amber-600 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Selling Price (IDR) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={tariffFormData.sellingPrice}
                        onChange={(e) => setTariffFormData({ ...tariffFormData, sellingPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-extrabold text-[#0070C0] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Base Tariff' : 'Create Base Tariff'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-vehicle' ? (
              <form onSubmit={handleSaveVehicle}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Vehicle ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="e.g. V01, V-002"
                        value={vehicleFormData.id}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, id: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Plate Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B 9842 UXX"
                        value={vehicleFormData.plateNumber}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, plateNumber: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-amber-700 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-600 dark:text-slate-300 font-bold">
                          Vehicle Type <span className="text-rose-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setNewVehicleTypeInput('');
                            setIsAddTypeModalOpen(true);
                          }}
                          title="Add New Vehicle Type"
                          className="p-1 text-slate-400 hover:text-[#0070C0] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-semibold"
                        >
                          <Settings size={14} />
                          <span>Add</span>
                        </button>
                      </div>
                      <select
                        required
                        value={vehicleFormData.vehicleType}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleType: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {vehicleTypesList.map((vt) => (
                          <option key={vt} value={vt}>{vt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-600 dark:text-slate-300 font-bold">
                          Brand / Model <span className="text-rose-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setNewBrandModelInput('');
                            setIsAddBrandModalOpen(true);
                          }}
                          title="Add New Brand / Model"
                          className="p-1 text-slate-400 hover:text-[#0070C0] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-semibold"
                        >
                          <Settings size={14} />
                          <span>Add</span>
                        </button>
                      </div>
                      <select
                        required
                        value={vehicleFormData.brandModel}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, brandModel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {brandModelsList.map((bm) => (
                          <option key={bm} value={bm}>{bm}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Max Weight (Kg)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={vehicleFormData.maxWeightKg}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, maxWeightKg: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Max Volume (CBM)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={vehicleFormData.maxVolumeCbm}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, maxVolumeCbm: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Driver Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Budi Santoso"
                        value={vehicleFormData.driverName}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, driverName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Driver Phone
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0812-3456-7890"
                        value={vehicleFormData.driverPhone}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, driverPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        KIR Valid Until
                      </label>
                      <input
                        type="date"
                        value={vehicleFormData.kirValidityDate}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, kirValidityDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Branch Office
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jakarta HQ"
                        value={vehicleFormData.branchOffice}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, branchOffice: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Status
                      </label>
                      <select
                        value={vehicleFormData.status}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        <option value="Ready">Ready</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Assigned">Assigned</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Vehicle' : 'Create Vehicle'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-customer' ? (
              <form onSubmit={handleSaveCustomer}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Customer ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CUST-00001"
                        value={customerFormData.id}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, id: e.target.value.toUpperCase(), code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[#0070C0] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PT Kalbe Farma Tbk"
                        value={customerFormData.companyName}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, companyName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hendra Gunawan"
                        value={customerFormData.contactPerson}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 021-4287388"
                        value={customerFormData.phone}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. logistics@kalbefarma.co.id"
                        value={customerFormData.email}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jakarta"
                        value={customerFormData.city}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Enter complete company address..."
                      value={customerFormData.address}
                      onChange={(e) => setCustomerFormData({ ...customerFormData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Credit Limit (IDR)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={1000000}
                        value={customerFormData.creditLimitIdr}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, creditLimitIdr: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Outstanding Balance (IDR)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={100000}
                        value={customerFormData.outstandingBalanceIdr}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, outstandingBalanceIdr: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-rose-600 dark:text-rose-400 font-bold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Customer' : 'Create Customer'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-agent' ? (
              <form onSubmit={handleSaveAgent}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Agent Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AGENT-00001"
                        value={agentFormData.code}
                        onChange={(e) => setAgentFormData({ ...agentFormData, code: e.target.value.toUpperCase(), id: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[#0070C0] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Agent Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PT East Java Logistics"
                        value={agentFormData.agentName}
                        onChange={(e) => setAgentFormData({ ...agentFormData, agentName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Agus Wijaya"
                        value={agentFormData.contactPerson}
                        onChange={(e) => setAgentFormData({ ...agentFormData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 031-8432100"
                        value={agentFormData.phone}
                        onChange={(e) => setAgentFormData({ ...agentFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ops@eastjavalogistics.co.id"
                        value={agentFormData.email}
                        onChange={(e) => setAgentFormData({ ...agentFormData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        City / Regency <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={agentFormData.city || ''}
                        onChange={(e) => setAgentFormData({ ...agentFormData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {Array.from(new Set(cities.map(c => c.name).filter(Boolean))).map(cityName => (
                          <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Detail Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Enter detailed office / warehouse address..."
                      value={agentFormData.address || ''}
                      onChange={(e) => setAgentFormData({ ...agentFormData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Coverage Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Surabaya, Malang, Gresik"
                        value={agentFormData.coverageArea}
                        onChange={(e) => setAgentFormData({ ...agentFormData, coverageArea: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Status
                      </label>
                      <select
                        value={agentFormData.status}
                        onChange={(e) => setAgentFormData({ ...agentFormData, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Agent' : 'Create Agent'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-vendor' ? (
              <form onSubmit={handleSaveVendor}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Vendor Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. VDR-00001"
                        value={vendorFormData.code}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, code: e.target.value.toUpperCase(), id: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[#0070C0] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Vendor Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PT Garuda Indonesia Cargo"
                        value={vendorFormData.vendorName}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, vendorName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={vendorFormData.category}
                          onChange={(e) => setVendorFormData({ ...vendorFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                        >
                          {vendorCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setIsAddVendorCategoryModalOpen(true)}
                          title="Add New Vendor Category"
                          className="p-2 rounded-xl text-slate-500 hover:text-[#0070C0] border border-slate-200 dark:border-slate-700 hover:border-[#0070C0] transition-colors shrink-0"
                        >
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        TOP (Terms of Payment) <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={vendorFormData.paymentTermDays}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, paymentTermDays: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {['COD', 'CBD', 'TOP 7 Days', 'TOP 14 Days', 'TOP 15 Days', 'TOP 30 Days', 'TOP 45 Days', 'TOP 60 Days', 'TOP 90 Days'].map(top => (
                          <option key={top} value={top}>{top}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lia Fitriani"
                        value={vendorFormData.contactPerson}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 021-25608888"
                        value={vendorFormData.phone}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. cargo.support@garuda-indonesia.com"
                        value={vendorFormData.email}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        City / Location
                      </label>
                      <select
                        value={vendorFormData.city || ''}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {Array.from(new Set(cities.map(c => c.name).filter(Boolean))).map(cityName => (
                          <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Detail Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter complete office or depot address..."
                      value={vendorFormData.address || ''}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Vendor' : 'Create Vendor'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'master-consignee' ? (
              <form onSubmit={handleSaveConsignee}>
                <div className="py-4 space-y-3 text-xs max-h-[65vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Consignee Code <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CNEE-00001"
                        value={consigneeFormData.consigneeCode}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, consigneeCode: e.target.value.toUpperCase(), id: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-[#0070C0] focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Consignee Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apotek Kimia Farma Depot SUB"
                        value={consigneeFormData.name}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Contact Person (PIC)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bambang Soeprapto"
                        value={consigneeFormData.contactPerson || ''}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, contactPerson: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 031-5034111"
                        value={consigneeFormData.phone}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. depot.surabaya@kimiafarma.co.id"
                        value={consigneeFormData.email}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        City / Location
                      </label>
                      <select
                        value={consigneeFormData.city || ''}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        {Array.from(new Set(cities.map(c => c.name).filter(Boolean))).map(cityName => (
                          <option key={cityName} value={cityName}>{cityName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Post Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 60241"
                        value={consigneeFormData.postCode || ''}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, postCode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                        Status
                      </label>
                      <select
                        value={consigneeFormData.status || 'Active'}
                        onChange={(e) => setConsigneeFormData({ ...consigneeFormData, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                      Detail Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter detail destination address..."
                      value={consigneeFormData.address || ''}
                      onChange={(e) => setConsigneeFormData({ ...consigneeFormData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold transition-colors"
                  >
                    {modalItem ? 'Update Consignee' : 'Create Consignee'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="py-4 space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Code / Identifier</label>
                    <input
                      type="text"
                      defaultValue={modalItem?.code || modalItem?.plateNumber || 'NEW-001'}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Name / Company Title</label>
                    <input
                      type="text"
                      defaultValue={modalItem?.name || modalItem?.companyName || modalItem?.agentName || ''}
                      placeholder="Enter title or company name..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Contact Person</label>
                      <input
                        type="text"
                        defaultValue={modalItem?.contactPerson || modalItem?.driverName || ''}
                        placeholder="PIC Name"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Phone Number</label>
                      <input
                        type="text"
                        defaultValue={modalItem?.phone || modalItem?.driverPhone || '0812-0000-1111'}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Master record saved successfully into PT WDSS database.');
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A]"
                  >
                    Save Record
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Dynamic Sub-Modal: Add New Vehicle Type */}
      {isAddTypeModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Settings size={15} className="text-[#0070C0]" />
                Add New Vehicle Type
              </h4>
              <button
                type="button"
                onClick={() => setIsAddTypeModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Vehicle Type Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. CDE Long Box / Trailer Lowbed"
                value={newVehicleTypeInput}
                onChange={(e) => setNewVehicleTypeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newVehicleTypeInput.trim()) {
                      const val = newVehicleTypeInput.trim();
                      if (!vehicleTypesList.includes(val)) {
                        setVehicleTypesList(prev => [...prev, val]);
                      }
                      setVehicleFormData(prev => ({ ...prev, vehicleType: val as any }));
                      setIsAddTypeModalOpen(false);
                      setNewVehicleTypeInput('');
                    }
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddTypeModalOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newVehicleTypeInput.trim()) {
                    const val = newVehicleTypeInput.trim();
                    if (!vehicleTypesList.includes(val)) {
                      setVehicleTypesList(prev => [...prev, val]);
                    }
                    setVehicleFormData(prev => ({ ...prev, vehicleType: val as any }));
                    setIsAddTypeModalOpen(false);
                    setNewVehicleTypeInput('');
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A] transition-colors"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Sub-Modal: Add New Brand / Model */}
      {isAddBrandModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Settings size={15} className="text-[#0070C0]" />
                Add New Brand / Model
              </h4>
              <button
                type="button"
                onClick={() => setIsAddBrandModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Brand / Model Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Volvo FH16 / Hino Dutro 130"
                value={newBrandModelInput}
                onChange={(e) => setNewBrandModelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newBrandModelInput.trim()) {
                      const val = newBrandModelInput.trim();
                      if (!brandModelsList.includes(val)) {
                        setBrandModelsList(prev => [...prev, val]);
                      }
                      setVehicleFormData(prev => ({ ...prev, brandModel: val }));
                      setIsAddBrandModalOpen(false);
                      setNewBrandModelInput('');
                    }
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddBrandModalOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newBrandModelInput.trim()) {
                    const val = newBrandModelInput.trim();
                    if (!brandModelsList.includes(val)) {
                      setBrandModelsList(prev => [...prev, val]);
                    }
                    setVehicleFormData(prev => ({ ...prev, brandModel: val }));
                    setIsAddBrandModalOpen(false);
                    setNewBrandModelInput('');
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A] transition-colors"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Sub-Modal: Add New Vendor Category */}
      {isAddVendorCategoryModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Settings size={15} className="text-[#0070C0]" />
                Add New Vendor Category
              </h4>
              <button
                type="button"
                onClick={() => setIsAddVendorCategoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Category Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Cold Storage / Warehouse"
                value={newVendorCategoryInput}
                onChange={(e) => setNewVendorCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newVendorCategoryInput.trim()) {
                      const val = newVendorCategoryInput.trim();
                      if (!vendorCategories.includes(val)) {
                        setVendorCategories(prev => [...prev, val]);
                      }
                      setVendorFormData(prev => ({ ...prev, category: val }));
                      setIsAddVendorCategoryModalOpen(false);
                      setNewVendorCategoryInput('');
                    }
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddVendorCategoryModalOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newVendorCategoryInput.trim()) {
                    const val = newVendorCategoryInput.trim();
                    if (!vendorCategories.includes(val)) {
                      setVendorCategories(prev => [...prev, val]);
                    }
                    setVendorFormData(prev => ({ ...prev, category: val }));
                    setIsAddVendorCategoryModalOpen(false);
                    setNewVendorCategoryInput('');
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-[#0070C0] text-white text-xs font-bold hover:bg-[#005B9A] transition-colors"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
