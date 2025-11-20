import './index.css';

export { SimplyTable } from './simply-table';
export { SimplyTablePagination } from './simply-table-pagination';

export type {
  SimplyTableProps,
  Column,
  CellRendererParams,
  RowRendererParams,
  SortModel,
  FilterModel,
  SortDirection,
  SortIconProps,
  ResizeHandleProps,
  DragIndicatorProps,
  PaginationComponentProps,
  TableClassNames,
} from './types';

// Export hooks for advanced users who want to build custom solutions
export { usePagination } from './hooks/use-pagination';
export { useSorting } from './hooks/use-sorting';
export { useFiltering } from './hooks/use-filtering';
export { useColumnReorder } from './hooks/use-column-reorder';
export { useColumnResize } from './hooks/use-column-resize';
export { useVirtualization } from './hooks/use-virtualization';
