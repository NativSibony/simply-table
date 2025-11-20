import { CodeBlock } from '../components/CodeBlock';

export function ApiReferencePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference documentation for all props, types, and interfaces.
        </p>
      </div>

      <SimplyTablePropsSection />
      <ColumnInterface />
      <CellRendererParamsInterface />
      <RowRendererParamsInterface />
      <SortModelInterface />
      <FilterModelInterface />
      <PaginationPropsInterface />
      <TableClassNamesInterface />
    </div>
  );
}

function SimplyTablePropsSection() {
  const propsCode = `interface SimplyTableProps<T = any> {
  // Required Props
  columns: Column<T>[];
  rows: T[];
  rowKey?: keyof T | ((row: T) => string | number);
  
  // Virtualization
  enableVirtualization?: boolean;
  rowHeight?: number;
  overscanCount?: number;
  
  // Sorting
  sortMode?: 'client' | 'server';
  sortModel?: SortModel[];
  onSortChange?: (model: SortModel[]) => void;
  
  // Filtering
  filterMode?: 'client' | 'server';
  filterModel?: FilterModel;
  onFilterChange?: (model: FilterModel) => void;
  
  // Pagination
  enablePagination?: boolean;
  paginationMode?: 'client' | 'server';
  page?: number;
  pageSize?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  paginationComponent?: React.ComponentType<PaginationComponentProps>;
  paginationClassName?: string;
  
  // Column Management
  onColumnReorder?: (columns: Column<T>[]) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  
  // Resize Configuration
  defaultMinResizeWidth?: number;
  defaultMaxResizeWidth?: number;
  
  // Row Rendering
  rowRenderer?: (params: RowRendererParams<T>) => React.ReactNode;
  
  // Customizable Components
  sortIcon?: React.ComponentType<SortIconProps>;
  resizeHandle?: React.ComponentType<ResizeHandleProps>;
  dragIndicator?: React.ComponentType<DragIndicatorProps>;
  
  // Styling
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  cellClassName?: string | ((params: CellRendererParams<T>) => string);
  sortIconClassName?: string;
  resizeHandleClassName?: string;
  classNames?: TableClassNames<T>;
  
  // Loading & Empty State
  loading?: boolean;
  noRowsOverlay?: React.ReactNode;
}`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">SimplyTable Props</h2>
        <p className="text-muted-foreground">
          Main component props for configuring the table behavior and appearance.
        </p>
      </div>

      <CodeBlock code={propsCode} language="typescript" title="SimplyTableProps Interface" />

      <div className="space-y-6">
        <PropCategory title="Core Props" props={[
          {
            name: 'columns',
            type: 'Column<T>[]',
            required: true,
            description: 'Array of column definitions that specify how data should be displayed.',
          },
          {
            name: 'rows',
            type: 'T[]',
            required: true,
            description: 'Array of data objects to display in the table.',
          },
          {
            name: 'rowKey',
            type: 'keyof T | ((row: T) => string | number)',
            default: '"id"',
            description: 'Field name or function to generate unique keys for each row. Essential for React reconciliation.',
          },
        ]} />

        <PropCategory title="Virtualization Props" props={[
          {
            name: 'enableVirtualization',
            type: 'boolean',
            default: 'false',
            description: 'Enable row virtualization for large datasets. Only visible rows are rendered.',
          },
          {
            name: 'rowHeight',
            type: 'number',
            default: '48',
            description: 'Height of each row in pixels. Required for accurate virtualization calculations.',
          },
          {
            name: 'overscanCount',
            type: 'number',
            default: '5',
            description: 'Number of rows to render outside the visible viewport for smoother scrolling.',
          },
        ]} />

        <PropCategory title="Sorting Props" props={[
          {
            name: 'sortMode',
            type: "'client' | 'server'",
            default: "'client'",
            description: 'Determines whether sorting is handled client-side or server-side.',
          },
          {
            name: 'sortModel',
            type: 'SortModel[]',
            description: 'Current sort state. Use for controlled sorting.',
          },
          {
            name: 'onSortChange',
            type: '(model: SortModel[]) => void',
            description: 'Callback fired when sort state changes.',
          },
        ]} />

        <PropCategory title="Filtering Props" props={[
          {
            name: 'filterMode',
            type: "'client' | 'server'",
            default: "'client'",
            description: 'Determines whether filtering is handled client-side or server-side.',
          },
          {
            name: 'filterModel',
            type: 'FilterModel',
            description: 'Current filter state. Use for controlled filtering.',
          },
          {
            name: 'onFilterChange',
            type: '(model: FilterModel) => void',
            description: 'Callback fired when filter state changes.',
          },
        ]} />

        <PropCategory title="Pagination Props" props={[
          {
            name: 'enablePagination',
            type: 'boolean',
            default: 'false',
            description: 'Enable pagination feature. Must be set to true to use pagination.',
          },
          {
            name: 'paginationMode',
            type: "'client' | 'server'",
            default: "'client'",
            description: 'Determines whether pagination is handled client-side or server-side.',
          },
          {
            name: 'page',
            type: 'number',
            default: '1',
            description: 'Current page number (1-indexed).',
          },
          {
            name: 'pageSize',
            type: 'number',
            default: '10',
            description: 'Number of rows per page.',
          },
          {
            name: 'totalRows',
            type: 'number',
            description: 'Total number of rows (required for server-side pagination).',
          },
          {
            name: 'onPageChange',
            type: '(page: number) => void',
            description: 'Callback fired when page changes.',
          },
          {
            name: 'onPageSizeChange',
            type: '(pageSize: number) => void',
            description: 'Callback fired when page size changes.',
          },
          {
            name: 'pageSizeOptions',
            type: 'number[]',
            default: '[10, 25, 50, 100]',
            description: 'Available page size options for the user to select.',
          },
        ]} />

        <PropCategory title="Column Management Props" props={[
          {
            name: 'onColumnReorder',
            type: '(columns: Column<T>[]) => void',
            description: 'Callback fired when columns are reordered via drag and drop.',
          },
          {
            name: 'onColumnResize',
            type: '(columnId: string, width: number) => void',
            description: 'Callback fired when a column is resized.',
          },
          {
            name: 'defaultMinResizeWidth',
            type: 'number',
            default: '50',
            description: 'Default minimum width for resizable columns.',
          },
          {
            name: 'defaultMaxResizeWidth',
            type: 'number',
            default: '1000',
            description: 'Default maximum width for resizable columns.',
          },
        ]} />

        <PropCategory title="Styling Props" props={[
          {
            name: 'className',
            type: 'string',
            description: 'CSS classes for the table container. Use for fixed height with virtualization.',
          },
          {
            name: 'headerClassName',
            type: 'string',
            description: 'CSS classes for the header row.',
          },
          {
            name: 'rowClassName',
            type: 'string | ((row: T, index: number) => string)',
            description: 'CSS classes for table rows. Can be a string or function for dynamic styling.',
          },
          {
            name: 'cellClassName',
            type: 'string | ((params: CellRendererParams<T>) => string)',
            description: 'CSS classes for table cells. Can be a string or function for dynamic styling.',
          },
          {
            name: 'classNames',
            type: 'TableClassNames<T>',
            description: 'Comprehensive object for styling all table parts with granular control.',
          },
        ]} />

        <PropCategory title="State Props" props={[
          {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Show loading overlay when data is being fetched.',
          },
          {
            name: 'noRowsOverlay',
            type: 'React.ReactNode',
            description: 'Custom component to display when there are no rows.',
          },
        ]} />
      </div>
    </section>
  );
}

