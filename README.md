# simply-table

A production-ready table library for React applications.

[![CI](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml/badge.svg)](https://github.com/NativSibony/simply-table/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/simply-table.svg)](https://www.npmjs.com/package/simply-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install simply-table
```

or

```bash
yarn add simply-table
```

or

```bash
pnpm add simply-table
```

## Usage

```typescript
import { version } from 'simply-table';

console.log(version);
```

> **Note:** This library is currently in development. The API and functionality will be added in future releases.

## Features

- 🚀 Built with TypeScript for type safety
- 📦 Supports both ESM and CommonJS
- ⚡ Optimized bundle size
- 🎯 React 18+ and React 19+ compatible
- 🔧 Fully tree-shakeable

## Development

### Prerequisites

- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/NativSibony/simply-table.git
cd simply-table

# Install dependencies
npm install

# Build the library
npm run build

# Run linter
npm run lint
```

### Building

The library uses Vite for building and supports multiple output formats:

```bash
npm run build
```

This will generate:
- `dist/simply-table.js` - ESM format
- `dist/simply-table.umd.cjs` - UMD format for CommonJS
- `dist/index.d.ts` - TypeScript type definitions

### Project Structure

```
simply-table/
├── src/              # Library source code
│   └── index.ts      # Main entry point
├── docs/             # Documentation website (excluded from npm package)
├── dist/             # Build output (generated)
├── .github/          # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml    # Continuous Integration
│       └── publish.yml # NPM publishing
└── package.json      # Package configuration
```

## Publishing

### Manual Publishing

1. Update the version in [`package.json`](package.json:3)
2. Build the library: `npm run build`
3. Publish to npm: `npm publish`

### Automated Publishing

The library is configured with GitHub Actions for automated publishing:

1. Create a new release on GitHub
2. The publish workflow will automatically:
   - Run tests
   - Build the library
   - Publish to npm

**Setup Required:**
- Add `NPM_TOKEN` to your GitHub repository secrets
- The token should have publish permissions for the package

## Documentation

Documentation is available in the [`docs/`](docs/) directory. This directory is completely separate from the library build and is excluded from the npm package.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Links

- [GitHub Repository](https://github.com/NativSibony/simply-table)
- [npm Package](https://www.npmjs.com/package/simply-table)
- [Issue Tracker](https://github.com/NativSibony/simply-table/issues)
