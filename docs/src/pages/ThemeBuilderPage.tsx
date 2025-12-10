import { useState, useEffect } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';
import { Button } from '../components/ui/button';
import { Download, RotateCcw, Search, ChevronDown, ChevronRight } from 'lucide-react';
import './theme-builder.css';

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

interface TableThemeConfig {
  tableWidth: string;
  tableBorder: string;
  tableBorderColor: string;
  tableBorderOpacity: number;
  tableBorderStyle: string;
  tableRadius: string;
  tableBackground: string;
  tableBackgroundOpacity: number;
  headerBackground: string;
  headerBackgroundOpacity: number;
  headerTextColor: string;
  headerFontSize: string;
  headerFontWeight: string;
  headerPadding: string;
  headerBorderBottom: string;
  headerBorderColor: string;
  headerBorderOpacity: number;
  rowEvenBackground: string;
  rowEvenBackgroundOpacity: number;
  rowEvenTextColor: string;
  rowOddBackground: string;
  rowOddBackgroundOpacity: number;
  rowOddTextColor: string;
  rowHoverBackground: string;
  rowHoverBackgroundOpacity: number;
  rowHoverTextColor: string;
  rowHeight: string;
  rowBorderBottom: string;
  rowBorderColor: string;
  rowBorderOpacity: number;
  cellPadding: string;
  cellFontSize: string;
  cellBorderRight: string;
  cellBorderColor: string;
  cellBorderOpacity: number;
  cellAlignment: string;
  columnMinWidth: string;
  columnMaxWidth: string;
}

const defaultTheme: TableThemeConfig = {
  tableWidth: '100%',
  tableBorder: '1px',
  tableBorderColor: '#e5e7eb',
  tableBorderOpacity: 1,
  tableBorderStyle: 'solid',
  tableRadius: '0.5rem',
  tableBackground: '#ffffff',
  tableBackgroundOpacity: 1,
  headerBackground: '#f9fafb',
  headerBackgroundOpacity: 0.5,
  headerTextColor: '#111827',
  headerFontSize: '0.875rem',
  headerFontWeight: '500',
  headerPadding: '0.75rem 1rem',
  headerBorderBottom: '1px',
  headerBorderColor: '#e5e7eb',
  headerBorderOpacity: 1,
  rowEvenBackground: '#f9fafb',
  rowEvenBackgroundOpacity: 0.2,
  rowEvenTextColor: '#111827',
  rowOddBackground: '#ffffff',
  rowOddBackgroundOpacity: 1,
  rowOddTextColor: '#111827',
  rowHoverBackground: '#f3f4f6',
  rowHoverBackgroundOpacity: 0.8,
  rowHoverTextColor: '#111827',
  rowHeight: '48px',
  rowBorderBottom: '1px',
  rowBorderColor: '#e5e7eb',
  rowBorderOpacity: 1,
  cellPadding: '0.75rem 1rem',
  cellFontSize: '0.875rem',
  cellBorderRight: '1px',
  cellBorderColor: '#e5e7eb',
  cellBorderOpacity: 0.5,
  cellAlignment: 'left',
  columnMinWidth: '50px',
  columnMaxWidth: '800px',
};

interface SampleData {
  id: number;
  representative: string;
  dealSize: string;
  dealValue: string;
  status: string;
  closeDate: string;
}

