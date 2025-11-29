import { useState } from "react";
import { SimplyTable } from "simply-table";
import type { Column } from "simply-table";
import { CodeBlock } from "../components/CodeBlock";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Manager", status: "Active" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
];

export function BasicExamplesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Basic Examples</h1>
        <p className="text-lg text-muted-foreground">
          Learn the fundamentals of using simply-table with these basic examples.
        </p>
      </div>

      {/* Quick Navigation */}
      <nav className="p-4 bg-muted/50 rounded-lg border">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">On This Page</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#simple-table" className="text-primary hover:underline">1. Simple Table</a></li>
          <li><a href="#custom-widths" className="text-primary hover:underline">2. Custom Column Widths</a></li>
          <li><a href="#row-key" className="text-primary hover:underline">3. Row Key Configuration</a></li>
        </ul>
      </nav>

      <Example1_SimpleTable />
      <Example2_CustomWidths />
      <Example3_RowKey />

      {/* Next Steps */}
      <section className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Next Steps</h2>
        <p className="text-muted-foreground mb-4">
          Now that you understand the basics, explore more advanced features:
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/filtering" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Sorting & Filtering →
          </a>
          <a href="/pagination" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            Pagination
          </a>
          <a href="/virtualization" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            Virtualization
          </a>
          <a href="/api-reference" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            API Reference
          </a>
        </div>
      </section>
    </div>
  );
}

function Example1_SimpleTable() {
  const columns: Column<User>[] = [
    { id: "id", field: "id", header: "ID", resizable: true },
    { id: "name", field: "name", header: "Name", resizable: true },
    { id: "email", field: "email", header: "Email", resizable: true },
    { id: "role", field: "role", header: "Role", resizable: true },
    { id: "status", field: "status", header: "Status", resizable: true },
  ];

  const code = `import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: Column<User>[] = [
  { id: 'id', field: 'id', header: 'ID', resizable: true },
  { id: 'name', field: 'name', header: 'Name', resizable: true },
  { id: 'email', field: 'email', header: 'Email', resizable: true },
  { id: 'role', field: 'role', header: 'Role', resizable: true },
  { id: 'status', field: 'status', header: 'Status', resizable: true },
];

const rows: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  // ... more rows
];

function App() {
  return (
    <SimplyTable
      columns={columns}
      rows={rows}
      rowKey="id"
    />
  );
}`;

  return (
    <section id="simple-table" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Simple Table</h2>
        <p className="text-muted-foreground">
          The most basic table configuration with default settings. This example shows how to create a table with minimal configuration.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable columns={columns} rows={sampleData} rowKey="id" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example2_CustomWidths() {
  const columns: Column<User>[] = [
    { id: "id", field: "id", header: "ID", width: 80 },
    { id: "name", field: "name", header: "Name", width: 200 },
    { id: "email", field: "email", header: "Email", width: 250 },
    { id: "role", field: "role", header: "Role", width: 150 },
    { id: "status", field: "status", header: "Status", width: 120 },
  ];

  const code = `const columns: Column<User>[] = [
  { id: 'id', field: 'id', header: 'ID', width: 80 },
  { id: 'name', field: 'name', header: 'Name', width: 200 },
  { id: 'email', field: 'email', header: 'Email', width: 250 },
  { id: 'role', field: 'role', header: 'Role', width: 150 },
  { id: 'status', field: 'status', header: 'Status', width: 120 },
];

<SimplyTable
  columns={columns}
  rows={rows}
  rowKey="id"
/>`;

  return (
    <section id="custom-widths" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Custom Column Widths</h2>
        <p className="text-muted-foreground">
          Specify custom widths for each column to control the table layout. Use the <code className="px-1.5 py-0.5 bg-muted rounded text-sm">width</code> property to set fixed column widths in pixels.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable columns={columns} rows={sampleData} rowKey="id" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example3_RowKey() {
  const [selectedKey, setSelectedKey] = useState<"id" | "email">("id");

  const columns: Column<User>[] = [
    { id: "id", field: "id", header: "ID", width: 80 },
    { id: "name", field: "name", header: "Name", width: 200 },
    { id: "email", field: "email", header: "Email", width: 250 },
    { id: "role", field: "role", header: "Role", width: 150 },
  ];

  const code = `// Using a field as row key
<SimplyTable
  columns={columns}
  rows={rows}
  rowKey="id"
/>

// Using a function to generate row keys
<SimplyTable
  columns={columns}
  rows={rows}
  rowKey={(row) => row.email}
/>`;

  return (
    <section id="row-key" className="space-y-4 scroll-mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Row Key Configuration</h2>
        <p className="text-muted-foreground">
          The <code className="px-1.5 py-0.5 bg-muted rounded text-sm">rowKey</code> prop is used to uniquely identify each row.
          You can use a field name or a function. This is essential for React's reconciliation process.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedKey("id")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedKey === "id"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Use ID as Key
          </button>
          <button
            onClick={() => setSelectedKey("email")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedKey === "email"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Use Email as Key
          </button>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <SimplyTable columns={columns} rows={sampleData} rowKey={selectedKey} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
        <p className="text-sm">
          <strong>Note:</strong> The rowKey is essential for React's reconciliation process. It should be unique for
          each row and stable across renders.
        </p>
      </div>
    </section>
  );
}
