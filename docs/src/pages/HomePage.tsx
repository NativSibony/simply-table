import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";

export function HomePage() {
  const installCode = `npm install simply-table
# or
yarn add simply-table
# or
pnpm add simply-table`;

  const quickStartCode = `import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { id: 'id', field: 'id', header: 'ID', width: 80 },
  { id: 'name', field: 'name', header: 'Name', width: 200 },
  { id: 'email', field: 'email', header: 'Email', width: 250 },
  { id: 'role', field: 'role', header: 'Role', width: 150 },
];

const rows: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

function App() {
  return (
    <div className="p-4">
      <SimplyTable
        columns={columns}
        rows={rows}
        rowKey="id"
      />
    </div>
  );
}`;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">simply-table</h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A production-ready, feature-rich table library for React applications. Built with TypeScript, optimized for
          performance, and designed for flexibility.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            to="/basic"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View Examples
          </Link>
          <a
            href="https://github.com/NativSibony/simply-table"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="TypeScript First"
          description="Built with TypeScript for complete type safety and excellent IntelliSense support."
        />
        <FeatureCard
          title="Sorting & Filtering"
          description="Client-side and server-side sorting and filtering with customizable comparators."
        />
        <FeatureCard
          title="Pagination"
          description="Built-in pagination with customizable page sizes and server-side support."
        />
        <FeatureCard
          title="Virtualization"
          description="Efficient rendering of large datasets with row virtualization for optimal performance."
        />
        <FeatureCard
          title="Column Management"
          description="Resizable and reorderable columns with drag-and-drop support."
        />
        <FeatureCard
          title="Custom Rendering"
          description="Flexible cell and row renderers for complete customization."
        />
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Installation</h2>
        <CodeBlock code={installCode} language="bash" />
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Quick Start</h2>
        <p className="text-muted-foreground">Get started with simply-table in just a few lines of code:</p>
        <CodeBlock code={quickStartCode} />
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="space-y-4">
          <FeatureDetail
            title="Dual Format Support"
            description="Works seamlessly with both ESM and CommonJS module systems."
          />
          <FeatureDetail
            title="React 18+ & 19+ Compatible"
            description="Fully compatible with the latest React versions and features."
          />
          <FeatureDetail
            title="Optimized Bundle"
            description="Tree-shakeable exports and optimized bundle size for production."
          />
          <FeatureDetail
            title="Accessible"
            description="Built with accessibility in mind, following WAI-ARIA guidelines."
          />
        </div>
      </section>

      {/* Examples Navigation */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Explore Examples</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleLink
            to="/basic"
            title="Basic Examples"
            description="Learn the fundamentals with simple table configurations"
          />
          <ExampleLink
            to="/sorting-filtering"
            title="Sorting & Filtering"
            description="Implement sorting and filtering functionality"
          />
          <ExampleLink to="/pagination" title="Pagination" description="Add pagination to handle large datasets" />
          <ExampleLink
            to="/virtualization"
            title="Virtualization"
            description="Optimize performance with row virtualization"
          />
          <ExampleLink
            to="/custom-rendering"
            title="Custom Rendering"
            description="Customize cells and rows with custom renderers"
          />
          <ExampleLink
            to="/advanced"
            title="Advanced Features"
            description="Explore column resizing, reordering, and more"
          />
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function FeatureDetail({ title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface ExampleLinkProps {
  to: string;
  title: string;
  description: string;
}

function ExampleLink({ to, title, description }: ExampleLinkProps) {
  return (
    <Link to={to} className="block p-6 border rounded-lg bg-card hover:border-primary transition-colors">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
