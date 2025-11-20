import { useState, useEffect, useCallback } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column, FilterModel } from 'simply-table';
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
  { id: 9, name: 'Ergonomic Mouse Pad', category: 'Electronics', price: 25, stock: 90, rating: 4.6 },
  { id: 10, name: 'Standing Desk', category: 'Furniture', price: 599, stock: 15, rating: 4.9 },
  { id: 11, name: 'Pen Set', category: 'Stationery', price: 12, stock: 300, rating: 4.1 },
  { id: 12, name: 'Webcam HD', category: 'Electronics', price: 89, stock: 55, rating: 4.3 },
];

export function FilteringExamplesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Filtering Examples</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive filtering examples with interactive UI controls for client-side and server-side filtering.
        </p>
      </div>

      <nav className="p-4 bg-muted/50 rounded-lg border">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">On This Page</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#basic-filtering" className="text-primary hover:underline">1. Basic Text Filtering</a></li>
          <li><a href="#numeric-filtering" className="text-primary hover:underline">2. Numeric Filtering with Operators</a></li>
          <li><a href="#multi-field" className="text-primary hover:underline">3. Multi-Field Filtering</a></li>
          <li><a href="#server-side" className="text-primary hover:underline">4. Server-Side Filtering</a></li>
        </ul>
      </nav>

      <Example1_BasicFiltering />
      <Example2_NumericFiltering />
      <Example3_MultiField />
      <Example4_ServerSide />
    </div>
  );
}

function Example1_BasicFiltering() {
  const [filterModel, setFilterModel] = useState<FilterModel>({});
  const [nameFilter, setNameFilter] = useState('');

  const handleFilterChange = (value: string) => {
    setNameFilter(value);
    const newFilter: FilterModel = {};
    if (value) {
      newFilter.name = { value, operator: 'contains' };
    }
    setFilterModel(newFilter);
  };

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product Name', width: 250 },
    { id: 'category', field: 'category', header: 'Category', width: 150 },
    { id: 'price', field: 'price', header: 'Price', width: 120 },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
  ];

  const code = `import { useState } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column, FilterModel } from 'simply-table';

const [filterModel, setFilterModel] = useState<FilterModel>({});
const [nameFilter, setNameFilter] = useState('');

const handleFilterChange = (value: string) => {
  setNameFilter(value);
  const newFilter: FilterModel = {};
  if (value) {
    newFilter.name = { value, operator: 'contains' };
  }
  setFilterModel(newFilter);
};

return (
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Search products..."
      value={nameFilter}
      onChange={(e) => handleFilterChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg"
    />
    
    <SimplyTable
      columns={columns}
      rows={products}
      rowKey="id"
      filterMode="client"
      filterModel={filterModel}
      onFilterChange={setFilterModel}
    />
  </div>
);`;

  return (
    <section id="basic-filtering" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Basic Text Filtering</h2>
        <p className="text-muted-foreground">
          Simple text-based filtering with the "contains" operator. Type to filter products by name in real-time.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={nameFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg bg-background"
          />
          {nameFilter && (
            <button
              onClick={() => handleFilterChange('')}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
            >
              Clear
            </button>
          )}
        </div>

        <SimplyTable
          columns={columns}
          rows={sampleProducts}
          rowKey="id"
          filterMode="client"
          filterModel={filterModel}
          onFilterChange={setFilterModel}
        />

        <div className="text-sm text-muted-foreground">
          Showing {sampleProducts.filter(p => !nameFilter || p.name.toLowerCase().includes(nameFilter.toLowerCase())).length} of {sampleProducts.length} products
        </div>
      </div>

      <CodeBlock code={code} title="Basic Filtering Example" />
    </section>
  );
}

