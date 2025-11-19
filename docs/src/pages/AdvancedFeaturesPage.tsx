import { useState } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';
import { CodeBlock } from '../components/CodeBlock';

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
  dueDate: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Implement authentication', assignee: 'John Doe', priority: 'High', status: 'In Progress', dueDate: '2024-12-01' },
  { id: 2, title: 'Design landing page', assignee: 'Jane Smith', priority: 'Medium', status: 'Todo', dueDate: '2024-12-05' },
  { id: 3, title: 'Write documentation', assignee: 'Bob Johnson', priority: 'Low', status: 'Done', dueDate: '2024-11-28' },
  { id: 4, title: 'Fix bug in payment', assignee: 'Alice Williams', priority: 'High', status: 'In Progress', dueDate: '2024-11-30' },
  { id: 5, title: 'Optimize database queries', assignee: 'Charlie Brown', priority: 'Medium', status: 'Todo', dueDate: '2024-12-10' },
];

export function AdvancedFeaturesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Advanced Features</h1>
        <p className="text-lg text-muted-foreground">
          Explore advanced table features including column resizing, reordering, and custom styling.
        </p>
      </div>

      <Example1_ColumnResizing />
      <Example2_ColumnReordering />
      <Example3_CustomStyling />
      <Example4_LoadingState />
    </div>
  );
}

function Example1_ColumnResizing() {
  const [columns] = useState<Column<Task>[]>([
    { id: 'id', field: 'id', header: 'ID', width: 80, resizable: true },
    { id: 'title', field: 'title', header: 'Task', width: 250, resizable: true },
    { id: 'assignee', field: 'assignee', header: 'Assignee', width: 180, resizable: true },
    { id: 'priority', field: 'priority', header: 'Priority', width: 120, resizable: true },
    { id: 'status', field: 'status', header: 'Status', width: 150, resizable: true },
  ]);

  const handleColumnResize = (columnId: string, width: number) => {
    console.log(`Column ${columnId} resized to ${width}px`);
  };

  const code = `const columns: Column<Task>[] = [
  { id: 'id', field: 'id', header: 'ID', width: 80, resizable: true },
  { id: 'title', field: 'title', header: 'Task', width: 250, resizable: true },
  { id: 'assignee', field: 'assignee', header: 'Assignee', width: 180, resizable: true },
  // ... more columns
];

<SimplyTable
  columns={columns}
  rows={tasks}
  rowKey="id"
  onColumnResize={(columnId, width) => {
    console.log(\`Column \${columnId} resized to \${width}px\`);
  }}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Column Resizing</h2>
        <p className="text-muted-foreground">
          Enable column resizing by setting <code className="px-2 py-1 bg-muted rounded">resizable: true</code> on columns.
          Drag the column borders to resize.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={tasks}
          rowKey="id"
          onColumnResize={handleColumnResize}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Tip:</strong> Open the browser console to see resize events logged.
        </p>
      </div>
    </section>
  );
}

function Example2_ColumnReordering() {
  const [reorderedColumns, setReorderedColumns] = useState<Column<Task>[]>([
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'title', field: 'title', header: 'Task', width: 250 },
    { id: 'priority', field: 'priority', header: 'Priority', width: 120 },
    { id: 'status', field: 'status', header: 'Status', width: 150 },
  ]);

  const handleColumnReorder = (newColumns: Column<Task>[]) => {
    setReorderedColumns(newColumns);
  };

  const code = `const [columns, setColumns] = useState<Column<Task>[]>([...]);

<SimplyTable
  columns={columns}
  rows={tasks}
  rowKey="id"
  onColumnReorder={setColumns}
/>

// Current column order:
// ${reorderedColumns.map(c => c.header).join(' → ')}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Column Reordering</h2>
        <p className="text-muted-foreground">
          Drag and drop column headers to reorder them. The onColumnReorder callback receives the new column order.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <SimplyTable
          columns={reorderedColumns}
          rows={tasks}
          rowKey="id"
          onColumnReorder={handleColumnReorder}
        />

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Current Column Order:</h4>
          <p className="text-sm font-mono">
            {reorderedColumns.map(c => c.header).join(' → ')}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example3_CustomStyling() {
  const columns: Column<Task>[] = [
    { id: 'title', field: 'title', header: 'Task', width: 250 },
    { id: 'priority', field: 'priority', header: 'Priority', width: 120 },
    { id: 'status', field: 'status', header: 'Status', width: 150 },
  ];

  const getRowClassName = (row: Task) => {
    if (row.priority === 'High') return 'bg-red-50 hover:bg-red-100';
    if (row.priority === 'Medium') return 'bg-yellow-50 hover:bg-yellow-100';
    return 'bg-green-50 hover:bg-green-100';
  };

  const code = `const getRowClassName = (row: Task) => {
  if (row.priority === 'High') return 'bg-red-50 hover:bg-red-100';
  if (row.priority === 'Medium') return 'bg-yellow-50 hover:bg-yellow-100';
  return 'bg-green-50 hover:bg-green-100';
};

<SimplyTable
  columns={columns}
  rows={tasks}
  rowKey="id"
  className="shadow-lg"
  headerClassName="bg-primary text-primary-foreground"
  rowClassName={getRowClassName}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Custom Styling</h2>
        <p className="text-muted-foreground">
          Apply custom CSS classes to the table, headers, and rows for complete styling control.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={tasks}
          rowKey="id"
          className="shadow-lg"
          headerClassName="bg-primary text-primary-foreground"
          rowClassName={getRowClassName}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded space-y-2">
        <p className="text-sm">
          <strong>Styling Props:</strong>
        </p>
        <ul className="text-sm space-y-1 ml-4 list-disc">
          <li><code className="px-1 bg-muted rounded">className</code>: Table container classes</li>
          <li><code className="px-1 bg-muted rounded">headerClassName</code>: Header row classes</li>
          <li><code className="px-1 bg-muted rounded">rowClassName</code>: Row classes (string or function)</li>
          <li><code className="px-1 bg-muted rounded">cellClassName</code>: Cell classes (string or function)</li>
        </ul>
      </div>
    </section>
  );
}

function Example4_LoadingState() {
  const [loading, setLoading] = useState(false);

  const columns: Column<Task>[] = [
    { id: 'title', field: 'title', header: 'Task', width: 250 },
    { id: 'assignee', field: 'assignee', header: 'Assignee', width: 180 },
    { id: 'status', field: 'status', header: 'Status', width: 150 },
  ];

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const code = `const [loading, setLoading] = useState(false);

<SimplyTable
  columns={columns}
  rows={tasks}
  rowKey="id"
  loading={loading}
  noRowsOverlay={
    <div className="text-center py-8">
      <p className="text-lg font-semibold">No tasks found</p>
      <p className="text-sm text-muted-foreground">
        Create a new task to get started
      </p>
    </div>
  }
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">4. Loading State & Empty State</h2>
        <p className="text-muted-foreground">
          Show loading indicators and custom empty state messages.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <button
          onClick={simulateLoading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Simulate Loading
        </button>

        <SimplyTable
          columns={columns}
          rows={tasks}
          rowKey="id"
          loading={loading}
          noRowsOverlay={
            <div className="text-center py-8">
              <p className="text-lg font-semibold">No tasks found</p>
              <p className="text-sm text-muted-foreground">
                Create a new task to get started
              </p>
            </div>
          }
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}