import { useState } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';
import { CodeBlock } from '../components/CodeBlock';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
}

// Generate sample data
const generateEmployees = (count: number): Employee[] => {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];
  const positions = ['Junior', 'Mid-level', 'Senior', 'Lead', 'Manager'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    department: departments[i % departments.length],
    position: positions[i % positions.length],
    salary: 50000 + Math.floor(Math.random() * 100000),
    hireDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0],
  }));
};

const allEmployees = generateEmployees(100);

export function PaginationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Pagination</h1>
        <p className="text-lg text-muted-foreground">
          Handle large datasets efficiently with built-in pagination support.
        </p>
      </div>

      <Example1_ClientPagination />
      <Example2_CustomPageSize />
      <Example3_ControlledPagination />
      <Example4_ServerPagination />
    </div>
  );
}

function Example1_ClientPagination() {
  const columns: Column<Employee>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'name', field: 'name', header: 'Name', width: 180 },
    { id: 'department', field: 'department', header: 'Department', width: 150 },
    { id: 'position', field: 'position', header: 'Position', width: 150 },
    { id: 'salary', field: 'salary', header: 'Salary', width: 120 },
  ];

  const code = `<SimplyTable
  columns={columns}
  rows={employees}
  rowKey="id"
  enablePagination={true}
  paginationMode="client"
  pageSize={10}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">1. Client-Side Pagination (Opt-in)</h2>
        <p className="text-muted-foreground">
          Enable pagination with <code className="px-1 bg-muted rounded">enablePagination=&#123;true&#125;</code>.
          Automatically paginate data on the client side. Default page size is 10 rows.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={allEmployees}
          rowKey="id"
          enablePagination={true}
          paginationMode="client"
          pageSize={10}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Total Rows:</strong> {allEmployees.length} employees
        </p>
      </div>
    </section>
  );
}

function Example2_CustomPageSize() {
  const columns: Column<Employee>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'name', field: 'name', header: 'Name', width: 180 },
    { id: 'department', field: 'department', header: 'Department', width: 150 },
    { id: 'position', field: 'position', header: 'Position', width: 150 },
  ];

  const code = `<SimplyTable
  columns={columns}
  rows={employees}
  rowKey="id"
  enablePagination={true}
  paginationMode="client"
  pageSize={25}
  pageSizeOptions={[10, 25, 50, 100]}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">2. Custom Page Size Options</h2>
        <p className="text-muted-foreground">
          Provide users with different page size options to choose from.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <SimplyTable
          columns={columns}
          rows={allEmployees}
          rowKey="id"
          enablePagination={true}
          paginationMode="client"
          pageSize={25}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example3_ControlledPagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const columns: Column<Employee>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80 },
    { id: 'name', field: 'name', header: 'Name', width: 180 },
    { id: 'department', field: 'department', header: 'Department', width: 150 },
    { id: 'salary', field: 'salary', header: 'Salary', width: 120 },
  ];

  const code = `const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(15);

<SimplyTable
  columns={columns}
  rows={employees}
  rowKey="id"
  enablePagination={true}
  paginationMode="client"
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[15, 30, 50]}
/>

// Current state:
// Page: ${page}
// Page Size: ${pageSize}`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">3. Controlled Pagination</h2>
        <p className="text-muted-foreground">
          Control pagination state externally for more flexibility.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card space-y-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setPage(1)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Reset to Page 1
          </button>
          <button
            onClick={() => setPageSize(30)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Set Page Size to 30
          </button>
        </div>

        <SimplyTable
          columns={columns}
          rows={allEmployees}
          rowKey="id"
          enablePagination={true}
          paginationMode="client"
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[15, 30, 50]}
        />

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Current State:</h4>
          <p className="text-sm">Page: {page}</p>
          <p className="text-sm">Page Size: {pageSize}</p>
          <p className="text-sm">Total Pages: {Math.ceil(allEmployees.length / pageSize)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}

function Example4_ServerPagination() {
  const code = `const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [data, setData] = useState([]);
const [totalRows, setTotalRows] = useState(0);

// Fetch data when page or pageSize changes
useEffect(() => {
  fetchData(page, pageSize).then(response => {
    setData(response.data);
    setTotalRows(response.total);
  });
}, [page, pageSize]);

<SimplyTable
  columns={columns}
  rows={data}
  rowKey="id"
  enablePagination={true}
  paginationMode="server"
  page={page}
  pageSize={pageSize}
  totalRows={totalRows}
  onPageChange={setPage}
  onPageSizeChange={(newSize) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page
  }}
  pageSizeOptions={[10, 25, 50, 100]}
/>`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">4. Server-Side Pagination</h2>
        <p className="text-muted-foreground">
          For very large datasets, implement server-side pagination to fetch only the required page of data.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={code} />
      </div>

      <div className="p-4 border-l-4 border-primary bg-primary/5 rounded space-y-2">
        <p className="text-sm">
          <strong>Server Mode:</strong> When using server-side pagination, you must:
        </p>
        <ul className="text-sm space-y-1 ml-4 list-disc">
          <li>Set <code className="px-1 bg-muted rounded">enablePagination=&#123;true&#125;</code> to enable pagination</li>
          <li>Set <code className="px-1 bg-muted rounded">paginationMode="server"</code></li>
          <li>Provide the <code className="px-1 bg-muted rounded">totalRows</code> prop with the total count from your backend</li>
          <li>Handle <code className="px-1 bg-muted rounded">onPageChange</code> and <code className="px-1 bg-muted rounded">onPageSizeChange</code> to fetch new data</li>
          <li>Update the <code className="px-1 bg-muted rounded">rows</code> prop with the fetched page data</li>
        </ul>
      </div>
    </section>
  );
}