# simply-table Documentation

This is the documentation website for the simply-table library, built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **Comprehensive Examples**: Interactive examples demonstrating all library features
- **Live Demos**: Working table implementations you can interact with
- **Code Samples**: Syntax-highlighted code examples for easy reference
- **Type-Safe**: Full TypeScript support with type definitions
- **Responsive Design**: Mobile-friendly documentation layout

## Development

### Prerequisites

- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## Project Structure

```
docs/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.tsx    # Main layout with navigation
│   │   └── CodeBlock.tsx # Syntax-highlighted code blocks
│   ├── pages/            # Documentation pages
│   │   ├── HomePage.tsx
│   │   ├── BasicExamplesPage.tsx
│   │   ├── SortingFilteringPage.tsx
│   │   ├── PaginationPage.tsx
│   │   ├── VirtualizationPage.tsx
│   │   ├── CustomRenderingPage.tsx
│   │   └── AdvancedFeaturesPage.tsx
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
└── package.json
```

## Pages

### Home Page
- Quick start guide
- Installation instructions
- Feature overview
- Links to example pages

### Basic Examples
- Simple table setup
- Column configuration
- Row key management

### Sorting & Filtering
- Client-side sorting
- Server-side sorting
- Client-side filtering
- Server-side filtering

### Pagination
- Client-side pagination
- Server-side pagination
- Custom page sizes
- Controlled pagination

### Virtualization
- Performance optimization
- Large dataset handling
- Custom row heights
- Performance comparison

### Custom Rendering
- Custom cell renderers
- Status badges
- Formatted values
- Rich cell content

### Advanced Features
- Column resizing
- Column reordering
- Custom styling
- Loading states

## Technologies

- **Vite**: Fast build tool and dev server
- **React 19**: UI framework
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **react-syntax-highlighter**: Code syntax highlighting
- **simply-table**: The library being documented (v0.1.2)

## Building for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

## Deployment

The documentation can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Simply build the project and deploy the `dist/` directory.

## Contributing

To add new examples or improve documentation:

1. Create or modify pages in `src/pages/`
2. Update routing in `src/App.tsx` if adding new pages
3. Add navigation links in `src/components/Layout.tsx`
4. Test locally with `npm run dev`
5. Build and verify with `npm run build && npm run preview`

## License

MIT