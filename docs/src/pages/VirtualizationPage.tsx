import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';
import { CodeBlock } from '../components/CodeBlock';

interface DataRow {
  id: number;
  col1: string;
  col2: string;
  col3: number;
  col4: string;
  col5: number;
}

// Generate large dataset
const generateLargeDataset = (count: number): DataRow[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    col1: `Item ${i + 1}`,
    col2: `Category ${(i % 10) + 1}`,
    col3: Math.floor(Math.random() * 1000),
    col4: `Status ${(i % 3) + 1}`,
    col5: Math.floor(Math.random() * 100),
  }));
};

const largeDataset = generateLargeDataset(10000);

export function VirtualizationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Virtualization</h1>
        <p className="text-lg text-muted-foreground">
          Optimize performance for large datasets with row virtualization.
        </p>
      </div>

      <Example1_WithoutVirtualization />
      <Example2_WithVirtualization />
      <Example3_CustomRowHeight />
      <PerformanceComparison />
    </div>
  );
}

function Example1_WithoutVirtualization() {
  const columns: Column<DataRow>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'col1', field: 'col1', header: 'Name', width: 200 },
    { id: 'col2', field: 'col2', header: 'Category', width: 150 },
    { id: 'col3', field: 'col3', header: 'Value', width: 120 },
    { id: 'col4', field: 'col4', header: 'Status', width: 120 },
  ];

  const smallDataset = largeDataset.slice(0, 100);

  const code = `// Without virtualization - renders all rows
<SimplyTable
  columns={columns}
  rows={rows} // 100 rows
  rowKey="id"
  enableVirtualization={false}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Without Virtualization</h2>
        <p className="text-muted-foreground">
          Standard rendering - all rows are rendered in the DOM. Works well for small datasets (&lt; 100 rows).
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={smallDataset}
          rowKey="id"
          enableVirtualization={false}
          pageSize={100}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Rows Rendered:</strong> {smallDataset.length} (all rows in DOM)
        </p>
      </div>
    </section>
  );
}

function Example2_WithVirtualization() {
  const columns: Column<DataRow>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'col1', field: 'col1', header: 'Name', width: 200 },
    { id: 'col2', field: 'col2', header: 'Category', width: 150 },
    { id: 'col3', field: 'col3', header: 'Value', width: 120 },
    { id: 'col4', field: 'col4', header: 'Status', width: 120 },
    { id: 'col5', field: 'col5', header: 'Score', width: 100 },
  ];

  const code = `// With virtualization - only visible rows are rendered
<SimplyTable
  columns={columns}
  rows={rows} // 10,000 rows
  rowKey="id"
  enableVirtualization={true}
  rowHeight={48}
  overscanCount={5}
/>`;

  return (
    <section className="space-y-4 overflow-auto">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. With Virtualization</h2>
        <p className="text-muted-foreground">
          Only visible rows are rendered. Ideal for large datasets (1000+ rows).
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card max-h-[600px] overflow-auto">
        <SimplyTable
          columns={columns}
          rows={largeDataset}
          rowKey="id"
          enableVirtualization={true}
          rowHeight={48}
          overscanCount={5}
          pageSize={10000}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <p className="text-sm">
          <strong>Total Rows:</strong> {largeDataset.length.toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Rendered Rows:</strong> Only visible rows + overscan (typically 15-20 rows)
        </p>
        <p className="text-sm text-muted-foreground">
          Scroll through the table to see smooth performance even with 10,000 rows!
        </p>
      </div>
    </section>
  );
}

function Example3_CustomRowHeight() {
  const columns: Column<DataRow>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'col1', field: 'col1', header: 'Name', width: 200 },
    { id: 'col2', field: 'col2', header: 'Category', width: 150 },
    { id: 'col3', field: 'col3', header: 'Value', width: 120 },
  ];

  const code = `// Custom row height and overscan
<SimplyTable
  columns={columns}
  rows={rows}
  rowKey="id"
  enableVirtualization={true}
  rowHeight={64}        // Taller rows
  overscanCount={10}    // More rows buffered
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Custom Row Height</h2>
        <p className="text-muted-foreground">
          Adjust row height and overscan count for your specific needs.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={largeDataset.slice(0, 1000)}
          rowKey="id"
          enableVirtualization={true}
          rowHeight={64}
          overscanCount={10}
          pageSize={1000}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded space-y-2">
        <p className="text-sm">
          <strong>Configuration Options:</strong>
        </p>
        <ul className="text-sm space-y-1 ml-4 list-disc">
          <li><code className="px-1 bg-muted rounded">rowHeight</code>: Height of each row in pixels (default: 48)</li>
          <li><code className="px-1 bg-muted rounded">overscanCount</code>: Number of rows to render outside viewport (default: 5)</li>
          <li>Higher overscan = smoother scrolling but more DOM nodes</li>
        </ul>
      </div>
    </section>
  );
}

function PerformanceComparison() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Performance Comparison</h2>
        <p className="text-muted-foreground">
          Understanding when to use virtualization.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Without Virtualization</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium">Simple Implementation</p>
                <p className="text-sm text-muted-foreground">No extra configuration needed</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium">Best for Small Datasets</p>
                <p className="text-sm text-muted-foreground">{'<'} 100 rows perform well</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <div>
                <p className="font-medium">Poor Performance at Scale</p>
                <p className="text-sm text-muted-foreground">Slow with 1000+ rows</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <div>
                <p className="font-medium">High Memory Usage</p>
                <p className="text-sm text-muted-foreground">All rows in DOM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">With Virtualization</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium">Excellent Performance</p>
                <p className="text-sm text-muted-foreground">Handles 10,000+ rows smoothly</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium">Low Memory Footprint</p>
                <p className="text-sm text-muted-foreground">Only visible rows rendered</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium">Smooth Scrolling</p>
                <p className="text-sm text-muted-foreground">Optimized rendering</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 mt-1">!</span>
              <div>
                <p className="font-medium">Requires Configuration</p>
                <p className="text-sm text-muted-foreground">Need to set row height</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
        <h4 className="font-semibold mb-2">Recommendation</h4>
        <p className="text-sm">
          Use virtualization when you have more than 100 rows, or when you notice performance issues.
          For datasets under 100 rows, standard rendering is simpler and works well.
        </p>
      </div>
    </section>
  );
}