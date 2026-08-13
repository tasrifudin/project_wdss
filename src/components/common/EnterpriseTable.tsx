import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Eye,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Upload
} from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface EnterpriseTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  onImportExcel?: () => void;
  customActions?: (item: T) => React.ReactNode;
  filterComponent?: React.ReactNode;
}

export function EnterpriseTable<T extends Record<string, any>>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onImportExcel,
  customActions,
  filterComponent,
}: EnterpriseTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filtering
  const filteredData = data.filter((item) => {
    if (!searchTerm.trim()) return true;
    return Object.values(item).some((val) =>
      String(val ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortField === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(key);
      setSortAsc(true);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map(item => keyExtractor(item)));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rId => rId !== id));
    }
  };

  // Real Export CSV/Excel Generator
  const handleExportCSV = () => {
    if (data.length === 0) return;
    const headers = columns.map(c => c.header).join(',');
    const rows = sortedData.map(item => 
      columns.map(c => {
        const val = c.accessorKey ? item[c.accessorKey] : '';
        return `"${String(val ?? '').replace(/"/g, '""')}"`;
      }).join(',')
    );

    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    alert(`Generating official PDF export document for ${title}... Print view ready.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[12px] border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all">
      
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              {title}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#0070C0] dark:text-blue-300">
                {totalItems} records
              </span>
            </h2>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>

          {/* Top Right Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onImportExcel && (
              <button
                onClick={onImportExcel}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <Upload size={14} className="text-blue-500" />
                <span className="hidden sm:inline">Import Excel</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
              title="Export filtered records to CSV/Excel"
            >
              <FileSpreadsheet size={14} />
              <span>Export Excel</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
            >
              <FileText size={14} />
              <span className="hidden sm:inline">PDF</span>
            </button>

            {onAdd && (
              <button
                onClick={onAdd}
                className="px-3.5 py-1.5 rounded-xl bg-[#0070C0] hover:bg-[#005B9A] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Plus size={16} />
                <span>Create New</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search table records..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#0070C0]"
            />
          </div>

          {filterComponent && (
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showFilterDrawer
                  ? 'bg-blue-50 dark:bg-slate-800 border-[#0070C0] text-[#0070C0]'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Advanced Filter</span>
            </button>
          )}

        </div>

        {/* Optional Filter Drawer Expandable */}
        {showFilterDrawer && filterComponent && (
          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 animate-in fade-in duration-150">
            {filterComponent}
          </div>
        )}

      </div>

      {/* Main Table Area */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              <th className="p-3 pl-4 w-10">
                <input
                  type="checkbox"
                  checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-[#0070C0] focus:ring-[#0070C0]"
                />
              </th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable !== false && handleSort(col.accessorKey)}
                  className={`p-3 font-semibold select-none ${col.sortable !== false ? 'cursor-pointer hover:text-slate-800 dark:hover:text-slate-200' : ''}`}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable !== false && (
                      <ArrowUpDown size={12} className="text-slate-400 shrink-0" />
                    )}
                  </div>
                </th>
              ))}
              {(onView || onEdit || onDelete || customActions) && (
                <th className="p-3 text-right pr-4">Action</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="p-8 text-center text-slate-400">
                  <p className="font-semibold text-slate-500 mb-1">No operational records found</p>
                  <p className="text-[11px]">Try adjusting your search criteria or filter settings.</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const id = keyExtractor(row);
                const isSelected = selectedRows.includes(id);

                return (
                  <tr
                    key={id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-blue-50/40 dark:bg-slate-800/60' : ''
                    }`}
                  >
                    <td className="p-3 pl-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(id, e.target.checked)}
                        className="rounded border-slate-300 text-[#0070C0] focus:ring-[#0070C0]"
                      />
                    </td>

                    {columns.map((col, idx) => (
                      <td key={idx} className="p-3 font-medium">
                        {col.cell ? col.cell(row) : String(col.accessorKey ? row[col.accessorKey] ?? '-' : '-')}
                      </td>
                    ))}

                    {(onView || onEdit || onDelete || customActions) && (
                      <td className="p-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {customActions && customActions(row)}

                          {onView && (
                            <button
                              onClick={() => onView(row)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0070C0] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                              title="View Details"
                            >
                              <Eye size={15} />
                            </button>
                          )}

                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                              title="Edit Record"
                            >
                              <Edit size={15} />
                            </button>
                          )}

                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        
        <div className="flex items-center gap-2">
          <span>Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, totalItems)} of {totalItems} entries</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="px-3 font-semibold text-slate-700 dark:text-slate-200">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}
