import { useState } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column, SortModel, FilterModel } from 'simply-table';
import { CodeBlock } from '../components/CodeBlock';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 45, rating: 4.5 },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29, stock: 150, rating: 4.2 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 299, stock: 30, rating: 4.7 },
  { id: 4, name: 'Desk Lamp', category: 'Furniture', price: 49, stock: 80, rating: 4.0 },
  { id: 5, name: 'Notebook Set', category: 'Stationery', price: 15, stock: 200, rating: 4.3 },
  { id: 6, name: 'Mechanical Keyboard', category: 'Electronics', price: 159, stock: 60, rating: 4.8 },
  { id: 7, name: 'Monitor Stand', category: 'Furniture', price: 79, stock: 40, rating: 4.1 },
  { id: 8, name: 'USB Hub', category: 'Electronics', price: 35, stock: 120, rating: 4.4 },
];

export function SortingFilteringPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Sorting & Filtering</h1>
        <p className="text-lg text-muted-foreground">
          Implement powerful sorting and filtering capabilities in your tables.
        </p>
      </div>

      <Example1_ClientSorting />
      <Example2_MultiColumnSort />
      <Example3_ClientFiltering />
      <Example4_ServerMode />
    </div>
  );
}

function Example1_ClientSorting() {
  const columns: Column<Product>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80, sortable: true },
    { id: 'name', field: 'name', header: 'Product Name', width: 200, sortable: true },
    { id: 'category', field: 'category', header: 'Category', width: 150, sortable: true },
    { id: 'price', field: 'price', header: 'Price', width: 120, sortable: true },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100, sortable: true },
    { id: 'rating', field: 'rating', header: 'Rating', width: 100, sortable: true },
  ];

  const code = `const columns: Column<Product>[] = [
  { id: 'id', field: 'id', header: 'ID', sortable: true },
  { id: 'name', field: 'name', header: 'Product Name', sortable: true },
  { id: 'price', field: 'price', header: 'Price', sortable: true },
  // ... more columns
];

<SimplyTable
  columns={columns}
  rows={products}
  rowKey="id"
  sortMode="client"
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Client-Side Sorting</h2>
        <p className="text-muted-foreground">
          Enable sorting by setting <code className="px-2 py-1 bg-muted rounded">sortable: true</code> on columns.
          Click column headers to sort.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={sampleProducts}
          rowKey="id"
          sortMode="client"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example2_MultiColumnSort() {
  const [sortModel, setSortModel] = useState<SortModel[]>([]);

  const columns: Column<Product>[] = [
    { id: 'category', field: 'category', header: 'Category', width: 150, sortable: true },
    { id: 'name', field: 'name', header: 'Product Name', width: 200, sortable: true },
    { id: 'price', field: 'price', header: 'Price', width: 120, sortable: true },
    { id: 'rating', field: 'rating', header: 'Rating', width: 100, sortable: true },
  ];

  const code = `const [sortModel, setSortModel] = useState<SortModel[]>([]);

<SimplyTable
  columns={columns}
  rows={products}
  rowKey="id"
  sortMode="client"
  sortModel={sortModel}
  onSortChange={setSortModel}
/>

// Current sort state:
// ${JSON.stringify(sortModel, null, 2)}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Controlled Sorting</h2>
        <p className="text-muted-foreground">
          Control the sort state externally using sortModel and onSortChange props.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <SimplyTable
          columns={columns}
          rows={sampleProducts}
          rowKey="id"
          sortMode="client"
          sortModel={sortModel}
          onSortChange={setSortModel}
        />

        {sortModel.length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Sort State:</h4>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(sortModel, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example3_ClientFiltering() {
  const [filterModel, setFilterModel] = useState<FilterModel>({});

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product Name', width: 200, filterable: true },
    { id: 'category', field: 'category', header: 'Category', width: 150, filterable: true },
    { id: 'price', field: 'price', header: 'Price', width: 120 },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
  ];

  const code = `const [filterModel, setFilterModel] = useState<FilterModel>({});

const columns: Column<Product>[] = [
  { id: 'name', field: 'name', header: 'Product Name', filterable: true },
  { id: 'category', field: 'category', header: 'Category', filterable: true },
  // ... more columns
];

<SimplyTable
  columns={columns}
  rows={products}
  rowKey="id"
  filterMode="client"
  filterModel={filterModel}
  onFilterChange={setFilterModel}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Client-Side Filtering</h2>
        <p className="text-muted-foreground">
          Enable filtering by setting <code className="px-2 py-1 bg-muted rounded">filterable: true</code> on columns.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <SimplyTable
          columns={columns}
          rows={sampleProducts}
          rowKey="id"
          filterMode="client"
          filterModel={filterModel}
          onFilterChange={setFilterModel}
        />

        {Object.keys(filterModel).length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Filter State:</h4>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(filterModel, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example4_ServerMode() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product[]>(sampleProducts);
  const [sortModel, setSortModel] = useState<SortModel[]>([]);

  // Simulate server-side sorting
  const handleSortChange = (newSortModel: SortModel[]) => {
    setSortModel(newSortModel);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const sorted = [...sampleProducts];
      
      if (newSortModel.length > 0) {
        sorted.sort((a, b) => {
          for (const sort of newSortModel) {
            const aVal = a[sort.field as keyof Product];
            const bVal = b[sort.field as keyof Product];
            
            if (aVal === bVal) continue;
            
            const comparison = aVal > bVal ? 1 : -1;
            return sort.sort === 'asc' ? comparison : -comparison;
          }
          return 0;
        });
      }
      
      setData(sorted);
      setLoading(false);
    }, 500);
  };

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product Name', width: 200, sortable: true },
    { id: 'category', field: 'category', header: 'Category', width: 150, sortable: true },
    { id: 'price', field: 'price', header: 'Price', width: 120, sortable: true },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100, sortable: true },
  ];

  const code = `const [loading, setLoading] = useState(false);
const [data, setData] = useState<Product[]>([]);
const [sortModel, setSortModel] = useState<SortModel[]>([]);

const handleSortChange = (newSortModel: SortModel[]) => {
  setSortModel(newSortModel);
  setLoading(true);

  // Fetch sorted data from API
  fetchProducts({ sort: newSortModel }).then(result => {
    setData(result);
    setLoading(false);
  });
};

<SimplyTable
  columns={columns}
  rows={data}
  rowKey="id"
  sortMode="server"
  sortModel={sortModel}
  onSortChange={handleSortChange}
  loading={loading}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">4. Server-Side Sorting</h2>
        <p className="text-muted-foreground">
          For large datasets, use server-side sorting. The table shows a loading state while fetching sorted data from the server.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading sorted data...
          </div>
        )}

        <SimplyTable
          columns={columns}
          rows={data}
          rowKey="id"
          sortMode="server"
          sortModel={sortModel}
          onSortChange={handleSortChange}
          loading={loading}
        />

        {sortModel.length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Server Sort Request:</h4>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(sortModel, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded space-y-2">
        <p className="text-sm">
          <strong>Server Mode:</strong> When using server mode, the table won't perform sorting
          locally. Instead, it will call your onChange handler, allowing you to fetch sorted
          data from your backend.
        </p>
        <p className="text-sm">
          This is ideal for large datasets where client-side operations would be too slow.
        </p>
      </div>
    </section>
  );
}