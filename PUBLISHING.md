# Publishing Guide

This document explains how to publish the simply-table library to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm Login**: Run `npm login` to authenticate
3. **Repository Access**: Ensure you have write access to the GitHub repository

## Automated Publishing (Recommended)

The project includes a production-ready release script that handles everything automatically.

### Quick Start

```bash
# Patch release (0.1.10 → 0.1.7)
npm run release:patch

# Minor release (0.1.10 → 0.2.0)
npm run release:minor

# Major release (0.1.10 → 1.0.0)
npm run release:major
```

### What the Script Does

The release script (`scripts/release.sh`) automatically:

1. ✅ **Pre-flight Checks**
   - Verifies git status is clean
   - Checks you're on the main branch
   - Confirms npm authentication
   - Validates dependencies are installed

2. ✅ **Build & Test**
   - Runs linter
   - Runs tests
   - Builds the library

3. ✅ **Version Management**
   - Updates version in `package.json`
   - Updates version in documentation (`docs/src/pages/HomePage.tsx`)
   - Creates conventional commit message

4. ✅ **Git Operations**
   - Commits all changes
   - Creates git tag (e.g., `v0.1.7`)
   - Pushes to remote with tags

5. ✅ **Publishing**
   - Publishes to npm with public access

### Features

- 🎨 **Colored output** for better readability
- ⚠️ **Confirmation prompts** before destructive operations
- 🔄 **Rollback capabilities** if something goes wrong
- 📝 **Conventional commits** for better changelog generation
- 🔒 **Safety checks** at every step

### Example Usage

```bash
$ npm run release:patch

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║              Simply Table - Release Script                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PRE-FLIGHT CHECKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▶ Checking git status...
✓ Working directory is clean
▶ Checking current branch...
✓ On main branch
▶ Checking npm authentication...
✓ Logged in as: your-username

Version Change:
  Current: 0.1.10
  New:     0.1.7
  Type:    patch

⚠ Proceed with release? [y/N]: y
```

## Manual Publishing

### Step 1: Update Version

Update the version in [`package.json`](package.json:3) following [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.0 → 0.1.1): Bug fixes
- **Minor** (0.1.0 → 0.2.0): New features (backward compatible)
- **Major** (0.1.0 → 1.0.0): Breaking changes

```bash
# Or use npm version command
npm version patch  # or minor, or major
```

### Step 2: Build the Library

```bash
npm run build
```

This generates:
- `dist/simply-table.js` - ESM format
- `dist/simply-table.umd.cjs` - UMD/CommonJS format
- `dist/index.d.ts` - TypeScript declarations
- `dist/index.d.ts.map` - Source maps for declarations

### Step 3: Test the Package

Verify what will be published:

```bash
npm pack --dry-run
```

### Step 4: Publish

```bash
npm publish
```

For scoped packages or first-time publishing:

```bash
npm publish --access public
```

## Automated Publishing with GitHub Actions

The repository includes automated publishing via GitHub Actions.

### Setup

1. **Create npm Access Token**:
   - Go to [npmjs.com](https://www.npmjs.com/)
   - Navigate to Access Tokens in your account settings
   - Create a new "Automation" token
   - Copy the token

2. **Add Token to GitHub**:
   - Go to your GitHub repository settings
   - Navigate to Secrets and Variables → Actions
   - Create a new secret named `NPM_TOKEN`
   - Paste your npm token

### Publishing Process

1. **Update Version**: Commit version changes to main branch
2. **Create Release**: 
   - Go to GitHub repository
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v0.1.0`)
   - Add release notes
   - Publish release

3. **Automatic Publishing**: The GitHub Action will:
   - Run tests
   - Build the library
   - Publish to npm with provenance

## Continuous Integration

Every push and pull request triggers the CI workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml:1)) which:

- Tests on Node.js 18.x and 20.x
- Runs linter
- Runs tests
- Builds the library
- Verifies build outputs

## Package Contents

The published package includes:

```
simply-table/
├── dist/
│   ├── simply-table.js          # ESM bundle
│   ├── simply-table.umd.cjs     # UMD/CommonJS bundle
│   ├── index.d.ts               # TypeScript declarations
│   └── index.d.ts.map           # Declaration source maps
├── LICENSE                       # MIT License
├── README.md                     # Documentation
└── package.json                  # Package metadata
```

**Excluded from package** (via [`.npmignore`](.npmignore:1)):
- Source files (`src/`)
- Documentation site (`docs/`)
- Configuration files
- Development files
- Tests

## Verification

After publishing, verify the package:

```bash
# View package info
npm view simply-table

# Install in a test project
npm install simply-table

# Check package contents
npm pack
tar -xzf simply-table-*.tgz
ls -la package/
```

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Check package name isn't taken: `npm view simply-table`
- Use `--access public` for scoped packages

### "Version already exists"

- Update version in [`package.json`](package.json:3)
- Commit and try again

### Build Failures

- Clear dist: `rm -rf dist`
- Clean install: `rm -rf node_modules package-lock.json && npm install`
- Rebuild: `npm run build`

## Direct Script Usage

You can also run the script directly:

```bash
./scripts/release.sh patch
./scripts/release.sh minor
./scripts/release.sh major
```

## Rollback

If something goes wrong during the release process:

```bash
# Remove the git tag
git tag -d v0.1.7

# Reset to previous commit
git reset --hard HEAD~1

# If already pushed, force push (use with caution)
git push origin main --force
git push origin :refs/tags/v0.1.7
```

## Best Practices

1. **Use the automated script**: It handles all the complexity and edge cases
2. **Always test before publishing**: The script runs tests automatically
3. **Use semantic versioning**: Follow semver guidelines
4. **Review changes**: The script shows you what will change before proceeding
5. **Keep main branch clean**: Only release from a clean main branch

## Links

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions](https://docs.github.com/en/actions)