# simply-table

A highly customizable, table library for React applications with sensible defaults and full styling control.

[![CI](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml/badge.svg)](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/simply-table.svg)](https://www.npmjs.com/package/simply-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install simply-table
```

or

```bash
yarn add simply-table
```

or

```bash
pnpm add simply-table
```

## Philosophy

Simply Table follows a simple principle: **provide sensible out-of-the-box defaults for simple use cases while exposing full styling control and customization options for advanced implementations**.

- ✅ Works great with minimal configuration
- ✅ Every visual element is customizable
- ✅ Opt-in features instead of forced functionality
- ✅ Export hooks and utilities for building custom solutions

## Features

- 🚀 Built with TypeScript for type safety
- 📦 Supports both ESM and CommonJS
- ⚡ Optimized bundle size
- 🎯 React 18+ and React 19+ compatible
- 🔧 Fully tree-shakeable
- 🎨 Fully customizable styling and components
- 📊 Optional pagination (opt-in, not forced)
- 🔄 Column sorting with custom icons
- 📏 Resizable columns with configurable constraints
- 🎭 Custom sort icons, resize handles, and drag indicators
- 🪝 Exported hooks for building custom table solutions
- ⚡ Virtual scrolling support for large datasets

## Quick Start

### Basic Usage

```typescript
import { SimplyTable } from 'simply-table';

const columns = [
  { id: '1', field: 'name', header: 'Name' },
  { id: '2', field: 'age', header: 'Age' },
  { id: '3', field: 'email', header: 'Email' },
];

const rows = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
];

function App() {
  return <SimplyTable columns={columns} rows={rows} />;
}
```

### With Pagination (Opt-in)

```typescript
import { SimplyTable } from 'simply-table';

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      enablePagination={true}
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
    />
  );
}
```

### Custom Resize Constraints

```typescript
import { SimplyTable } from 'simply-table';

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      defaultMinResizeWidth={100}
      defaultMaxResizeWidth={600}
    />
  );
}
```

## Customization

### Custom Sort Icon

```typescript
import { SimplyTable, SortIconProps } from 'simply-table';

const CustomSortIcon = ({ direction }: SortIconProps) => {
  if (direction === 'asc') return <span>↑</span>;
  if (direction === 'desc') return <span>↓</span>;
  return <span>⇅</span>;
};

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      sortIcon={CustomSortIcon}
    />
  );
}
```

### Custom Resize Handle

```typescript
import { SimplyTable, ResizeHandleProps } from 'simply-table';

const CustomResizeHandle = ({ onMouseDown }: ResizeHandleProps) => (
  <div
    className="custom-resize-handle"
    onMouseDown={onMouseDown}
    onClick={(e) => e.stopPropagation()}
  />
);

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      resizeHandle={CustomResizeHandle}
      resizeHandleClassName="my-custom-class"
    />
  );
}
```

### Custom Drag Indicator (Optional)

By default, columns are draggable without a visible indicator. You can add a custom drag indicator:

```typescript
import { SimplyTable, DragIndicatorProps } from 'simply-table';

const CustomDragIndicator = ({ isDragging }: DragIndicatorProps) => (
  <span className={isDragging ? 'dragging' : ''}>⋮⋮</span>
);

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      dragIndicator={CustomDragIndicator}
    />
  );
}
```

### Custom Pagination Component

```typescript
import { SimplyTable, PaginationComponentProps } from 'simply-table';

const CustomPagination = ({
  page,
  pageSize,
  totalPages,
  totalRows,
  onPageChange,
  onPageSizeChange,
}: PaginationComponentProps) => (
  <div className="custom-pagination">
    {/* Your custom pagination UI */}
  </div>
);

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      enablePagination={true}
      paginationComponent={CustomPagination}
    />
  );
}
```

## Advanced Usage

### Using Exported Hooks

Build your own custom table solution using the exported hooks:

```typescript
import {
  usePagination,
  useSorting,
  useFiltering,
  useColumnReorder,
  useColumnResize,
  useVirtualization,
} from 'simply-table';

