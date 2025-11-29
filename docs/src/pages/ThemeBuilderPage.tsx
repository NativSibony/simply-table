import { useState, useEffect } from 'react';
import { SimplyTable } from 'simply-table';
import type { Column } from 'simply-table';
import { Button } from '../components/ui/button';
import { Copy, Download, Upload, RotateCcw, Palette } from 'lucide-react';

interface ThemeConfig {
  // Colors
  radius: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

const defaultTheme: ThemeConfig = {
  radius: '0.625rem',
  background: '0 0% 100%',
  foreground: '0 0% 14.5%',
  card: '0 0% 100%',
  cardForeground: '0 0% 14.5%',
  popover: '0 0% 100%',
  popoverForeground: '0 0% 14.5%',
  primary: '0 0% 20.5%',
  primaryForeground: '0 0% 98.5%',
  secondary: '0 0% 97%',
  secondaryForeground: '0 0% 20.5%',
  muted: '0 0% 97%',
  mutedForeground: '0 0% 55.6%',
  accent: '0 0% 97%',
  accentForeground: '0 0% 20.5%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '0 0% 98%',
  border: '0 0% 92.2%',
  input: '0 0% 92.2%',
  ring: '0 0% 70.8%',
};

const darkTheme: ThemeConfig = {
  radius: '0.625rem',
  background: '0 0% 14.5%',
  foreground: '0 0% 98.5%',
  card: '0 0% 20.5%',
  cardForeground: '0 0% 98.5%',
  popover: '0 0% 20.5%',
  popoverForeground: '0 0% 98.5%',
  primary: '0 0% 92.2%',
  primaryForeground: '0 0% 20.5%',
  secondary: '0 0% 26.9%',
  secondaryForeground: '0 0% 98.5%',
  muted: '0 0% 26.9%',
  mutedForeground: '0 0% 70.8%',
  accent: '0 0% 26.9%',
  accentForeground: '0 0% 98.5%',
  destructive: '0 62.8% 30.6%',
  destructiveForeground: '0 0% 98%',
  border: '0 0% 26.9%',
  input: '0 0% 26.9%',
  ring: '0 0% 55.6%',
};

const minimalTheme: ThemeConfig = {
  radius: '0.25rem',
  background: '0 0% 100%',
  foreground: '0 0% 10%',
  card: '0 0% 98%',
  cardForeground: '0 0% 10%',
  popover: '0 0% 98%',
  popoverForeground: '0 0% 10%',
  primary: '0 0% 30%',
  primaryForeground: '0 0% 100%',
  secondary: '0 0% 95%',
  secondaryForeground: '0 0% 30%',
  muted: '0 0% 96%',
  mutedForeground: '0 0% 50%',
  accent: '0 0% 94%',
  accentForeground: '0 0% 30%',
  destructive: '0 70% 50%',
  destructiveForeground: '0 0% 100%',
  border: '0 0% 90%',
  input: '0 0% 90%',
  ring: '0 0% 60%',
};

const colorfulTheme: ThemeConfig = {
  radius: '0.75rem',
  background: '210 40% 98%',
  foreground: '222 47% 11%',
  card: '0 0% 100%',
  cardForeground: '222 47% 11%',
  popover: '0 0% 100%',
  popoverForeground: '222 47% 11%',
  primary: '221 83% 53%',
  primaryForeground: '210 40% 98%',
  secondary: '210 40% 96%',
  secondaryForeground: '222 47% 11%',
  muted: '210 40% 96%',
  mutedForeground: '215 16% 47%',
  accent: '210 40% 96%',
  accentForeground: '222 47% 11%',
  destructive: '0 84% 60%',
  destructiveForeground: '210 40% 98%',
  border: '214 32% 91%',
  input: '214 32% 91%',
  ring: '221 83% 53%',
};

interface SampleData {
  id: number;
  name: string;
  category: string;
  value: number;
  status: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'Product A', category: 'Electronics', value: 299, status: 'Active' },
  { id: 2, name: 'Product B', category: 'Clothing', value: 49, status: 'Active' },
  { id: 3, name: 'Product C', category: 'Books', value: 19, status: 'Inactive' },
  { id: 4, name: 'Product D', category: 'Electronics', value: 599, status: 'Active' },
  { id: 5, name: 'Product E', category: 'Home', value: 129, status: 'Active' },
];

