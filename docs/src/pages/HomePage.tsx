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
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <h1 className="text-6xl font-bold tracking-tight bg-linear-to-r pb-1 from-primary to-primary/60 bg-clip-text text-transparent">
          simply-table
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A powerful, lightweight table library for React. Built with TypeScript, optimized for performance, and designed for maximum flexibility.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            to="/basic"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started →
          </Link>
          <a
            href="https://github.com/NativSibony/simply-table"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-yellow-500 text-yellow-950 rounded-lg font-semibold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>⭐</span>
            <span>Star on GitHub</span>
          </a>
          <Link
            to="/api-reference"
            className="px-8 py-3 border-2 border-border rounded-lg font-semibold hover:bg-accent transition-all"
          >
            API Reference
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          title="⚡ Lightning Fast"
          description="Virtual scrolling handles 10,000+ rows smoothly with optimized rendering."
        />
        <FeatureCard
          title="🎯 Type Safe"
          description="Built with TypeScript for complete type safety and IntelliSense support."
        />
        <FeatureCard
          title="🎨 Customizable"
          description="Full control over styling, cells, rows, and components."
        />
        <FeatureCard
          title="📦 Lightweight"
          description="Tree-shakeable and optimized for production with minimal bundle size."
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

      {/* Why Choose simply-table */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Why Choose simply-table?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Virtualization support handles 10,000+ rows smoothly. Optimized rendering ensures your tables stay
              responsive.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
            <p className="text-sm text-muted-foreground">
              Built with TypeScript from the ground up. Full type inference and IntelliSense support for a better
              developer experience.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Custom cell renderers, row renderers, and comprehensive styling options. Make it look exactly how you
              want.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Navigation */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Explore Documentation</h2>
          <p className="text-muted-foreground">
            Comprehensive guides and examples to help you get the most out of simply-table
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleLink
            to="/basic"
            title="Basic Examples"
            description="Learn the fundamentals with simple table configurations"
            icon="📋"
          />
          <ExampleLink
            to="/filtering"
            title="Sorting & Filtering"
            description="Implement sorting and filtering functionality"
            icon="🔍"
          />
          <ExampleLink
            to="/pagination"
            title="Pagination"
            description="Add pagination to handle large datasets"
            icon="📄"
          />
          <ExampleLink
            to="/virtualization"
            title="Virtualization"
            description="Optimize performance with row virtualization"
            icon="⚡"
          />
          <ExampleLink
            to="/custom-rendering"
            title="Custom Rendering"
            description="Customize cells and rows with custom renderers"
            icon="🎨"
          />
          <ExampleLink
            to="/advanced"
            title="Advanced Features"
            description="Explore column resizing, reordering, and more"
            icon="🚀"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="p-8 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Install simply-table and start building powerful data tables in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/basic"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Examples
            </Link>
            <Link
              to="/api-reference"
              className="px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              API Documentation
            </Link>
          </div>
          <div className="pt-6 border-t border-border/50 mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              ⭐ If you find simply-table useful, please star the repository!
            </p>
            <a
              href="https://github.com/NativSibony/simply-table"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-500 text-yellow-950 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              <span>⭐</span>
              <span>Star on GitHub</span>
            </a>
          </div>
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
  icon?: string;
}

function ExampleLink({ to, title, description, icon }: ExampleLinkProps) {
  return (
    <Link
      to={to}
      className="block p-6 border rounded-lg bg-card hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
