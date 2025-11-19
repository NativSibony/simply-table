import { SimplyTable } from 'simply-table';
import type { Column, CellRendererParams } from 'simply-table';
import { CodeBlock } from '../components/CodeBlock';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, stock: 45, status: 'In Stock', image: '💻' },
  { id: 2, name: 'Wireless Mouse', price: 29, stock: 5, status: 'Low Stock', image: '🖱️' },
  { id: 3, name: 'Keyboard', price: 89, stock: 0, status: 'Out of Stock', image: '⌨️' },
  { id: 4, name: 'Monitor', price: 399, stock: 20, status: 'In Stock', image: '🖥️' },
  { id: 5, name: 'Headphones', price: 149, stock: 8, status: 'Low Stock', image: '🎧' },
];

export function CustomRenderingPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Custom Rendering</h1>
        <p className="text-lg text-muted-foreground">
          Customize how cells and rows are rendered with custom renderer functions.
        </p>
      </div>

      <Example1_CellRenderer />
      <Example2_StatusBadges />
      <Example3_FormattedValues />
    </div>
  );
}

function Example1_CellRenderer() {
  const columns: Column<Product>[] = [
    {
      id: 'image',
      field: 'image',
      header: '',
      width: 60,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <span className="text-2xl">{value}</span>
      ),
    },
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    {
      id: 'price',
      field: 'price',
      header: 'Price',
      width: 120,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <span className="font-semibold text-green-600">${value}</span>
      ),
    },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
    { id: 'status', field: 'status', header: 'Status', width: 150 },
  ];

  const code = `const columns: Column<Product>[] = [
  {
    id: 'image',
    field: 'image',
    header: '',
    width: 60,
    cellRenderer: ({ value }: CellRendererParams<Product>) => (
      <span className="text-2xl">{value}</span>
    ),
  },
  {
    id: 'price',
    field: 'price',
    header: 'Price',
    width: 120,
    cellRenderer: ({ value }: CellRendererParams<Product>) => (
      <span className="font-semibold text-green-600">\${value}</span>
    ),
  },
  // ... more columns
];

<SimplyTable
  columns={columns}
  rows={products}
  rowKey="id"
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Custom Cell Renderer</h2>
        <p className="text-muted-foreground">
          Use cellRenderer to customize how individual cells are displayed.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={products}
          rowKey="id"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example2_StatusBadges() {
  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    {
      id: 'price',
      field: 'price',
      header: 'Price',
      width: 120,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <span className="font-mono">${value.toFixed(2)}</span>
      ),
    },
    {
      id: 'stock',
      field: 'stock',
      header: 'Stock',
      width: 100,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <span className={value === 0 ? 'text-red-600 font-semibold' : ''}>
          {value} {value === 1 ? 'unit' : 'units'}
        </span>
      ),
    },
    {
      id: 'status',
      field: 'status',
      header: 'Status',
      width: 150,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
  ];

  const code = `const getStatusColor = (status: Product['status']) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800 border-red-200';
  }
};

const columns: Column<Product>[] = [
  {
    id: 'status',
    field: 'status',
    header: 'Status',
    cellRenderer: ({ value }: CellRendererParams<Product>) => (
      <span className={\`px-3 py-1 rounded-full text-xs font-medium border \${getStatusColor(value)}\`}>
        {value}
      </span>
    ),
  },
  // ... more columns
];`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Status Badges</h2>
        <p className="text-muted-foreground">
          Create styled badges and indicators based on cell values.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={products}
          rowKey="id"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example3_FormattedValues() {
  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    {
      id: 'price',
      field: 'price',
      header: 'Price',
      width: 120,
      cellRenderer: ({ value }: CellRendererParams<Product>) => (
        <div className="text-right">
          <span className="text-lg font-bold">${value}</span>
          <span className="text-xs text-muted-foreground">.00</span>
        </div>
      ),
    },
    {
      id: 'stock',
      field: 'stock',
      header: 'Inventory',
      width: 150,
      cellRenderer: ({ value }: CellRendererParams<Product>) => {
        const percentage = Math.min((value / 50) * 100, 100);
        return (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{value} units</span>
              <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const code = `const columns: Column<Product>[] = [
  {
    id: 'stock',
    field: 'stock',
    header: 'Inventory',
    cellRenderer: ({ value }: CellRendererParams<Product>) => {
      const percentage = Math.min((value / 50) * 100, 100);
      return (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{value} units</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={\`h-2 rounded-full \${
                percentage > 50 ? 'bg-green-500' : 
                percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }\`}
              style={{ width: \`\${percentage}%\` }}
            />
          </div>
        </div>
      );
    },
  },
];`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Complex Formatted Values</h2>
        <p className="text-muted-foreground">
          Create rich, interactive cell content with progress bars, charts, and more.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={products}
          rowKey="id"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
        <p className="text-sm">
          <strong>CellRendererParams:</strong> The cellRenderer function receives an object with:
        </p>
        <ul className="text-sm space-y-1 ml-4 list-disc mt-2">
          <li><code className="px-1 bg-muted rounded">value</code>: The cell value</li>
          <li><code className="px-1 bg-muted rounded">row</code>: The entire row data</li>
          <li><code className="px-1 bg-muted rounded">rowIndex</code>: The row index</li>
          <li><code className="px-1 bg-muted rounded">column</code>: The column definition</li>
        </ul>
      </div>
    </section>
  );
}