export function ThemeBuilderPage() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  // Apply theme to preview container
  useEffect(() => {
    const previewContainer = document.getElementById('theme-preview');
    if (previewContainer) {
      Object.entries(theme).forEach(([key, value]) => {
        const cssVar = `--st-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        previewContainer.style.setProperty(cssVar, value);
      });
    }
  }, [theme]);

  const columns: Column<SampleData>[] = [
    { id: 'id', field: 'id', header: 'ID', width: 80, sortable: true },
    { id: 'name', field: 'name', header: 'Name', width: 200, sortable: true },
    { id: 'category', field: 'category', header: 'Category', width: 150, sortable: true },
    { id: 'value', field: 'value', header: 'Value', width: 120, sortable: true },
    { id: 'status', field: 'status', header: 'Status', width: 120 },
  ];

  const generateCSS = () => {
    return `:root {
  --st-radius: ${theme.radius};
  --st-background: ${theme.background};
  --st-foreground: ${theme.foreground};
  --st-card: ${theme.card};
  --st-card-foreground: ${theme.cardForeground};
  --st-popover: ${theme.popover};
  --st-popover-foreground: ${theme.popoverForeground};
  --st-primary: ${theme.primary};
  --st-primary-foreground: ${theme.primaryForeground};
  --st-secondary: ${theme.secondary};
  --st-secondary-foreground: ${theme.secondaryForeground};
  --st-muted: ${theme.muted};
  --st-muted-foreground: ${theme.mutedForeground};
  --st-accent: ${theme.accent};
  --st-accent-foreground: ${theme.accentForeground};
  --st-destructive: ${theme.destructive};
  --st-destructive-foreground: ${theme.destructiveForeground};
  --st-border: ${theme.border};
  --st-input: ${theme.input};
  --st-ring: ${theme.ring};
}`;
  };

  const copyCSS = async () => {
    await navigator.clipboard.writeText(generateCSS());
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const copyJSON = async () => {
    await navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const downloadCSS = () => {
    const blob = new Blob([generateCSS()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simply-table-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simply-table-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string);
            setTheme({ ...defaultTheme, ...imported });
          } catch {
            alert('Invalid theme file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const applyPreset = (preset: 'light' | 'dark' | 'minimal' | 'colorful') => {
    const presets = {
      light: defaultTheme,
      dark: darkTheme,
      minimal: minimalTheme,
      colorful: colorfulTheme,
    };
    setTheme(presets[preset]);
  };

  const updateThemeValue = (key: keyof ThemeConfig, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Theme Builder</h1>
        <p className="text-lg text-muted-foreground">
          Customize and generate theme configurations for Simply Table. Adjust colors, spacing, and styles to match your brand.
        </p>
      </div>

      {/* Preset Themes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Preset Themes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => applyPreset('light')}
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Palette className="h-6 w-6" />
            <span>Light</span>
          </Button>
          <Button
            onClick={() => applyPreset('dark')}
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Palette className="h-6 w-6" />
            <span>Dark</span>
          </Button>
          <Button
            onClick={() => applyPreset('minimal')}
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Palette className="h-6 w-6" />
            <span>Minimal</span>
          </Button>
          <Button
            onClick={() => applyPreset('colorful')}
            variant="outline"
            className="h-24 flex-col gap-2"
          >
            <Palette className="h-6 w-6" />
            <span>Colorful</span>
          </Button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Customization */}
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Customize Theme</h2>
            
            {/* Border Radius */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Border Radius</label>
              <input
                type="text"
                value={theme.radius}
                onChange={(e) => updateThemeValue('radius', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.625rem"
              />
            </div>

            {/* Colors Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold">Colors</h3>
              
              <ColorInput
                label="Background"
                value={theme.background}
                onChange={(v) => updateThemeValue('background', v)}
              />
              <ColorInput
                label="Foreground"
                value={theme.foreground}
                onChange={(v) => updateThemeValue('foreground', v)}
              />
              <ColorInput
                label="Primary"
                value={theme.primary}
                onChange={(v) => updateThemeValue('primary', v)}
              />
              <ColorInput
                label="Primary Foreground"
                value={theme.primaryForeground}
                onChange={(v) => updateThemeValue('primaryForeground', v)}
              />
              <ColorInput
                label="Secondary"
                value={theme.secondary}
                onChange={(v) => updateThemeValue('secondary', v)}
              />
              <ColorInput
                label="Secondary Foreground"
                value={theme.secondaryForeground}
                onChange={(v) => updateThemeValue('secondaryForeground', v)}
              />
              <ColorInput
                label="Muted"
                value={theme.muted}
                onChange={(v) => updateThemeValue('muted', v)}
              />
              <ColorInput
                label="Muted Foreground"
                value={theme.mutedForeground}
                onChange={(v) => updateThemeValue('mutedForeground', v)}
              />
              <ColorInput
                label="Accent"
                value={theme.accent}
                onChange={(v) => updateThemeValue('accent', v)}
              />
              <ColorInput
                label="Accent Foreground"
                value={theme.accentForeground}
                onChange={(v) => updateThemeValue('accentForeground', v)}
              />
              <ColorInput
                label="Border"
                value={theme.border}
                onChange={(v) => updateThemeValue('border', v)}
              />
              <ColorInput
                label="Input"
                value={theme.input}
                onChange={(v) => updateThemeValue('input', v)}
              />
              <ColorInput
                label="Ring"
                value={theme.ring}
                onChange={(v) => updateThemeValue('ring', v)}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Button onClick={resetTheme} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={importTheme} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </Button>
            </div>
          </section>
        </div>

        {/* Right Column - Preview & Export */}
        <div className="space-y-6">
          {/* Live Preview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div id="theme-preview" className="border rounded-lg p-4">
              <SimplyTable
                columns={columns}
                rows={sampleData}
                rowKey="id"
                enablePagination={true}
                pageSize={5}
                className="h-[400px]"
              />
            </div>
          </section>

          {/* Export Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Export Theme</h2>
            
            {/* CSS Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">CSS Variables</label>
                <div className="flex gap-2">
                  <Button onClick={copyCSS} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    {copiedCSS ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={downloadCSS} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto max-h-[300px] overflow-y-auto">
                {generateCSS()}
              </pre>
            </div>

            {/* JSON Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">JSON Configuration</label>
                <div className="flex gap-2">
                  <Button onClick={copyJSON} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    {copiedJSON ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={downloadJSON} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto max-h-[200px] overflow-y-auto">
                {JSON.stringify(theme, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </div>

      {/* Documentation */}
      <section className="space-y-4 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-2xl font-bold">How to Apply Your Theme</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">1. Copy the CSS Variables</h3>
            <p className="text-muted-foreground">
              Click the "Copy" button in the CSS Variables section above, then paste the CSS into your global stylesheet or a CSS file that's imported before Simply Table.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Add to Your Project</h3>
            <p className="text-muted-foreground mb-2">
              Place the CSS variables in your root CSS file (e.g., <code className="px-1.5 py-0.5 bg-background rounded">index.css</code> or <code className="px-1.5 py-0.5 bg-background rounded">App.css</code>):
            </p>
            <pre className="p-3 bg-background rounded text-xs overflow-x-auto">
{`/* In your global CSS file */
:root {
  --st-radius: 0.625rem;
  --st-background: 0 0% 100%;
  /* ... other variables */
}

/* Import Simply Table */
import 'simply-table/dist/style.css';`}
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Dark Mode Support</h3>
            <p className="text-muted-foreground mb-2">
              To support dark mode, add a <code className="px-1.5 py-0.5 bg-background rounded">.dark</code> class with alternative values:
            </p>
            <pre className="p-3 bg-background rounded text-xs overflow-x-auto">
{`.dark {
  --st-background: 0 0% 14.5%;
  --st-foreground: 0 0% 98.5%;
  /* ... other dark mode variables */
}`}
            </pre>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded">
            <p className="text-sm">
              <strong>💡 Tip:</strong> All CSS variables use the <code className="px-1.5 py-0.5 bg-background rounded">--st-</code> prefix to avoid conflicts with your application's styles.
              The values use HSL format without the <code className="px-1.5 py-0.5 bg-background rounded">hsl()</code> wrapper for easier manipulation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  // Convert HSL string to hex for color picker
  const hslToHex = (hsl: string): string => {
    try {
      const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
      const hDecimal = h / 360;
      const sDecimal = s / 100;
      const lDecimal = l / 100;
      
      const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal;
      const x = c * (1 - Math.abs((hDecimal * 6) % 2 - 1));
      const m = lDecimal - c / 2;
      
      let r = 0, g = 0, b = 0;
      if (hDecimal < 1/6) { r = c; g = x; b = 0; }
      else if (hDecimal < 2/6) { r = x; g = c; b = 0; }
      else if (hDecimal < 3/6) { r = 0; g = c; b = x; }
      else if (hDecimal < 4/6) { r = 0; g = x; b = c; }
      else if (hDecimal < 5/6) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      
      const toHex = (n: number) => {
        const hex = Math.round((n + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } catch {
      return '#000000';
    }
  };

  // Convert hex to HSL string
  const hexToHsl = (hex: string): string => {
    try {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;

      if (max === min) {
        return `0 0% ${Math.round(l * 100)}%`;
      }

      const d = max - min;
      const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      let h = 0;
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    } catch {
      return '0 0% 0%';
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    const hsl = hexToHsl(hex);
    onChange(hsl);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
          placeholder="0 0% 100%"
        />
        <div className="relative">
          <input
            type="color"
            value={hslToHex(value)}
            onChange={handleColorPickerChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Pick a color"
          />
          <div
            className="w-10 h-10 rounded border cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            style={{ backgroundColor: `hsl(${value})` }}
            title="Click to pick a color"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">HSL format: hue saturation% lightness% (click color box to pick)</p>
    </div>
  );
}