function ColumnInterface() {
  const code = `interface Column<T = any> {
  id: string;
  field: keyof T | string;
  header: string | ((column: Column<T>) => React.ReactNode);
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  cellRenderer?: (params: CellRendererParams<T>) => React.ReactNode;
  valueGetter?: (row: T) => any;
  comparator?: (a: any, b: any) => number;
}`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">Column Interface</h2>
        <p className="text-muted-foreground">
          Defines the structure and behavior of table columns.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="Column Interface" />

      <PropCategory title="Column Properties" props={[
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Unique identifier for the column.',
        },
        {
          name: 'field',
          type: 'keyof T | string',
          required: true,
          description: 'Field name in the data object to display.',
        },
        {
          name: 'header',
          type: 'string | ((column: Column<T>) => React.ReactNode)',
          required: true,
          description: 'Column header text or custom render function.',
        },
        {
          name: 'width',
          type: 'number',
          description: 'Column width in pixels.',
        },
        {
          name: 'minWidth',
          type: 'number',
          default: '50',
          description: 'Minimum width when resizing.',
        },
        {
          name: 'maxWidth',
          type: 'number',
          default: '1000',
          description: 'Maximum width when resizing.',
        },
        {
          name: 'sortable',
          type: 'boolean',
          default: 'false',
          description: 'Enable sorting for this column.',
        },
        {
          name: 'filterable',
          type: 'boolean',
          default: 'false',
          description: 'Enable filtering for this column.',
        },
        {
          name: 'resizable',
          type: 'boolean',
          default: 'false',
          description: 'Enable resizing for this column.',
        },
        {
          name: 'cellRenderer',
          type: '(params: CellRendererParams<T>) => React.ReactNode',
          description: 'Custom function to render cell content.',
        },
        {
          name: 'valueGetter',
          type: '(row: T) => any',
          description: 'Function to extract value from row data. Useful for computed values.',
        },
        {
          name: 'comparator',
          type: '(a: any, b: any) => number',
          description: 'Custom comparison function for sorting.',
        },
      ]} />
    </section>
  );
}

