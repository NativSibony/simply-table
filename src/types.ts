export type SortDirection = 'asc' | 'desc' | null;

export interface SortIconProps {
  direction: SortDirection;
}

export interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface DragIndicatorProps {
  isDragging?: boolean;
}

export interface Column<T = any> {
  id: string;
  field: keyof T | (string & {});
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
export interface TableClassNames<T = any> {
  // Container
  root?: string;
  container?: string;
  
  // Header
  header?: string;
  headerCell?: string;
  headerCellDragging?: string;
  headerCellDragOver?: string;
  
  // Body
  body?: string;
  
  // Row
  row?: string | ((row: T, index: number) => string);
  rowEven?: string;
  rowOdd?: string;
  
  // Cell
  cell?: string | ((params: CellRendererParams<T>) => string);
  
  // Loading
  loadingOverlay?: string;
  loadingSpinner?: string;
  
  // Empty State
  emptyState?: string;
  
  // Sort Icon
  sortIcon?: string;
  
  // Resize Handle
  resizeHandle?: string;
  
  // Pagination
  pagination?: string;
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
  
  // Pagination (opt-in)
  enablePagination?: boolean;
  paginationMode?: 'client' | 'server';
  page?: number;
  pageSize?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  paginationComponent?: React.ComponentType<PaginationComponentProps>;
  paginationClassName?: string;
  
  // Column Management
  onColumnReorder?: (columns: Column<T>[]) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  
  // Resize Configuration
  defaultMinResizeWidth?: number;
  defaultMaxResizeWidth?: number;
  
  // Row Rendering
  rowRenderer?: (params: RowRendererParams<T>) => React.ReactNode;
  
  // Customizable Components
  sortIcon?: React.ComponentType<SortIconProps>;
  resizeHandle?: React.ComponentType<ResizeHandleProps>;
  dragIndicator?: React.ComponentType<DragIndicatorProps>;
  
  // Styling
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string | ((params: CellRendererParams<T>) => string);
  sortIconClassName?: string;
  resizeHandleClassName?: string;
  classNames?: TableClassNames<T>;
  
  // Loading
  loading?: boolean;
  
  // Empty State
  noRowsOverlay?: React.ReactNode;
}

export interface PaginationComponentProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
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