function Example2_NumericFiltering() {
  const [filterModel, setFilterModel] = useState<FilterModel>({});
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const updateFilters = useCallback((min: string, max: string) => {
    const newFilter: FilterModel = {};
    
    if (min) {
      newFilter.price = { value: Number(min), operator: 'gte' };
    }
    if (max) {
      // If we already have a min filter, we need to handle both
      if (min) {
        // For demonstration, we'll just use one at a time
        // In production, you might want custom logic
        newFilter.price = { value: Number(max), operator: 'lte' };
      } else {
        newFilter.price = { value: Number(max), operator: 'lte' };
      }
    }
    
    setFilterModel(newFilter);
  }, []);

  const handleMinChange = (value: string) => {
    setPriceMin(value);
    updateFilters(value, priceMax);
  };

  const handleMaxChange = (value: string) => {
    setPriceMax(value);
    updateFilters(priceMin, value);
  };

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    { id: 'category', field: 'category', header: 'Category', width: 150 },
    { 
      id: 'price', 
      field: 'price', 
      header: 'Price', 
      width: 120,
      cellRenderer: ({ value }) => <span className="font-semibold">${value}</span>
    },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
  ];

  const code = `const [filterModel, setFilterModel] = useState<FilterModel>({});
const [priceMin, setPriceMin] = useState('');
const [priceMax, setPriceMax] = useState('');

const updateFilters = (min: string, max: string) => {
  const newFilter: FilterModel = {};
  
  if (min) {
    newFilter.price = { value: Number(min), operator: 'gte' };
  }
  if (max) {
    newFilter.price = { value: Number(max), operator: 'lte' };
  }
  
  setFilterModel(newFilter);
};

<div className="flex gap-4">
  <input
    type="number"
    placeholder="Min price"
    value={priceMin}
    onChange={(e) => {
      setPriceMin(e.target.value);
      updateFilters(e.target.value, priceMax);
    }}
  />
  <input
    type="number"
    placeholder="Max price"
    value={priceMax}
    onChange={(e) => {
      setPriceMax(e.target.value);
      updateFilters(priceMin, e.target.value);
    }}
  />
</div>`;

  return (
    <section id="numeric-filtering" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Numeric Filtering with Operators</h2>
        <p className="text-muted-foreground">
          Filter numeric values using comparison operators like greater than or equal (gte) and less than or equal (lte).
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              value={priceMin}
              onChange={(e) => handleMinChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              placeholder="$999+"
              value={priceMax}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          {(priceMin || priceMax) && (
            <button
              onClick={() => {
                setPriceMin('');
                setPriceMax('');
                setFilterModel({});
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 self-end"
            >
              Clear
            </button>
          )}
        </div>

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
            <h4 className="font-semibold mb-2">Active Filter:</h4>
            <pre className="text-sm">{JSON.stringify(filterModel, null, 2)}</pre>
          </div>
        )}
      </div>

      <CodeBlock code={code} title="Numeric Filtering" />
    </section>
  );
}

