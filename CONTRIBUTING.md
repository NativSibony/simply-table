# Contributing to simply-table

Thank you for your interest in contributing to simply-table! We welcome contributions from the community.

## Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Getting Started

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/simply-table.git
cd simply-table
```

2. **Install dependencies**

```bash
npm install
```

3. **Build the library**

```bash
npm run build
```

4. **Run the linter**

```bash
npm run lint
```

## Project Structure

```
simply-table/
├── src/                    # Library source code
│   ├── index.ts           # Main entry point
│   ├── simply-table.tsx   # Main table component
│   ├── types.ts           # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── components/        # UI components
│   └── styles/            # CSS modules
├── docs/                  # Documentation website (separate from library)
├── dist/                  # Build output (generated)
└── package.json           # Package configuration
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update TypeScript types as needed

### 3. Test Your Changes

```bash
# Build the library
npm run build

# Run linter
npm run lint

# Test in the docs site (optional)
cd docs
npm install
npm run dev
```

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add column pinning feature"
# or
git commit -m "fix: resolve scroll synchronization issue"
# or
git commit -m "docs: update API reference"
```

### 5. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Reference to any related issues
- Screenshots/GIFs if applicable

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for props and public APIs

### React

- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable
- Use proper prop types

### CSS

- Use CSS modules for styling
- Follow the existing naming conventions
- Use CSS variables for theming
- Keep styles scoped to components

### Naming Conventions

- **Components**: PascalCase (e.g., `SimplyTable`, `TableHeader`)
- **Hooks**: camelCase with `use` prefix (e.g., `useSorting`, `usePagination`)
- **Files**: kebab-case (e.g., `simply-table.tsx`, `use-sorting.ts`)
- **CSS Classes**: kebab-case (e.g., `.table-header`, `.sort-icon`)

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] Changes are tested locally
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive

### PR Description Should Include

1. **What** - What changes were made
2. **Why** - Why these changes were necessary
3. **How** - How the changes were implemented
4. **Testing** - How the changes were tested

### Example PR Description

```markdown
## What
Added column pinning feature to allow users to pin columns to the left or right side of the table.

## Why
Users requested the ability to keep important columns visible while scrolling horizontally.

## How
- Added `pinned` property to Column interface
- Implemented pinning logic in table layout
- Updated CSS to handle pinned column positioning

## Testing
- Tested with various column configurations
- Verified scroll behavior with pinned columns
- Checked responsive behavior
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Browser, OS, React version, library version
- **Code Sample**: Minimal code example that reproduces the issue

### Feature Requests

When requesting features, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you envision it working
- **Alternatives**: Any alternative solutions you've considered

## Documentation

### Updating Documentation

If your changes affect the public API or user-facing features:

1. Update the main README.md if needed
2. Update relevant documentation pages in `docs/src/pages/`
3. Add code examples demonstrating the new feature
4. Update TypeScript type definitions

### Documentation Site

The documentation site is in the `docs/` directory:

```bash
cd docs
npm install
npm run dev
```

Visit `http://localhost:5173` to view the documentation site locally.

## Release Process

Releases are handled by the maintainers. The process is:

1. Version bump in `package.json`
2. Update CHANGELOG.md
3. Create a GitHub release
4. Automated publish to npm via GitHub Actions

## Questions?

If you have questions about contributing:

- Open a [GitHub Discussion](https://github.com/NativSibony/simply-table/discussions)
- Check existing [Issues](https://github.com/NativSibony/simply-table/issues)
- Review the [Documentation](https://simply-table.netlify.app)

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to make simply-table better!

## License

By contributing to simply-table, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to simply-table! 🎉