const sampleData: SampleData[] = [
  { id: 1, representative: 'Akira Tanaka', dealSize: '$10,462.24', dealValue: '$10,462.24', status: 'Won', closeDate: 'Sep 17, 2025' },
  { id: 2, representative: 'Sarah Martinez', dealSize: '$18,738.66', dealValue: '$56,215.98', status: 'Won', closeDate: 'Oct 20, 2025' },
  { id: 3, representative: 'Sarah Martinez', dealSize: '$128.26', dealValue: '$9,491.24', status: 'Lost', closeDate: 'Oct 8, 2025' },
  { id: 4, representative: 'Olivia Bennett', dealSize: '$1,796.71', dealValue: '$7,186.84', status: 'Won', closeDate: 'Dec 1, 2025' },
  { id: 5, representative: 'David Thompson', dealSize: '$3,584.07', dealValue: '$46,592.91', status: 'Won', closeDate: 'Oct 5, 2025' },
  { id: 6, representative: 'Emily Davis', dealSize: '$14,903.81', dealValue: '$44,711.43', status: 'Won', closeDate: 'Nov 4, 2025' },
  { id: 7, representative: 'David Thompson', dealSize: '$560.54', dealValue: '$71,749.12', status: 'Won', closeDate: 'Oct 12, 2025' },
  { id: 8, representative: 'Mei Chen', dealSize: '$10,037.96', dealValue: '$170,645.32', status: 'Won', closeDate: 'Sep 15, 2025' },
  { id: 9, representative: 'Sarah Martinez', dealSize: '$354.95', dealValue: '$18,102.45', status: 'Won', closeDate: 'Nov 25, 2025' },
  { id: 10, representative: 'James Wilson', dealSize: '$18,375.50', dealValue: '$55,126.50', status: 'Won', closeDate: 'Oct 28, 2025' },
  { id: 11, representative: 'David Thompson', dealSize: '$2,054.61', dealValue: '$34,928.37', status: 'Lost', closeDate: 'Oct 26, 2025' },
  { id: 12, representative: 'Thomas Müller', dealSize: '$26,055.06', dealValue: '$26,055.06', status: 'Won', closeDate: 'Nov 8, 2025' },
  { id: 13, representative: 'Sarah Martinez', dealSize: '$559.33', dealValue: '$20,695.21', status: 'Won', closeDate: 'Nov 15, 2025' },
  { id: 14, representative: 'Liu Wei', dealSize: '$15,974.05', dealValue: '$47,922.15', status: 'Won', closeDate: 'Oct 29, 2025' },
  { id: 15, representative: 'Olivia Bennett', dealSize: '$108.38', dealValue: '$8,236.88', status: 'Lost', closeDate: 'Oct 30, 2025' },
  { id: 16, representative: 'Sarah Martinez', dealSize: '$122.40', dealValue: '$3,916.80', status: 'Lost', closeDate: 'Sep 29, 2025' },
  { id: 17, representative: 'Kim Seung-Min', dealSize: '$346.35', dealValue: '$48,835.35', status: 'Won', closeDate: 'Dec 9, 2025' },
  { id: 18, representative: 'Thomas Müller', dealSize: '$1,964.88', dealValue: '$1,964.88', status: 'Won', closeDate: 'Nov 8, 2025' },
];

