export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T = any> {
  id: string;
  field: keyof T | string;
  header: string | ((column: Column<T>) => React.ReactNode);
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  cellRenderer?: (params: CellRendererParams<T>) => React.ReactNode;
  valueGetter?: (row: T) => any;
  comparator?: (a: any, b: any) => number;
}

export interface CellRendererParams<T = any> {
  value: any;
  row: T;
  rowIndex: number;
  column: Column<T>;
}

export interface RowRendererParams<T = any> {
  row: T;
  rowIndex: number;
  cells: React.ReactNode;
  isEven: boolean;
}

export interface SimplyTableProps<T = any> {
  columns: Column<T>[];
  rows: T[];
  rowKey?: keyof T | ((row: T) => string | number);
  
  // Virtualization
  enableVirtualization?: boolean;
  rowHeight?: number;
  overscanCount?: number;
  
  // Sorting
  sortMode?: 'client' | 'server';
  sortModel?: SortModel[];
  onSortChange?: (model: SortModel[]) => void;
  
  // Filtering
  filterMode?: 'client' | 'server';
  filterModel?: FilterModel;
  onFilterChange?: (model: FilterModel) => void;
  
  // Pagination
  paginationMode?: 'client' | 'server';
  page?: number;
  pageSize?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  
  // Column Management
  onColumnReorder?: (columns: Column<T>[]) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  
  // Row Rendering
  rowRenderer?: (params: RowRendererParams<T>) => React.ReactNode;
  
  // Styling
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string | ((params: CellRendererParams<T>) => string);
  
  // Loading
  loading?: boolean;
  
  // Empty State
  noRowsOverlay?: React.ReactNode;
}

export interface SortModel {
  field: string;
  sort: SortDirection;
}

export interface FilterModel {
  [field: string]: {
    value: any;
    operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  };
}
