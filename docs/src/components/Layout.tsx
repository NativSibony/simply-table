import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', path: '/', section: 'Getting Started' },
  { name: 'Basic Examples', path: '/basic', section: 'Examples' },
  { name: 'Sorting & Filtering', path: '/filtering', section: 'Examples' },
  { name: 'Pagination', path: '/pagination', section: 'Examples' },
  { name: 'Virtualization', path: '/virtualization', section: 'Examples' },
  { name: 'Custom Rendering', path: '/custom-rendering', section: 'Examples' },
  { name: 'Advanced Features', path: '/advanced', section: 'Examples' },
  { name: 'API Reference', path: '/api-reference', section: 'Reference' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link to="/" className="text-xl font-bold text-primary" onClick={() => setSidebarOpen(false)}>
              Simply-Table
            </Link>

            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Version badge */}
          <div className="px-6 py-3 border-b">
            <span className="text-sm text-muted-foreground">v0.1.4</span>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6 px-3">
              {/* Getting Started Section */}
              <div>
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Getting Started
                </h3>
                <div className="space-y-1">
                  {navigation
                    .filter((item) => item.section === 'Getting Started')
                    .map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          location.pathname === item.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Examples Section */}
              <div>
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Examples
                </h3>
                <div className="space-y-1">
                  {navigation
                    .filter((item) => item.section === 'Examples')
                    .map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          location.pathname === item.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Reference Section */}
              <div>
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Reference
                </h3>
                <div className="space-y-1">
                  {navigation
                    .filter((item) => item.section === 'Reference')
                    .map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          location.pathname === item.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground text-center">
              Built with React & TypeScript
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar for mobile */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-card lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="ml-4 text-xl font-bold text-primary">
            simply-table
          </Link>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}