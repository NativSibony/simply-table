import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Column } from "./types";
import { SimplyTable } from "./simply-table";

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

// Generate large dataset for virtualization testing
const generateLargeDataset = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["Admin", "User", "Manager"][i % 3],
    status: ["Active", "Inactive"][i % 2],
  }));
};

const largeDataset = generateLargeDataset(10000);

// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  return (
    <div className="space-y-12 mx-32 p-10">
      <Example1_SimpleTable />
      <Example2_CustomWidths />
      <Example3_RowKey />
      <Example4_VirtualizationTest />
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

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Simple Table</h2>
        <p className="text-muted-foreground">The most basic table configuration with default settings.</p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={sampleData}
          rowKey="id"
          classNames={{
            header: "rounded-t-lg",
            row: "bg-transparent",
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <code className="block whitespace-pre overflow-x-auto text-xs bg-gray-100 p-4 rounded max-h-[400px]">
          {JSON.stringify(columns, null, 2)}
        </code>
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

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Custom Column Widths</h2>
        <p className="text-muted-foreground">Specify custom widths for each column to control the table layout.</p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          classNames={{
            header: "rounded-t-lg",
            row: "bg-transparent",
          }}
          columns={columns}
          rows={sampleData}
          rowKey="id"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
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

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Row Key Configuration</h2>
        <p className="text-muted-foreground">
          The rowKey prop is used to uniquely identify each row. You can use a field name or a function.
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
          <SimplyTable
            classNames={{
              header: "rounded-t-lg",
              row: "bg-transparent",
            }}
            columns={columns}
            rows={sampleData}
            rowKey={selectedKey}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
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

function Example4_VirtualizationTest() {
  const columns: Column<User>[] = [
    { id: "id", field: "id", header: "ID", width: 80 },
    { id: "name", field: "name", header: "Name", width: 200 },
    { id: "email", field: "email", header: "Email", width: 250 },
    { id: "role", field: "role", header: "Role", width: 150 },
    { id: "status", field: "status", header: "Status", width: 120 },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">4. Virtualization Test (10,000 Rows)</h2>
        <p className="text-muted-foreground">
          Testing virtualization with a large dataset. Scroll through the table to verify smooth performance.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={largeDataset}
          rowKey="id"
          enableVirtualization={true}
          rowHeight={48}
          overscanCount={5}
          className="h-[600px]"
          classNames={{
            header: "rounded-t-lg",
            row: "bg-transparent",
          }}
        />
      </div>

      <div className="p-4 bg-muted rounded-lg space-y-2">
        <p className="text-sm">
          <strong>Total Rows:</strong> {largeDataset.length.toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Virtualization:</strong> Enabled
        </p>
        <p className="text-sm text-muted-foreground">
          Only visible rows are rendered in the DOM. Scroll to test performance!
        </p>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