function CustomTable() {
  const { sortedRows, sortModel, handleSort } = useSorting(
    rows,
    columns,
    'client'
  );

  const { paginatedRows, page, pageSize, handlePageChange } = usePagination(
    sortedRows,
    'client',
    0,
    10
  );

  // Build your custom table UI
  return <div>{/* Your custom implementation */}</div>;
}
```

## API Reference

### SimplyTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `Column<T>[]` | required | Column definitions |
| `rows` | `T[]` | required | Data rows |
| `enablePagination` | `boolean` | `false` | Enable pagination (opt-in) |
| `sortIcon` | `ComponentType<SortIconProps>` | `DefaultSortIcon` | Custom sort icon component |
| `resizeHandle` | `ComponentType<ResizeHandleProps>` | `DefaultResizeHandle` | Custom resize handle component |
| `dragIndicator` | `ComponentType<DragIndicatorProps>` | `undefined` | Optional drag indicator component |
| `defaultMinResizeWidth` | `number` | `50` | Default minimum column width |
| `defaultMaxResizeWidth` | `number` | `800` | Default maximum column width |
| `paginationComponent` | `ComponentType<PaginationComponentProps>` | `SimplyTablePagination` | Custom pagination component |
| `sortIconClassName` | `string` | `undefined` | Custom class for sort icon button |
| `resizeHandleClassName` | `string` | `undefined` | Custom class for resize handle wrapper |
| `paginationClassName` | `string` | `undefined` | Custom class for pagination container |
| `classNames` | `TableClassNames<T>` | `undefined` | Granular styling control for all table elements |

### Column Configuration

```typescript
interface Column<T> {
  id: string;
  field: keyof T | string;
  header: string | ((column: Column<T>) => React.ReactNode);
  width?: number;
  minWidth?: number;  // Per-column override
  maxWidth?: number;  // Per-column override
  sortable?: boolean;
  resizable?: boolean;
  cellRenderer?: (params: CellRendererParams<T>) => React.ReactNode;
}
```

### TableClassNames

For granular styling control, use the `classNames` prop:

```typescript
interface TableClassNames<T> {
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
```

Example usage:

```typescript
<SimplyTable
  columns={columns}
  rows={rows}
  classNames={{
    root: 'my-table-root',
    header: 'my-table-header',
    row: (row, index) => index % 2 === 0 ? 'even-row' : 'odd-row',
    cell: 'my-table-cell',
    sortIcon: 'my-sort-icon',
    resizeHandle: 'my-resize-handle',
    pagination: 'my-pagination',
  }}
/>
```

## Exported Types

```typescript
import type {
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
} from 'simply-table';
```

## Exported Components

```typescript
import {
  SimplyTable,
  SimplyTablePagination,
} from 'simply-table';
```

## Exported Hooks

```typescript
import {
  usePagination,
  useSorting,
  useFiltering,
  useColumnReorder,
  useColumnResize,
  useVirtualization,
} from 'simply-table';
```

## Development

### Prerequisites

- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/NativSibony/simply-table.git
cd simply-table

# Install dependencies
npm install

# Build the library
npm run build

# Run linter
npm run lint
```

### Building

The library uses Vite for building and supports multiple output formats:

```bash
npm run build
```

This will generate:
- `dist/simply-table.js` - ESM format
- `dist/simply-table.umd.cjs` - UMD format for CommonJS
- `dist/index.d.ts` - TypeScript type definitions

### Project Structure

```
simply-table/
├── src/              # Library source code
│   └── index.ts      # Main entry point
├── docs/             # Documentation website (excluded from npm package)
├── dist/             # Build output (generated)
├── .github/          # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml    # Continuous Integration
│       └── publish.yml # NPM publishing
└── package.json      # Package configuration
```

## Publishing

### Manual Publishing

1. Update the version in [`package.json`](package.json:3)
2. Build the library: `npm run build`
3. Publish to npm: `npm publish`

### Automated Publishing

The library is configured with GitHub Actions for automated publishing:

1. Create a new release on GitHub
2. The publish workflow will automatically:
   - Run tests
   - Build the library
   - Publish to npm

**Setup Required:**
- Add `NPM_TOKEN` to your GitHub repository secrets
- The token should have publish permissions for the package

## Documentation

Documentation is available in the [`docs/`](docs/) directory. This directory is completely separate from the library build and is excluded from the npm package.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Links

- [GitHub Repository](https://github.com/NativSibony/simply-table)
- [npm Package](https://www.npmjs.com/package/simply-table)
- [Issue Tracker](https://github.com/NativSibony/simply-table/issues)
