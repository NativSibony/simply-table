# simply-table Documentation

This is the official documentation website for simply-table, built with React, TypeScript, and Vite.

## Development

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The documentation site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun run preview
```

## Documentation Structure

```
docs/
├── src/
│   ├── components/          # Reusable components
│   │   ├── CodeBlock.tsx    # Syntax-highlighted code blocks with copy functionality
│   │   ├── Layout.tsx       # Main layout with sidebar navigation
│   │   ├── ThemeProvider.tsx # Dark/light theme support
│   │   └── ThemeToggle.tsx  # Theme switcher component
│   ├── pages/               # Documentation pages
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── BasicExamplesPage.tsx
│   │   ├── SortingFilteringPage.tsx
│   │   ├── PaginationPage.tsx
│   │   ├── VirtualizationPage.tsx
│   │   ├── CustomRenderingPage.tsx
│   │   ├── AdvancedFeaturesPage.tsx
│   │   └── ApiReferencePage.tsx
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
└── index.html              # HTML template
```

## Features

- **Interactive Examples**: Live, editable code examples for all features
- **Syntax Highlighting**: Beautiful code blocks with copy-to-clipboard functionality
- **Dark Mode**: Full dark mode support with theme persistence
- **Responsive Design**: Mobile-friendly navigation and layout
- **Type-Safe**: Built with TypeScript for excellent developer experience
- **Fast**: Powered by Vite for instant HMR and optimized builds

## Adding New Documentation

### Creating a New Page

1. Create a new file in `src/pages/` (e.g., `NewFeaturePage.tsx`)
2. Add the route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

### Page Structure

```tsx
import { CodeBlock } from '../components/CodeBlock';

export function NewFeaturePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Feature Name</h1>
        <p className="text-lg text-muted-foreground">
          Description of the feature
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="p-4 bg-muted/50 rounded-lg border">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase">
          On This Page
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#section-1" className="text-primary hover:underline">Section 1</a></li>
        </ul>
      </nav>

      {/* Content Sections */}
      <section id="section-1" className="space-y-4 scroll-mt-20">
        <h2 className="text-2xl font-bold">Section Title</h2>
        <p className="text-muted-foreground">Description</p>
        
        {/* Live Example */}
        <div className="border rounded-lg p-6 bg-card">
          {/* Your example component */}
        </div>

        {/* Code Block */}
        <CodeBlock code={exampleCode} language="typescript" />
      </section>

      {/* Next Steps */}
      <section className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Next Steps</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/other-page" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Related Feature →
          </a>
        </div>
      </section>
    </div>
  );
}
```

## Styling Guidelines

### Using Tailwind Classes

The documentation uses Tailwind CSS with a custom theme. Common patterns:

```tsx
// Headers
<h1 className="text-4xl font-bold mb-4">Title</h1>
<h2 className="text-2xl font-bold mb-2">Subtitle</h2>

// Text
<p className="text-muted-foreground">Description text</p>
<code className="px-1.5 py-0.5 bg-muted rounded text-sm">inline code</code>

// Containers
<div className="border rounded-lg p-6 bg-card">Content</div>

// Buttons/Links
<a className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
  Button
</a>
```

### Custom CSS Classes

Available utility classes (defined in `index.css`):

- `.inline-code` - Styled inline code
- `.info-box-primary` - Primary info box
- `.info-box-warning` - Warning info box
- `.info-box-success` - Success info box
- `.section-anchor` - Section with scroll offset
- `.scrollbar-thin` - Custom thin scrollbar

## Code Examples Best Practices

1. **Keep examples focused**: Each example should demonstrate one concept
2. **Make them copy-paste ready**: Examples should work without modification
3. **Add comments**: Explain non-obvious parts
4. **Show real-world usage**: Use realistic data and scenarios
5. **Include TypeScript types**: Always show proper typing

## Contributing

When contributing to the documentation:

1. Follow the existing structure and patterns
2. Test all code examples to ensure they work
3. Add cross-references to related pages
4. Include "Next Steps" sections to guide users
5. Ensure responsive design works on mobile
6. Test both light and dark themes

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Icons

## License

MIT