function CollapsibleSection({ title, icon, isExpanded, onToggle, children }: {
  title: string;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-sm font-medium">{title}</span>
        </div>
        {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {isExpanded && <div className="p-4 pt-0 space-y-3">{children}</div>}
    </div>
  );
}

function ThemeControl({ label, value, onChange, type, opacity, onOpacityChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'text' | 'color' | 'select';
  opacity?: number;
  onOpacityChange?: (value: number) => void;
  options?: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {type === 'text' && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 bg-background border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      {type === 'color' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-9 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-background border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {opacity !== undefined && onOpacityChange && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Opacity:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">{Math.round(opacity * 100)}%</span>
            </div>
          )}
        </div>
      )}
      {type === 'select' && options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 bg-background border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export function ThemeBuilderPage() {
  const [theme, setTheme] = useState<TableThemeConfig>(defaultTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tableStructure: true,
    headers: false,
    rows: false,
    borders: false,
    radius: false,
    sizing: false,
  });

  useEffect(() => {
    const previewContainer = document.getElementById('theme-preview');
    if (previewContainer) {
      const style = previewContainer.style;
      style.setProperty('--table-width', theme.tableWidth);
      style.setProperty('--table-border', `${theme.tableBorder} ${theme.tableBorderStyle} rgba(${hexToRgb(theme.tableBorderColor)}, ${theme.tableBorderOpacity})`);
      style.setProperty('--table-radius', theme.tableRadius);
      style.setProperty('--table-background', `rgba(${hexToRgb(theme.tableBackground)}, ${theme.tableBackgroundOpacity})`);
      style.setProperty('--header-background', `rgba(${hexToRgb(theme.headerBackground)}, ${theme.headerBackgroundOpacity})`);
      style.setProperty('--header-text-color', theme.headerTextColor);
      style.setProperty('--header-font-size', theme.headerFontSize);
      style.setProperty('--header-font-weight', theme.headerFontWeight);
      style.setProperty('--header-padding', theme.headerPadding);
      style.setProperty('--header-border-bottom', `${theme.headerBorderBottom} solid rgba(${hexToRgb(theme.headerBorderColor)}, ${theme.headerBorderOpacity})`);
      style.setProperty('--row-even-background', `rgba(${hexToRgb(theme.rowEvenBackground)}, ${theme.rowEvenBackgroundOpacity})`);
      style.setProperty('--row-even-text-color', theme.rowEvenTextColor);
      style.setProperty('--row-odd-background', `rgba(${hexToRgb(theme.rowOddBackground)}, ${theme.rowOddBackgroundOpacity})`);
      style.setProperty('--row-odd-text-color', theme.rowOddTextColor);
      style.setProperty('--row-hover-background', `rgba(${hexToRgb(theme.rowHoverBackground)}, ${theme.rowHoverBackgroundOpacity})`);
      style.setProperty('--row-hover-text-color', theme.rowHoverTextColor);
      style.setProperty('--row-height', theme.rowHeight);
      style.setProperty('--row-border-bottom', `${theme.rowBorderBottom} solid rgba(${hexToRgb(theme.rowBorderColor)}, ${theme.rowBorderOpacity})`);
      style.setProperty('--cell-padding', theme.cellPadding);
      style.setProperty('--cell-font-size', theme.cellFontSize);
      style.setProperty('--cell-border-right', `${theme.cellBorderRight} solid rgba(${hexToRgb(theme.cellBorderColor)}, ${theme.cellBorderOpacity})`);
      style.setProperty('--cell-alignment', theme.cellAlignment);
    }
  }, [theme]);

  const columns: Column<SampleData>[] = [
    { id: 'representative', field: 'representative', header: 'Sales Representative', width: 200, sortable: true },
    { id: 'dealSize', field: 'dealSize', header: 'Deal Size', width: 150, sortable: true },
    { id: 'dealValue', field: 'dealValue', header: 'Deal Value', width: 150, sortable: true },
    { id: 'status', field: 'status', header: 'Status', width: 120 },
    { id: 'closeDate', field: 'closeDate', header: 'Close Date', width: 150 },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateThemeValue = <K extends keyof TableThemeConfig>(key: K, value: TableThemeConfig[K]) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => setTheme(defaultTheme);

  const exportTheme = () => {
    const css = `/* Table Theme */
.theme-preview {
  --table-border: ${theme.tableBorder} ${theme.tableBorderStyle} rgba(${hexToRgb(theme.tableBorderColor)}, ${theme.tableBorderOpacity});
  --table-radius: ${theme.tableRadius};
  --table-background: rgba(${hexToRgb(theme.tableBackground)}, ${theme.tableBackgroundOpacity});
  --header-background: rgba(${hexToRgb(theme.headerBackground)}, ${theme.headerBackgroundOpacity});
  --header-text-color: ${theme.headerTextColor};
  --row-even-background: rgba(${hexToRgb(theme.rowEvenBackground)}, ${theme.rowEvenBackgroundOpacity});
  --row-odd-background: rgba(${hexToRgb(theme.rowOddBackground)}, ${theme.rowOddBackgroundOpacity});
  --row-hover-background: rgba(${hexToRgb(theme.rowHoverBackground)}, ${theme.rowHoverBackgroundOpacity});
}`;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Theme Builder</h1>
        <p className="text-lg text-muted-foreground">
          Customize and generate theme configurations for Simply Table. Adjust colors, spacing, and styles to match your brand.
        </p>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-6">
        <div className="bg-card rounded-lg border h-[calc(100vh-200px)] overflow-hidden flex flex-col shadow-sm">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search theme variables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">71 total variables</div>
          </div>

            <div className="flex-1 overflow-y-auto">
              <CollapsibleSection title="Table Structure" icon="📐" isExpanded={expandedSections.tableStructure} onToggle={() => toggleSection('tableStructure')}>
                <ThemeControl label="Table Width" value={theme.tableWidth} onChange={(v) => updateThemeValue('tableWidth', v)} type="text" />
                <ThemeControl label="Table Background" value={theme.tableBackground} onChange={(v) => updateThemeValue('tableBackground', v)} type="color" opacity={theme.tableBackgroundOpacity} onOpacityChange={(v) => updateThemeValue('tableBackgroundOpacity', v)} />
                <ThemeControl label="Table Border" value={theme.tableBorder} onChange={(v) => updateThemeValue('tableBorder', v)} type="text" />
                <ThemeControl label="Border Color" value={theme.tableBorderColor} onChange={(v) => updateThemeValue('tableBorderColor', v)} type="color" opacity={theme.tableBorderOpacity} onOpacityChange={(v) => updateThemeValue('tableBorderOpacity', v)} />
                <ThemeControl label="Border Style" value={theme.tableBorderStyle} onChange={(v) => updateThemeValue('tableBorderStyle', v)} type="select" options={['solid', 'dashed', 'dotted', 'double']} />
                <ThemeControl label="Table Radius" value={theme.tableRadius} onChange={(v) => updateThemeValue('tableRadius', v)} type="text" />
              </CollapsibleSection>

              <CollapsibleSection title="Headers" icon="📋" isExpanded={expandedSections.headers} onToggle={() => toggleSection('headers')}>
                <ThemeControl label="Background Color" value={theme.headerBackground} onChange={(v) => updateThemeValue('headerBackground', v)} type="color" opacity={theme.headerBackgroundOpacity} onOpacityChange={(v) => updateThemeValue('headerBackgroundOpacity', v)} />
                <ThemeControl label="Text Color" value={theme.headerTextColor} onChange={(v) => updateThemeValue('headerTextColor', v)} type="color" />
                <ThemeControl label="Font Size" value={theme.headerFontSize} onChange={(v) => updateThemeValue('headerFontSize', v)} type="text" />
                <ThemeControl label="Font Weight" value={theme.headerFontWeight} onChange={(v) => updateThemeValue('headerFontWeight', v)} type="select" options={['300', '400', '500', '600', '700', '800']} />
                <ThemeControl label="Padding" value={theme.headerPadding} onChange={(v) => updateThemeValue('headerPadding', v)} type="text" />
                <ThemeControl label="Border Bottom" value={theme.headerBorderBottom} onChange={(v) => updateThemeValue('headerBorderBottom', v)} type="text" />
                <ThemeControl label="Border Color" value={theme.headerBorderColor} onChange={(v) => updateThemeValue('headerBorderColor', v)} type="color" opacity={theme.headerBorderOpacity} onOpacityChange={(v) => updateThemeValue('headerBorderOpacity', v)} />
              </CollapsibleSection>

              <CollapsibleSection title="Rows & Cells" icon="📊" isExpanded={expandedSections.rows} onToggle={() => toggleSection('rows')}>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Even Rows</div>
                <ThemeControl label="Background" value={theme.rowEvenBackground} onChange={(v) => updateThemeValue('rowEvenBackground', v)} type="color" opacity={theme.rowEvenBackgroundOpacity} onOpacityChange={(v) => updateThemeValue('rowEvenBackgroundOpacity', v)} />
                <ThemeControl label="Text Color" value={theme.rowEvenTextColor} onChange={(v) => updateThemeValue('rowEvenTextColor', v)} type="color" />
                <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4">Odd Rows</div>
                <ThemeControl label="Background" value={theme.rowOddBackground} onChange={(v) => updateThemeValue('rowOddBackground', v)} type="color" opacity={theme.rowOddBackgroundOpacity} onOpacityChange={(v) => updateThemeValue('rowOddBackgroundOpacity', v)} />
                <ThemeControl label="Text Color" value={theme.rowOddTextColor} onChange={(v) => updateThemeValue('rowOddTextColor', v)} type="color" />
                <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4">Hover State</div>
                <ThemeControl label="Background" value={theme.rowHoverBackground} onChange={(v) => updateThemeValue('rowHoverBackground', v)} type="color" opacity={theme.rowHoverBackgroundOpacity} onOpacityChange={(v) => updateThemeValue('rowHoverBackgroundOpacity', v)} />
                <ThemeControl label="Text Color" value={theme.rowHoverTextColor} onChange={(v) => updateThemeValue('rowHoverTextColor', v)} type="color" />
                <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4">Cell Properties</div>
                <ThemeControl label="Padding" value={theme.cellPadding} onChange={(v) => updateThemeValue('cellPadding', v)} type="text" />
                <ThemeControl label="Font Size" value={theme.cellFontSize} onChange={(v) => updateThemeValue('cellFontSize', v)} type="text" />
                <ThemeControl label="Alignment" value={theme.cellAlignment} onChange={(v) => updateThemeValue('cellAlignment', v)} type="select" options={['left', 'center', 'right']} />
                <ThemeControl label="Row Height" value={theme.rowHeight} onChange={(v) => updateThemeValue('rowHeight', v)} type="text" />
              </CollapsibleSection>

              <CollapsibleSection title="Borders" icon="🔲" isExpanded={expandedSections.borders} onToggle={() => toggleSection('borders')}>
                <ThemeControl label="Row Border Bottom" value={theme.rowBorderBottom} onChange={(v) => updateThemeValue('rowBorderBottom', v)} type="text" />
                <ThemeControl label="Row Border Color" value={theme.rowBorderColor} onChange={(v) => updateThemeValue('rowBorderColor', v)} type="color" opacity={theme.rowBorderOpacity} onOpacityChange={(v) => updateThemeValue('rowBorderOpacity', v)} />
                <ThemeControl label="Cell Border Right" value={theme.cellBorderRight} onChange={(v) => updateThemeValue('cellBorderRight', v)} type="text" />
                <ThemeControl label="Cell Border Color" value={theme.cellBorderColor} onChange={(v) => updateThemeValue('cellBorderColor', v)} type="color" opacity={theme.cellBorderOpacity} onOpacityChange={(v) => updateThemeValue('cellBorderOpacity', v)} />
              </CollapsibleSection>

              <CollapsibleSection title="Radius" icon="⭕" isExpanded={expandedSections.radius} onToggle={() => toggleSection('radius')}>
                <ThemeControl label="Table Radius" value={theme.tableRadius} onChange={(v) => updateThemeValue('tableRadius', v)} type="text" />
                <p className="text-xs text-muted-foreground">Controls all table corners (header top and last row bottom)</p>
              </CollapsibleSection>

              <CollapsibleSection title="Sizing" icon="📏" isExpanded={expandedSections.sizing} onToggle={() => toggleSection('sizing')}>
                <ThemeControl label="Column Min Width" value={theme.columnMinWidth} onChange={(v) => updateThemeValue('columnMinWidth', v)} type="text" />
                <ThemeControl label="Column Max Width" value={theme.columnMaxWidth} onChange={(v) => updateThemeValue('columnMaxWidth', v)} type="text" />
              </CollapsibleSection>
            </div>

          <div className="p-4 border-t flex gap-2">
            <Button onClick={resetTheme} variant="outline" size="sm" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={exportTheme} size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="text-sm text-muted-foreground">Sales Metrics</div>
          </div>
          
          <div id="theme-preview">
            <SimplyTable
              columns={columns}
              rows={sampleData}
              rowKey="id"
              enablePagination={true}
              pageSize={18}
              className="h-[calc(100vh-240px)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}