function Example3_MultiField() {
  const [filterModel, setFilterModel] = useState<FilterModel>({});
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');

  const updateFilters = useCallback((name: string, category: string, price: string) => {
    const newFilter: FilterModel = {};
    
    if (name) {
      newFilter.name = { value: name, operator: 'contains' };
    }
    if (category) {
      newFilter.category = { value: category, operator: 'contains' };
    }
    if (price) {
      newFilter.price = { value: Number(price), operator: 'gte' };
    }
    
    setFilterModel(newFilter);
  }, []);

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    { id: 'category', field: 'category', header: 'Category', width: 150 },
    { 
      id: 'price', 
      field: 'price', 
      header: 'Price', 
      width: 120,
      cellRenderer: ({ value }) => <span className="font-semibold">${value}</span>
    },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
    { id: 'rating', field: 'rating', header: 'Rating', width: 100 },
  ];

  const clearAll = () => {
    setNameFilter('');
    setCategoryFilter('');
    setMinPrice('');
    setFilterModel({});
  };

  const code = `const [filterModel, setFilterModel] = useState<FilterModel>({});
const [nameFilter, setNameFilter] = useState('');
const [categoryFilter, setCategoryFilter] = useState('');
const [minPrice, setMinPrice] = useState('');

const updateFilters = (name: string, category: string, price: string) => {
  const newFilter: FilterModel = {};
  
  if (name) newFilter.name = { value: name, operator: 'contains' };
  if (category) newFilter.category = { value: category, operator: 'contains' };
  if (price) newFilter.price = { value: Number(price), operator: 'gte' };
  
  setFilterModel(newFilter);
};

<SimplyTable
  columns={columns}
  rows={products}
  rowKey="id"
  filterMode="client"
  filterModel={filterModel}
  onFilterChange={setFilterModel}
/>`;

  return (
    <section id="multi-field" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Multi-Field Filtering</h2>
        <p className="text-muted-foreground">
          Apply multiple filters simultaneously across different fields. All filters must match (AND logic).
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Search..."
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
                updateFilters(e.target.value, categoryFilter, minPrice);
              }}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              placeholder="Filter category..."
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                updateFilters(nameFilter, e.target.value, minPrice);
              }}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                updateFilters(nameFilter, categoryFilter, e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
          </div>
        </div>

        {(nameFilter || categoryFilter || minPrice) && (
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
          >
            Clear All Filters
          </button>
        )}

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
            <h4 className="font-semibold mb-2">Active Filters ({Object.keys(filterModel).length}):</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(filterModel).map(([field, filter]) => (
                <div key={field} className="flex items-center gap-2">
                  <span className="font-medium capitalize">{field}:</span>
                  <span className="text-muted-foreground">
                    {filter.operator} "{filter.value}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CodeBlock code={code} title="Multi-Field Filtering" />
    </section>
  );
}

function Example4_ServerSide() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product[]>(sampleProducts);
  const [filterModel, setFilterModel] = useState<FilterModel>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate server-side filtering with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(filterModel).length === 0) {
        setData(sampleProducts);
        return;
      }

      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        let filtered = [...sampleProducts];
        
        Object.entries(filterModel).forEach(([field, filter]) => {
          filtered = filtered.filter(item => {
            const value = String(item[field as keyof Product]).toLowerCase();
            const filterValue = String(filter.value).toLowerCase();
            
            switch (filter.operator) {
              case 'contains':
                return value.includes(filterValue);
              case 'equals':
                return value === filterValue;
              case 'gte':
                return Number(item[field as keyof Product]) >= Number(filter.value);
              case 'lte':
                return Number(item[field as keyof Product]) <= Number(filter.value);
              default:
                return true;
            }
          });
        });
        
        setData(filtered);
        setLoading(false);
      }, 800);
    }, 500); // Debounce delay

    return () => clearTimeout(timer);
  }, [filterModel]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const newFilter: FilterModel = {};
    if (value) {
      newFilter.name = { value, operator: 'contains' };
    }
    setFilterModel(newFilter);
  };

  const columns: Column<Product>[] = [
    { id: 'name', field: 'name', header: 'Product', width: 200 },
    { id: 'category', field: 'category', header: 'Category', width: 150 },
    { 
      id: 'price', 
      field: 'price', 
      header: 'Price', 
      width: 120,
      cellRenderer: ({ value }) => <span className="font-semibold">${value}</span>
    },
    { id: 'stock', field: 'stock', header: 'Stock', width: 100 },
  ];

  const code = `const [loading, setLoading] = useState(false);
const [data, setData] = useState<Product[]>([]);
const [filterModel, setFilterModel] = useState<FilterModel>({});

// Debounced server-side filtering
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(true);
    
    // Fetch from API with filter params
    fetchProducts(filterModel).then(result => {
      setData(result);
      setLoading(false);
    });
  }, 500); // Debounce delay

  return () => clearTimeout(timer);
}, [filterModel]);

<SimplyTable
  columns={columns}
  rows={data}
  rowKey="id"
  filterMode="server"
  filterModel={filterModel}
  onFilterChange={setFilterModel}
  loading={loading}
/>`;

  return (
    <section id="server-side" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">4. Server-Side Filtering</h2>
        <p className="text-muted-foreground">
          Implement server-side filtering with debounced API calls. The table shows a loading state while fetching filtered data.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search products (server-side)..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg bg-background"
          />
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          )}
        </div>

        <SimplyTable
          columns={columns}
          rows={data}
          rowKey="id"
          filterMode="server"
          filterModel={filterModel}
          onFilterChange={setFilterModel}
          loading={loading}
        />

        <div className="text-sm text-muted-foreground">
          Showing {data.length} of {sampleProducts.length} products
        </div>
      </div>

      <CodeBlock code={code} title="Server-Side Filtering" />

      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 rounded-r-lg">
        <p className="text-sm">
          <strong>Server-Side Best Practices:</strong>
        </p>
        <ul className="text-sm space-y-1 ml-4 list-disc mt-2">
          <li>Use debouncing (300-500ms) to avoid excessive API calls</li>
          <li>Show loading states during data fetching</li>
          <li>Handle errors gracefully with user feedback</li>
          <li>Consider caching results for better performance</li>
          <li>Send filter parameters in a structured format to your API</li>
        </ul>
      </div>
    </section>
  );
}