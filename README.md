# simply-table

A powerful, lightweight table library for React applications with sensible defaults and complete customization control.

[![CI](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml/badge.svg)](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/simply-table.svg)](https://www.npmjs.com/package/simply-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why simply-table?

- **🚀 Zero Config to Advanced** - Works great out of the box, scales to complex use cases
- **⚡ Performance First** - Virtual scrolling handles 10,000+ rows smoothly
- **🎨 Fully Customizable** - Style everything or use defaults - your choice
- **📦 Tiny Bundle** - Tree-shakeable, optimized for production
- **🔧 TypeScript Native** - Complete type safety and IntelliSense support

## Quick Start

### Installation

```bash
npm install simply-table
```

### Basic Example

```typescript
import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';

const columns: Column<User>[] = [
  { id: 'name', field: 'name', header: 'Name', sortable: true },
  { id: 'email', field: 'email', header: 'Email' },
  { id: 'role', field: 'role', header: 'Role' },
];

const rows = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function App() {
  return <SimplyTable columns={columns} rows={rows} />;
}
```

That's it! You now have a fully functional table with sorting, column resizing, and drag-to-reorder.

## Features

- ✅ **Sorting & Filtering** - Client-side and server-side support
- ✅ **Pagination** - Optional, with customizable page sizes
- ✅ **Virtual Scrolling** - Efficient rendering for large datasets
- ✅ **Column Management** - Resize, reorder, and customize columns
- ✅ **Custom Rendering** - Full control over cells, rows, and components
- ✅ **TypeScript** - Complete type definitions included
- ✅ **Accessible** - Built with accessibility in mind
- ✅ **Themeable** - CSS variables for easy customization

## Documentation

📚 **[Full Documentation](https://simply-table.netlify.app)** - Comprehensive guides and examples

### Quick Links

- [Basic Examples](https://simply-table.netlify.app/basic) - Get started with simple configurations
- [Sorting & Filtering](https://simply-table.netlify.app/filtering) - Implement data operations
- [Pagination](https://simply-table.netlify.app/pagination) - Handle large datasets
- [Virtualization](https://simply-table.netlify.app/virtualization) - Optimize performance
- [Custom Rendering](https://simply-table.netlify.app/custom-rendering) - Customize appearance
- [Theme Builder](https://simply-table.netlify.app/theme-builder) - Create custom themes
- [API Reference](https://simply-table.netlify.app/api-reference) - Complete API documentation

## Advanced Usage

### With Pagination

```typescript
<SimplyTable
  columns={columns}
  rows={rows}
  enablePagination={true}
  pageSize={10}
  pageSizeOptions={[10, 25, 50, 100]}
/>
```

### With Virtual Scrolling

```typescript
<SimplyTable
  columns={columns}
  rows={largeDataset}
  enableVirtualization={true}
  rowHeight={48}
/>
```

### Custom Cell Rendering

```typescript
const columns: Column<User>[] = [
  {
    id: 'status',
    field: 'status',
    header: 'Status',
    cellRenderer: ({ value }) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-gray-400'}>
        {value}
      </span>
    ),
  },
];
```

### Using Exported Hooks

Build custom table solutions with exported hooks:

```typescript
import { useSorting, usePagination, useFiltering } from 'simply-table';

function CustomTable() {
  const { sortedRows, handleSort } = useSorting(rows, columns, 'client');
  const { paginatedRows, page, handlePageChange } = usePagination(sortedRows);
  
  // Build your custom UI
}
```

## Theming

Customize the table appearance using CSS variables:

```css
:root {
  --st-radius: 0.5rem;
  --st-border: 0 0% 90%;
  --st-primary: 221 83% 53%;
  /* ... more variables */
}
```

Use the [Theme Builder](https://simply-table.netlify.app/theme-builder) to create and export custom themes visually.

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import type {
  SimplyTableProps,
  Column,
  CellRendererParams,
  SortModel,
  FilterModel,
} from 'simply-table';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support the Project

⭐ **If you find simply-table useful, please star the repository!**

Your support helps the project grow and improve. [Star on GitHub →](https://github.com/NativSibony/simply-table)

## Links

- [Documentation](https://simply-table.netlify.app)
- [GitHub Repository](https://github.com/NativSibony/simply-table)
- [npm Package](https://www.npmjs.com/package/simply-table)
- [Issue Tracker](https://github.com/NativSibony/simply-table/issues)
- [Changelog](https://github.com/NativSibony/simply-table/releases)

## License

MIT © [Nativ Sibony](https://github.com/NativSibony)

---

Made with ❤️ by the simply-table team