function CellRendererParamsInterface() {
  const code = `interface CellRendererParams<T = any> {
  value: any;
  row: T;
  rowIndex: number;
  column: Column<T>;
}`;

  const exampleCode = `const columns: Column<Product>[] = [
  {
    id: 'price',
    field: 'price',
    header: 'Price',
    cellRenderer: ({ value, row, rowIndex, column }: CellRendererParams<Product>) => (
      <div>
        <span className="font-bold">\${value}</span>
        {row.discount && <span className="text-sm text-red-500"> (-{row.discount}%)</span>}
      </div>
    ),
  },
];`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">CellRendererParams Interface</h2>
        <p className="text-muted-foreground">
          Parameters passed to custom cell renderer functions.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="CellRendererParams Interface" />

      <PropCategory title="Parameters" props={[
        {
          name: 'value',
          type: 'any',
          description: 'The cell value extracted from the row data.',
        },
        {
          name: 'row',
          type: 'T',
          description: 'The complete row data object.',
        },
        {
          name: 'rowIndex',
          type: 'number',
          description: 'Zero-based index of the row.',
        },
        {
          name: 'column',
          type: 'Column<T>',
          description: 'The column definition object.',
        },
      ]} />

      <div>
        <h3 className="text-xl font-semibold mb-3">Usage Example</h3>
        <CodeBlock code={exampleCode} language="typescript" />
      </div>
    </section>
  );
}

function RowRendererParamsInterface() {
  const code = `interface RowRendererParams<T = any> {
  row: T;
  rowIndex: number;
  cells: React.ReactNode;
  isEven: boolean;
}`;

  const exampleCode = `<SimplyTable
  columns={columns}
  rows={rows}
  rowKey="id"
  rowRenderer={({ row, rowIndex, cells, isEven }: RowRendererParams<Task>) => (
    <tr 
      className={\`\${isEven ? 'bg-gray-50' : 'bg-white'} \${row.priority === 'High' ? 'border-l-4 border-red-500' : ''}\`}
      onClick={() => handleRowClick(row)}
    >
      {cells}
    </tr>
  )}
/>`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">RowRendererParams Interface</h2>
        <p className="text-muted-foreground">
          Parameters passed to custom row renderer functions.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="RowRendererParams Interface" />

      <PropCategory title="Parameters" props={[
        {
          name: 'row',
          type: 'T',
          description: 'The complete row data object.',
        },
        {
          name: 'rowIndex',
          type: 'number',
          description: 'Zero-based index of the row.',
        },
        {
          name: 'cells',
          type: 'React.ReactNode',
          description: 'Pre-rendered cell elements to include in your custom row.',
        },
        {
          name: 'isEven',
          type: 'boolean',
          description: 'Whether the row index is even (useful for alternating row colors).',
        },
      ]} />

      <div>
        <h3 className="text-xl font-semibold mb-3">Usage Example</h3>
        <CodeBlock code={exampleCode} language="typescript" />
      </div>
    </section>
  );
}

function SortModelInterface() {
  const code = `interface SortModel {
  field: string;
  sort: 'asc' | 'desc' | null;
}

// Example usage
const [sortModel, setSortModel] = useState<SortModel[]>([
  { field: 'name', sort: 'asc' },
  { field: 'price', sort: 'desc' },
]);`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">SortModel Interface</h2>
        <p className="text-muted-foreground">
          Defines the sorting state for table columns.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="SortModel Interface" />

      <PropCategory title="Properties" props={[
        {
          name: 'field',
          type: 'string',
          required: true,
          description: 'The field name to sort by (matches column id).',
        },
        {
          name: 'sort',
          type: "'asc' | 'desc' | null",
          required: true,
          description: 'Sort direction: ascending, descending, or no sort.',
        },
      ]} />

      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 rounded">
        <p className="text-sm">
          <strong>Note:</strong> The sortModel is an array to support multi-column sorting. 
          The order of items in the array determines the sort priority.
        </p>
      </div>
    </section>
  );
}

