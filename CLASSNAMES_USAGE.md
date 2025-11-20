# ClassNames Prop Usage Guide

The `classNames` prop provides granular control over the styling of different parts of the SimplyTable component.

## Type Definition

```typescript
interface TableClassNames<T = any> {
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
  
  // Resize Handle
  resizeHandle?: string;
}
```

## Basic Usage

```tsx
import { SimplyTable, type TableClassNames } from 'simply-table';

const classNames: TableClassNames<User> = {
  root: "shadow-lg rounded-xl",
  header: "bg-blue-100 dark:bg-blue-900",
  headerCell: "font-bold text-blue-900 dark:text-blue-100",
  row: "hover:bg-blue-50",
  rowEven: "bg-gray-50",
  cell: "text-gray-900",
};

<SimplyTable
  columns={columns}
  rows={data}
  rowKey="id"
  classNames={classNames}
/>
```

## Dynamic Styling with Functions

```tsx
const classNames: TableClassNames<User> = {
  // Dynamic row styling based on data
  row: (row, index) => {
    if (row.status === 'active') return 'bg-green-50';
    if (row.status === 'inactive') return 'bg-red-50';
    return '';
  },
  
  // Dynamic cell styling based on column and value
  cell: (params) => {
    if (params.column.field === 'status') {
      return params.value === 'active' 
        ? 'text-green-600 font-semibold' 
        : 'text-red-600';
    }
    return '';
  },
};
```

## Combining with Individual Props

The `classNames` prop works alongside the existing individual className props:

```tsx
<SimplyTable
  columns={columns}
  rows={data}
  rowKey="id"
  className="my-custom-table"           // Still works
  headerClassName="my-header"           // Still works
  classNames={{
    root: "additional-root-styles",     // Merged with className
    header: "additional-header-styles", // Merged with headerClassName
  }}
/>
```

## Available Class Targets

- **root**: The outermost table container
- **container**: The scrollable content container
- **header**: The header row container
- **headerCell**: Individual header cells
- **headerCellDragging**: Header cell being dragged
- **headerCellDragOver**: Header cell being dragged over
- **body**: The table body container
- **row**: Individual data rows (supports function)
- **rowEven**: Even-numbered rows
- **rowOdd**: Odd-numbered rows
- **cell**: Individual data cells (supports function)
- **loadingOverlay**: Loading state overlay
- **loadingSpinner**: Loading spinner element
- **emptyState**: Empty state message container
- **resizeHandle**: Column resize handle

## Notes

- All classNames are merged with default styles using `cn()` utility
- Function-based classNames receive relevant context (row data, cell params, etc.)
- The `classNames` prop provides more granular control than individual className props
- Both approaches can be used together for maximum flexibility