function FilterModelInterface() {
  const code = `interface FilterModel {
  [field: string]: {
    value: any;
    operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  };
}

// Example usage
const [filterModel, setFilterModel] = useState<FilterModel>({
  name: { value: 'John', operator: 'contains' },
  age: { value: 18, operator: 'gte' },
  status: { value: 'active', operator: 'equals' },
});`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">FilterModel Interface</h2>
        <p className="text-muted-foreground">
          Defines the filtering state for table columns.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="FilterModel Interface" />

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Filter Operators</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <OperatorCard 
              operator="contains"
              description="Value contains the search term (case-insensitive)"
            />
            <OperatorCard 
              operator="equals"
              description="Value exactly matches the search term"
            />
            <OperatorCard 
              operator="startsWith"
              description="Value starts with the search term"
            />
            <OperatorCard 
              operator="endsWith"
              description="Value ends with the search term"
            />
            <OperatorCard 
              operator="gt"
              description="Greater than (for numbers and dates)"
            />
            <OperatorCard 
              operator="lt"
              description="Less than (for numbers and dates)"
            />
            <OperatorCard 
              operator="gte"
              description="Greater than or equal to"
            />
            <OperatorCard 
              operator="lte"
              description="Less than or equal to"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PaginationPropsInterface() {
  const code = `interface PaginationComponentProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
}`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">PaginationComponentProps Interface</h2>
        <p className="text-muted-foreground">
          Props for custom pagination components.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="PaginationComponentProps Interface" />

      <PropCategory title="Properties" props={[
        {
          name: 'page',
          type: 'number',
          required: true,
          description: 'Current page number (1-indexed).',
        },
        {
          name: 'pageSize',
          type: 'number',
          required: true,
          description: 'Number of rows per page.',
        },
        {
          name: 'totalPages',
          type: 'number',
          required: true,
          description: 'Total number of pages.',
        },
        {
          name: 'totalRows',
          type: 'number',
          required: true,
          description: 'Total number of rows across all pages.',
        },
        {
          name: 'pageSizeOptions',
          type: 'number[]',
          description: 'Available page size options.',
        },
        {
          name: 'onPageChange',
          type: '(page: number) => void',
          required: true,
          description: 'Callback to change the current page.',
        },
        {
          name: 'onPageSizeChange',
          type: '(pageSize: number) => void',
          required: true,
          description: 'Callback to change the page size.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'CSS classes for the pagination container.',
        },
      ]} />
    </section>
  );
}

function TableClassNamesInterface() {
  const code = `interface TableClassNames<T = any> {
  // Container
  root?: string;
  container?: string;
  
  // Header
  header?: string;
  headerCell?: string;
  headerCellDragging?: string;
  headerCellDragOver?: string;
  
  // Body
  body?: string;
  
  // Row
  row?: string | ((row: T, index: number) => string);
  rowEven?: string;
  rowOdd?: string;
  
  // Cell
  cell?: string | ((params: CellRendererParams<T>) => string);
  
  // Loading
  loadingOverlay?: string;
  loadingSpinner?: string;
  
  // Empty State
  emptyState?: string;
  
  // Sort Icon
  sortIcon?: string;
  
  // Resize Handle
  resizeHandle?: string;
  
  // Pagination
  pagination?: string;
}`;

  const exampleCode = `<SimplyTable
  columns={columns}
  rows={rows}
  rowKey="id"
  classNames={{
    root: 'shadow-lg rounded-lg',
    header: 'bg-gray-100 dark:bg-gray-800',
    headerCell: 'font-bold text-sm uppercase',
    row: (row, index) => row.status === 'active' ? 'bg-green-50' : '',
    cell: 'px-4 py-3',
    loadingOverlay: 'bg-white/80 backdrop-blur-sm',
  }}
/>`;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-3">TableClassNames Interface</h2>
        <p className="text-muted-foreground">
          Comprehensive styling interface for granular control over all table elements.
        </p>
      </div>

      <CodeBlock code={code} language="typescript" title="TableClassNames Interface" />

      <div>
        <h3 className="text-xl font-semibold mb-3">Usage Example</h3>
        <CodeBlock code={exampleCode} language="typescript" />
      </div>

      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 rounded">
        <p className="text-sm">
          <strong>Tip:</strong> Use the classNames prop for comprehensive styling control. 
          Properties can be strings or functions for dynamic styling based on row/cell data.
        </p>
      </div>
    </section>
  );
}

// Helper Components

interface PropCategoryProps {
  title: string;
  props: PropInfo[];
}

interface PropInfo {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

function PropCategory({ title, props }: PropCategoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="space-y-4">
        {props.map((prop) => (
          <div key={prop.name} className="p-4 border rounded-lg bg-card">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <code className="text-sm font-semibold text-primary">{prop.name}</code>
                {prop.required && (
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded">required</span>
                )}
              </div>
              <code className="text-xs text-muted-foreground whitespace-nowrap">{prop.type}</code>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{prop.description}</p>
            {prop.default && (
              <div className="text-xs">
                <span className="text-muted-foreground">Default: </span>
                <code className="px-1.5 py-0.5 bg-muted rounded">{prop.default}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface OperatorCardProps {
  operator: string;
  description: string;
}

function OperatorCard({ operator, description }: OperatorCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <code className="text-sm font-semibold text-primary">{operator}</code>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}